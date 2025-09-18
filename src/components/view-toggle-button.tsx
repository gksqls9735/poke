import type { ViewMode } from "@/type/common";

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

const ViewToggleButton = ({ viewMode, setViewMode }: {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}) => {
  const baseStyle = "p-2 rounded-md transition-colors duration-200";
  const activeStyle = "bg-blue-500 text-white";
  const inactiveStyle = "text-gray-400 hover:bg-gray-200";

  return (
    <div className="flex items-center bg-gray-100 border-2 border-gray-200 rounded-lg p-1">
      <button onClick={() => setViewMode('grid')} className={`${baseStyle} ${viewMode === 'grid' ? activeStyle : inactiveStyle}`}>
        <GridIcon />
      </button>
      <button onClick={() => setViewMode('list')} className={`${baseStyle} ${viewMode === 'list' ? activeStyle : inactiveStyle}`}>
        <ListIcon />
      </button>
    </div>
  );
};

export default ViewToggleButton;