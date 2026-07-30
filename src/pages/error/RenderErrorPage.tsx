import { ErrorScreen } from "./ErrorScreen";

/** React 렌더링(런타임) 오류 페이지입니다. (임시) */
export default function RenderErrorPage() {
  return (
    <ErrorScreen
      code="Error"
      title="화면 오류"
      message="화면을 표시하는 중 오류가 발생했습니다. 관리자에게 문의바랍니다."
    />
  );
}
