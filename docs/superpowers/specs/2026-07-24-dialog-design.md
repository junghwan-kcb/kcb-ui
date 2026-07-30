# Dialog / AlertDialog 설계 문서

- 작성일: 2026-07-24
- 상태: 승인됨 (brainstorming 완료)
- 근거 자료: `docs/reference/ui-component-analysis-summary.md` (원본 §3 인벤토리, §5 오버레이 정책, 쇼케이스 #23)
- 기반 라이브러리: `@base-ui/react` v1.6.0 (`dialog`, `alert-dialog` 프리미티브)

## 1. 배경 · 범위

분석자료에서 Dialog는 **2가지 용례**로만 등장한다.

| 유형 | 화면 | 구성 | 동작 |
|---|---|---|---|
| 생성(Create) 모달 | Datasets "소스팩 생성" | Header + 폼 Body + Footer(취소·생성) | Esc·배드롭·액션 닫힘 |
| 검토/결재(Review) 모달 | Approvals "배포 요청 검토" | Header + Body(정보 + Textarea) + Footer(반려·승인) | 승인/반려까지 블록, 안전 규칙 |

공통 스펙: `Dialog(+Header/Body/Footer)`, `maxWidth`, 스케일 인 애니메이션, z-index 200 (원본 §3·§5).

CommandPalette·Toast·Menu·Tooltip은 원본이 별도 오버레이로 구분하므로 **범위 제외**.

## 2. 확정 결정 사항 (brainstorming)

| # | 항목 | 결정 |
|---|---|---|
| 1 | 기반 | base-ui `dialog` 프리미티브 래핑 (접근성 로직 위임, 토큰 스타일만 입힘) |
| 2 | 파괴적 모달 | 별도 `AlertDialog` (base-ui `alert-dialog`, 안전 규칙 캡슐화) |
| 3 | 크기 | `size` 토큰(sm·default·lg) → 내부 maxWidth 매핑 |
| 4 | 닫힘 제어 | 제어형 `open` / `onOpenChange(open, eventDetails)` (base-ui 시그니처 그대로) |
| 5 | 배치 | `src/shared/ui/dialog/` (기존 컴포넌트 관례) |

## 3. 컴포넌트 구조 (composition 우선)

```
Dialog (root 래퍼: DialogRoot + Portal + Backdrop + Popup)
  ├─ Dialog.Header       styled <header> 슬롯
  ├─ Dialog.Title        base-ui DialogTitle (aria-labelledby 연결, 필수)
  ├─ Dialog.Description  base-ui DialogDescription (선택)
  ├─ Dialog.Body         스크롤 콘텐츠 영역 (소비 측 조립)
  ├─ Dialog.Footer       액션 버튼 슬롯 (children 주입)
  └─ Dialog.Close        base-ui DialogClose (X/취소 트리거)

AlertDialog (root 래퍼: AlertDialogRoot + Portal + Backdrop + Popup)
  · 배드롭/외부 클릭 닫힘 기본 차단 (base-ui alert-dialog 특성)
  · initialFocus prop → 안전(반려) 버튼에 기본 포커스
  · Header/Title/Description/Body/Footer/Close 파트는 Dialog와 동일 스타일 공유
```

boolean prop 남발 대신 **서브컴포넌트 합성**으로 구성한다(CLAUDE.md 규칙). Footer의 로딩/비활성은
Dialog가 아니라 **Button 상태로 흡수**한다(원본 §7).

## 4. 공개 Props API

### Dialog (root)
| prop | 타입 | 기본 | 근거 |
|---|---|---|---|
| `open` | `boolean` | — | 제어형 |
| `onOpenChange` | `(open, eventDetails) => void` | — | 원본: Esc·배드롭·액션 닫힘 통지 |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | 원본 maxWidth 래핑 (결정 #3) |
| `dismissable` | `boolean` | `true` | 결재 시 배드롭/외부 클릭 차단용 → `disablePointerDismissal` 매핑 |
| `initialFocus` | `Ref \| ...` | — | base-ui Popup 위임 (안전 포커스) |
| `className` | `string` | — | Popup 커스터마이즈 |
| `children` | `ReactNode` | — | 서브파트 |

### AlertDialog (root)
`Dialog`와 동일하되 `dismissable` 없음(항상 차단). `initialFocus`로 안전 버튼 지정.

### 서브파트
`Header` / `Body` / `Footer` : `{ className?, children }` — 스타일 컨테이너.
`Title` / `Description` / `Close` : base-ui 파트 위임 + 토큰 스타일.

## 5. 상태

원본 §3에는 Dialog의 상태로 `maxWidth`·`Esc/배드롭 닫힘`만 명시. 로딩/비활성 등은 새 상태를 만들지 않고
Footer 내부 Button의 상태(variant/loading/disabled)로 흡수한다(원본 §7).

## 6. 접근성 (base-ui 위임 + 래퍼 강제 기본값)

| 요구 | 처리 |
|---|---|
| 포커스 트랩 | base-ui `modal` 기본값 |
| Esc 닫힘 | base-ui 기본 (AlertDialog는 차단) |
| 배드롭 닫힘 | base-ui / `dismissable=false`로 차단 |
| role/aria-modal/labelledby | base-ui Popup + Title 연결 |
| 트리거로 포커스 복귀 | base-ui `finalFocus` 기본 |
| 안전 규칙(파괴적) | `AlertDialog` + `initialFocus`=반려 버튼, 닫힘 차단 (원본 §5) |

## 7. 디자인 토큰

- **z-index**: 200 (원본 §5). ⚠️ `index.css`에 z 토큰 미정의 → 우선 `z-[200]` 사용, **후속 토큰화 필요**.
- **모션**: 스케일 인 (원본 §5) → base-ui `data-[starting-style]`/`data-[ending-style]` + opacity/scale 트랜지션.
- **size→maxWidth 값**: 원본에 수치 없음. 잠정값 `sm=max-w-sm`, `default=max-w-lg`, `lg=max-w-2xl` (조정 가능).
- 색·반경: 기존 `--background`, `--border`, `--radius` 등 재사용, 배드롭 딤 `bg-black/50`.

> ⚠️ 원본에 없는 수치(size 값, z 토큰, 딤 투명도)는 잠정값이며 디자인 확정 시 조정한다.

## 8. 기존 코드 정합

- `src`에 기존 Dialog 없음 → 신규.
- base-ui 채택은 `components/ui/button.tsx`와 일관. `shared/ui`의 다른 컴포넌트(자체 cva)와는
  기반이 다르지만, 접근성이 중요한 오버레이는 프리미티브 위임이 타당.
- `src/index.ts`에 `export * from "@/shared/ui/dialog"` 추가.

## 9. 검증

`tsc -b`(typecheck) + `oxlint`(lint) + `vite build`. 테스트 러너(Vitest)는 현재 프로젝트에 없어 별도 도입 필요(후속).
