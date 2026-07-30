import { Loader2 } from "lucide-react";

/**
 * 페이지 전환(Suspense) 중 표시하는 임시 로딩 컴포넌트입니다.
 * lazy 페이지 청크가 로드되는 동안 fallback으로 렌더링됩니다.
 */
export function PageLoading() {
  return (
    <div
      className="flex min-h-40 w-full flex-col items-center justify-center gap-3 py-10"
      role="status"
      aria-live="polite"
    >
      <Loader2
        className="size-6 animate-spin text-primary"
        aria-hidden="true"
      />

      <span className="text-sm text-muted-foreground">불러오는 중…</span>

      <span className="sr-only">페이지를 불러오는 중입니다.</span>
    </div>
  );
}
