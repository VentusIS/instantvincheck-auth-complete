import type { InitOptions } from "i18next";

export const fallbackLng = "en";
export const languages = ["en", "bg"] as const;
export type Language = (typeof languages)[number];

export const defaultNS = "common";
export const getNamespaces = (ns?: string | string[]) =>
  Array.isArray(ns) ? ns : [ns || defaultNS];

export const i18nConfig: InitOptions = {
  fallbackLng,
  supportedLngs: languages,
  defaultNS,
  ns: [defaultNS],
  debug: false,
  interpolation: { escapeValue: false },
  backend: {
    loadPath: "/locales/{{lng}}/{{ns}}.json",
    reloadInterval: false,
    crossDomain: false,
    withCredentials: false,
    requestOptions: {
      cache: "default",
    },
  },
  react: { useSuspense: false },
  load: "languageOnly",
  preload: languages,
  partialBundledLanguages: true,
  resources: {},
  detection: {
    order: ["path", "cookie", "htmlTag", "navigator"],
    caches: ["cookie"],
    checkWhitelist: true,
  },
};
