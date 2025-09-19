// src/layout/Sidebar.jsx
import pokeLogo from '/poke.png';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const nav = useNavigate();
  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 flex-shrink-0">
      <div 
        className="p-4 flex items-center cursor-pointer border-b border-gray-200 h-[73px]"
        onClick={() => nav("/")}
      >
        <img src={pokeLogo} alt="Poke Logo" className="h-9 w-9 mr-3" />
        <h1 className="text-2xl font-black text-gray-800 tracking-wide">
          POKÉDEX
        </h1>
      </div>
      <nav className="p-4">
        <p className="text-sm text-gray-500">Navigation coming soon.</p>
      </nav>
    </aside>
  );
};

export default Sidebar;