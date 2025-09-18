import { Link } from "react-router-dom";
import type { Pokemon } from "@/type/poke";
import { capitalizeFirstLetter } from "@/utils/text";
import { typeBadgeColorClasses } from "@/constants/color";
import { usePokemonDetail } from "@/hooks/use-pokemon-detail";
import { useTypeTranslations } from "@/hooks/use-type-translations";

const PokeRowSkeleton = () => (
  <div className="grid grid-cols-[80px_80px_1fr_1fr] items-center gap-4 p-4 animate-pulse">
    <div className="h-6 bg-gray-200 rounded"></div>
    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto"></div>
    <div className="h-6 bg-gray-200 rounded"></div>
    <div className="flex gap-2">
      <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
      <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
    </div>
  </div>
);

const PokeRow = ({ url }: Pokemon) => {
  const { pokemon, loading } = usePokemonDetail(url);
  const { getTranslatedTypeName } = useTypeTranslations();

  if (loading || !pokemon) return <PokeRowSkeleton />;

  const pokemonId = pokemon.id.toString().padStart(3, '0');

  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      className="grid grid-cols-[80px_80px_1fr_1fr] items-center gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
    >
      <span className="font-bold text-gray-500 text-center">#{pokemonId}</span>
      
      <img
        src={pokemon.sprites.front_default || '/pokemon-main-basic.png'}
        alt={pokemon.localizedName || pokemon.name}
        className="w-16 h-16 mx-auto"
      />

      <h2 className="font-bold text-lg text-gray-800">
        {capitalizeFirstLetter(pokemon.localizedName || pokemon.name)}
      </h2>

      <div className="flex flex-wrap gap-2">
        {pokemon.types.map(({ type }) => (
          <span
            key={type.name}
            className={`px-3 py-1 text-xs text-white font-bold rounded-full ${typeBadgeColorClasses[type.name]}`}
          >
            {capitalizeFirstLetter(getTranslatedTypeName(type.name))}
          </span>
        ))}
      </div>
    </Link>
  );
};

export default PokeRow;