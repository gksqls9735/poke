import { typeBadgeColorClasses } from "@/constants/color";
import type { PokemonDetail } from "@/type/poke";
import { capitalizeFirstLetter } from "@/utils/text";
import { useNavigate } from "react-router-dom";

const PokeDetail = ({ imgUrl, pokemon }: { imgUrl: string, pokemon: PokemonDetail }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        뒤로가기
      </button>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className={`p-4 rounded-lg flex items-center justify-center bg-${pokemon.types[0].type.name}-light`}>
            <img src={imgUrl} alt={pokemon.name} className="w-full max-w-sm" />
          </div>

          <div>
            <span className="text-2xl font-bold text-gray-500">#{pokemon.id.toString().padStart(3, '0')}</span>
            <h1 className="text-5xl font-extrabold my-2">{capitalizeFirstLetter(pokemon.name)}</h1>

            <div className="flex gap-2 my-4">
              {pokemon.types.map(({ type }) => (
                <span key={type.name} className={`px-4 py-1 text-white text-sm font-bold rounded-full ${typeBadgeColorClasses[type.name]}`}>
                  {capitalizeFirstLetter(type.name)}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 my-6 text-center">
              <div>
                <h3 className="font-bold text-lg">Height</h3>
                <p>{pokemon.height / 10} m</p>
              </div>
              <div>
                <h3 className="font-bold text-lg">Weight</h3>
                <p>{pokemon.weight / 10} kg</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">Base Stats</h2>
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="flex items-center my-2">
                  <span className="w-1/3 text-gray-600 font-medium">{capitalizeFirstLetter(stat.stat.name.replace('-', ' '))}</span>
                  <span className="w-1/12 font-bold">{stat.base_stat}</span>
                  <div className="w-7/12 bg-gray-200 rounded-full h-4">
                    <div
                      className={`bg-${pokemon.types[0].type.name} h-4 rounded-full`}
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokeDetail;