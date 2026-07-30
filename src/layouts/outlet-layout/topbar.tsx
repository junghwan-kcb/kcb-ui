import { Button } from "@/shared/ui/button";

/**
 * 관리자 레이아웃의 상단바입니다.
 * 좌측 브랜드 · 우측 로그아웃 액션을 배치합니다.
 */
export function Topbar() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-background px-6">
      <span className="text-lg font-bold tracking-tight text-foreground">
        K-ai-M3
      </span>

      <Button variant="outline" size="sm">
        로그아웃
      </Button>
    </header>
  );
}
