import { Link } from "react-router-dom";
import { Home } from "lucide-react";

interface ErrorScreenProps {
  /** 큰 코드 표기 (예: "404", "500", "Error") */
  code: string;
  /** 제목 */
  title: string;
  /** 안내 문구 */
  message: string;
}

/**
 * 에러/오류 전체화면 표시용 공용 컴포넌트입니다. (임시 — 기획 확정 시 교체)
 * 404·500·렌더링 오류 페이지가 공유합니다.
 */
export function ErrorScreen({ code, title, message }: ErrorScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#2f343b] px-6 text-center text-white">
      <p className="text-[120px] font-extrabold leading-none tracking-tight">
        {code}
      </p>

      <h1 className="text-2xl font-semibold">{title}</h1>

      <p className="max-w-md text-sm text-white/70">{message}</p>

      <Link
        to="/"
        className="mt-2 inline-flex items-center gap-2 rounded-md bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
      >
        <Home className="size-4" aria-hidden="true" />
        Home
      </Link>
    </div>
  );
}
