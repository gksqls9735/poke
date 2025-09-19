import { useTranslation } from "react-i18next";
import type { ViewMode } from "@/type/common";

// 아이콘 SVG 정의
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>
);

const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

interface ControlBarProps {
  searchTerm: string;
  onSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const ControlBar = ({ searchTerm, onSearchTermChange, viewMode, onViewModeChange }: ControlBarProps) => {
  const { t } = useTranslation();

  const baseButtonStyle = "p-2 rounded-md transition-colors duration-200";
  const activeButtonStyle = "bg-pokedex-red text-white";
  const inactiveButtonStyle = "text-gray-400 hover:bg-gray-200";

  return (
    // 변경점: 검색창과 뷰 토글을 하나의 컨테이너로 통합
    <div className="flex items-center w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-2 border border-gray-200">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={onSearchTermChange}
          placeholder={t('search.placeholder')}
          // 변경점: input 자체의 스타일을 더 미니멀하게
          className="w-full p-3 pl-10 bg-transparent focus:outline-none text-gray-800 placeholder:text-gray-400"
        />
      </div>

      {/* 뷰 토글 버튼 */}
      <div className="flex items-center bg-gray-100 border-2 border-gray-200 rounded-lg p-1 ml-2">
        <button onClick={() => onViewModeChange('grid')} className={`${baseButtonStyle} ${viewMode === 'grid' ? activeButtonStyle : inactiveButtonStyle}`}>
          <GridIcon />
        </button>
        <button onClick={() => onViewModeChange('list')} className={`${baseButtonStyle} ${viewMode === 'list' ? activeButtonStyle : inactiveButtonStyle}`}>
          <ListIcon />
        </button>
      </div>
    </div>
  );
};

export default ControlBar;