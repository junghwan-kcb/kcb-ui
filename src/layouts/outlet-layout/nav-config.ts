/**
 * 사이드바 메뉴 정의입니다. (앱 전용 데이터 · KAI 메뉴 기준)
 *
 * 페이지를 추가/활성화할 때는 해당 항목에 `to`를 지정하고 `ready: true`로 바꾼다.
 * `ready`가 아니면 "준비중" 배지로 표시되고 링크가 비활성화된다.
 *
 * title이 없는 그룹은 단독(top-level) 메뉴로 렌더링된다.
 */
export interface NavItem {
  /** 메뉴 표시 이름 */
  label: string;
  /** 연결할 경로. ready가 true일 때만 사용된다. */
  to?: string;
  /** 페이지 구현 완료 여부. false/미지정이면 "준비중" 처리. */
  ready?: boolean;
}

export interface NavGroup {
  /** 그룹 제목. 없으면 단독 메뉴 묶음으로 처리. */
  title?: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    items: [
      { label: "프로젝트 관리", to: "/project-management", ready: true },
    ],
  },
  {
    title: "데이터관리",
    items: [
      { label: "데이터원본 관리", to: "/data-management/datasource", ready: true },
      { label: "메타데이터셋", to: "/data-management/metadataset", ready: true },
      { label: "데이터셋 관리", to: "/data-management/dataset", ready: true },
    ],
  },
  {
    items: [{ label: "모델 관리", to: "/model", ready: true }],
  },
  {
    title: "분석 도구",
    items: [
      { label: "모델 등급화", to: "/analysis-tools/calibration", ready: true },
      { label: "모델 검증", to: "/analysis-tools/validation", ready: true },
    ],
  },
  {
    items: [{ label: "배포관리", to: "/deployment", ready: true }],
  },
  {
    title: "배치 작업 관리",
    items: [
      { label: "재학습 작업 관리" },
      { label: "Adaptive 재학습 작업 관리" },
      { label: "검증 작업 관리" },
    ],
  },
  {
    title: "운영관리",
    items: [
      { label: "모델관리", to: "/operation/model-management", ready: true },
      { label: "프로토콜 관리", to: "/operation/protocol", ready: true },
      { label: "함수 관리", to: "/operation/function", ready: true },
      { label: "승인 관리", to: "/operation/approval", ready: true },
      { label: "로그 관리", to: "/operation/log", ready: true },
    ],
  },
  {
    items: [
      { label: "서비스 스케줄러", to: "/service-scheduler", ready: true },
    ],
  },
  {
    items: [{ label: "사용자 관리", to: "/users", ready: true }],
  },
];
