import HomePage from "../pages/HomePage/HomePage";

import { Route, Routes } from "react-router";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
