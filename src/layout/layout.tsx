// src/layout/Layout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";

const Layout = () => {
  return (
    // 변경점: 전체 앱 컨테이너와 배경 패턴
    <div className="relative min-h-screen bg-slate-100 font-sans">
      {/* 배경을 위한 장식용 div */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[150vw] h-[150vw] max-w-[1200px] max-h-[1200px] bg-pokedex-red/5 rounded-full -z-10"
        style={{ top: '-50%' }}
      />
      
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;