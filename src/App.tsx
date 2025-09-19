import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import MainPage from "./page/main";
import DetailPage from "./page/detail";
import Layout from "./layout/layout";
import { DirectionProvider } from "./contexts/direction-context";
import { TabProvider } from "./contexts/tab-context";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="pokemon/:id" element={<DetailPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <TabProvider>
        <DirectionProvider>
          <AnimatedRoutes />
        </DirectionProvider>
      </TabProvider>
    </BrowserRouter>
  );
};

export default App;