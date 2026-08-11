export const themeOptions = [
  { id: "yellow", label: "Yellow" },
  { id: "green", label: "Green" },
  { id: "blue", label: "Blue" },
  { id: "pink", label: "Pink" },
  { id: "peach", label: "Peach" },
];

const themeIds = themeOptions.map(({ id }) => id);

export function isThemeId(value) {
  return themeIds.includes(value);
}

export function getRandomTheme(excludedTheme = null) {
  const availableThemes = themeIds.filter((theme) => theme !== excludedTheme);

  const randomIndex = Math.floor(Math.random() * availableThemes.length);

  return availableThemes[randomIndex];
}
