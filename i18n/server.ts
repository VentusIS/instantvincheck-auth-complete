import i18next, { type i18n as I18nInstance } from "i18next";
import Backend from "i18next-fs-backend";
import { i18nConfig, getNamespaces, languages } from "./config";
import path from "path";

const i18nInstances = new Map<string, I18nInstance>();

export async function getI18nInstance(
  lng: string,
  ns?: string | string[]
): Promise<I18nInstance> {
  if (!lng || typeof lng !== "string") {
    throw new Error("Invalid language parameter");
  }

  const validLng = languages.includes(lng as any) ? lng : "en";
  const namespaces = getNamespaces(ns);
  const cacheKey = `${validLng}-${namespaces.join(",")}`;

  if (!i18nInstances.has(cacheKey)) {
    const instance = i18next.createInstance();
    await instance.use(Backend).init({
      ...i18nConfig,
      lng: validLng,
      ns: namespaces,
      backend: {
        loadPath: path.resolve(
          process.cwd(),
          "public/locales/{{lng}}/{{ns}}.json"
        ),
        reloadInterval: false,
        crossDomain: false,
        withCredentials: false,
      },
      initImmediate: false,
      debug: false,
    });
    i18nInstances.set(cacheKey, instance);
  }

  const instance = i18nInstances.get(cacheKey)!;
  await instance.changeLanguage(validLng);
  return instance;
}

export async function useTranslation(
  lng: string,
  ns?: string | string[]
): Promise<{ t: ReturnType<I18nInstance["getFixedT"]>; i18n: I18nInstance }> {
  if (!lng || typeof lng !== "string") {
    throw new Error("Invalid language parameter");
  }

  const i18n = await getI18nInstance(lng, ns);
  if (!i18n) throw new Error("i18n is null");

  const validLng = languages.includes(lng as any) ? lng : "en";
  return {
    t: i18n.getFixedT(validLng, getNamespaces(ns)),
    i18n,
  };
}
