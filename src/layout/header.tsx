import { useNavigate } from "react-router-dom";
import pokeLogo from '/poke.png';
import { useDropDown } from "@/hooks/use-dropdown";
import { useState } from "react";
import { languages } from "@/constants/languages";
import type { Language } from "@/type/common";

const Header = () => {
  const nav = useNavigate();
  const { isDropdownOpen, dropdownRef, handleDropDown } = useDropDown();
  const [currentLang, setCurrentLang] = useState<Language>(languages[0]);

  const selectLanguage = (lang: Language) => {
    setCurrentLang(lang);
    handleDropDown();
  };

  return (
    <header className="bg-blue-900 p-4 shadow-xl sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => nav("/")}
        >
          <img src={pokeLogo} alt="Poke Logo" className="h-8 w-8 mr-2" />
          <h1 className="text-3xl font-extrabold text-white tracking-widest">POKE</h1>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={handleDropDown}
            className="flex items-center gap-2 text-white font-semibold hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 p-2 rounded-full transition-colors duration-200"
          >
            {currentLang.flag && (
              <img src={currentLang.flag} alt={`${currentLang.name} Flag`} className="w-5 h-5 rounded-full object-cover" />
            )}
            <span className="hidden sm:inline-block px-1">{currentLang.name}</span>
            <img src="earth.png" alt="Language Icon" className="w-6 h-6" />
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