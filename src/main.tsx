import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element #root not found in document')
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter
      future={{
        // Opt in to v7 behaviours early — silences both deprecation warnings
        // and ensures zero breaking changes when we upgrade to React Router v7.
        v7_startTransition:    true,
        v7_relativeSplatPath:  true,
      }}
    >
      <App />
    </BrowserRouter>
  </StrictMode>
)
