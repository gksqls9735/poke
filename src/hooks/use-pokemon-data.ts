import type { Pokemon, PokemonData, } from "@/type/poke";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

const INITIAL_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0';

export const usePokemonData = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(INITIAL_URL);
  const [loading, setLoading] = useState<boolean>(false);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const fetchData = useCallback(async () => {
    if (loading || !nextUrl) return;

    setLoading(true);
    try {
      const response = await axios.get<PokemonData>(nextUrl);
      setPokemons((prev) => [...prev, ...response.data.results]);
      setNextUrl(response.data.next);
    } catch (e) {
      console.error("Failed to fetch data:", e);
    } finally {
      setLoading(false);
    }
  }, [loading, nextUrl]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting && nextUrl && !loading) {
      fetchData();
    }
  }, [fetchData, nextUrl, loading]);


  const triggerRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(handleObserver);
    if (node) observerRef.current.observe(node);
  }, [handleObserver]);

  return { pokemons, loading, hasNextPage: nextUrl !== null, triggerRef };
};