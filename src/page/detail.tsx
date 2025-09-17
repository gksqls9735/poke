import PokeDetail from "@/components/poke-detail";
import { DirectionContext } from "@/contexts/direction-context";
import { useDmgRelations } from "@/hooks/use-dmg-relations";
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
  const { pokemon, loading } = usePokemonDetail(pokemonUrl);
  const { weaknesses, resistances, immunities } = useDmgRelations(pokemon?.types);

  if (loading) return <div className="text-center p-10">{t('common.loading')}</div>;
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
    />
  );
};

export default DetailPage;