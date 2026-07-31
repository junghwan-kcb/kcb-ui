import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

import { SUPPORTED_LOCALES } from "./locale";
import { useLocale } from "./use-locale";

export interface LocaleSwitcherProps {
  className?: string;
}

/**
 * 언어 전환 UI입니다. (앱 전용 — 공통 컴포넌트가 아니다)
 *
 * 지원 언어를 세그먼트 버튼으로 나열하고 현재 언어를 눌린 상태로 표시한다.
 * 언어 이름은 항상 해당 언어 자체로 적는다(한국어 / English).
 * 읽지 못하는 언어로 표기하면 전환 자체가 불가능해지기 때문이다.
 */
export function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const { t } = useTranslation();
  const { locale, setLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label={t("language.label")}
      className={cn("inline-flex items-center gap-1", className)}
    >
      {SUPPORTED_LOCALES.map((code) => {
        const isActive = code === locale;

        return (
          <Button
            key={code}
            size="sm"
            variant={isActive ? "default" : "ghost"}
            aria-pressed={isActive}
            onClick={() => setLocale(code)}
          >
            {t(`language.${code}`)}
          </Button>
        );
      })}
    </div>
  );
}
