import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { PageLoading } from "@/layouts/page-loading";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

/**
 * 기본(Outlet) 레이아웃입니다.
 *
 * 상단바 + 좌측 사이드바 + 콘텐츠 영역으로 구성됩니다.
 * 자식 페이지는 <Outlet /> 자리에 렌더링됩니다.
 */
export function OutletLayout() {
  // 경로가 바뀌면 Suspense 경계를 새로 마운트해 로딩 fallback이 뜨도록 한다.
  // (RouterProvider의 네비게이션 transition이 fallback을 억제하는 것을 회피)
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Topbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 overflow-auto p-8">
          <Suspense key={pathname} fallback={<PageLoading />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
