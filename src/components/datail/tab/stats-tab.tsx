import type { PokemonStat } from "@/type/poke";
import { capitalizeFirstLetter } from "@/utils/text";
import { useTranslation } from "react-i18next";

const StatsTab = ({ stats, primaryTypeName }: { stats: PokemonStat[], primaryTypeName: string }) => {
  const { t } = useTranslation();

  return (
    <>
      <h3 className="text-lg font-bold mb-2">{t('tabs.baseStats')}</h3>
      {stats.map((stat) => (
        <div key={stat.stat.name} className="flex items-center my-2">
          <span className="w-1/3 text-gray-600 font-medium">{capitalizeFirstLetter(stat.stat.name.replace('-', ' '))}</span>
          <span className="w-1/12 font-bold">{stat.base_stat}</span>
          <div className="w-7/12 bg-gray-200 rounded-full h-4">
            <div
              className={`bg-${primaryTypeName} h-4 rounded-full`}
              style={{ width: `${(stat.base_stat / 255) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default StatsTab;