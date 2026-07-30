import {
  forwardRef,
  type HTMLAttributes,
} from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

/**
 * 배드롭(딤) 스타일입니다.
 * Dialog·AlertDialog가 공유합니다.
 */
export const backdropClassName = cn(
  "fixed inset-0 z-[200] bg-black/50",
  "transition-opacity duration-200",
  "data-[starting-style]:opacity-0",
  "data-[ending-style]:opacity-0",
);

/**
 * 팝업(모달 본체) 스타일입니다.
 * size 토큰(sm·default·lg)을 maxWidth로 매핑합니다.
 *
 * 주의: size별 maxWidth 값은 분석자료에 수치가 없어 잠정값이며,
 * 디자인 확정 시 조정합니다.
 */
export const popupVariants = cva(
  [
    "fixed left-1/2 top-1/2 z-[200]",
    "-translate-x-1/2 -translate-y-1/2",
    "w-[calc(100%-2rem)]",
    "rounded-lg border border-border bg-background text-foreground shadow-lg",
    "outline-none",
    "transition-all duration-200",
    "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
    "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
  ],
  {
    variants: {
      size: {
        sm: "max-w-sm",
        default: "max-w-lg",
        lg: "max-w-2xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export type DialogSize = "sm" | "default" | "lg";

/**
 * 모달 상단 영역입니다.
 * Title·Description을 담습니다.
 */
export const DialogHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col gap-1.5 border-b border-border px-6 py-4",
      className,
    )}
    {...props}
  />
));

DialogHeader.displayName = "DialogHeader";

/**
 * 모달 본문 영역입니다.
 * 폼·정보 등 소비 측 콘텐츠를 조립합니다.
 */
export const DialogBody = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "max-h-[70vh] overflow-y-auto px-6 py-4",
      className,
    )}
    {...props}
  />
));

DialogBody.displayName = "DialogBody";

/**
 * 모달 하단 액션 영역입니다.
 * 버튼을 children으로 주입합니다.
 */
export const DialogFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex justify-end gap-2 border-t border-border px-6 py-4",
      className,
    )}
    {...props}
  />
));

DialogFooter.displayName = "DialogFooter";
