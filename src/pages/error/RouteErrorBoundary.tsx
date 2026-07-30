import {
  isRouteErrorResponse,
  useRouteError,
} from "react-router-dom";

import NotFoundPage from "./NotFoundPage";
import RenderErrorPage from "./RenderErrorPage";
import ServerErrorPage from "./ServerErrorPage";

/**
 * 라우트 에러 바운더리입니다. (router의 errorElement)
 *
 * 발생한 에러 종류에 따라 알맞은 오류 화면으로 분기한다.
 * - 매칭되지 않는 URL(React Router가 던지는 404) → 404
 * - 그 외 HTTP 상태 응답(500 등) → 500
 * - 로더/렌더 중 발생한 런타임 에러(lazy 청크 로드 실패 포함) → React 렌더링 오류
 */
export function RouteErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFoundPage />;
    }

    return <ServerErrorPage />;
  }

  return <RenderErrorPage />;
}
