import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import type { PokemonSpecies } from '@/type/poke';

// 진화 API 응답의 재귀적 구조
interface EvolutionChainLink {
  species: { name: string; url: string; };
  evolves_to: EvolutionChainLink[];
}
export interface EvolutionStage {
  id: string;
  name: string;
  imgUrl: string;
}

// ✅ 올바른 타입 정의
let evolutionCache: { [url: string]: (Omit<EvolutionStage, 'name'> & { names: { [langCode: string]: string } })[] } = {};

export const useEvolutionChain = (speciesUrl: string | undefined) => {
  const { i18n } = useTranslation();
  const [evolutionChain, setEvolutionChain] = useState<EvolutionStage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!speciesUrl) return;

    const fetchChain = async () => {
      setLoading(true);
      try {
        const speciesRes = await axios.get<PokemonSpecies>(speciesUrl);
        const chainUrl = speciesRes.data.evolution_chain.url;

        if (evolutionCache[chainUrl]) {
          const cachedChain = evolutionCache[chainUrl];
          const localizedChain = cachedChain.map(stage => ({
            id: stage.id,
            imgUrl: stage.imgUrl,
            name: stage.names[i18n.language] || stage.names['en'],
          }));
          setEvolutionChain(localizedChain);
          setLoading(false);
          return;
        }

        const evolutionRes = await axios.get(chainUrl);
        const chainData = evolutionRes.data.chain;

        const stages: { name: string, url: string }[] = [];
        let currentLink: EvolutionChainLink | undefined = chainData;
        while (currentLink) {
          stages.push({ name: currentLink.species.name, url: currentLink.species.url });
          currentLink = currentLink.evolves_to[0];
        }

        const stageDetailsPromises = stages.map(async (stage) => {
          const id = stage.url.split('/').filter(Boolean).pop()!;
          const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
          const speciesDetailUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

          const [pokemonRes, speciesRes] = await Promise.all([
            axios.get(pokemonUrl),
            axios.get<PokemonSpecies>(speciesDetailUrl),
          ]);

          const imgUrl = pokemonRes.data.sprites.other?.['official-artwork']?.front_default || pokemonRes.data.sprites.front_default;
          const names: { [langCode: string]: string } = {};
          speciesRes.data.names.forEach(n => { names[n.language.name] = n.name });

          return { id, imgUrl: imgUrl || '/pokemon-main-basic.png', names };
        });

        const detailedStages = await Promise.all(stageDetailsPromises);
        evolutionCache[chainUrl] = detailedStages;

        const localizedChain = detailedStages.map(stage => ({
          id: stage.id,
          imgUrl: stage.imgUrl,
          name: stage.names[i18n.language] || stage.names['en'],
        }));
        setEvolutionChain(localizedChain);

      } catch (error) {
        console.error("Failed to fetch evolution chain:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChain();
  }, [speciesUrl, i18n.language]);

  return { evolutionChain, loading };
};