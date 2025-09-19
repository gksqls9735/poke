import type { EvolutionStage } from "@/hooks/use-evolution-chain";
import { capitalizeFirstLetter } from "@/utils/text";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Arrow = () => (
  <div className="flex items-center justify-center text-gray-400 font-bold text-2xl mx-2 md:mx-4">
    &gt;
  </div>
);

const EvolutionCard = ({ stage }: { stage: EvolutionStage }) => (
  <Link to={`/pokemon/${stage.id}`} className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 transition group">
    <div className="bg-gray-200 rounded-full p-2 group-hover:scale-105 transition-transform">
      <img src={stage.imgUrl} alt={stage.name} className="w-20 h-20 md:w-28 md:h-28" />
    </div>
    <span className="mt-2 font-semibold text-gray-700 text-sm md:text-base">
      #{stage.id.padStart(3, '0')}
    </span>
    <h4 className="font-bold text-center">
      {capitalizeFirstLetter(stage.name)}
    </h4>
  </Link>
);

const EvolutionChain = ({ chain }: { chain: EvolutionStage[] }) => {
  const { t } = useTranslation();

  if (!chain || chain.length <= 1) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">{t('tabs.evolution')}</h2>
        <p className="text-gray-600">{t('evolution.noEvolution')}</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center md:text-left">{t('tabs.evolution')}</h2>
      <div className="flex items-center justify-center flex-wrap bg-gray-50 p-4 rounded-lg">
        {chain.map((stage, idx) => (
          <div key={stage.id} className="flex items-center">
            <EvolutionCard stage={stage} />
            {idx < chain.length - 1 && <Arrow />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvolutionChain;