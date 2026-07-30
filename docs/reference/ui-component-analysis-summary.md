# UI Component 기초 분석자료 — 요약본

> 원본: `docs/reference/UI Component 기초 분석자료_v1_20260721.html`
> (KAI-M3 Design System 분석 기반 · v0.4 · 2026-07-21 / "Pylon Design System Spec")
>
> 이 요약본은 **원본 자료에 실제로 기술된 내용만** 정리한다. 원본에 없는 컴포넌트·상태·토큰은
> 추가하지 않았으며, 원본 범주와 CLAUDE.md 범주가 다른 부분은 해석임을 별도 표시했다.
>
> **출처 성격(원본 "안내" 인용):** 시각 예시는 KAI-M3 프로토타입을 분석 자료로 삼아 구성한
> 참고용 목업이며, Pylon UI-Framework의 실제 디자인(색상·형태·레이아웃)은 추후 변경될 수 있다.
> 원 소스는 KAI-M3 Redesign 프로토타입(React 18 SPA, 약 20개 화면)과 `component-inventory.md`다.

---

## 1. 공통 컴포넌트 후보 전체 목록

원본 3장 "컴포넌트 인벤토리"에 인벤토리로 등재된 컴포넌트(원본 범주 그대로):

| 원본 범주 | 컴포넌트 |
|---|---|
| Core | Button, Icon, Tooltip, Kbd |
| Forms | Field, Input, Textarea, Select, Checkbox, RadioGroup, Switch |
| Data display | Table, StatusPill, StrategyBadge, Badge, StatCard, KpiCard, Avatar, ProgressBar, SplitBar, Pagination, Sparkline, DataToolbar, LabeledRow |
| Navigation | Tabs, Segmented, Breadcrumb |
| Feedback | EmptyState, Skeleton / TableSkeleton |
| Overlays | Dialog(+Header/Body/Footer), ToastViewport + toast(), CommandPalette |

추가로 원본 5장(오버레이·모달 정책)에만 등장 → **Menu(+MenuItem)**

원본 2장(화면→컴포넌트 매핑)에만 등장하고 인벤토리 표에는 없음(§8에서 재확인 필요):
**Card, Sidebar, Topbar**

> 인벤토리 승격 판정 기준(원본 3장): (1) 2회 이상 재사용, (2) 단일 책임,
> (3) 토큰 기반 스타일링, (4) 상태의 props 외부화.

---

## 2. 범주 분류 (primitive / composite / layout / overlay / form / data-display)

> ⚠️ **해석 주의:** 원본은 `Core / Forms / Data display / Navigation / Feedback / Overlays`
> 범주를 사용한다. 아래 6분류는 CLAUDE.md가 요구하는 범주로 **재매핑한 해석**이며,
> 원본이 직접 규정한 분류가 아니다. 다중 범주에 걸치는 항목은 대표 범주에 배치했다.

| CLAUDE.md 범주 | 매핑된 컴포넌트 | 비고 |
|---|---|---|
| **primitive** | Button, Icon, Kbd, Badge, Avatar, StatusPill, StrategyBadge, ProgressBar, SplitBar, Sparkline | 최소 표시 단위 |
| **form** | Field, Input, Textarea, Select, Checkbox, RadioGroup, Switch | 원본 "Forms"와 대응 |
| **composite** | Table, StatCard, KpiCard, DataToolbar, LabeledRow, Pagination, Tabs, Segmented, Breadcrumb | 프리미티브 조합 |
| **layout** | Card, Sidebar, Topbar | 원본 인벤토리에 정식 등재 안 됨 → §8 |
| **overlay** | Dialog, ToastViewport/toast(), Menu, Tooltip, CommandPalette | 원본 5장 정책과 대응 |
| **data-display** | StatusPill, Badge, StatCard, KpiCard, Avatar, ProgressBar, SplitBar, Pagination, Sparkline, LabeledRow, Table | 원본 "Data display"와 대응 |

> 겹침 사례: Input/Textarea/Select 등은 form이자 primitive, Table/StatCard 등은 composite이자
> data-display로 볼 수 있다. Tooltip·CommandPalette는 원본에서 Core/Overlays 양쪽에 나타난다.

---

## 3. 공통 라이브러리에 포함하면 안 되는 업무 전용(도메인 종속) 항목

> ⚠️ **해석 주의:** 원본은 "이 컴포넌트는 공통에서 제외" 형태의 **명시적 제외 목록을 제공하지 않는다.**
> 아래는 원본 7장 재사용 원칙("업무 도메인 값을 컴포넌트에 넣지 않는다", "고정 어휘")과
> 원본에 드러난 KAI-M3(신용평가 MLOps) 도메인 값을 근거로 한 **판단 후보**다. 확정은 §8 참고.

- **도메인 데이터/화면 자체** — 대시보드 KPI(학습 모델·데이터셋·배포 완료·결재 대기), 소스팩 목록,
  결재(Approvals) 화면 등은 화면(Screen)의 책임이며 공통 컴포넌트가 아니다.
- **도메인 종속 테이블 유형(6장)** — 모델 성능 비교(MetricTable: KS·AUROC), EDA 기술통계(describe),
  변수 구간화(WOE·IV). 지표·통계 어휘가 신용평가 모델링에 종속.
- **도메인 어휘를 담는 라벨 컴포넌트의 "값"** — StrategyBadge의 값(역할 기반·비율 분할·Interval 분할),
  StatusPill의 고정 어휘(ready·running·done·error·draft·pending)는 도메인 어휘다.
  → 컴포넌트 골격은 공통이되 **어휘 값은 Props/설정으로 주입**해야 함(원본 7장 "고정 어휘" 원칙).

---

## 4. 반복되는 시각적 패턴 · 상호작용 패턴

### 상호작용 패턴 (원본 4장 "이벤트 처리 계약")
컴포넌트는 상태를 소유하지 않고 `value`/`onChange`로 외부화(제어형). 라우팅·데이터 fetching은 화면이 소유.

| 이벤트 | 계약 / 표현 |
|---|---|
| click(주 액션) | Button — variant · onClick · loading/disabled, rest→press(1px 눌림 + 어두워짐) |
| hover | `--accent` 워시(전역 규칙), 테이블 행 hover 시 chevron 표시 |
| focus-visible | `.focus-ring` 유틸 — `--ring` 2px, **키보드 한정** |
| sort | Table — `sort{field,order}` + `onSort(field)`, 클릭마다 asc ⇄ desc |
| filter | Input/Select(제어형) + 활성 필터 카운트 배지 → DataToolbar 조합 |
| toggle | Segmented · Switch/아이콘 Button — `value`/`onChange` |
| navigate | 화면이 라우팅 소유, 컴포넌트는 `onClick`/`onRowClick`/`onNavigate`만 노출 |
| submit/validate | Field(error)+Input(invalid) — 실패 시 인라인 에러, 성공 시 toast |
| expand/collapse | 토글 state + `grid-template-rows 0fr→1fr` 모션 |

### 시각적 패턴
- **상태 표기**: StatusPill = 색 + 점 + 글자(고정 어휘). StrategyBadge/Badge = tone 기반 라벨.
- **지표 카드**: StatCard/KpiCard = tone + delta(▲/▼) + icon.
- **비율 시각화**: ProgressBar(단일), SplitBar(학습 70%·검증 20%·평가 10% 다분할), Sparkline(area/line/bars).
- **숫자·ID 표기**: 모노스페이스 폰트(JetBrains Mono) — 수치, id(sp_...), 단축키.
- **빈/로딩 상태**: EmptyState(icon+title+action), Skeleton/TableSkeleton(shimmer rows).

---

