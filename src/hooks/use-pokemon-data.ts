import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import type { Pokemon, PokemonData } from "@/type/poke";

const INITIAL_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0';
const ALL_POKEMONS_URL = 'https://pokeapi.co/api/v2/pokemon?limit=1302';

export const usePokemonData = (debouncedSearchTerm: string) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState<string | null>(INITIAL_URL);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const allPokemonsCache = useRef<Pokemon[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingAbortController = useRef<AbortController | null>(null);  // 중복 요청 방지

  const fetchAllPokemons = useCallback(async () => {
    if (allPokemonsCache.current.length > 0) return;

    try {
      const response = await axios.get(ALL_POKEMONS_URL);
      allPokemonsCache.current = response.data.results;
    } catch (e) {
      console.error("Failed to fetch all pokemons", e);
    }
  }, []);

  // 무한 스크롤 데이터 로드 함수
  const loadMorePokemons = useCallback(async () => {
    if (loading || !nextUrl || isSearching) return; // 검색 중일 때는 무한 스크롤 비활성화

    // 이전 요청 취소
    if (loadingAbortController.current) loadingAbortController.current.abort();
    loadingAbortController.current = new AbortController();
    const { signal } = loadingAbortController.current;

    setLoading(true);

    try {
      const response = await axios.get<PokemonData>(nextUrl, { signal });
      setPokemons(prev => {
        const newPokemons = response.data.results.filter(
          newP => !prev.some(existingP => existingP.name === newP.name)
        )
        return [...prev, ...newPokemons];
      });
      setNextUrl(response.data.next);
    } catch (e: any) {
      if (axios.isCancel(e)) {
        console.log('Request cancelled', e.message);
      } else {
        console.error("Failed to fetch data:", e);
      }
    } finally {
      setLoading(false);
      loadingAbortController.current = null;
    }
  }, [loading, nextUrl, isSearching]);


  // 검색 로직 및 초기 무한 스크롤 로딩을 통합 관리하는 useEffect
  useEffect(() => {
    // 이전 포켓몬 데이터를 미리 캐시
    fetchAllPokemons();

    // 이전 로딩 요청있을 시 취소
    if (loadingAbortController.current) {
      loadingAbortController.current.abort();
      loadingAbortController.current = null;  // 취소 후 null로 설정
    }

    const handleDataFetch = async () => {
      setLoading(true);
      setPokemons([]);

      if (debouncedSearchTerm) {
        // 검색어가 있는 경우: 캐시된 데이터 필터링
        setIsSearching(true);
        setNextUrl(null); // 검색 중에는 무한 스크롤 비활성화

        // allPokemonsCache가 비어있다면 한 번 더 시도 (초기 로드 실패 시)
        if (allPokemonsCache.current.length === 0) await fetchAllPokemons();

        const filtered = allPokemonsCache.current.filter(
          p => p.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
        setPokemons(filtered);
      } else {
        // 검색어가 없는 경우: 무한 스크롤 초기화 및 첫 페이지 로드
        setIsSearching(false);
        setNextUrl(INITIAL_URL);
      }
      setLoading(false);
    };

    handleDataFetch();

    return () => {
      if (loadingAbortController.current) loadingAbortController.current.abort();
    }
  }, [debouncedSearchTerm, fetchAllPokemons]);

  // nextUrl이 변경되거나 컴포넌트 초기 로드 시 첫 페이지 데이터를 로드하기 위한 useEffect
  useEffect(() => {
    // 검색 중이 아니며, nextUrl이 있고, 포켓몬 목록이 비어있을 때 (초기 로딩) 또는 nextUrl이 변경되었을 때
    // 그리고 아직 검색 상태가 아닐 때만 loadMorePokemons를 호출
    if (!isSearching && nextUrl && pokemons.length === 0 && !debouncedSearchTerm && !loading) {
      loadMorePokemons();
    }
    // nextUrl이 INITIAL_URL로 설정된 후 첫 페이지를 로드하기 위함
    // debouncedSearchTerm이 없지만, nextUrl이 INITIAL_URL로 재설정되었을 때도 loadMorePokemons를 호출합니다.
    if (!isSearching && nextUrl === INITIAL_URL && !debouncedSearchTerm && pokemons.length === 0 && !loading) {
      loadMorePokemons();
    }

  }, [nextUrl, isSearching, debouncedSearchTerm, loadMorePokemons, pokemons.length, loading]);

  const triggerRef = useCallback((node: HTMLDivElement | null) => {
    if (loading || isSearching) return; // 검색 중일 때도 무한 스크롤 트리거 비활성화
    if (observerRef.current) observerRef.current.disconnect();

    const handleObserver = (entires: IntersectionObserverEntry[]) => {
      if (entires[0].isIntersecting && nextUrl) loadMorePokemons();
    };

    observerRef.current = new IntersectionObserver(handleObserver);
    if (node) observerRef.current.observe(node);
  }, [loading, nextUrl, loadMorePokemons, isSearching]);

  return { pokemons, loading, hasNextPage: !!nextUrl && !isSearching, triggerRef };
};