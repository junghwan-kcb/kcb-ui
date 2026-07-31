import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";

import { Button,Input } from "@up/ui";

/**
 * 로그인 페이지입니다. (자리표시 — 실제 인증 로직은 담당 개발자가 구현)
 * 공통 라이브러리의 Input · Button을 사용합니다.
 */
export default function LoginPage() {
  const { t } = useTranslation("auth");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: 인증 로직 연결
  };

  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-background p-8 shadow-sm">
      <h1 className="mb-6 text-xl font-bold text-foreground">
        {t("loginTitle")}
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-foreground">
            {t("username")}
          </span>
          <Input
            name="username"
            placeholder={t("username")}
            autoComplete="username"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-foreground">
            {t("password")}
          </span>
          <Input
            name="password"
            type="password"
            placeholder={t("password")}
            autoComplete="current-password"
          />
        </label>

        <Button type="submit" className="mt-2 w-full">
          {t("submit")}
        </Button>
      </form>
    </div>
  );
}
