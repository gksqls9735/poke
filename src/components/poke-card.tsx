import type { Pokemon } from "@/type/poke";
import { typeBadgeColorClasses, typeCardColorClasses } from "@/constants/color";
import { capitalizeFirstLetter } from "@/utils/text";
import { usePokemonDetail } from "@/hooks/use-pokemon-datail";

const PokeCard = ({ name, url }: Pokemon) => {
  const { pokemon, loading } = usePokemonDetail(url);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
        <div className="h-24 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4 mt-4"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4 mt-2"></div>
      </div>
    );
  }

  if (!pokemon) {
    return null;
  }

  const primaryType = pokemon.types[0].type.name;
  const cardColor = typeCardColorClasses[primaryType] || "bg-gray-100 border-gray-300";

  return (
    <div
      className={`rounded-lg shadow-md p-4 flex flex-col items-center justify-between transition-transform transform hover:-translate-y-1 hover:shadow-xl border-4 ${cardColor}`}
    >
      <div>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-24 h-24"
        />
        <span className="text-sm font-bold text-gray-500">#{pokemon.id}</span>
        <h2 className="text-lg font-semibold mt-1 text-gray-800">
          {capitalizeFirstLetter(pokemon.name)}
        </h2>
      </div>

      <div className="flex gap-1 mt-2">
        {pokemon.types.map(({ type }) => (
          <span
            key={type.name}
            className={`px-3 py-1 text-xs text-white font-bold rounded-full ${typeBadgeColorClasses[type.name]}`}
          >
            {capitalizeFirstLetter(type.name)}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokeCard;