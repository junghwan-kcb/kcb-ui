import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { NAV_GROUPS, type NavItem } from "./nav-config";

/**
 * 관리자 레이아웃의 좌측 사이드바입니다.
 * 메뉴 정의는 nav-config.ts, 표시 문구는 nav 네임스페이스에서 관리합니다.
 *
 * - 제목이 있는 대메뉴: 기본 닫힘. 클릭하면 하위 메뉴가 슬라이드로 열린다.
 * - 제목이 없는 그룹: 단독 메뉴로 항상 표시한다.
 * - 메뉴 이동(URL 변경) 시: 활성 페이지가 속한 대메뉴만 남기고 나머지는 슬라이드로 닫힌다.
 *
 * 열림 상태와 React key는 번역과 무관한 group.id를 쓴다.
 * 언어를 전환해도 펼쳐둔 메뉴가 그대로 유지되어야 하기 때문이다.
 */
export function Sidebar() {
  // 대메뉴(제목 있는 그룹)의 열림 상태. 기본은 전부 닫힘.
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const { t } = useTranslation("nav");
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  // URL이 바뀌면 현재 페이지가 속한 대메뉴만 열고 나머지는 닫는다.
  // 최초 진입에서는 자동으로 열지 않는다(기본 전부 닫힘 유지).
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const activeId = NAV_GROUPS.find(
      (group) =>
        group.titleKey && group.items.some((item) => item.to === pathname),
    )?.id;

    setOpenGroups(activeId ? { [activeId]: true } : {});
  }, [pathname]);

  const toggle = (id: string) =>
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <aside className="w-60 shrink-0 border-r border-border bg-background">
      <nav className="flex flex-col gap-1 p-4">
        {NAV_GROUPS.map((group) => {
          // ── 단독 메뉴 (제목 없음) — 항상 표시 ──
          if (!group.titleKey) {
            return (
              <div key={group.id} className="flex flex-col gap-1 py-1">
                {group.items.map((item) => (
                  <NavItemLink key={item.labelKey} item={item} />
                ))}
              </div>
            );
          }

          // ── 대메뉴 (제목 있음) — 클릭으로 열고 닫음 ──
          const isOpen = openGroups[group.id] ?? false;

          return (
            <div key={group.id} className="flex flex-col">
              <button
                type="button"
                onClick={() => toggle(group.id)}
                aria-expanded={isOpen}
                className="flex items-center justify-between rounded-md px-2 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {t(group.titleKey)}

                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                  aria-hidden="true"
                />
              </button>

              {/* grid-template-rows 0fr→1fr 슬라이드 (기초 분석자료 §4 패턴) */}
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-200 ease-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-1 pt-1 pl-2">
                    {group.items.map((item) => (
                      <NavItemLink key={item.labelKey} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

/**
 * 사이드바 메뉴 항목입니다.
 * ready + to가 있으면 링크, 아니면 "준비중" 표시.
 */
function NavItemLink({ item }: { item: NavItem }) {
  // 메뉴 라벨은 nav, "준비중" 같은 공용 상태 문구는 common에서 가져온다.
  const { t } = useTranslation(["nav", "common"]);
  const label = t(item.labelKey, { ns: "nav" });

  if (item.ready && item.to) {
    return (
      <NavLink
        to={item.to}
        className={({ isActive }) =>
          cn(
            "rounded-md px-2 py-1.5 text-sm transition-colors",
            isActive
              ? "bg-accent font-semibold text-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-foreground",
          )
        }
      >
        {label}
      </NavLink>
    );
  }

  return (
    <span
      className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-muted-foreground/50"
      aria-disabled="true"
    >
      {label}

      <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
        {t("status.comingSoon", { ns: "common" })}
      </span>
    </span>
  );
}
