import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./en.json";
import mkTranslation from "./mk.json";
import sqTranslation from "./sq.json";
i18next
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: enTranslation
            },
            mk: {
                translation: mkTranslation
            },
            sq: {
                translation: sqTranslation
            },
        },
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });