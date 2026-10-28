import { copy } from "./copy.js";

export const LOCALES = ["en", "fa"];
export const DEFAULT_LOCALE = "en";

const STORAGE_KEY = "wedding-locale";

export function localeFromPath(pathname = window.location.pathname) {
  const segment = pathname.split("/").filter(Boolean)[0];
  return LOCALES.includes(segment) ? segment : null;
}

export function readStoredLocale() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return LOCALES.includes(value) ? value : null;
  } catch {
    return null;
  }
}

export function writeStoredLocale(locale) {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Storage can be blocked in private browsing.
  }
}

export function applyDocumentLocale(locale) {
  const root = document.documentElement;
  root.lang = locale;
  root.dir = locale === "fa" ? "rtl" : "ltr";
  document.title = copy[locale].documentTitle;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", copy[locale].documentDescription);
}

export function bootstrapLocale() {
  const path = window.location.pathname;
  const fromPath = localeFromPath(path);
  const barePath = path === "/" || path === "";
  const locale = barePath ? DEFAULT_LOCALE : (fromPath ?? readStoredLocale() ?? DEFAULT_LOCALE);

  if (path !== `/${locale}`) {
    window.history.replaceState({ locale }, "", `/${locale}`);
  }

  writeStoredLocale(locale);
  applyDocumentLocale(locale);
  return locale;
}
