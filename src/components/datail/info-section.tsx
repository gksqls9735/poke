import type { PokemonDetail } from "@/type/poke";
import { capitalizeFirstLetter } from "@/utils/text";

const InfoSection = ({ cardColor, imgUrl, pokemon, getTypeName }: {
  cardColor: string;
  imgUrl: string;
  pokemon: PokemonDetail;
  getTypeName: (engName: string) => string;
}) => {
  return (
    <div className={`p-6 ${cardColor} relative`}>
      <span className="absolute top-4 right-6 text-2xl font-bold text-white opacity-50">#{pokemon.id.toString().padStart(3, '0')}</span>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <img src={imgUrl} alt={pokemon.localizedName || pokemon.name} className="w-40 h-40 sm:w-48 sm:h-48 drop-shadow-lg" />
        <div className="text-center sm:text-left text-white">
          <h1 className="text-4xl font-extrabold drop-shadow-md">{capitalizeFirstLetter(pokemon.localizedName || pokemon.name)}</h1>
          <div className="flex justify-center sm:justify-start gap-2 my-3">
            {pokemon.types.map(({ type }) => (
              <span key={type.name} className={`px-3 py-1 bg-white/30 text-sm font-bold rounded-full backdrop-blur-sm`}>
                {capitalizeFirstLetter(getTypeName(type.name))}
              </span>
            ))}
          </div>
          {pokemon.flavorText && <p className="text-sm leading-relaxed">{pokemon.flavorText.replace(/\f/g, ' ')}</p>}
        </div>
      </div>
    </div>
  );
};

export default InfoSection;