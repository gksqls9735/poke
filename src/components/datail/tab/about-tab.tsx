import { useTranslation } from "react-i18next";

const AboutTab = ({ height, weight }: { height: number; weight: number; }) => {
  const { t } = useTranslation();
  return (
    <>
      <h3 className="text-lg font-bold mb-2">{t('tabs.about')}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <dt className="text-sm text-gray-500">{t('common.height')}</dt>
          <dd className="font-semibold text-lg">{height / 10} m</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">{t('common.weight')}</dt>
          <dd className="font-semibold text-lg">{weight / 10} kg</dd>
        </div>
      </div>
    </>
  );
};

export default AboutTab;