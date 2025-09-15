import { motion } from 'framer-motion';
import { typeBadgeColorClasses } from "@/constants/color";
import type { PokemonDetail } from "@/type/poke";
import { capitalizeFirstLetter } from "@/utils/text";
import { useContext } from 'react';
import { DirectionContext } from '@/contexts/direction-context';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300, // next(1)면 오른쪽, prev(-1)면 왼쪽에서 시작
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300, // next(1)면 왼쪽으로, prev(-1)면 오른쪽으로 퇴장
    opacity: 0
  })
};


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


const PokeDetail = ({ imgUrl, pokemon, onPrevClick, onNextClick, hasPrev, hasNext }: {
  imgUrl: string,
  pokemon: PokemonDetail,
  onPrevClick: () => void,
  onNextClick: () => void,
  hasPrev: boolean,
  hasNext: boolean,
}) => {
  const { direction } = useContext(DirectionContext);

  return (
    <div className="min-h-[calc(100vh-68px)] bg-gray-100 p-4 sm:p-8 flex items-center justify-center">

      <div className="relative max-w-4xl mx-auto w-full">

        {hasPrev && (
          <button
            onClick={onPrevClick}
            className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-12 p-2 rounded-full bg-white shadow-lg hover:bg-gray-200 transition text-gray-700 z-10"
            aria-label="Previous Pokémon"
          >
            <ArrowIcon direction="left" />
          </button>
        )}

        {hasNext && (
          <button
            onClick={onNextClick}
            className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-12 p-2 rounded-full bg-white shadow-lg hover:bg-gray-200 transition text-gray-700 z-10"
            aria-label="Next Pokémon"
          >
            <ArrowIcon direction="right" />
          </button>
        )}
        <motion.div
          key={pokemon.id}
          variants={slideVariants} // 정의한 variants 객체를 연결
          custom={direction}       // variants 함수에 전달할 custom 데이터
          initial="enter"          // 초기 상태는 'enter' variant
          animate="center"         // 애니메이션 완료 상태는 'center' variant
          exit="exit"              // 퇴장 상태는 'exit' variant
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`p-4 rounded-lg flex items-center justify-center bg-${pokemon.types[0].type.name}-light`}>
              <img src={imgUrl} alt={pokemon.name} className="w-full max-w-sm" />
            </div>

            <div>
              <span className="text-2xl font-bold text-gray-500">#{pokemon.id.toString().padStart(3, '0')}</span>
              <h1 className="text-5xl font-extrabold my-2">{capitalizeFirstLetter(pokemon.name)}</h1>

              <div className="flex gap-2 my-4">
                {pokemon.types.map(({ type }) => (
                  <span key={type.name} className={`px-4 py-1 text-white text-sm font-bold rounded-full ${typeBadgeColorClasses[type.name]}`}>
                    {capitalizeFirstLetter(type.name)}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 my-6 text-center">
                <div>
                  <h3 className="font-bold text-lg">Height</h3>
                  <p>{pokemon.height / 10} m</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Weight</h3>
                  <p>{pokemon.weight / 10} kg</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2">Base Stats</h2>
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="flex items-center my-2">
                    <span className="w-1/3 text-gray-600 font-medium">{capitalizeFirstLetter(stat.stat.name.replace('-', ' '))}</span>
                    <span className="w-1/12 font-bold">{stat.base_stat}</span>
                    <div className="w-7/12 bg-gray-200 rounded-full h-4">
                      <div
                        className={`bg-${pokemon.types[0].type.name} h-4 rounded-full`}
                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default PokeDetail;