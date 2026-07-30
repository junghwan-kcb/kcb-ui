import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { PageLoading } from "@/layouts/page-loading";

/**
 * 로그인(인증) 레이아웃입니다.
 *
 * 전체 화면 중앙에 콘텐츠(로그인 카드 등)를 배치합니다.
 * 자식 페이지는 <Outlet /> 자리에 렌더링됩니다.
 */
export function LoginLayout() {
  // 경로가 바뀌면 Suspense 경계를 새로 마운트해 로딩 fallback이 뜨도록 한다.
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Suspense key={pathname} fallback={<PageLoading />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
