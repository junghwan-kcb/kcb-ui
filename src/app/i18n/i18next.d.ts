import type { DEFAULT_NAMESPACE } from "./config";

import type auth from "./locales/ko/auth.json";
import type common from "./locales/ko/common.json";
import type nav from "./locales/ko/nav.json";

/**
 * t() 호출에 키 자동완성과 오타 검사를 붙입니다.
 *
 * 기준 로케일(ko)의 JSON 구조를 그대로 타입으로 쓴다.
 * 다른 로케일이 이 구조를 따르는지는 config.ts의 satisfies가 보장한다.
 */
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof DEFAULT_NAMESPACE;
    resources: {
      common: typeof common;
      nav: typeof nav;
      auth: typeof auth;
    };
  }
}
