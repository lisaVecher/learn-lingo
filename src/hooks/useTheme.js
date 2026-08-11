import { useCallback, useLayoutEffect, useState } from "react";

import { getRandomTheme, isThemeId } from "../data/themes";

const STORAGE_KEY = "learnlingo-theme";
const RANDOM_THEME_KEY = "learnlingo-random-theme";

function createRandomTheme(excludedTheme = null) {
  const randomTheme = getRandomTheme(excludedTheme);

  try {
    sessionStorage.setItem(RANDOM_THEME_KEY, randomTheme);
  } catch {}

  return randomTheme;
}

function getInitialThemeState() {
  try {
    const savedTheme = localStorage.getItem(STORAGE_KEY);

    if (isThemeId(savedTheme)) {
      return { theme: savedTheme, isRandom: false };
    }
  } catch {}

  let previousRandomTheme = null;

  try {
    previousRandomTheme = sessionStorage.getItem(RANDOM_THEME_KEY);
  } catch {}

  return {
    theme: createRandomTheme(previousRandomTheme),
    isRandom: true,
  };
}

export function useTheme() {
  const [themeState, setThemeState] = useState(getInitialThemeState);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = themeState.theme;
  }, [themeState.theme]);

  const selectTheme = useCallback((theme) => {
    if (!isThemeId(theme)) {
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}

    setThemeState({ theme, isRandom: false });
  }, []);

  const enableRandomTheme = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}

    setThemeState((current) => ({
      theme: createRandomTheme(current.theme),
      isRandom: true,
    }));
  }, []);

  return {
    ...themeState,
    selectTheme,
    enableRandomTheme,
  };
}
