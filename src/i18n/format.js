const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export function formatDigits(value, locale) {
  const text = String(value);
  if (locale !== "fa") return text;
  return text.replace(/\d/g, (digit) => PERSIAN_DIGITS[digit]);
}
