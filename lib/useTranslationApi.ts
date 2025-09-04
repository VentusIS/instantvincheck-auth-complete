import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

export const useTranslationApi = () => {
  const { i18n, t, ready } = useTranslation();
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoize the translation check to prevent unnecessary recalculations
  const hasTranslations = useMemo(() => {
    return i18n.hasResourceBundle(i18n.language, "common");
  }, [i18n]);

  useEffect(() => {
    let isMounted = true;

    const checkReady = () => {
      if (isMounted) {
        const newReady = ready && hasTranslations;
        setIsReady(newReady);

        if (!hasTranslations && ready) {
          setError("Translations not available for current language");
        } else {
          setError(null);
        }
      }
    };

    // Check immediately
    checkReady();

    // Only add listeners if component is still mounted
    if (isMounted) {
      const handleLanguageChanged = () => {
        if (isMounted) {
          checkReady();
        }
      };

      const handleLoaded = () => {
        if (isMounted) {
          checkReady();
        }
      };

      i18n.on("languageChanged", handleLanguageChanged);
      i18n.on("loaded", handleLoaded);

      return () => {
        isMounted = false;
        i18n.off("languageChanged", handleLanguageChanged);
        i18n.off("loaded", handleLoaded);
      };
    }

    return () => {
      isMounted = false;
    };
  }, [i18n, ready, hasTranslations]);

  return {
    t,
    i18n,
    ready: isReady,
    error,
  };
};
