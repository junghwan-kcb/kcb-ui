import {
  forwardRef,
  useMemo,
  useState,
  type HTMLAttributes,
  type ImgHTMLAttributes,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';

const avatarVariants = cva(
  [
    'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full',
    'bg-primary/10 text-primary',
    'font-semibold select-none',
  ],
  {
    variants: {
      size: {
        sm: 'size-8 text-sm',
        default: 'size-10 text-base',
        lg: 'size-14 text-xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export interface AvatarProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  /**
   * 프로필 이미지 주소
   */
  src?: string;

  /**
   * 이미지 대체 텍스트
   *
   * src가 존재할 때 접근성을 위해 전달하는 것을 권장합니다.
   */
  alt?: string;

  /**
   * 이미지가 없거나 로딩에 실패했을 때 표시할 내용
   *
   * 전달하지 않으면 name을 기반으로 자동 생성합니다.
   */
  fallback?: string;

  /**
   * fallback을 자동으로 생성할 이름
   *
   * 예: "홍길동" → "홍"
   * 예: "John Doe" → "JD"
   */
  name?: string;

  /**
   * 이미지에 전달할 추가 속성
   */
  imageProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      src,
      alt,
      fallback,
      name,
      size,
      imageProps,
      className,
      ...props
    },
    ref,
  ) => {
    const [hasImageError, setHasImageError] = useState(false);

    const fallbackText = useMemo(
      () => fallback ?? createAvatarFallback(name),
      [fallback, name],
    );

    const shouldShowImage = Boolean(src) && !hasImageError;

    return (
      <span
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        aria-label={!shouldShowImage ? alt ?? name : undefined}
        {...props}
      >
        {shouldShowImage ? (
          <img
            src={src}
            alt={alt ?? name ?? ''}
            className="size-full object-cover"
            onError={(event) => {
              setHasImageError(true);
              imageProps?.onError?.(event);
            }}
            {...imageProps}
          />
        ) : (
          <span aria-hidden="true">{fallbackText}</span>
        )}
      </span>
    );
  },
);

Avatar.displayName = 'Avatar';

const createAvatarFallback = (name?: string) => {
  if (!name?.trim()) {
    return '';
  }

  const normalizedName = name.trim();
  const words = normalizedName.split(/\s+/);

  // 공백이 있는 영문 이름: John Doe → JD
  if (words.length >= 2) {
    return words
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase();
  }

  // 한글 이름 또는 한 단어 이름: 홍길동 → 홍
  return normalizedName.charAt(0).toUpperCase();
};