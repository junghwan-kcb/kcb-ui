import { useTranslation } from "react-i18next";

import { LocaleSwitcher } from "@/app/i18n";
import { Button } from "@/shared/ui/button";

/**
 * 관리자 레이아웃의 상단바입니다.
 * 좌측 브랜드 · 우측 언어 전환과 로그아웃 액션을 배치합니다.
 */
export function Topbar() {
  const { t } = useTranslation();

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-background px-6">
      {/* 제품명은 고유명사이므로 번역하지 않는다. */}
      <span className="text-lg font-bold tracking-tight text-foreground">
        K-ai-M3
      </span>

      <div className="flex items-center gap-3">
        <LocaleSwitcher />

        <Button variant="outline" size="sm">
          {t("actions.logout")}
        </Button>
      </div>
    </header>
  );
}
