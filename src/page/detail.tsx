import PokeDetail from "@/components/poke-datail";
import { usePokemonDetail } from "@/hooks/use-pokemon-datail";
import { useNavigate, useParams } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;

  const { pokemon, loading } = usePokemonDetail(pokemonUrl);

  if (loading) return <div className="text-center p-10">로딩 중...</div>;
  if (!pokemon) return <div className="text-center p-10">해당 포켓몬을 찾을 수 없습니다.</div>;

  const imgUrl =
    pokemon.sprites.other?.['official-artwork']?.front_default ||
    pokemon.sprites.front_default ||
    '/pokemon-detail-basic.png';

  return (
    <PokeDetail imgUrl={imgUrl} pokemon={pokemon}/>
  );
};

export default DetailPage;