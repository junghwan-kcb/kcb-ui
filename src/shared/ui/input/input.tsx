import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const inputVariants = cva(
  [
    "flex w-full min-w-0",
    "rounded-md border bg-background text-foreground",
    "transition-[border-color,box-shadow,background-color]",
    "placeholder:text-muted-foreground",
    "outline-none",
    "focus-visible:border-ring",
    "focus-visible:ring-[3px]",
    "focus-visible:ring-ring/20",
    "disabled:cursor-not-allowed",
    "disabled:bg-muted",
    "disabled:text-muted-foreground",
    "disabled:opacity-70",
    "read-only:bg-muted/50",
    "read-only:cursor-default",
    "aria-invalid:border-destructive",
    "aria-invalid:ring-destructive/20",

     // invalid
    "aria-invalid:border-destructive",
    "aria-invalid:bg-destructive/5",
    "aria-invalid:placeholder:text-destructive/60",
   
  ],
  {
    variants: {
      inputSize: {
        sm: "h-8 px-2.5 text-xs",
        md: "h-10 px-3 text-sm",
        lg: "h-11 px-3.5 text-base",
      },
    },
    defaultVariants: {
      inputSize: "md",
    },
  },
);

const inputWrapperVariants = cva(
  [
    "relative flex w-full items-center",
    "rounded-md",
    "transition-[border-color,box-shadow]",
  ],
  {
    variants: {
      inputSize: {
        sm: "[&>[data-slot=input-icon]]:size-3.5",
        md: "[&>[data-slot=input-icon]]:size-4",
        lg: "[&>[data-slot=input-icon]]:size-5",
      },
    },
    defaultVariants: {
      inputSize: "md",
    },
  },
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  /**
   * 입력창 왼쪽에 표시할 아이콘 또는 요소
   */
  startContent?: ReactNode;

  /**
   * 입력창 오른쪽에 표시할 아이콘 또는 요소
   */
  endContent?: ReactNode;

  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputSize,
      type = "text",
      startContent,
      endContent,
      disabled,
      readOnly,
      invalid,
      ...props
    },
    ref,
  ) => {
    const hasStartContent = Boolean(startContent);
    const hasEndContent = Boolean(endContent);

    return (
      <div
        className={inputWrapperVariants({ inputSize })}
        data-disabled={disabled || undefined}
        data-readonly={readOnly || undefined}
      >
        {hasStartContent && (
          <span
            data-slot="input-icon"
            className={cn(
              "min-w-10",
              "pointer-events-none absolute left-3 z-10",
              "flex items-center justify-center",
              "text-muted-foreground",
            )}
            aria-hidden="true"
          >
            {startContent}
          </span>
        )}

        <input
          ref={ref}
          type={type}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={invalid}
          className={cn(
            inputVariants({ inputSize }),
             invalid && [
                "border-destructive",
            ],
            hasStartContent && {
              sm: "pl-13",
              md: "pl-14",
              lg: "pl-15",
            }[inputSize ?? "md"],
            hasEndContent && {
              sm: "pr-8",
              md: "pr-9",
              lg: "pr-10",
            }[inputSize ?? "md"],
            className,
          )}
          {...props}
        />

        {hasEndContent && (
          <span
            data-slot="input-icon"
            className={cn(
              "absolute right-3 z-10",
              "flex items-center justify-center",
              "text-muted-foreground",
            )}
          >
            {endContent}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";