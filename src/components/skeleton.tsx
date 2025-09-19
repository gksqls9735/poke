export const PokeCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
    <div className="h-24 bg-gray-300 rounded w-full"></div>
    <div className="h-4 bg-gray-300 rounded w-1/4 mt-4"></div>
    <div className="h-6 bg-gray-300 rounded w-3/4 mt-2"></div>
  </div>
);

export const PokeRowSkeleton = () => (
  <div className="grid grid-cols-[80px_80px_1fr_1fr] items-center gap-4 p-4 animate-pulse">
    <div className="h-6 bg-gray-200 rounded"></div>
    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto"></div>
    <div className="h-6 bg-gray-200 rounded"></div>
    <div className="flex gap-2">
      <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
      <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
    </div>
  </div>
);

const ArrowIcon = ({ direction = 'left' }: { direction?: 'left' | 'right' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className={`w-8 h-8 ${direction === 'right' ? 'transform rotate-180' : ''}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);



export const PokeDetailSkeleton = () => {
  return (
    <div className="min-h-[calc(100vh-72px)] bg-white p-4 sm:p-8 flex items-center justify-center">
      <div className="relative max-w-2xl mx-auto w-full">
        {/* 스켈레톤 상태에서는 화살표를 흐리게 표시 */}
        <button className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-16 z-10 cursor-default">
          <ArrowIcon direction="left" />
        </button>
        <button className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-16 z-10 cursor-default">
          <ArrowIcon direction="right" />
        </button>

        {/* animate-pulse 클래스로 깜빡이는 효과 추가 */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-pulse">
          {/* 1. 상단 정보 섹션 스켈레톤 */}
          <div className="p-6 bg-gray-200">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-40 h-40 sm:w-48 sm:h-48 bg-gray-300 rounded-full"></div>
              <div className="flex-1 space-y-4">
                <div className="w-3/4 h-8 bg-gray-300 rounded"></div>
                <div className="flex gap-2">
                  <div className="w-16 h-6 bg-gray-300 rounded-full"></div>
                  <div className="w-16 h-6 bg-gray-300 rounded-full"></div>
                </div>
                <div className="w-full h-4 bg-gray-300 rounded"></div>
                <div className="w-5/6 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>

          {/* 2. 하단 탭 섹션 스켈레톤 */}
          <div className="p-6">
            {/* 탭 버튼 스켈레톤 */}
            <div className="flex border-b mb-4">
              <div className="px-4 py-2 w-20 h-8 bg-gray-200 rounded-t-md"></div>
              <div className="px-4 py-2 w-20 h-8 bg-gray-200 rounded-t-md ml-2"></div>
              <div className="px-4 py-2 w-20 h-8 bg-gray-200 rounded-t-md ml-2"></div>
              <div className="px-4 py-2 w-20 h-8 bg-gray-200 rounded-t-md ml-2"></div>
            </div>

            {/* 탭 콘텐츠 스켈레톤 */}
            <div className="space-y-3">
              <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};