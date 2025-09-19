import type { Pokemon } from "@/type/poke";
import { typeBadgeColorClasses, typeCardColorClasses } from "@/constants/color";
import { capitalizeFirstLetter } from "@/utils/text";
import { usePokemonDetail } from "@/hooks/use-pokemon-detail";
import { Link } from "react-router-dom";
import { useTypeTranslations } from "@/hooks/use-type-translations";
import { PokeCardSkeleton } from "./skeleton";

const PokeCard = ({ name, url }: Pokemon) => {
  const { pokemon, loading: isDetailLoading } = usePokemonDetail(url);
  const { getTranslatedTypeName, isLoading: areTypesLoading } = useTypeTranslations();
  const pokemonId = url.split('/').filter(Boolean).pop();

  const isCardLoading = isDetailLoading || areTypesLoading;

  if (isCardLoading) {
    return (
      <PokeCardSkeleton />
    );
  }

  if (!pokemon) {
    return null;
  }

  const primaryType = pokemon.types[0].type.name;
  const cardColor = typeCardColorClasses[primaryType] || "bg-gray-100 border-gray-300";

  return (
    <Link to={`/pokemon/${pokemonId}`}>
      <div
        className={`relative rounded-lg shadow-md p-4 flex flex-col items-center justify-between transition-transform transform hover:-translate-y-1 hover:shadow-xl border-4 ${cardColor}`}
      >
        <span className="absolute top-2 right-4 text-sm font-bold text-gray-500/80">
          #{pokemon.id.toString().padStart(3, '0')}
        </span>

        <div className="flex flex-col items-center">
          <img
            src={pokemon.sprites.front_default || '/pokemon-main-basic.png'}
            alt={pokemon.localizedName || pokemon.name}
            className="w-24 h-24"
          />
          <h2 className="text-lg font-semibold mt-1 text-gray-800">
            {capitalizeFirstLetter(pokemon.localizedName || pokemon.name)}
          </h2>
        </div>

        <div className="flex gap-1 mt-2">
          {pokemon.types.map(({ type }) => (
            <span
              key={type.name}
              className={`px-3 py-1 text-xs text-white font-bold rounded-full ${typeBadgeColorClasses[type.name]}`}
            >
              {capitalizeFirstLetter(getTranslatedTypeName(type.name))}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PokeCard;