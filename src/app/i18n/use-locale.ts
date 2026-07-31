import { useTranslation } from "react-i18next";

import { applyLocale } from "./config";
import {
  DEFAULT_LOCALE,
  isLocale,
  type Locale,
} from "./locale";

export interface UseLocaleResult {
  /** 현재 적용된 언어입니다. */
  locale: Locale;
  /** 언어를 전환합니다. localStorage와 <html lang>도 함께 갱신된다. */
  setLocale: (next: Locale) => void;
}

/**
 * 현재 언어를 읽고 전환하는 훅입니다.
 *
 * 화면 코드가 i18next 인스턴스를 직접 만지지 않도록 하는 유일한 창구다.
 * 언어가 바뀌면 useTranslation 구독을 통해 자동으로 다시 렌더된다.
 */
export function useLocale(): UseLocaleResult {
  const { i18n } = useTranslation();

  // resolvedLanguage는 폴백까지 반영된 실제 적용 언어다.
  const locale = isLocale(i18n.resolvedLanguage)
    ? i18n.resolvedLanguage
    : DEFAULT_LOCALE;

  return {
    locale,
    setLocale: (next) => {
      if (next === locale) return;
      void applyLocale(next);
    },
  };
}
