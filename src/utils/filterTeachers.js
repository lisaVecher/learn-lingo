export function filterTeachers(teachers, filters) {
  const { language, level, price } = filters;

  return teachers.filter((teacher) => {
    const matchesLanguage = !language || teacher.languages.includes(language);

    const matchesLevel = !level || teacher.levels.includes(level);

    const matchesPrice = !price || teacher.price_per_hour === Number(price);

    return matchesLanguage && matchesLevel && matchesPrice;
  });
}
