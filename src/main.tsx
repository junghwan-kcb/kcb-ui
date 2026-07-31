import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";
import { App } from '@/App'
import { initI18n } from '@/app/i18n'

// 번역 리소스가 번들에 포함되어 있어 동기로 끝난다.
// 렌더 전에 호출하므로 화면은 첫 프레임부터 올바른 언어로 그려진다.
initI18n();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
