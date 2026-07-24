import {
  forwardRef,
  type HTMLAttributes,
} from 'react';

import { cn } from '@/shared/lib/utils';

export type ProgressBarSize = 'sm' | 'default' | 'lg';

export interface ProgressBarSegment {
  /**
   * 구간 이름
   *
   * 예: 학습, 검증, 평가
   */
  label: string;

  /**
   * 구간 값
   *
   * 합계가 100이 아니어도 내부에서 비율로 환산합니다.
   */
  value: number;

  /**
   * 구간 색상
   *
   * 예: bg-primary, bg-blue-500
   */
  className?: string;
}

interface ProgressBarBaseProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * 진행 바 크기
   */
  size?: ProgressBarSize;

  /**
   * 트랙 스타일
   */
  trackClassName?: string;

  /**
   * 모서리 둥글기
   */
  rounded?: boolean;

  /**
   * 범례 표시 여부
   *
   * split 타입에서만 사용합니다.
   */
  showLegend?: boolean;
}

export interface DefaultProgressBarProps extends ProgressBarBaseProps {
  variant?: 'default';

  /**
   * 상단 왼쪽 라벨
   *
   * 예: 서버 용량
   */
  label?: string;

  /**
   * 진행률
   *
   * 0~100 범위로 제한됩니다.
   */
  value: number;

  /**
   * 상단 오른쪽 값 표시 여부
   */
  showValue?: boolean;

  /**
   * 진행 구간 스타일
   */
  indicatorClassName?: string;

  segments?: never;
}

export interface SplitProgressBarProps extends ProgressBarBaseProps {
  variant: 'split';

  /**
   * 분할 구간 목록
   */
  segments: ProgressBarSegment[];

  label?: never;
  value?: never;
  showValue?: never;
  indicatorClassName?: never;
}

export type ProgressBarProps =
  | DefaultProgressBarProps
  | SplitProgressBarProps;

const sizeClasses: Record<ProgressBarSize, string> = {
  sm: 'h-1.5',
  default: 'h-2.5',
  lg: 'h-4',
};

export const ProgressBar = forwardRef<
  HTMLDivElement,
  ProgressBarProps
>((props, ref) => {
  if (props.variant === 'split') {
    return <SplitProgressBar ref={ref} {...props} />;
  }

  return <DefaultProgressBar ref={ref} {...props} />;
});

ProgressBar.displayName = 'ProgressBar';

const DefaultProgressBar = forwardRef<
  HTMLDivElement,
  DefaultProgressBarProps
>(
  (
    {
      label,
      value,
      showValue = true,
      size = 'default',
      rounded = true,
      indicatorClassName,
      trackClassName,
      className,
      ...props
    },
    ref,
  ) => {
    const normalizedValue = clamp(value, 0, 100);

    return (
      <div
        ref={ref}
        className={cn('w-full', className)}
        {...props}
      >
        {(label || showValue) && (
          <div className="mb-1.5 flex items-center justify-between text-sm">
            {label ? <span>{label}</span> : <span />}

            {showValue && (
              <span>{normalizedValue}%</span>
            )}
          </div>
        )}

        <div
          className={cn(
            'w-full overflow-hidden bg-muted',
            sizeClasses[size],
            rounded && 'rounded-full',
            trackClassName,
          )}
          role="progressbar"
          aria-label={label ?? '진행률'}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={normalizedValue}
        >
          <div
            className={cn(
              'h-full bg-primary transition-[width] duration-300',
              rounded && 'rounded-full',
              indicatorClassName,
            )}
            style={{
              width: `${normalizedValue}%`,
            }}
          />
        </div>
      </div>
    );
  },
);

DefaultProgressBar.displayName = 'DefaultProgressBar';

const SplitProgressBar = forwardRef<
  HTMLDivElement,
  SplitProgressBarProps
>(
  (
    {
      segments,
      size = 'default',
      rounded = true,
      showLegend = true,
      trackClassName,
      className,
      ...props
    },
    ref,
  ) => {
    const validSegments = segments.filter(
      (segment) => segment.value > 0,
    );

    const total = validSegments.reduce(
      (sum, segment) => sum + segment.value,
      0,
    );

    return (
      <div
        ref={ref}
        className={cn('w-full', className)}
        {...props}
      >
        <div
          className={cn(
            'flex w-full overflow-hidden bg-muted',
            sizeClasses[size],
            rounded && 'rounded-full',
            trackClassName,
          )}
          role="img"
          aria-label={createSplitAriaLabel(
            validSegments,
            total,
          )}
        >
          {validSegments.map((segment, index) => {
            const percentage =
              total > 0
                ? (segment.value / total) * 100
                : 0;

            return (
              <div
                key={`${segment.label}-${index}`}
                title={`${segment.label} ${formatPercentage(
                  percentage,
                )}%`}
                className={cn(
                  'h-full shrink-0',
                  segment.className ?? 'bg-primary',
                )}
                style={{
                  width: `${percentage}%`,
                }}
                aria-hidden="true"
              />
            );
          })}
        </div>

        {showLegend && (
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            {validSegments.map((segment, index) => {
              const percentage =
                total > 0
                  ? (segment.value / total) * 100
                  : 0;

              return (
                <div
                  key={`${segment.label}-legend-${index}`}
                  className="flex items-center gap-1.5"
                >
                  <span
                    className={cn(
                      'size-2 shrink-0',
                      segment.className ?? 'bg-primary',
                    )}
                    aria-hidden="true"
                  />

                  <span>
                    {segment.label}{' '}
                    {formatPercentage(percentage)}%
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);

SplitProgressBar.displayName = 'SplitProgressBar';

const clamp = (
  value: number,
  min: number,
  max: number,
) => Math.min(Math.max(value, min), max);

const formatPercentage = (value: number) => {
  return Number.isInteger(value)
    ? value
    : Number(value.toFixed(1));
};

const createSplitAriaLabel = (
  segments: ProgressBarSegment[],
  total: number,
) => {
  if (total <= 0) {
    return '분할 진행률 데이터 없음';
  }

  return segments
    .map((segment) => {
      const percentage =
        (segment.value / total) * 100;

      return `${segment.label} ${formatPercentage(
        percentage,
      )}%`;
    })
    .join(', ');
};