## 5. 각 컴포넌트의 상태 요구사항 (원본 3장 "주요 상태·variant")

| 컴포넌트 | 상태 · variant |
|---|---|
| Button | variant: default·outline·ghost·destructive / size: sm·default·lg·icon / loading · disabled |
| Icon | size · currentColor · label(a11y) |
| Tooltip | top / bottom / left / right |
| Kbd | 단축키 표기(⌘K) |
| Field | required · error · hint |
| Input | sm·default·lg · invalid · iconLeft |
| Textarea | invalid · rows |
| Select | options · placeholder · invalid |
| Checkbox · RadioGroup · Switch | checked · disabled · desc |
| Table | columns · sort · onRowClick · empty |
| StatusPill | ready·running·done·error·draft·pending (고정 어휘) |
| StrategyBadge · Badge | tone · variant |
| StatCard · KpiCard | tone · delta · icon |
| Avatar | sm–xl · tone · 이니셜/이미지 |
| ProgressBar · SplitBar | tone · value · showValue |
| Pagination | page · pageCount · label |
| Sparkline | area·line·bars · tone |
| DataToolbar | filter toggle · count badge · create action |
| LabeledRow | label · mono value · dt/dd 쌍 |
| Tabs | count 칩 · icon |
| Segmented | sm·default (언어/뷰 토글) |
| Breadcrumb | onClick 항목 · 현재 페이지 강조 |
| EmptyState | icon · title · action |
| Skeleton / TableSkeleton | line·block·table |
| Dialog | maxWidth · Esc/배드롭 닫힘 |
| ToastViewport + toast() | success·error·info · duration |
| CommandPalette | ⌘K 트리거 · 검색 · Esc 닫힘 |

> 공통 상태 원칙(원본 7장): hover·focus·active·disabled·loading·invalid는 새 컴포넌트가 아니라
> **기존 컴포넌트의 상태(variant)로 흡수**한다.

---

## 6. 접근성 요구사항 (원본 곳곳 + 7장 "접근성 기본값")

- **포커스**: `.focus-ring` 유틸을 기본 적용, `--ring` 2px 아웃라인은 **키보드 포커스(focus-visible) 한정**.
- **아이콘**: 의미 있는 아이콘은 `label`(음성 라벨) **필수**, 장식용 아이콘은 `aria-hidden` 처리.
- **히트 타깃**: 44px 히트 타깃 기본 적용.
- **오버레이**: 모달은 **Esc 닫힘 + 포커스 트랩** 기본 적용.
- **결재(파괴적 액션) 안전 규칙**: 되돌릴 수 없는 결정은 **기본 포커스를 안전(반려) 쪽**에 두고,
  **사유 입력을 필수화**하여 감사 로그에 남긴다.
- **일반**: `aria-*` 속성 기본 제공.

---

## 7. 디자인 토큰 후보

원본은 색·반경·그림자·모션을 CSS 변수로 정의하고 하드코딩을 금지하며 다크모드에 자동 대응한다(7장).
원본 문서 스타일에 실제로 선언된 변수:

**색상(HSL 변수)**
`--ink`, `--muted`, `--sage`, `--sage-dark`, `--sage-soft`, `--bg`, `--card`,
`--border`, `--border-strong`, `--navy`, `--sidebar-muted`, `--gold`,
`--warn-bg` / `--warn-border` / `--warn-fg`, `--info-bg` / `--info-fg`,
`--success-solid`, `--warning-solid`, `--danger-solid`, `--danger-fg`,
`--purple-fg`, `--purple-bg`, (`--accent` 워시, `--ring` 포커스 — 4장 언급)

**타이포그래피**
- 본문: Pretendard
- 숫자 · ID · 코드 · 단축키: JetBrains Mono(모노스페이스)

**z-index 스케일(원본 5장)**
| 레이어 | z |
|---|---|
| 드롭다운(Menu) | 30–50 |
| 툴팁(Tooltip) | 60 |
| 모달(Dialog) / 커맨드 팔레트 | 200 |
| 토스트 | 300 |

