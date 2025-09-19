import earthIcon from '/earth.png';
import { useDropDown } from "@/hooks/use-dropdown";
import { languages } from "@/constants/languages";
import type { Language } from "@/type/common";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { isDropdownOpen, dropdownRef, handleDropDown } = useDropDown();
  const { i18n } = useTranslation();

  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];

  const selectLanguage = (lang: Language) => {
    i18n.changeLanguage(lang.code);
    handleDropDown();
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm p-3 border-b border-gray-200 sticky top-0 z-20">
      <div className="container mx-auto flex items-center justify-end">
        
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={handleDropDown}
            className="flex items-center gap-2 text-gray-700 font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-lg transition-colors duration-200"
          >
            {currentLang.flag && (
              <img src={currentLang.flag} alt={`${currentLang.name} Flag`} className="w-6 h-6 rounded-full object-cover" />
            )}
            
            <span className="hidden sm:block font-semibold">
              {currentLang.name}
            </span>
            
            <img src={earthIcon} alt="Language Icon" className="w-6 h-6 opacity-70" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-40 bg-white rounded-lg shadow-xl overflow-hidden animate-fade-in-down origin-top-right">
              <ul className="py-1">
                {languages.map((lang) => (
                  <li key={lang.code}>
                    <button
                      onClick={() => selectLanguage(lang)}
                      className={`w-full text-left flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-100 ${
                        currentLang.code === lang.code ? 'bg-gray-50' : ''
                      }`}
                    >
                      {lang.flag && (
                        <img src={lang.flag} alt={`${lang.name} Flag`} className="w-5 h-5 rounded-full object-cover" />
                      )}
                      {lang.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;