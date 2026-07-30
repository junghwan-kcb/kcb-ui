import { Button } from "@/shared/ui/button";

/**
 * 권한그룹 관리 페이지입니다. (자리표시 — 실제 데이터 연동은 담당 개발자가 구현)
 * 기본(OutletLayout) 레이아웃 하위에 렌더링됩니다.
 */
interface PermissionGroupRow {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const ROWS: PermissionGroupRow[] = [
  {
    id: "user",
    name: "user",
    createdAt: "2017-06-14 12:49:38.779",
    updatedAt: "2017-10-17 13:24:10.146",
  },
  {
    id: "system_admin",
    name: "system_admin",
    createdAt: "2017-07-10 15:29:00",
    updatedAt: "2017-07-10 15:29:00",
  },
  {
    id: "manager_admin",
    name: "manager_admin",
    createdAt: "2017-07-10 15:29:00",
    updatedAt: "2017-07-10 15:29:00",
  },
];

export default function PermissionGroupPage() {
  return (
    <section className="flex flex-col gap-4">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">권한그룹 관리</h1>
        <Button size="sm">등록</Button>
      </header>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="px-4 py-2.5 font-medium">권한그룹ID</th>
              <th className="px-4 py-2.5 font-medium">권한그룹명</th>
              <th className="px-4 py-2.5 font-medium">등록일자</th>
              <th className="px-4 py-2.5 font-medium">변경일자</th>
              <th className="px-4 py-2.5 text-right font-medium">메뉴 권한</th>
            </tr>
          </thead>

          <tbody>
            {ROWS.map((row) => (
              <tr
                key={row.id}
                className="border-b border-border last:border-0"
              >
                <td className="px-4 py-2.5">{row.id}</td>
                <td className="px-4 py-2.5">{row.name}</td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  {row.createdAt}
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  {row.updatedAt}
                </td>
                <td className="px-4 py-2.5 text-right">
                  <Button variant="outline" size="sm">
                    설정
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
