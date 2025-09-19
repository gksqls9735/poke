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
    // 변경점: 글래스 효과 적용 및 높이 고정
    <header className="bg-white/70 backdrop-blur-lg p-3 border-b border-white/30 sticky top-0 z-20 h-[73px] flex items-center">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-end">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={handleDropDown}
            // 변경점: 버튼 디자인을 더 미니멀하고 세련되게 수정
            className="flex items-center gap-2 text-gray-700 font-medium hover:bg-gray-500/10 p-2 rounded-lg transition-colors duration-200"
          >
            {currentLang.flag && (
              <img src={currentLang.flag} alt={`${currentLang.name} Flag`} className="w-6 h-6 rounded-full object-cover shadow-sm" />
            )}
            <span className="hidden sm:block font-semibold text-sm">
              {currentLang.name}
            </span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-40 bg-white rounded-lg shadow-xl overflow-hidden animate-fade-in-down origin-top-right">
              <ul className="py-1">
                {languages.map((lang) => (
                  <li key={lang.code}>
                    <button
                      onClick={() => selectLanguage(lang)}
                      className={`w-full text-left flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-100 ${currentLang.code === lang.code ? 'bg-gray-50' : ''
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