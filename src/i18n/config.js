import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ko from "./locales/ko.json";
import ja from "./locales/ja.json";
import zh from "./locales/zh.json";
import vi from "./locales/vi.json";

const resources = {
  en: { translation: en },
  ko: { translation: ko },
  ja: { translation: ja },
  zh: { translation: zh },
  vi: { translation: vi },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
