import ControlBar from "@/components/control-bar";
import EmptyState from "@/components/empty-state";
import PokeCard from "@/components/poke-card";
import PokeRow from "@/components/poke-row";
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

  const renderContent = () => {
    const isInitialLoad = loading && pokemons.length === 0;
    const noResults = !loading && pokemons.length === 0;

    // 초기 로딩 상태
    if (isInitialLoad) return <EmptyState title={t('list.initialLoading')} msg={t('list.initialLoadingMessage')} />;

    // 검색 결과가 없는 상태
    if (noResults) return <EmptyState title={t('search.noResultsFoundTitle')} msg={t('search.noResultsFound', { term: searchTerm })} />;

    if (viewMode === 'grid') {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {pokemons.map((pokemon) => (
            <PokeCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
          ))}
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-[80px_80px_1fr_1fr] items-center gap-4 p-4 bg-gray-50 border-b-2 border-gray-200">
          <h3 className="font-bold text-gray-600 text-sm text-center">{t('header.id')}</h3>
          <h3 className="font-bold text-gray-600 text-sm text-center">{t('header.sprite')}</h3>
          <h3 className="font-bold text-gray-600 text-sm">{t('header.name')}</h3>
          <h3 className="font-bold text-gray-600 text-sm">{t('header.type')}</h3>
        </div>
        {pokemons.map((pokemon) => (
          <PokeRow key={pokemon.name} name={pokemon.name} url={pokemon.url} />
        ))}
      </div>
    )
  };

  return (
    <div className="container mx-auto px-4 py-8">

      <header className="text-center mb-8">
        <h1 className="text-5xl sm:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900 mb-3">
          Explore the Pokédex
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{t('list.subtitle')}</p>
      </header>

      <div className="mb-8">
        <ControlBar
          searchTerm={searchTerm}
          onSearchTermChange={(e) => setSearchTerm(e.target.value)}
          viewMode={viewMode}
          onViewModeChange={handleSetViewMode}
        />
      </div>

      <main>
        {renderContent()}
        <div ref={hasNextPage ? triggerRef : null} className="h-10" />
      </main>
    </div>
  );
};

export default MainPage;