import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Star, ChevronLeft, ChevronRight, ExternalLink, Quote } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'
import { useRevealChildren } from '../hooks/useReveal'

// ── Helpers ───────────────────────────────────────────────────────────────────
const useVisibleCount = () => {
  const [count, setCount] = useState(3)
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 560)       setCount(1)
      else if (window.innerWidth < 900)  setCount(2)
      else                               setCount(3)
    }
    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])
  return count
}

const GoogleIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

const Stars = ({ count = 5, size = 13 }: { count?: number; size?: number }) => (
  <div style={{ display: 'flex', gap: '2px' }} aria-label={`${count} out of 5 stars`} role="img">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={size} strokeWidth={0} fill={i < count ? '#f4b400' : '#e0e0e0'} aria-hidden="true" />
    ))}
  </div>
)

const Avatar = ({ initials, size = 40 }: { initials: string; size?: number }) => {
  const hue = (initials.charCodeAt(0) * 53 + (initials.charCodeAt(1) || 0) * 17) % 360
  return (
    <div aria-hidden="true" style={{
      width: size, height: size, flexShrink: 0,
      background: `hsl(${hue},42%,48%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-body)', fontWeight: 700,
      fontSize: size * 0.36, color: '#fff',
      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
      userSelect: 'none',
    }}>
      {initials.slice(0, 2).toUpperCase()}
    </div>
  )
}

// ── Glassmorphism hover popup ─────────────────────────────────────────────────
const ReviewPopup: React.FC<{
  item: typeof SITE_CONFIG.reviews.items[number]
  visible: boolean
}> = ({ item, visible }) => (
  <div
    aria-hidden={!visible}
    style={{
      position: 'absolute',
      bottom: 'calc(100% + 10px)',
      left: '50%',
      transform: `translateX(-50%) translateY(${visible ? '0' : '6px'})`,
      width: 'min(320px, 85vw)',
      background: 'rgba(20,15,10,0.9)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      border: '1px solid rgba(184,154,90,0.3)',
      borderTop: '2px solid var(--color-brass)',
      padding: '1.125rem',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
      opacity: visible ? 1 : 0,
      pointerEvents: 'none',
      transition: 'opacity 0.22s ease, transform 0.22s ease',
      zIndex: 50,
    }}
  >
    <div aria-hidden="true" style={{
      position: 'absolute', bottom: '-5px', left: '50%',
      transform: 'translateX(-50%) rotate(45deg)',
      width: '10px', height: '10px',
      background: 'rgba(184,154,90,0.4)',
      border: '1px solid rgba(184,154,90,0.3)',
      borderTop: 'none', borderLeft: 'none',
    }} />
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
      <Avatar initials={item.initials} size={34} />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.78rem', color: 'var(--color-ivory)', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {item.author}
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: 'rgba(245,240,232,0.5)', marginTop: '0.1rem' }}>
          {item.date}
        </div>
      </div>
      <div style={{ marginLeft: 'auto', flexShrink: 0 }}><GoogleIcon size={14} /></div>
    </div>
    <Stars count={item.rating} size={11} />
    <p style={{
      fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 300,
      color: 'rgba(245,240,232,0.8)', lineHeight: 1.65, marginTop: '0.6rem',
    }}>
      "{item.text}"
    </p>
  </div>
)

// ── Single card ───────────────────────────────────────────────────────────────
const ReviewCard: React.FC<{
  item: typeof SITE_CONFIG.reviews.items[number]
  animClass: string
  visibleCount: number
}> = ({ item, animClass, visibleCount }) => {
  const [showPopup, setShowPopup] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Only show popup on non-touch / large screens
  const isMobile = visibleCount < 3

  const onEnter = () => {
    if (isMobile) return
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setShowPopup(true), 160)
  }
  const onLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setShowPopup(false)
  }

  const cardWidth = visibleCount === 1
    ? '100%'
    : visibleCount === 2
      ? 'calc(50% - 9px)'
      : 'calc(33.333% - 12px)'

  return (
    <div
      className={`review-card-item ${animClass}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        flex: `0 0 ${cardWidth}`,
        minWidth: 0,
        width: cardWidth,
      }}
    >
      <div style={{
        background: '#ffffff',
        border: '1px solid #e8eaed',
        clipPath: 'polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)',
        padding: 'clamp(1rem, 2.5vw, 1.25rem)',
        display: 'flex', flexDirection: 'column', gap: '0.7rem',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        boxShadow: showPopup ? '0 8px 24px rgba(0,0,0,0.12)' : '0 1px 3px rgba(0,0,0,0.07)',
        transform: showPopup ? 'translateY(-2px)' : 'translateY(0)',
        position: 'relative',
        height: '100%',
      }}>
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', minWidth: 0 }}>
            <Avatar initials={item.initials} size={visibleCount === 1 ? 44 : 38} />
            <div style={{ minWidth: 0 }}>
              <div style={{
                fontFamily: 'var(--font-body)', fontWeight: 600,
                fontSize: visibleCount === 1 ? '0.88rem' : '0.8rem',
                color: '#202124',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {item.author}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: '#70757a', marginTop: '0.1rem' }}>
                {item.date}
              </div>
            </div>
          </div>
          <GoogleIcon size={15} />
        </div>

        <Stars count={item.rating} size={visibleCount === 1 ? 15 : 13} />

        <div style={{ position: 'relative' }}>
          <Quote size={12} strokeWidth={1.5} style={{ color: '#dadce0', position: 'absolute', top: 0, left: 0 }} aria-hidden="true" />
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: visibleCount === 1 ? '0.88rem' : '0.76rem',
            fontWeight: 400, color: '#3c4043', lineHeight: 1.65,
            paddingLeft: '1.1rem',
            display: '-webkit-box',
            WebkitLineClamp: visibleCount === 1 ? 4 : 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden', margin: 0,
          } as React.CSSProperties}>
            {item.text}
          </p>
        </div>

        {/* Brass corner accent */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, right: 0,
          width: 0, height: 0, borderStyle: 'solid',
          borderWidth: '0 18px 18px 0',
          borderColor: 'transparent var(--color-brass) transparent transparent',
          opacity: 0.65,
        }} />
      </div>

      {!isMobile && <ReviewPopup item={item} visible={showPopup} />}
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────
const Reviews: React.FC = () => {
  const sectionRef    = useRevealChildren(0.1)
  const { reviews }   = SITE_CONFIG
  const visibleCount  = useVisibleCount()
  const total         = reviews.items.length

  const [offset,      setOffset]      = useState(0)
  const [direction,   setDirection]   = useState<'left' | 'right'>('right')
  const [isAnimating, setIsAnimating] = useState(false)
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const getVisible = useCallback((off: number) =>
    Array.from({ length: visibleCount }, (_, i) => reviews.items[(off + i) % total]),
    [visibleCount, reviews.items, total])

  const [displayed, setDisplayed] = useState(() => getVisible(0))

  // Re-slice when visibleCount changes (resize)
  useEffect(() => {
    setDisplayed(getVisible(offset))
  }, [visibleCount, offset, getVisible])

  const slide = useCallback((dir: 'left' | 'right') => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(dir)
    const newOffset = dir === 'right'
      ? (offset + 1) % total
      : (offset - 1 + total) % total
    setTimeout(() => {
      setOffset(newOffset)
      setDisplayed(getVisible(newOffset))
      setIsAnimating(false)
    }, 380)
  }, [isAnimating, offset, total, getVisible])

  const next = useCallback(() => slide('right'), [slide])
  const prev = useCallback(() => slide('left'),  [slide])

  useEffect(() => {
    autoRef.current = setTimeout(next, 6500)
    return () => { if (autoRef.current) clearTimeout(autoRef.current) }
  }, [offset, next])

  const gap = visibleCount === 1 ? 0 : 18

  return (
    <section
      id="reviews"
      style={{ background: 'var(--color-walnut)', padding: 'var(--section-padding-y) 0', overflow: 'hidden' }}
      aria-labelledby="reviews-heading"
    >
      <div ref={sectionRef as React.RefObject<HTMLDivElement>} className="container-site">

        {/* ── Header ── */}
        <div className="reveal reviews-header-row">
          {/* Left — title */}
          <div>
            <span className="overline-label" style={{ display: 'block', marginBottom: '1rem' }}>
              Client Testimonials
            </span>
            <h2 id="reviews-heading" className="section-heading"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', marginBottom: '0.35rem' }}>
              Reviews
            </h2>
            <p style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300,
              fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--color-stone-light)',
            }}>
              What Clients Say About Us
            </p>
          </div>

          {/* Right — Google badge */}
          <div className="reviews-badge">
            {/* Row 1 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <GoogleIcon size={18} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600, color: '#202124' }}>Google</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', fontWeight: 700, color: '#202124', lineHeight: 1 }}>
                  {reviews.rating.toFixed(1)}
                </span>
                <Stars count={5} size={14} />
              </div>
            </div>
            {/* Row 2 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#70757a' }}>
                {reviews.count} reviews
              </span>
              <a href={reviews.googleReviewUrl} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                  fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 500,
                  color: '#1a73e8', textDecoration: 'none',
                  padding: '0.28rem 0.65rem',
                  border: '1px solid #1a73e8', borderRadius: '2px',
                  transition: 'background 0.15s ease', whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(26,115,232,0.06)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}>
                Write a review <ExternalLink size={9} strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>

        {/* ── Slider ── */}
        <div className="reveal" style={{ position: 'relative', marginTop: 'clamp(2rem, 4vw, 3rem)' }}
          role="region" aria-label="Client reviews" aria-live="polite">

          <div style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: `${gap}px`, alignItems: 'stretch' }}>
              {displayed.map((item, i) => (
                <ReviewCard
                  key={`${item.id}-${offset}-${i}-${visibleCount}`}
                  item={item}
                  visibleCount={visibleCount}
                  animClass={
                    isAnimating
                      ? (direction === 'right'
                          ? i === 0                  ? 'rv-exit-left'  : 'rv-enter-right'
                          : i === visibleCount - 1   ? 'rv-exit-right' : 'rv-enter-left')
                      : 'rv-visible'
                  }
                />
              ))}
            </div>
          </div>

          {/* Controls */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginTop: '1.75rem', flexWrap: 'wrap', gap: '1rem',
          }}>
            <div style={{ display: 'flex', gap: '6px' }} role="tablist">
              {Array.from({ length: total }).map((_, i) => (
                <button key={i} role="tab"
                  aria-selected={i === offset % total}
                  aria-label={`Review ${i + 1}`}
                  onClick={() => { if (!isAnimating) { setOffset(i); setDisplayed(getVisible(i)) } }}
                  style={{
                    width: i === offset % total ? '24px' : '8px', height: '8px',
                    borderRadius: '4px', border: 'none', cursor: 'pointer', padding: 0,
                    background: i === offset % total ? 'var(--color-brass)' : 'rgba(184,154,90,0.3)',
                    transition: 'width 0.3s ease, background 0.3s ease',
                  }} />
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[{ fn: prev, label: 'Previous', Icon: ChevronLeft }, { fn: next, label: 'Next', Icon: ChevronRight }].map(({ fn, label, Icon }) => (
                <button key={label} onClick={fn} aria-label={label} disabled={isAnimating}
                  style={{
                    width: '44px', height: '44px', minWidth: '44px',
                    background: '#fff', border: '1px solid #dadce0',
                    cursor: isAnimating ? 'default' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#5f6368', transition: 'box-shadow 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  }}
                  onMouseEnter={(e) => { if (!isAnimating) e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)' }}>
                  <Icon size={18} strokeWidth={2} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Header row — side by side on desktop, stacked on mobile */
        .reviews-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 0;
        }
        /* Google badge box */
        .reviews-badge {
          background: #fff;
          border: 1px solid #dadce0;
          padding: 0.75rem 1.1rem;
          box-shadow: 0 1px 6px rgba(0,0,0,0.08);
          flex-shrink: 0;
        }

        .rv-visible     { animation: none; opacity: 1; }
        .rv-enter-right { animation: rvInRight  0.38s cubic-bezier(0.4,0,0.2,1) both; }
        .rv-enter-left  { animation: rvInLeft   0.38s cubic-bezier(0.4,0,0.2,1) both; }
        .rv-exit-left   { animation: rvOutLeft  0.38s cubic-bezier(0.4,0,0.2,1) both; }
        .rv-exit-right  { animation: rvOutRight 0.38s cubic-bezier(0.4,0,0.2,1) both; }

        @keyframes rvInRight  { from { opacity:0; transform:translateX(48px);  } to { opacity:1; transform:translateX(0); } }
        @keyframes rvInLeft   { from { opacity:0; transform:translateX(-48px); } to { opacity:1; transform:translateX(0); } }
        @keyframes rvOutLeft  { from { opacity:1; transform:translateX(0); } to { opacity:0; transform:translateX(-48px); } }
        @keyframes rvOutRight { from { opacity:1; transform:translateX(0); } to { opacity:0; transform:translateX(48px);  } }

        /* Mobile — badge stacks under heading */
        @media (max-width: 600px) {
          .reviews-header-row { flex-direction: column; align-items: flex-start; }
          .reviews-badge       { width: 100%; }
        }
      `}</style>
    </section>
  )
}

export default Reviews
