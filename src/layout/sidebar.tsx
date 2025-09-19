import pokeLogo from '/poke.png';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const nav = useNavigate();
  return (
    <aside className="w-64 bg-white shadow-lg flex-shrink-0">
      <div 
        className="p-4 flex items-center cursor-pointer border-b"
        onClick={() => nav("/")}
      >
        <img src={pokeLogo} alt="Poke Logo" className="h-10 w-10 mr-3" />
        <h1 className="text-2xl font-extrabold text-gray-800 tracking-wider">
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