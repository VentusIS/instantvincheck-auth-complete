"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import { i18nConfig, languages } from "./config";

if (!i18n.isInitialized) {
  i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
      ...i18nConfig,
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
        reloadInterval: false,
        crossDomain: false,
        withCredentials: false,
        requestOptions: {
          cache: "force-cache",
          timeout: 3000,
        },
        parse: (data: string) => {
          try {
            return JSON.parse(data);
          } catch (error) {
            console.warn("Failed to parse translation data:", error);
            return {};
          }
        },
        request: (options: any, url: string, payload: any, callback: any) => {
          const language = options?.lngs?.[0];
          const namespace = options?.ns?.[0];

          if (!language || !languages.includes(language)) {
            callback(new Error("Invalid language"), {
              status: 400,
              data: {},
            });
            return;
          }

          if (
            language &&
            namespace &&
            i18n.hasResourceBundle(language, namespace)
          ) {
            callback(null, {
              status: 200,
              data: i18n.getResourceBundle(language, namespace),
            });
            return;
          }

          fetch(url, {
            method: "GET",
            headers: {
              "Cache-Control": "public, max-age=3600",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              callback(null, {
                status: 200,
                data: data,
              });
            })
            .catch((error) => {
              callback(error, {
                status: 500,
                data: {},
              });
            });
        },
      },
      detection: {
        order: ["path", "cookie", "htmlTag", "navigator"],
        caches: ["cookie"],
        checkWhitelist: true,
      },
      interpolation: {
        escapeValue: false,
      },
      debug: false,
      react: {
        useSuspense: false,
      },
    });
}

export default i18n;
