// clsx는 클래스들을 조건에 따라 합친다
import { clsx, type ClassValue } from "clsx"
// 서로 충돌하는 tailwind 클래스 정리
// px-2 px-6 이면 px-6이 최종 적용
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
