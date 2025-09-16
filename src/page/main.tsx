import PokeCard from "@/components/poke-card";
import SearchInput from "@/components/search-input";
import { useDebounce } from "@/hooks/use-debounce";
import { usePokemonData } from "@/hooks/use-pokemon-data";
import { useState } from "react";

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { pokemons, loading, hasNextPage, triggerRef } = usePokemonData(debouncedSearchTerm);

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">

      <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      <main>
        {loading && pokemons.length === 0 && (
          <p className="text-center font-semibold text-gray-600">
            {searchTerm ? `"${searchTerm}" 검색 중...` : "데이터를 불러오는 중..."}
          </p>
        )}
        {!loading && pokemons.length === 0 && (
          <p className="text-center font-semibold text-gray-600">
            {searchTerm ? `"${searchTerm}"에 대한 검색 결과가 없습니다.` : "포켓몬을 찾을 수 없습니다."}
          </p>
        )}
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {pokemons.map((pokemon) => (
            <PokeCard
              key={pokemon.name}
              name={pokemon.name}
              url={pokemon.url}
            />
          ))}
        </div>

        <div ref={hasNextPage ? triggerRef : null} className="h-10" />

        {loading && hasNextPage && (
          <div className="flex justify-center mt-4">
            <p className="text-lg font-semibold">더 많은 포켓몬을 불러오는 중...</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default MainPage;