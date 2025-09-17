import { useTranslation } from "react-i18next";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  const { t } = useTranslation();

  return (
    <div className="mb-8">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={t('search.placeholder')}
        className="w-full max-w-md mx-auto p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-second focus:border-transparent transition"
      />
    </div>
  );
}

export default SearchInput;