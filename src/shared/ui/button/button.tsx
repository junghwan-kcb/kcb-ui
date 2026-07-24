import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { Loader2 } from "lucide-react";
import {
  cva,
  type VariantProps,
} from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

export const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2",
    "whitespace-nowrap rounded-md",
    "text-sm font-semibold",
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    "outline-none",
    "focus-visible:ring-[3px]",
    "focus-visible:ring-ring/40",
    "disabled:pointer-events-none",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
    "[&_svg]:pointer-events-none",
    "[&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: [
          "border border-primary",
          "bg-primary text-primary-foreground",
          "hover:bg-primary/90",
        ],

        outline: [
          "border border-border",
          "bg-background text-foreground",
          "hover:border-primary/40",
          "hover:bg-accent",
          "hover:text-accent-foreground",
        ],

        ghost: [
          "border border-transparent",
          "bg-transparent text-primary",
          "hover:bg-accent",
          "hover:text-primary",
        ],

        destructive: [
          "border border-destructive",
          "bg-destructive text-white",
          "hover:bg-destructive/90",
          "focus-visible:ring-destructive/30",
        ],
      },

      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-5 text-base",
        icon: "size-10 p-0",
      },
       loading: {
            true: [
            "border-primary/40",
            "bg-primary/45",
            "text-primary-foreground",
            "opacity-100",
            ],
            false: "",
        },
    },

    defaultVariants: {
      variant: "default",
      size: "md",
      loading: false,
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * 처리 중 상태입니다.
   * true이면 버튼을 비활성화하고 로딩 아이콘을 표시합니다.
   */
  loading?: boolean;

  /**
   * 로딩 중 표시할 문구입니다.
   */
  loadingText?: string;

  /**
   * 기본 로더 대신 사용할 요소입니다.
   */
  loadingIcon?: ReactNode;

  /**
   * 버튼 왼쪽에 표시할 아이콘입니다.
   */
  startIcon?: ReactNode;

  /**
   * 버튼 오른쪽에 표시할 아이콘입니다.
   */
  endIcon?: ReactNode;
}

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      className,
      variant,
      size,
      type = "button",
      loading = false,
      loadingText,
      loadingIcon,
      startIcon,
      endIcon,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading || undefined}
        data-loading={loading || undefined}
        className={cn(
          buttonVariants({
            variant,
            size,
            loading,
          }),
          loading && "cursor-wait",
          className,
        )}
        {...props}
      >
        {loading ? (
          <>
            {loadingIcon ?? (
              <Loader2
                className="size-4 animate-spin"
                aria-hidden="true"
              />
            )}

            {size !== "icon" && (
              <span>
                {loadingText ?? children}
              </span>
            )}
          </>
        ) : (
          <>
            {startIcon && (
              <span
                className="inline-flex"
                aria-hidden="true"
              >
                {startIcon}
              </span>
            )}

            {children}

            {endIcon && (
              <span
                className="inline-flex"
                aria-hidden="true"
              >
                {endIcon}
              </span>
            )}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";