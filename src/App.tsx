import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import PracticeAreaPage from './pages/PracticeAreaPage'

// ── Scroll restoration ────────────────────────────────────────────────────────
// On route change: scroll to top for page navigations, or to the hash
// section for in-page anchor links (e.g. /#contact).
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else {
      setTimeout(() => {
        const el = document.getElementById(hash.slice(1))
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [pathname, hash])

  return null
}

// ── App ───────────────────────────────────────────────────────────────────────
const App: React.FC = () => (
  <>
    <ScrollToTop />
    <Navbar />
    <Routes>
      <Route path="/"                  element={<HomePage />} />
      <Route path="/about"             element={<AboutPage />} />
      <Route path="/practice/:slug"    element={<PracticeAreaPage />} />
      {/* Any unknown path → redirect cleanly to home */}
      <Route path="*"                  element={<Navigate to="/" replace />} />
    </Routes>
    <Footer />
  </>
)

export default App
