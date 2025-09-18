import PokeCard from "@/components/poke-card";
import PokeRow from "@/components/poke-row";
import SearchInput from "@/components/search-input";
import ViewToggleButton from "@/components/view-toggle-button";
import { useDebounce } from "@/hooks/use-debounce";
import { usePokemonData } from "@/hooks/use-pokemon-data";
import type { ViewMode } from "@/type/common";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const MainPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(
    () => (localStorage.getItem('viewMode') as ViewMode) || 'grid'
  );
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { t } = useTranslation();
  const { pokemons, loading, hasNextPage, triggerRef } = usePokemonData(debouncedSearchTerm);

  const handleSetViewMode = (mode: ViewMode) => {
    localStorage.setItem('viewMode', mode);
    setViewMode(mode);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">

        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-2">Pokédex</h1>
          <p className="text-gray-600">{t('list.subtitle')}</p>
        </header>

        <div className="grid grid-cols-[1fr_minmax(0,1fr)_1fr] items-center gap-4 mb-8">
          <div></div>
          <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <div className="flex justify-end">
            <ViewToggleButton viewMode={viewMode} setViewMode={handleSetViewMode} />
          </div>

        </div>

        <main className="mt-8">
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

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {pokemons.map((pokemon) => (
                <PokeCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="grid grid-cols-[80px_80px_1fr_1fr] items-center gap-4 p-4 bg-gray-50 border-b-2 border-gray-200">
                <h3 className="font-bold text-gray-600 text-sm text-center">ID</h3>
                <h3 className="font-bold text-gray-600 text-sm text-center">Sprite</h3>
                <h3 className="font-bold text-gray-600 text-sm">Name</h3>
                <h3 className="font-bold text-gray-600 text-sm">Type</h3>
              </div>
              {pokemons.map((pokemon) => (
                <PokeRow key={pokemon.name} name={pokemon.name} url={pokemon.url} />
              ))}
            </div>
          )}

          <div ref={hasNextPage ? triggerRef : null} className="h-10" />

          {loading && hasNextPage && (
            <div className="flex justify-center mt-4">
              <p className="text-lg font-semibold">{t('list.loadingMore')}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default MainPage;