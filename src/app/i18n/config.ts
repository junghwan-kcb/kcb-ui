import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  type Locale,
} from "./locale";
import {
  readStoredLocale,
  storeLocale,
} from "./locale-storage";

import koAuth from "./locales/ko/auth.json";
import koCommon from "./locales/ko/common.json";
import koNav from "./locales/ko/nav.json";
import enAuth from "./locales/en/auth.json";
import enCommon from "./locales/en/common.json";
import enNav from "./locales/en/nav.json";

/**
 * 번역 네임스페이스입니다.
 *
 * 기능 단위로 나눈다. 페이지가 늘어나면
 * locales/<로케일>/<네임스페이스>.json 을 추가하고 여기에 등록한다.
 */
export const NAMESPACES = ["common", "nav", "auth"] as const;

/** 네임스페이스를 지정하지 않은 t() 호출이 바라보는 기본 네임스페이스입니다. */
export const DEFAULT_NAMESPACE = "common";

/**
 * 기준 로케일(ko)의 리소스 형태를 그대로 요구하는 타입입니다.
 *
 * 다른 로케일 JSON에서 키가 빠지면 아래 satisfies에서 컴파일 에러가 난다.
 * 번역 누락을 런타임 폴백이 아니라 빌드 시점에 잡기 위한 장치다.
 */
type Mirror<T> = {
  [K in keyof T]: T[K] extends string ? string : Mirror<T[K]>;
};

const resources = {
  ko: {
    common: koCommon,
    nav: koNav,
    auth: koAuth,
  },
  en: {
    common: enCommon satisfies Mirror<typeof koCommon>,
    nav: enNav satisfies Mirror<typeof koNav>,
    auth: enAuth satisfies Mirror<typeof koAuth>,
  },
} as const;

/**
 * i18next를 초기화합니다. 앱 진입점에서 렌더 전에 한 번 호출한다.
 *
 * 리소스를 전부 번들에 담고 있으므로 비동기 로드가 없다.
 * 따라서 Suspense를 끄고, 최초 렌더부터 번역이 준비된 상태로 시작한다.
 */
export function initI18n(): void {
  if (i18next.isInitialized) return;

  const locale = readStoredLocale() ?? DEFAULT_LOCALE;

  void i18next.use(initReactI18next).init({
    resources,
    lng: locale,
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: [...SUPPORTED_LOCALES],
    ns: [...NAMESPACES],
    defaultNS: DEFAULT_NAMESPACE,
    // React가 이미 XSS를 막아주므로 i18next 단계의 이스케이프는 끈다.
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    debug: import.meta.env.DEV,
  });

  applyDocumentLang(locale);
}

/**
 * 언어를 전환합니다.
 *
 * i18next 상태 · localStorage · <html lang>을 한 번에 맞추는 유일한 경로다.
 * 화면 코드는 useLocale()을 통해서만 이 함수에 접근한다.
 */
export async function applyLocale(locale: Locale): Promise<void> {
  await i18next.changeLanguage(locale);
  storeLocale(locale);
  applyDocumentLang(locale);
}

/**
 * <html lang>을 현재 언어로 맞춥니다.
 *
 * 스크린 리더의 발음 선택과 브라우저 번역 판단에 쓰이므로
 * 화면 텍스트와 반드시 함께 바뀌어야 한다.
 */
function applyDocumentLang(locale: Locale): void {
  document.documentElement.lang = locale;
}
