import { ErrorScreen } from "./ErrorScreen";

/** 404 Not Found 페이지입니다. (임시) */
export default function NotFoundPage() {
  return (
    <ErrorScreen
      code="404"
      title="Not Found"
      message="요청하신 페이지를 찾을 수 없습니다. 관리자에게 문의바랍니다."
    />
  );
}
