import PokeDetail from "@/components/datail/poke-detail";
import { PokeDetailSkeleton } from "@/components/skeleton";
import { DirectionContext } from "@/contexts/direction-context";
import { useDmgRelations } from "@/hooks/use-dmg-relations";
import { useEvolutionChain } from "@/hooks/use-evolution-chain";
import { usePokemonDetail } from "@/hooks/use-pokemon-detail";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const MAX_POKEMON_ID = 1025;

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const { setDirection } = useContext(DirectionContext);
  const { t } = useTranslation();

  const currentId = parseInt(id ?? '1', 10);

  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${currentId}`;
  const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${currentId}`;

  const { pokemon, loading: pokemonLoading } = usePokemonDetail(pokemonUrl);
  const { weaknesses, resistances, immunities } = useDmgRelations(pokemon?.types);
  const { evolutionChain, loading: evolutionLoading } = useEvolutionChain(speciesUrl);

  const isLoading = pokemonLoading || evolutionLoading;

  // 로딩 중일 때 스켈레톤 UI를 보여줌
  if (isLoading) return <PokeDetailSkeleton />;

  if (!pokemon) return <div className="text-center p-10">{t('common.notFound')}</div>;


  const imgUrl =
    pokemon.sprites.other?.['official-artwork']?.front_default ||
    pokemon.sprites.front_default ||
    '/pokemon-detail-basic.png';

  const goToPokemon = (newId: number, dir: 'next' | 'prev') => {
    if (newId > 0 && newId <= MAX_POKEMON_ID) {
      setDirection(dir === 'next' ? 1 : -1);
      nav(`/pokemon/${newId}`);
    }
  };

  return (
    <PokeDetail
      imgUrl={imgUrl}
      pokemon={pokemon}
      weaknesses={weaknesses}
      resistances={resistances}
      immunities={immunities}
      onPrevClick={() => goToPokemon(currentId - 1, 'prev')}
      onNextClick={() => goToPokemon(currentId + 1, 'next')}
      hasPrev={currentId > 1}
      hasNext={currentId < MAX_POKEMON_ID}
      evolutionChain={evolutionChain}
    />
  );
};

export default DetailPage;