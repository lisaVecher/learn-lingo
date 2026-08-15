import { Outlet } from "react-router";
import { useCallback, useState } from "react";

import { useTheme } from "../../hooks/useTheme";
import Header from "../Header/Header";
import AuthModal from "../AuthModal/AuthModal";
import css from "./AppLayout.module.css";

function AppLayout() {
  const [authMode, setAuthMode] = useState(null);

  useTheme();

  const closeAuthModal = useCallback(() => {
    setAuthMode(null);
  }, []);

  return (
    <div className={css.layout}>
      <Header onOpenAuth={setAuthMode} />

      <main className={css.main}>
        <Outlet />
      </main>

      <AuthModal
        isOpen={Boolean(authMode)}
        mode={authMode || "login"}
        onClose={closeAuthModal}
        onSwitch={setAuthMode}
      />
    </div>
  );
}

export default AppLayout;
