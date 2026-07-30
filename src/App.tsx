import { RouterProvider } from "react-router-dom";

import { router } from "@/app/router";

/**
 * 애플리케이션 루트입니다.
 * 라우터를 통해 레이아웃 → 페이지가 렌더링됩니다.
 */
export function App() {
  return (
    <>
     <RouterProvider router={router} />
    </>
  )
  
}
