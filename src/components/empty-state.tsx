const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const EmptyState = ({ title, msg }: {
  title: string;
  msg: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <SearchIcon />
      <h2 className="mt-4 text-xl font-bold text-gray-800">{title}</h2>
      <p className="mt-2 text-gray-500">{msg}</p>
    </div>
  );
};

export default EmptyState;