import type navKo from "@/app/i18n/locales/ko/nav.json";

/**
 * 사이드바 메뉴 정의입니다. (앱 전용 데이터 · KAI 메뉴 기준)
 *
 * 페이지를 추가/활성화할 때는 해당 항목에 `to`를 지정하고 `ready: true`로 바꾼다.
 * `ready`가 아니면 "준비중" 배지로 표시되고 링크가 비활성화된다.
 *
 * titleKey가 없는 그룹은 단독(top-level) 메뉴로 렌더링된다.
 *
 * 표시 문구는 이 파일에 두지 않는다. nav 네임스페이스의 번역 키만 참조하며
 * 실제 문자열은 src/app/i18n/locales/<로케일>/nav.json 이 소유한다.
 */

/** nav 네임스페이스의 메뉴 항목 키입니다. 없는 키를 쓰면 컴파일 에러가 난다. */
export type NavItemKey = `items.${keyof typeof navKo.items}`;

/** nav 네임스페이스의 그룹 제목 키입니다. */
export type NavGroupKey = `groups.${keyof typeof navKo.groups}`;

export interface NavItem {
  /** 메뉴 표시 이름의 번역 키 */
  labelKey: NavItemKey;
  /** 연결할 경로. ready가 true일 때만 사용된다. */
  to?: string;
  /** 페이지 구현 완료 여부. false/미지정이면 "준비중" 처리. */
  ready?: boolean;
}

export interface NavGroup {
  /**
   * 언어와 무관한 고정 식별자입니다.
   *
   * React key와 그룹 열림 상태의 키로 쓴다. 번역된 제목을 식별자로 쓰면
   * 언어를 바꿀 때 키가 달라져 메뉴가 리마운트되고 열림 상태가 초기화된다.
   */
  id: string;
  /** 그룹 제목의 번역 키. 없으면 단독 메뉴 묶음으로 처리. */
  titleKey?: NavGroupKey;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    id: "project",
    items: [
      { labelKey: "items.projectManagement", to: "/project-management", ready: true },
    ],
  },
  {
    id: "data-management",
    titleKey: "groups.dataManagement",
    items: [
      { labelKey: "items.datasource", to: "/data-management/datasource", ready: true },
      { labelKey: "items.metadataset", to: "/data-management/metadataset", ready: true },
      { labelKey: "items.dataset", to: "/data-management/dataset", ready: true },
    ],
  },
  {
    id: "model",
    items: [{ labelKey: "items.model", to: "/model", ready: true }],
  },
  {
    id: "analysis-tools",
    titleKey: "groups.analysisTools",
    items: [
      { labelKey: "items.calibration", to: "/analysis-tools/calibration", ready: true },
      { labelKey: "items.validation", to: "/analysis-tools/validation", ready: true },
    ],
  },
  {
    id: "deployment",
    items: [{ labelKey: "items.deployment", to: "/deployment", ready: true }],
  },
  {
    id: "batch-jobs",
    titleKey: "groups.batchJobs",
    items: [
      { labelKey: "items.retrainingJob" },
      { labelKey: "items.adaptiveRetrainingJob" },
      { labelKey: "items.validationJob" },
    ],
  },
  {
    id: "operation",
    titleKey: "groups.operation",
    items: [
      { labelKey: "items.operationModel", to: "/operation/model-management", ready: true },
      { labelKey: "items.protocol", to: "/operation/protocol", ready: true },
      { labelKey: "items.function", to: "/operation/function", ready: true },
      { labelKey: "items.approval", to: "/operation/approval", ready: true },
      { labelKey: "items.log", to: "/operation/log", ready: true },
    ],
  },
  {
    id: "service-scheduler",
    items: [
      { labelKey: "items.serviceScheduler", to: "/service-scheduler", ready: true },
    ],
  },
  {
    id: "users",
    items: [{ labelKey: "items.users", to: "/users", ready: true }],
  },
];
