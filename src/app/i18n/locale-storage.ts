import { isLocale, type Locale } from "./locale";

/** 사용자가 선택한 언어를 담는 localStorage 키입니다. */
const STORAGE_KEY = "kcb.locale";

/**
 * 저장된 언어를 읽습니다.
 *
 * 저장된 적이 없거나 지원하지 않는 값이면 null을 반환한다.
 * (사용자가 직접 값을 고쳤거나 지원 언어에서 제외된 경우)
 *
 * localStorage 접근이 막힌 환경(프라이버시 모드 등)에서도
 * 앱이 죽지 않도록 예외를 흘리지 않는다.
 */
export function readStoredLocale(): Locale | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isLocale(stored) ? stored : null;
  } catch {
    return null;
  }
}

/** 선택한 언어를 저장합니다. 실패해도 화면 동작에는 영향을 주지 않는다. */
export function storeLocale(locale: Locale): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // 저장에 실패하면 이번 세션에만 적용된다.
  }
}
