import { motion } from 'framer-motion';
import { typeCardColorClasses } from "@/constants/color";
import type { PokemonDetail, PokemonTypeInfo } from "@/type/poke";
import { useContext, useState } from 'react';
import { DirectionContext } from '@/contexts/direction-context';
import { useTranslation } from 'react-i18next';
import { useTypeTranslations } from '@/hooks/use-type-translations';
import type { EvolutionStage } from '@/hooks/use-evolution-chain';
import EvolutionTab from './tab/evolution-tab';
import AboutTab from './tab/about-tab';
import StatsTab from './tab/stats-tab';
import RelationsTab from './tab/relations-tab';
import InfoSection from './info-section';

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

const TabButton = ({ title, isActive, onClick }: { title: string, isActive: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 font-semibold text-sm transition-colors duration-200 ${isActive ? `border-b-2 border-blue-500 text-blue-600` : `text-gray-500 hover:text-blue-600`}`}
  >
    {title}
  </button>
);

const PokeDetail = ({ imgUrl, pokemon, weaknesses, resistances, immunities, onPrevClick, onNextClick, hasPrev, hasNext, evolutionChain }: {
  imgUrl: string,
  pokemon: PokemonDetail,
  weaknesses: PokemonTypeInfo[],
  resistances: PokemonTypeInfo[],
  immunities: PokemonTypeInfo[],
  onPrevClick: () => void,
  onNextClick: () => void,
  hasPrev: boolean,
  hasNext: boolean,
  evolutionChain: EvolutionStage[],
}) => {
  const { direction } = useContext(DirectionContext);
  const { t } = useTranslation();
  const { getTranslatedTypeName } = useTypeTranslations();
  const [activeTab, setActiveTab] = useState<'about' | 'stats' | 'relations' | 'evolution'>('about');

  const primaryType = pokemon.types[0].type.name;
  const cardColor = typeCardColorClasses[primaryType] || "bg-gray-200";

  return (
    <div className="min-h-[calc(100vh-72px)] bg-white p-4 sm:p-8 flex items-center justify-center">
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
          <InfoSection cardColor={cardColor} imgUrl={imgUrl} pokemon={pokemon} getTypeName={getTranslatedTypeName}/>

          {/* 2. 하단 탭 및 상세 정보 섹션 */}
          <div className="p-6">
            {/* 탭 버튼 */}
            <div className="flex border-b mb-4">
              <TabButton title={t('tabs.about')} isActive={activeTab === 'about'} onClick={() => setActiveTab('about')} />
              <TabButton title={t('tabs.baseStats')} isActive={activeTab === 'stats'} onClick={() => setActiveTab('stats')} />
              <TabButton title={t('tabs.damageRelations')} isActive={activeTab === 'relations'} onClick={() => setActiveTab('relations')} />
              <TabButton title={t('tabs.evolution')} isActive={activeTab === 'evolution'} onClick={() => setActiveTab('evolution')} />
            </div>

            {/* 탭 콘텐츠 */}
            <div>
              {activeTab === 'about' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <AboutTab height={pokemon.height} weight={pokemon.weight} />
                </motion.div>
              )}
              {activeTab === 'stats' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <StatsTab stats={pokemon.stats} primaryTypeName={pokemon.types[0].type.name} />
                </motion.div>
              )}
              {activeTab === 'relations' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <RelationsTab weaknesses={weaknesses} resistances={resistances} immunities={immunities} getTypeName={getTranslatedTypeName} />
                </motion.div>
              )}
              {activeTab === 'evolution' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <EvolutionTab chain={evolutionChain} />
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