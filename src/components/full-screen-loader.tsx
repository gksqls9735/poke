// 간단한 포켓볼 모양의 스피너 아이콘
const PokeballSpinner = () => (
  <div className="relative w-16 h-16 animate-spin">
    <div className="w-full h-full border-4 border-black rounded-full"></div>
    <div className="absolute top-1/2 left-1/2 w-4 h-4 -mt-2 -ml-2 bg-black rounded-full"></div>
    <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500 rounded-t-full"></div>
  </div>
);

const FullScreenLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <PokeballSpinner />
    </div>
  );
};

export default FullScreenLoader;