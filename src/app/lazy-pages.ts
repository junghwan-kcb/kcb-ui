import { lazy } from "react";

/**
 * 라우터에서 사용하는 페이지들의 lazy 정의입니다.
 * 클릭(이동) 시 해당 페이지 청크만 로드됩니다.
 * 페이지는 default export이므로 별도 매핑 없이 바로 lazy로 감쌉니다.
 */

// 로그인
export const LoginPage = lazy(() => import("@/pages/login/LoginPage"));

// 프로젝트 관리
export const ProjectManagementPage = lazy(
  () => import("@/pages/project-management/ProjectManagementPage"),
);

// 데이터원본 관리
export const DatasourcePage = lazy(
  () => import("@/pages/data-management/datasource/DatasourcePage"),
);
// 메타데이터셋
export const MetadatasetPage = lazy(
  () => import("@/pages/data-management/metadataset/MetadatasetPage"),
);
// 데이터셋 관리
export const DatasetPage = lazy(
  () => import("@/pages/data-management/dataset/DatasetPage"),
);

// 모델 관리
export const ModelPage = lazy(() => import("@/pages/model/ModelPage"));

// 모델 등급화
export const CalibrationPage = lazy(
  () => import("@/pages/analysis-tools/calibration/CalibrationPage"),
);
// 모델 검증
export const ValidationPage = lazy(
  () => import("@/pages/analysis-tools/validation/ValidationPage"),
);

// 배포관리
export const DeploymentPage = lazy(
  () => import("@/pages/deployment/DeploymentPage"),
);

// 운영 - 모델관리
export const ModelManagementPage = lazy(
  () => import("@/pages/operation/model-management/ModelManagementPage"),
);
// 운영 - 프로토콜 관리
export const ProtocolPage = lazy(
  () => import("@/pages/operation/protocol/ProtocolPage"),
);
// 운영 - 함수 관리
export const FunctionPage = lazy(
  () => import("@/pages/operation/function/FunctionPage"),
);
// 운영 - 승인 관리
export const ApprovalPage = lazy(
  () => import("@/pages/operation/approval/ApprovalPage"),
);
// 운영 - 로그 관리
export const LogPage = lazy(() => import("@/pages/operation/log/LogPage"));

// 서비스 스케줄러
export const ServiceSchedulerPage = lazy(
  () => import("@/pages/service-scheduler/ServiceSchedulerPage"),
);

// 사용자 관리
export const UserManagementPage = lazy(
  () => import("@/pages/users/UserManagementPage"),
);

// 권한그룹 관리 (데모)
export const PermissionGroupPage = lazy(
  () => import("@/pages/permission-group/PermissionGroupPage"),
);
// 컴포넌트 데모 (기존 App.tsx 쇼케이스)
export const ShowcasePage = lazy(() => import("@/pages/showcase/ShowcasePage"));