**모션 · 시간**
- 하위 메뉴 펼침: `grid-template-rows 0fr→1fr`
- 모달: 스케일 인 / press: 1px 눌림
- 토스트 자동 소멸: 3.2s

> 원본은 색·반경(radius)·그림자·모션을 토큰화 대상으로 명시하나, **반경·그림자의 구체 값은
> 문서 텍스트에 수치로 제시되지 않았다**(§8).

---

## 8. 불명확하거나 추가 확인이 필요한 부분

1. **원본 형식** — 원본 HTML은 렌더링용 번들(base64+gzip)이라 그대로는 본문이 안 보인다.
   내용은 번들을 디코딩해 추출했으며, CLAUDE.md가 언급한 `ui-component-analysis.html`(원본 세부 자료)은
   현재 `docs/reference/`에 **존재하지 않는다**.
2. **범주 불일치** — 원본 범주(Core/Forms/Data display/Navigation/Feedback/Overlays)와
   CLAUDE.md 범주(primitive/composite/layout/overlay/form/data-display)가 다르다. 2장 매핑은 해석이다.
   특히 **primitive / composite / layout** 대응은 원본에 직접 근거가 없다.
3. **인벤토리 누락** — Card, Sidebar, Topbar, Menu는 화면 매핑/오버레이 정책에는 나오지만
   3장 인벤토리 표에는 정식 등재되지 않았다. 공통 컴포넌트로 확정할지 확인 필요.
4. **업무 전용 제외 목록** — 원본은 명시적 "공통 제외" 목록을 주지 않는다. 3장의 제외 후보는
   도메인 종속성에 근거한 판단이며, 최종 포함/제외는 승인 필요.
5. **토큰 수치 미제공** — 색상은 변수명만, 반경/그림자는 구체 수치가 텍스트에 없다. 실제 값 확정 필요.
6. **Avatar tone / xl, Sparkline bars 등** — 상태·variant는 명시됐으나 세부 스펙(색 tone 종류 등)은 미상.
7. **목업 면책** — 원본 "안내"에 따라 시각(색/형태/레이아웃)은 참고용이며 실제 Pylon 디자인은 바뀔 수 있다.

---

## 9. 기존 프로젝트 컴포넌트와 중복되는 항목

현재 `src`에 이미 구현된 컴포넌트 ↔ 원본 인벤토리 대조:

| 기존 구현 | 위치 | 원본 대응 | 중복/차이 |
|---|---|---|---|
| Button | `src/shared/ui/button` | Button(Core) | variant(default·outline·ghost·destructive)·loading 일치. **size는 기존 `md` vs 원본 `default`** 명명 차이 |
| Button(중복) | `src/components/ui/button.tsx` | Button | base-ui 기반 별도 구현. index.ts 미export(내부 중복) |
| Input | `src/shared/ui/input` | Input(Forms) | inputSize(sm·default·lg)·invalid·startContent(≈iconLeft) 일치 |
| Avatar | `src/shared/ui/avatar` | Avatar(Data display) | 이니셜/사이즈 일치. 원본의 **tone·xl·이미지**는 미확인 |
| ProgressBar | `src/shared/ui/progress-bar` | ProgressBar·SplitBar | 단일/`split`(segments) 지원 — 원본 SplitBar와 대응 |

**중복 관련 확인 사항**
- Button이 `shared/ui`와 `components/ui` 두 곳에 존재(디자인 언어 상이) → 표준 1개 확정 필요.
- 기존 4개(Button·Input·Avatar·ProgressBar)는 원본 인벤토리에 모두 존재하므로,
  신규 구현보다 **기존 확장/정합**이 우선(CLAUDE.md "기존 재사용 우선" 규칙).
- size 명명(`md` vs `default`) 등 토큰/명명 규칙 정합 필요.
