import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./page/main";
import DetailPage from "./page/detail";
import Layout from "./layout/layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="pokemon/:id" element={<DetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;