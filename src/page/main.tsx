import PokeCard from "@/components/poke-card";
import SearchInput from "@/components/search-input";
import { useDebounce } from "@/hooks/use-debounce";
import { usePokemonData } from "@/hooks/use-pokemon-data";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { t } = useTranslation();

  const { pokemons, loading, hasNextPage, triggerRef } = usePokemonData(debouncedSearchTerm);

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">

      <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      <main>
        {loading && pokemons.length === 0 && (
          <p className="text-center font-semibold text-gray-600">
            {searchTerm ? `"${searchTerm}" ${t('common.searching')}` : t('list.initialLoading')}
          </p>
        )}
        {!loading && pokemons.length === 0 && (
          <p className="text-center font-semibold text-gray-600">
            {searchTerm ? t('search.noResultsFound', { term: searchTerm }) : t('list.initialLoading')}
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
            <p className="text-lg font-semibold">{t('list.loadingMore')}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default MainPage;