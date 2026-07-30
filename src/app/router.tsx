import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import { OutletLayout } from "@/layouts/outlet-layout";
import { LoginLayout } from "@/layouts/login-layout";

// 404 · 500 · 렌더링 오류를 분기 처리하는 라우트 에러 바운더리.
import { RouteErrorBoundary } from "@/pages/error";

// 페이지는 lazy로 분리 로드된다. 정의는 ./lazy-pages 참고.
import {
  ApprovalPage,
  CalibrationPage,
  DatasetPage,
  DatasourcePage,
  DeploymentPage,
  FunctionPage,
  LoginPage,
  LogPage,
  MetadatasetPage,
  ModelManagementPage,
  ModelPage,
  PermissionGroupPage,
  ProjectManagementPage,
  ProtocolPage,
  ServiceSchedulerPage,
  ShowcasePage,
  UserManagementPage,
  ValidationPage,
} from "./lazy-pages";

// vite base('/pylon-manager/react/')에 맞춘 basename. dev에서는 '/'.
const basename = import.meta.env.BASE_URL.replace(/\/+$/, "") || "/";

export const router = createBrowserRouter(
  [
    {
      // ── 루트: 404 + 런타임 에러를 errorElement로 처리 ──
      errorElement: <RouteErrorBoundary />,
      children: [
        {
          // ── 로그인(인증) 레이아웃 ──
          element: <LoginLayout />,
          children: [{ path: "login", element: <LoginPage /> }],
        },
        {
          // ── 기본(Outlet) 레이아웃 ──
          element: <OutletLayout />,
          children: [
        { index: true, element: <Navigate to="/project-management" replace /> },

        // 프로젝트 관리
        { path: "project-management", element: <ProjectManagementPage /> },

        // 데이터관리
        {
          path: "data-management",
          children: [
            { path: "datasource", element: <DatasourcePage /> },
            { path: "metadataset", element: <MetadatasetPage /> },
            { path: "dataset", element: <DatasetPage /> },
          ],
        },

        // 모델 관리
        { path: "model", element: <ModelPage /> },

        // 분석 도구
        {
          path: "analysis-tools",
          children: [
            { path: "calibration", element: <CalibrationPage /> },
            { path: "validation", element: <ValidationPage /> },
          ],
        },

        // 배포관리
        { path: "deployment", element: <DeploymentPage /> },

        // 운영관리
        {
          path: "operation",
          children: [
            { path: "model-management", element: <ModelManagementPage /> },
            { path: "protocol", element: <ProtocolPage /> },
            { path: "function", element: <FunctionPage /> },
            { path: "approval", element: <ApprovalPage /> },
            { path: "log", element: <LogPage /> },
          ],
        },

        // 서비스 스케줄러
        { path: "service-scheduler", element: <ServiceSchedulerPage /> },

        // 사용자 관리
        { path: "users", element: <UserManagementPage /> },

        // 데모(기존)
        { path: "permission-groups", element: <PermissionGroupPage /> },
        { path: "showcase", element: <ShowcasePage /> },
          ],
        },
      ],
    },
  ],
  { basename },
);
