const dictionaries = {
  en: () => import("./dictionaries/en.json").then((r) => r.default),
  ru: () => import("./dictionaries/ru.json").then((r) => r.default),
};

export const getDictionary = (lang) => {
  return dictionaries[lang]();
};
