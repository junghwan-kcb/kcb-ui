/**
 * 다국어 인프라의 공개 표면입니다. (앱 전용)
 *
 * 화면 코드는 이 배럴과 react-i18next의 useTranslation만 사용한다.
 * i18next 인스턴스를 직접 import하지 않는 것이 규칙이다.
 * 나중에 i18n 구현을 교체하더라도 여기서 노출한 계약만 유지하면 된다.
 *
 * 공통 컴포넌트(src/shared/ui)는 이 모듈에 의존하지 않는다.
 * 번역된 문자열은 앱 계층에서 props로 내려준다.
 */
export {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  isLocale,
  type Locale,
} from "./locale";

export {
  DEFAULT_NAMESPACE,
  NAMESPACES,
  initI18n,
} from "./config";

export {
  useLocale,
  type UseLocaleResult,
} from "./use-locale";

export {
  LocaleSwitcher,
  type LocaleSwitcherProps,
} from "./locale-switcher";
