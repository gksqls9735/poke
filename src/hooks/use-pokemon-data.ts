import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import type { Pokemon, PokemonData } from "@/type/poke";
import { useTranslation } from "react-i18next";
import { usePokemonNames } from "./use-pokemon-names";

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

  const { i18n } = useTranslation();
  const { getLocalizedName, isLoading: areNamesLoading } = usePokemonNames();

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

    // 새로운 AbortController 생성
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
      loadingAbortController.current = null;  // loadMorePokemons가 완료되면 AbortController를 null로 재설정
    }
  }, [loading, nextUrl, isSearching]);


  // 검색 로직 및 초기 무한 스크롤 로딩을 통합 관리하는 useEffect
  useEffect(() => {
    // 이전 포켓몬 데이터를 미리 캐시
    fetchAllPokemons();

    // 이름 데이터 로딩 중이면 잠시 대기
    if (areNamesLoading) {
      console.log("Waiting for names to load...");
      setLoading(true);
      return;
    }

    // 이전 로딩 요청있을 시 취소
    if (loadingAbortController.current) {
      loadingAbortController.current.abort();
      loadingAbortController.current = null;  // 취소 후 null로 설정
    }

    // 이 useEffect의 요청을 위한 새로운 AbortController 생성
    const controller = new AbortController();
    loadingAbortController.current = controller;  // 현재 요청의 AbortController로 등록

    const handleDataFetch = async () => {
      setLoading(true);
      setPokemons([]);

      if (debouncedSearchTerm) {

        // 검색어가 있는 경우: 캐시된 데이터 필터링
        setIsSearching(true);
        setNextUrl(null); // 검색 중에는 무한 스크롤 비활성화

        // allPokemonsCache가 비어있다면 한 번 더 시도 (초기 로드 실패 시)
        if (allPokemonsCache.current.length === 0) await fetchAllPokemons();

        const filtered = allPokemonsCache.current.filter(p => {
          const engName = p.name.toLowerCase();
          const localized = getLocalizedName(p.name, i18n.language).toLowerCase();
          const searchTerm = debouncedSearchTerm.toLowerCase();

          return engName.includes(searchTerm) || localized.includes(searchTerm);
        });
        setPokemons(filtered);
        setLoading(false);
      } else {
        // 검색어가 없는 경우: 무한 스크롤 초기화 및 첫 페이지 로드
        setIsSearching(false);

        // 검색어가 없을 시 INITIAL_URL에서 직접 데이터를 가져옴
        try {
          const response = await axios.get<PokemonData>(INITIAL_URL, {signal: controller.signal});
          setPokemons(response.data.results);
          setNextUrl(response.data.next);
        } catch (e) {
          if (!axios.isCancel(e)) console.error("Failed to fetch initial data:",e);
        } finally {
          setLoading(false);
        }
      }
    };

    handleDataFetch();

    return () => {
      controller.abort(); // 현재 useEffect에서 시작된 요청 취소
      loadingAbortController.current = null;  // AbortController를 null로 재설정
    }
  }, [debouncedSearchTerm, fetchAllPokemons, getLocalizedName, i18n.language, areNamesLoading]);

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