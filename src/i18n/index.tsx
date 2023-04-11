import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from './locales/en.json'
import hi from './locales/hi.json'
import ka from './locales/ka.json'
import ta from './locales/ta.json'


const resources = {
  en,
  hi,
  ka,
  ta,
}

export const availableLanguages = Object.keys(resources)

i18n.use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    defaultNS: "common",
    fallbackLng: 'en',
  });