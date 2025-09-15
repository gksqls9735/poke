import { useNavigate } from "react-router-dom";
import pokeLogo from '/poke.png';

const Header = () => {
  const nav = useNavigate();

  return (
    <header className="bg-blue-900 p-4 shadow-xl sticky top-0 z-10">
      <div
        className="container flex items-center cursor-pointer"
        onClick={() => nav('/')}
      >
        <img src={pokeLogo} alt="Poke Logo" className="h-8 w-8 mr-2" />
        <h1 className="text-3xl font-extrabold text-white tracking-widest">
          POKE
        </h1>
      </div>
    </header>
  );
};

export default Header;