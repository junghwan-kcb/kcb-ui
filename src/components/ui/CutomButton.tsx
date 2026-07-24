import {useState} from 'react';

import { Plus } from "lucide-react";

import { Button } from "@/shared/ui/button";

export const ButtonShowcase = () => {

    const [cnt,setCnt] = useState(0);

    const handleSave = () => {
        setCnt((prev)=> prev+1);
    };

    const handleDisCount = () => {
        setCnt((prev)=> prev-1);
    };

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-start gap-5">
        {cnt}
        <ButtonLabel label="default">
          <Button onClick={handleSave}>
            증가
          </Button>
        </ButtonLabel>

        <ButtonLabel label="outline">
          <Button 
            variant="outline"
            onClick={handleDisCount}  
          >
            감소
          </Button>
        </ButtonLabel>

        <ButtonLabel label="ghost">
          <Button variant="ghost">
            고스트
          </Button>
        </ButtonLabel>

        <ButtonLabel label="destructive">
          <Button variant="destructive">
            삭제
          </Button>
        </ButtonLabel>

        <ButtonLabel label="loading">
          <Button
            loading
            loadingText="처리 중..."
          >
            처리 중...
          </Button>
        </ButtonLabel>

        <ButtonLabel label="disabled">
          <Button disabled>
            비활성
          </Button>
        </ButtonLabel>
      </div>

 {/* 아이콘 전용 버튼은 텍스트가 보이지 않기 때문에 반드시 aria-label 을 넘겨야함 */}
      <ButtonLabel label="icon">
        <Button
          size="icon"
          aria-label="추가"
        >
          <Plus className="size-4" />
        </Button>
      </ButtonLabel>
    </section>
  );
};

interface ButtonLabelProps {
  label: string;
  children: React.ReactNode;
}

const ButtonLabel = ({
  label,
  children,
}: ButtonLabelProps) => {
  return (
    <div className="flex flex-col items-center gap-1.5">
      {children}

      <span className="text-xs text-muted-foreground">
        {label}
      </span>
    </div>
  );
};