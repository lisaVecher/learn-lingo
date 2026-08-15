import { useCallback, useLayoutEffect, useState } from "react";

import { getRandomTheme } from "../data/themes";

const STORAGE_KEY = "learnlingo-theme";
const RANDOM_THEME_KEY = "learnlingo-random-theme";

function getInitialTheme() {
  let previousTheme = null;

  try {
    previousTheme = sessionStorage.getItem(RANDOM_THEME_KEY);
  } catch {}

  return getRandomTheme(previousTheme);
}

export function useTheme() {
  const [theme] = useState(getInitialTheme);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;

    try {
      localStorage.removeItem(SAVED_THEME_KEY);
      sessionStorage.setItem(RANDOM_THEME_KEY, theme);
    } catch {}
  }, [theme]);
}
