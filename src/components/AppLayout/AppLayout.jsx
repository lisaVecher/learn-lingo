import { Outlet } from "react-router";

import { useTheme } from "../../hooks/useTheme";
import Header from "../Header/Header";
import css from "./AppLayout.module.css";

function AppLayout() {
  const { theme, isRandom, selectTheme, enableRandomTheme } = useTheme();

  return (
    <div className={css.layout}>
      <Header
        theme={theme}
        isRandomTheme={isRandom}
        onSelectTheme={selectTheme}
        onEnableRandomTheme={enableRandomTheme}
      />

      <main className={css.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
