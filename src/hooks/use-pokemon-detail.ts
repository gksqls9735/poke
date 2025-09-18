import type { PokemonDetail, PokemonSpecies } from "@/type/poke";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


export const usePokemonDetail = (url: string | undefined) => {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const id = url.split('/').filter(Boolean).pop();
        const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

        const [pokemonResponse, speciesResponse] = await Promise.all([
          axios.get<PokemonDetail>(url), axios.get<PokemonSpecies>(speciesUrl),
        ]);

        const pokemonData = pokemonResponse.data;
        const speciesData = speciesResponse.data;

        const localizedName = speciesData.names.find(
          name => name.language.name === i18n.language
        )?.name;

        const flavorText = speciesData.flavor_text_entries
          .filter(entry => entry.language.name === i18n.language)
          .pop()?.flavor_text;

        setPokemon({
          ...pokemonData,
          localizedName: localizedName || pokemonData.name,
          flavorText: flavorText,
        });
      } catch (e) {
        console.error("Failed to fetch pokemon detail:", e);
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, i18n.language]);

  return { pokemon, loading };
};