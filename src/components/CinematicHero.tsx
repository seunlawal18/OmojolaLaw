import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useScrollVideo } from '../hooks/useScrollVideo'
import { SITE_CONFIG } from '../config/site'

// ── Detect mobile once (no state — no re-render) ──────────────────────────────
// On mobile (<768px) we skip the video scrubbing entirely to avoid a
// 4MB download on a slow connection. We show the poster + hero copy immediately.
const isMobileDevice = () =>
  typeof window !== 'undefined' && window.innerWidth < 768

const CinematicHero: React.FC = () => {
  const trackRef  = useRef<HTMLDivElement>(null)
  const videoRef  = useRef<HTMLVideoElement>(null)

  const [isMobile,       setIsMobile]       = useState(isMobileDevice)
  const [progress,       setProgress]       = useState(0)
  const [canPlay,        setCanPlay]        = useState(false)
  const [videoLoaded,    setVideoLoaded]    = useState(false)  // src injected?
  const [videoError,     setVideoError]     = useState(false)
  const [contentVisible, setContentVisible] = useState(false)

  // Re-check on resize (rare but correct)
  useEffect(() => {
    const onResize = () => setIsMobile(isMobileDevice())
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // On mobile: show hero copy immediately without waiting for video
  useEffect(() => {
    if (isMobile) setContentVisible(true)
  }, [isMobile])

  // ── Lazy-load: only inject the video src once the section enters the viewport
  useEffect(() => {
    if (isMobile) return   // skip on mobile entirely

    const section = trackRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoLoaded(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }  // start loading 200px before it's visible
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [isMobile])

  // ── Video readiness ──────────────────────────────────────
  useEffect(() => {
    if (isMobile || !videoLoaded) return
    const video = videoRef.current
    if (!video) return

    const onCanPlay = () => setCanPlay(true)
    const onError   = () => setVideoError(true)

    if (video.readyState >= 3) {
      setCanPlay(true)
    } else {
      video.addEventListener('canplay', onCanPlay)
      video.addEventListener('error',   onError)
    }
    return () => {
      video.removeEventListener('canplay', onCanPlay)
      video.removeEventListener('error',   onError)
    }
  }, [isMobile, videoLoaded])

  // ── Progress callback ────────────────────────────────────
  const handleProgress = useCallback((p: number) => {
    setProgress(p)
    if (!isMobile) setContentVisible(p >= 0.92)
  }, [isMobile])

  // Pass videoRef only when we actually have a video element loaded
  useScrollVideo({
    trackRef,
    videoRef: videoLoaded && !isMobile ? videoRef : { current: null },
    onProgress: handleProgress,
  })

  const progressWidth = `${(progress * 100).toFixed(2)}%`

  return (
    <section
      ref={trackRef}
      className="cinematic-track cinematic-track-height"
      aria-label="Cinematic introduction — Omojola Law"
    >
      <div className="cinematic-sticky">

        {/* ── Poster / fallback layer — always visible until video plays ── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: `url('${SITE_CONFIG.media.videoPoster}') center/cover no-repeat, var(--color-obsidian)`,
            opacity: (!isMobile && canPlay && !videoError) ? 0 : 1,
            transition: 'opacity 1s ease',
          }}
        />

        {/* ── Spinner — only on desktop while video is loading ── */}
        {!isMobile && !canPlay && !videoError && videoLoaded && (
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0, zIndex: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: '36px', height: '36px',
              border: '1px solid rgba(184,154,90,0.3)',
              borderTopColor: 'var(--color-brass)',
              borderRadius: '50%',
              animation: 'heroSpin 1s linear infinite',
            }} />
            <style>{`@keyframes heroSpin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* ── Error state ── */}
        {videoError && (
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0, zIndex: 2,
            background: 'linear-gradient(135deg, var(--color-obsidian) 0%, var(--color-walnut) 100%)',
          }} />
        )}

        {/* ── Video — only rendered on desktop once lazy-loaded ── */}
        {!isMobile && videoLoaded && !videoError && (
          <video
            ref={videoRef}
            className="cinematic-video"
            src={SITE_CONFIG.media.videoPath}
            muted
            playsInline
            preload="metadata"   /* metadata only — browser fetches frames on demand as we seek */
            aria-hidden="true"
            tabIndex={-1}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
              pointerEvents: 'none', userSelect: 'none',
              zIndex: 0,
            }}
          />
        )}

        {/* ── Gradient overlay ── */}
        <div className="cinematic-overlay" aria-hidden="true" style={{ zIndex: 3 }} />

        {/* ── Hero copy ── */}
        <div
          className="cinematic-content"
          style={{
            zIndex: 4,
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <div style={{ maxWidth: '700px' }}>
            <span className="overline-label" style={{ marginBottom: '1rem', display: 'block' }}>
              Omojola Law — New Jersey
            </span>
            <h1 className="section-heading"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', marginBottom: '1.25rem', fontWeight: 400 }}>
              Protecting<br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-brass-light)' }}>Your Rights</em>
            </h1>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.875rem, 1.5vw, 1rem)', fontWeight: 300,
              color: 'rgba(245,240,232,0.7)', lineHeight: 1.7,
              marginBottom: '2rem', maxWidth: '50ch',
            }}>
              Strategic legal representation for restraining orders, DUI, domestic violence,
              immigration, and litigation across New Jersey.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/#contact" className="btn-primary">Contact Us</Link>
              <Link to="/#why-us"  className="btn-outline">Why Choose Us</Link>
            </div>
          </div>
        </div>

        {/* ── Scroll hint — desktop only, hidden once scrolling starts ── */}
        {!isMobile && (
          <div aria-hidden="true" style={{
            position: 'absolute', bottom: '2rem',
            right: 'clamp(1.5rem, 5vw, 6rem)',
            zIndex: 4,
            opacity: progress < 0.05 ? 0.6 : 0,
            transition: 'opacity 0.5s ease',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '0.5rem',
            pointerEvents: 'none',
          }}>
            <span style={{
              fontSize: 'var(--text-xs)', fontFamily: 'var(--font-body)',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--color-ivory-dim)',
            }}>Scroll</span>
            <div style={{
              width: '1px', height: '48px',
              background: 'linear-gradient(to bottom, var(--color-brass), transparent)',
              animation: 'scrollHint 1.8s ease-in-out infinite',
            }} />
            <style>{`
              @keyframes scrollHint {
                0%,100% { opacity:0.4; transform:scaleY(0.6); transform-origin:top; }
                50%      { opacity:1;   transform:scaleY(1);   transform-origin:top; }
              }
              @media (prefers-reduced-motion:reduce) {
                @keyframes scrollHint { 0%,100% { opacity:0.5; } }
              }
            `}</style>
          </div>
        )}

        {/* ── Progress bar — desktop only ── */}
        {!isMobile && (
          <div
            className="scroll-progress-bar"
            style={{ width: progressWidth, zIndex: 5 }}
            aria-hidden="true"
            role="progressbar"
            aria-valuenow={Math.round(progress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        )}
      </div>
    </section>
  )
}

export default CinematicHero
