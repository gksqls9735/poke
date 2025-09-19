import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './i18n';
import FullScreenLoader from './components/full-screen-loader.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense  fallback={<FullScreenLoader />}>
      <App />
    </Suspense>
  </StrictMode>,
)
