import { ErrorScreen } from "./ErrorScreen";

/** 500 Server Error 페이지입니다. (임시) */
export default function ServerErrorPage() {
  return (
    <ErrorScreen
      code="500"
      title="Server Error"
      message="요청하신 작업을 처리하는 중 에러가 발생하였습니다. 관리자에게 문의바랍니다."
    />
  );
}
