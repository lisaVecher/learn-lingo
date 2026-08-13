import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useAuth } from "../hooks/useAuth";

export const FavoritesContext = createContext(null);

function getStorageKey(uid) {
  return `learnlingo-favorites-${uid}`;
}

function readFavorites(uid) {
  try {
    const value = localStorage.getItem(getStorageKey(uid));

    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const { user } = useAuth();

  const [favoriteIds, setFavoriteIds] = useState([]);
  const [favoritesOwner, setFavoritesOwner] = useState(null);

  useEffect(() => {
    if (!user) {
      setFavoriteIds([]);
      setFavoritesOwner(null);
      return;
    }

    setFavoriteIds(readFavorites(user.uid));
    setFavoritesOwner(user.uid);
  }, [user]);

  useEffect(() => {
    if (!user || favoritesOwner !== user.uid) {
      return;
    }

    localStorage.setItem(getStorageKey(user.uid), JSON.stringify(favoriteIds));
  }, [favoriteIds, favoritesOwner, user]);

  const addFavorite = useCallback((teacherId) => {
    setFavoriteIds((current) => [...new Set([...current, teacherId])]);
  }, []);

  const removeFavorite = useCallback((teacherId) => {
    setFavoriteIds((current) => current.filter((id) => id !== teacherId));
  }, []);

  const isFavorite = useCallback(
    (teacherId) => favoriteIds.includes(teacherId),
    [favoriteIds],
  );

  const value = useMemo(
    () => ({
      favoriteIds,
      addFavorite,
      removeFavorite,
      isFavorite,
    }),
    [favoriteIds, addFavorite, removeFavorite, isFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
