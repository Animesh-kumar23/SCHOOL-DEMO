import { cookies } from "next/headers";

import { en, type Dictionary } from "./en";
import { hi } from "./hi";

export type Locale = "hi" | "en";
export type { Dictionary };

/** Default language is English; switches to Hindi only when the cookie is set. */
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "locale";

const dictionaries: Record<Locale, Dictionary> = { en, hi };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Reads the locale from the cookie (server components / route handlers). */
export function getLocale(): Locale {
  const value = cookies().get(LOCALE_COOKIE)?.value;
  return value === "hi" ? "hi" : "en";
}
