import { typeBadgeColorClasses } from "@/constants/color";
import type { PokemonTypeInfo } from "@/type/poke";
import { capitalizeFirstLetter } from "@/utils/text";
import { useTranslation } from "react-i18next";


const RelationsSection = ({ title, types, getTypeName }: { title: string, types: PokemonTypeInfo[], getTypeName: (engName: string) => string }) => {
  if (types.length === 0) return null;

  return (
    <div className="flex items-start my-1">
      <h3 className="w-1/3 text-sm font-bold text-gray-600 pt-0.5">{title}</h3>
      <div className="w-2/3 flex flex-wrap gap-1">
        {types.map(({ name }) => (
          <span key={name} className={`px-2 py-0.5 text-white text-xs font-semibold rounded-md ${typeBadgeColorClasses[name]}`}>
            {capitalizeFirstLetter(getTypeName(name))}
          </span>
        ))}
      </div>
    </div>
  )
};


const RelationsTab = ({ weaknesses, resistances, immunities, getTypeName }: {
  weaknesses: PokemonTypeInfo[],
  resistances: PokemonTypeInfo[],
  immunities: PokemonTypeInfo[],
  getTypeName: (engName: string) => string;
}) => {
  const { t } = useTranslation();

  return (
    <>
      <h3 className="text-lg font-bold mb-2">{t('tabs.damageRelations')}</h3>
      <div className="flex flex-col gap-y-2">
        <RelationsSection title={t('common.weaknesses')} types={weaknesses} getTypeName={getTypeName} />
        <RelationsSection title={t('common.resistances')} types={resistances} getTypeName={getTypeName} />
        <RelationsSection title={t('common.immunities')} types={immunities} getTypeName={getTypeName} />
      </div>
    </>
  );
};

export default RelationsTab;