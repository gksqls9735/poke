import PokeCard from "./components/poke-card";
import { usePokemonData } from "./hooks/use-pokemon-data";

export default function App() {
  const { pokemons, loading, hasNextPage, triggerRef } = usePokemonData();

  if (!pokemons.length && loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-2xl font-semibold">데이터를 불러오는 중...</h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-600">
          포켓몬 도감
        </h1>
      </header>
      <main>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {pokemons.map((pokemon) => (
            <PokeCard
              key={pokemon.name}
              name={pokemon.name}
              url={pokemon.url}
            />
          ))}
        </div>

        <div ref={triggerRef} className="h-10" />

        {loading && hasNextPage && (
          <div className="flex justify-center mt-4">
            <p className="text-lg font-semibold">더 많은 포켓몬을 불러오는 중...</p>
          </div>
        )}
      </main>
    </div>
  );
}