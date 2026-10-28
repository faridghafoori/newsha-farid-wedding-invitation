import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { copy } from "./copy.js";
import {
  DEFAULT_LOCALE,
  LOCALES,
  applyDocumentLocale,
  localeFromPath,
  writeStoredLocale,
} from "./locale.js";

const LocaleContext = createContext(null);

export function LocaleProvider({ initialLocale, children }) {
  const [locale, setLocaleState] = useState(initialLocale);
  const localeRef = useRef(locale);
  localeRef.current = locale;

  useEffect(() => {
    function onPop() {
      const next = localeFromPath() ?? DEFAULT_LOCALE;
      const canonical = `/${next}`;
      if (window.location.pathname !== canonical) {
        window.history.replaceState({ locale: next }, "", canonical);
      }
      writeStoredLocale(next);
      applyDocumentLocale(next);
      setLocaleState(next);
    }

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    applyDocumentLocale(locale);
  }, [locale]);

  const setLocale = useCallback((next) => {
    if (!LOCALES.includes(next) || next === localeRef.current) return;
    writeStoredLocale(next);
    applyDocumentLocale(next);
    window.history.pushState({ locale: next }, "", `/${next}`);
    setLocaleState(next);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      dir: locale === "fa" ? "rtl" : "ltr",
      t: copy[locale],
      setLocale,
    }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useI18n() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useI18n must be used within LocaleProvider");
  return value;
}
