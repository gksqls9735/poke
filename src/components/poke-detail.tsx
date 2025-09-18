import { motion } from 'framer-motion';
import { typeBadgeColorClasses, typeCardColorClasses } from "@/constants/color";
import type { PokemonDetail, PokemonTypeInfo } from "@/type/poke";
import { capitalizeFirstLetter } from "@/utils/text";
import { useContext, useState } from 'react';
import { DirectionContext } from '@/contexts/direction-context';
import { useTranslation } from 'react-i18next';

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

const RelationsSection = ({ title, types }: { title: string, types: PokemonTypeInfo[] }) => {
  if (types.length === 0) return null;

  return (
    <div className="flex items-start my-1">
      <h3 className="w-1/3 text-sm font-bold text-gray-600 pt-0.5">{title}</h3>
      <div className="w-2/3 flex flex-wrap gap-1">
        {types.map(({ name }) => (
          <span key={name} className={`px-2 py-0.5 text-white text-xs font-semibold rounded-md ${typeBadgeColorClasses[name]}`}>
            {capitalizeFirstLetter(name)}
          </span>
        ))}
      </div>
    </div>
  )
};

const TabButton = ({ title, isActive, onClick }: { title: string, isActive: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 font-semibold text-sm transition-colors duration-200 ${isActive ? `border-b-2 border-blue-500 text-blue-600` : `text-gray-500 hover:text-blue-600`}`}
  >
    {title}
  </button>
);

const PokeDetail = ({ imgUrl, pokemon, weaknesses, resistances, immunities, onPrevClick, onNextClick, hasPrev, hasNext }: {
  imgUrl: string,
  pokemon: PokemonDetail,
  weaknesses: PokemonTypeInfo[],
  resistances: PokemonTypeInfo[],
  immunities: PokemonTypeInfo[],
  onPrevClick: () => void,
  onNextClick: () => void,
  hasPrev: boolean,
  hasNext: boolean,
}) => {
  const { direction } = useContext(DirectionContext);
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'about' | 'stats' | 'relations'>('about');

  const primaryType = pokemon.types[0].type.name;
  const cardColor = typeCardColorClasses[primaryType] || "bg-gray-200";

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gray-100 p-4 sm:p-8 flex items-center justify-center">
      <div className="relative max-w-2xl mx-auto w-full">
        {hasPrev && <button onClick={onPrevClick} className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-16 z-10"><ArrowIcon direction="left" /></button>}
        {hasNext && <button onClick={onNextClick} className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-16 z-10"><ArrowIcon direction="right" /></button>}

        <motion.div
          key={pokemon.id}
          variants={slideVariants} custom={direction} initial="enter" animate="center" exit="exit"
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* 1. 상단 핵심 정보 섹션 */}
          <div className={`p-6 ${cardColor} relative`}>
            <span className="absolute top-4 right-6 text-2xl font-bold text-white opacity-50">#{pokemon.id.toString().padStart(3, '0')}</span>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img src={imgUrl} alt={pokemon.localizedName || pokemon.name} className="w-40 h-40 sm:w-48 sm:h-48 drop-shadow-lg" />
              <div className="text-center sm:text-left text-white">
                <h1 className="text-4xl font-extrabold drop-shadow-md">{capitalizeFirstLetter(pokemon.localizedName || pokemon.name)}</h1>
                <div className="flex justify-center sm:justify-start gap-2 my-3">
                  {pokemon.types.map(({ type }) => (
                    <span key={type.name} className={`px-3 py-1 bg-white/30 text-sm font-bold rounded-full backdrop-blur-sm`}>
                      {capitalizeFirstLetter(type.name)}
                    </span>
                  ))}
                </div>
                {pokemon.flavorText && <p className="text-sm leading-relaxed">{pokemon.flavorText.replace(/\f/g, ' ')}</p>}
              </div>
            </div>
          </div>

          {/* 2. 하단 탭 및 상세 정보 섹션 */}
          <div className="p-6">
            {/* 탭 버튼 */}
            <div className="flex border-b mb-4">
              <TabButton title={t('tabs.about')} isActive={activeTab === 'about'} onClick={() => setActiveTab('about')} />
              <TabButton title={t('tabs.baseStats')} isActive={activeTab === 'stats'} onClick={() => setActiveTab('stats')} />
              <TabButton title={t('tabs.damageRelations')} isActive={activeTab === 'relations'} onClick={() => setActiveTab('relations')} />
            </div>

            {/* 탭 콘텐츠 */}
            <div>
              {activeTab === 'about' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 className="text-lg font-bold mb-2">{t('tabs.about')}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm text-gray-500">{t('common.height')}</dt>
                      <dd className="font-semibold text-lg">{pokemon.height / 10} m</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">{t('common.weight')}</dt>
                      <dd className="font-semibold text-lg">{pokemon.weight / 10} kg</dd>
                    </div>
                  </div>
                </motion.div>
              )}
              {activeTab === 'stats' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 className="text-lg font-bold mb-2">{t('tabs.baseStats')}</h3>
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
                </motion.div>
              )}
              {activeTab === 'relations' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 className="text-lg font-bold mb-2">{t('tabs.damageRelations')}</h3>
                  <div className="flex flex-col gap-y-2">
                    <RelationsSection title={t('common.weaknesses')} types={weaknesses} />
                    <RelationsSection title={t('common.resistances')} types={resistances} />
                    <RelationsSection title={t('common.immunities')} types={immunities} />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PokeDetail;