/**
 * 지원 로케일의 단일 정의 지점입니다.
 *
 * 언어를 추가할 때 여기에 코드를 넣고
 * locales/<코드>/ 아래에 ko와 동일한 키 구조의 JSON을 만들면 된다.
 */
export const SUPPORTED_LOCALES = ["ko", "en"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

/** 기준 언어. 번역이 없을 때 폴백되는 언어이기도 하다. */
export const DEFAULT_LOCALE: Locale = "ko";

/**
 * 외부에서 들어온 값(localStorage, i18next 상태 등)이
 * 지원 로케일인지 확인합니다.
 */
export function isLocale(value: unknown): value is Locale {
  return (
    typeof value === "string" &&
    (SUPPORTED_LOCALES as readonly string[]).includes(value)
  );
}
