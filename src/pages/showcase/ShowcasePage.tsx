import { useEffect, useState } from 'react';

import { ButtonShowcase } from '@/components/ui/CutomButton';
import { Avatar } from '@/shared/ui/avatar';
import { Input } from '@/shared/ui/input';
import {
  ProgressBar,
  type ProgressBarSegment,
} from '@/shared/ui/progress-bar';

/**
 * 컴포넌트 데모 페이지입니다. (공통 컴포넌트 쇼케이스)
 */
const SPLIT_BAR_CONFIG = [
  {
    key: 'learning',
    label: '학습',
    className: 'bg-emerald-700',
  },
  {
    key: 'validation',
    label: '검증',
    className: 'bg-blue-500',
  },
  {
    key: 'evaluation',
    label: '평가',
    className: 'bg-amber-500',
  },
] as const;

interface DatasetSplitResponse {
  learning: number;
  validation: number;
  evaluation: number;
}

const fetchDatasetSplit = (): Promise<DatasetSplitResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        learning: 70,
        validation: 20,
        evaluation: 10,
      });
    }, 2000);
  });
};

export default function ShowcasePage() {
  const [segments, setSegments] = useState<ProgressBarSegment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await fetchDatasetSplit();

        if (!isMounted) {
          return;
        }

        const nextSegments: ProgressBarSegment[] =
          SPLIT_BAR_CONFIG.map((item) => ({
            label: item.label,
            value: response[item.key],
            className: item.className,
          }));

        setSegments(nextSegments);
      } catch (error) {
        console.error('분할 데이터 조회 실패:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="p-10">
      <Input
        readOnly
        inputSize="sm"
        name="userName"
        placeholder="sm"
      />

      <Input
        invalid
        name="userName11"
        placeholder="invalid"
      />

      <Input
        startContent={<>검색...</>}
        placeholder="default"
        inputSize="lg"
      />

      <ButtonShowcase />

      <div className="flex items-center gap-4">
        <Avatar size="sm" name="홍길동" />
        <Avatar size="default" name="홍길동" />
        <Avatar size="lg" name="홍길동" />
      </div>

      <div className="w-[340px] space-y-2">
        <ProgressBar
          label="서버 용량"
          value={68}
          indicatorClassName="bg-amber-500"
        />

        {isLoading ? (
          <SplitBarLoading />
        ) : (
          <ProgressBar
            variant="split"
            segments={segments}
          />
        )}
      </div>
    </div>
  );
}

const SplitBarLoading = () => {
  return (
    <div
      className="w-full"
      role="status"
      aria-label="데이터를 불러오는 중"
    >
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full w-1/3 animate-pulse rounded-full bg-muted-foreground/30" />
      </div>

      <div className="mt-2 flex gap-4">
        <div className="h-4 w-16 animate-pulse rounded bg-muted" />
        <div className="h-4 w-16 animate-pulse rounded bg-muted" />
        <div className="h-4 w-16 animate-pulse rounded bg-muted" />
      </div>

      <span className="sr-only">
        데이터를 불러오는 중입니다.
      </span>
    </div>
  );
};
