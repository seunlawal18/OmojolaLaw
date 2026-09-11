import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { X, Menu, Phone } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'

const Navbar: React.FC = () => {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [hovered,   setHovered]   = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && menuOpen) setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    if (href.includes('#')) {
      const id = href.split('#')[1]
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  const logoSrc = scrolled ? SITE_CONFIG.media.logoPath : SITE_CONFIG.media.logoWhitePath

  return (
    <>
      <style>{`
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
        @media (min-width: 901px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile   { display: none !important; }
        }
        @keyframes navUnderline {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

      <header className={`navbar ${scrolled ? 'navbar-solid' : 'navbar-transparent'}`} role="banner">
        <div className="container-site" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: scrolled ? '70px' : '80px', transition: 'height 0.3s ease',
        }}>

          {/* Logo */}
          <Link to="/" aria-label="Omojola Law — Home"
            style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <img src={logoSrc} alt="Omojola Law"
              style={{ height: '52px', width: 'auto', objectFit: 'contain', transition: 'opacity 0.3s ease' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                const fb = e.currentTarget.nextElementSibling as HTMLElement
                if (fb) fb.style.display = 'block'
              }} />
            <span style={{ display: 'none', fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 500, color: 'var(--color-ivory)' }}>
              Omojola <span style={{ color: 'var(--color-brass)' }}>Law</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="hidden-mobile"
            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            {SITE_CONFIG.nav.map((item) => {
              const isHovered = hovered === item.label
              return (
                <div key={item.label} style={{ position: 'relative' }}
                  onMouseEnter={() => setHovered(item.label)}
                  onMouseLeave={() => setHovered(null)}>
                  <Link
                    to={item.href}
                    onClick={() => handleNavClick(item.href)}
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 400,
                      letterSpacing: '0.04em',
                      color: isHovered ? 'var(--color-ivory)' : 'rgba(245,240,232,0.75)',
                      padding: '0.4rem 0.85rem',
                      transition: 'color 0.2s ease',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.label}
                    {/* Brass underline on hover */}
                    <span aria-hidden="true" style={{
                      display: 'block', height: '1px',
                      background: 'var(--color-brass)',
                      marginTop: '2px',
                      transformOrigin: 'left',
                      transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                      transition: 'transform 0.22s ease',
                    }} />
                  </Link>
                </div>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden-mobile"
            style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexShrink: 0 }}>
            <a href={SITE_CONFIG.contact.phoneHref}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'rgba(245,240,232,0.7)', transition: 'color 0.2s ease', textDecoration: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-brass-light)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,240,232,0.7)' }}
              aria-label={`Call: ${SITE_CONFIG.contact.phone}`}>
              <Phone size={14} strokeWidth={1.5} />
              <span>{SITE_CONFIG.contact.phone}</span>
            </a>
            <Link to="/#contact" className="btn-primary"
              style={{ padding: '0.6rem 1.4rem', fontSize: 'var(--text-xs)' }}
              onClick={() => handleNavClick('/#contact')}>
              Speak To An Attorney
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="show-mobile"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen} aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{ background: 'transparent', border: 'none', color: 'var(--color-ivory)', cursor: 'pointer', padding: '0.5rem', display: 'flex', alignItems: 'center' }}>
            {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div id="mobile-menu" ref={menuRef}
        className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen} role="dialog" aria-label="Mobile navigation menu">

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem var(--container-px)', borderBottom: 'var(--border-ivory)' }}>
          <Link to="/" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center' }}>
            <img src={SITE_CONFIG.media.logoPath} alt="Omojola Law"
              style={{ height: '44px', width: 'auto', objectFit: 'contain' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; const n = e.currentTarget.nextElementSibling as HTMLElement; if (n) n.style.display = 'block' }} />
            <span style={{ display: 'none', fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 500, color: 'var(--color-ivory)' }}>
              Omojola <span style={{ color: 'var(--color-brass)' }}>Law</span>
            </span>
          </Link>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu"
            style={{ background: 'transparent', border: 'none', color: 'var(--color-ivory)', cursor: 'pointer', padding: '0.5rem' }}>
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        <nav aria-label="Mobile navigation"
          style={{ flex: 1, overflowY: 'auto', padding: '2rem var(--container-px)', display: 'flex', flexDirection: 'column' }}>
          {SITE_CONFIG.nav.map((item, i) => (
            <Link key={item.label} to={item.href}
              onClick={() => handleNavClick(item.href)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 6vw, 2.5rem)',
                fontWeight: 400, color: 'var(--color-ivory)',
                padding: '0.75rem 0', borderBottom: 'var(--border-ivory)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(20px)',
                transition: `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`,
                textDecoration: 'none',
              }}>
              {item.label}
              <span style={{ color: 'var(--color-brass)', fontSize: '0.5em' }}>→</span>
            </Link>
          ))}
        </nav>

        <div style={{ padding: '2rem var(--container-px)', borderTop: 'var(--border-ivory)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <a href={SITE_CONFIG.contact.phoneHref} className="btn-primary btn-primary-full">
            <Phone size={14} strokeWidth={1.5} />
            {SITE_CONFIG.contact.phone}
          </a>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-stone)', fontFamily: 'var(--font-body)', textAlign: 'center' }}>
            Call for a free consultation
          </p>
        </div>
      </div>
    </>
  )
}

export default Navbar
