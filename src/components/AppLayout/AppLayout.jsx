import { Outlet } from "react-router";
import { useCallback, useState } from "react";

import { useTheme } from "../../hooks/useTheme";
import Header from "../Header/Header";
import AuthModal from "../AuthModal/AuthModal";
import css from "./AppLayout.module.css";

function AppLayout() {
  const [authMode, setAuthMode] = useState(null);
  const { theme, isRandom, selectTheme, enableRandomTheme } = useTheme();

  const closeAuthModal = useCallback(() => {
    setAuthMode(null);
  }, []);

  return (
    <div className={css.layout}>
      <Header
        onOpenAuth={setAuthMode}
        theme={theme}
        isRandomTheme={isRandom}
        onSelectTheme={selectTheme}
        onEnableRandomTheme={enableRandomTheme}
      />

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
