const themeIds = ["yellow", "green", "blue", "pink", "peach"];

export function getRandomTheme(excludedTheme = null) {
  const availableThemes = themeIds.filter((theme) => theme !== excludedTheme);

  const randomIndex = Math.floor(Math.random() * availableThemes.length);

  return availableThemes[randomIndex];
}
