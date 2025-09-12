import type { PokemonDetail } from "@/type/poke";
import axios from "axios";
import { useEffect, useState } from "react";


export const usePokemonDetail = (url: string | undefined) => {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<PokemonDetail>(url);
        setPokemon(response.data);
      } catch (e) {
        console.error("Failed to fetch pokemon detail:", e);
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { pokemon, loading };
};