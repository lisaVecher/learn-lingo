import HomePage from "../pages/HomePage/HomePage";

import { Route, Routes } from "react-router";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import AppLayout from "../components/AppLayout/AppLayout";
import { AuthProvider } from "../context/AuthContext";
import { FavoritesProvider } from "../context/FavoritesContext";

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
