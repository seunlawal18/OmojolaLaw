import React, { useState, useEffect, useCallback } from 'react'
import { X, Play, ExternalLink } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'
import { useRevealChildren } from '../hooks/useReveal'

type Video = typeof SITE_CONFIG.legalInsights[number]

// ── Thumbnail helpers ─────────────────────────────────────────────────────────
const thumbHQ  = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`
const thumbMax = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`

// ── Video Modal — video LEFT, description RIGHT ───────────────────────────────
const VideoModal: React.FC<{ video: Video; onClose: () => void }> = ({ video, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(6,4,2,0.94)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(1rem, 3vw, 2.5rem)',
        animation: 'modalFadeIn 0.25s ease both',
      }}
    >
      <style>{`
        @keyframes modalFadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes modalSlideUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
        .modal-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          width: 100%;
          max-width: 1100px;
          max-height: 90vh;
          animation: modalSlideUp 0.3s cubic-bezier(0.4,0,0.2,1) both;
          overflow: hidden;
        }
        /* Stack on mobile */
        @media (max-width: 768px) {
          .modal-inner { grid-template-columns: 1fr; overflow-y: auto; }
        }
      `}</style>

      <div className="modal-inner">

        {/* ── LEFT: Video ── */}
        <div style={{ background: '#000', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            background: 'rgba(26,20,16,0.95)',
            borderBottom: '1px solid rgba(245,240,232,0.07)',
          }}>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)',
              fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--color-brass)',
            }}>
              {video.category}
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <a
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.3rem',
                  fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)',
                  color: 'rgba(245,240,232,0.4)', textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(245,240,232,0.8)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,240,232,0.4)' }}
                aria-label="Open on YouTube"
              >
                <ExternalLink size={11} strokeWidth={2} /> YouTube
              </a>
              <button
                onClick={onClose} aria-label="Close"
                style={{
                  background: 'transparent', border: 'none',
                  color: 'rgba(245,240,232,0.5)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', padding: '0.1rem',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-ivory)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,240,232,0.5)' }}
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Iframe */}
          <div style={{ position: 'relative', paddingTop: '56.25%', flex: 1, background: '#000' }}>
            <iframe
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
              src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* ── RIGHT: Description panel ── */}
        <div style={{
          background: 'var(--color-walnut)',
          borderLeft: '1px solid rgba(245,240,232,0.06)',
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto',
          maxHeight: '90vh',
        }}>
          {/* Scroll indicator top */}
          <div style={{
            height: '3px', flexShrink: 0,
            background: 'linear-gradient(90deg, var(--color-brass), var(--color-brass-dim))',
          }} aria-hidden="true" />

          <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', flex: 1 }}>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              fontWeight: 400, color: 'var(--color-ivory)',
              lineHeight: 1.3, marginBottom: '1.25rem',
            }}>
              {video.title}
            </h2>

            {/* Divider */}
            <div style={{
              width: '2.5rem', height: '1px',
              background: 'linear-gradient(90deg, var(--color-brass), transparent)',
              marginBottom: '1.25rem',
            }} aria-hidden="true" />

            <div style={{ marginBottom: '1.5rem' }}>
              {video.fullDescription.split('\n\n').map((para, i) => (
                <p key={i} style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)', fontWeight: 300,
                  color: 'rgba(245,240,232,0.75)', lineHeight: 1.8,
                  marginBottom: i < video.fullDescription.split('\n\n').length - 1 ? '1rem' : 0,
                }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Key points if they exist */}
            {video.keyPoints && video.keyPoints.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)', fontWeight: 600,
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: 'var(--color-brass)', marginBottom: '0.75rem',
                }}>
                  Key Points
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {video.keyPoints.map((pt, i) => (
                    <li key={i} style={{
                      display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                      fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
                      fontWeight: 300, color: 'rgba(245,240,232,0.65)', lineHeight: 1.6,
                    }}>
                      <span style={{
                        width: '5px', height: '5px', borderRadius: '50%',
                        background: 'var(--color-brass)', flexShrink: 0, marginTop: '0.45rem',
                      }} aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div style={{
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(245,240,232,0.07)',
              marginTop: 'auto',
            }}>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)',
                fontWeight: 300, color: 'rgba(245,240,232,0.4)',
                lineHeight: 1.6, marginBottom: '1rem',
              }}>
                This video is for general information purposes only and does not constitute legal advice.
              </p>
              <a href={SITE_CONFIG.contact.phoneHref} className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}>
                Speak With Attorney Omojola
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

// ── Video Card ────────────────────────────────────────────────────────────────
const VideoCard: React.FC<{ video: Video; index: number; onClick: (v: Video) => void }> = ({ video, index, onClick }) => {
  const [imgSrc, setImgSrc] = useState(thumbMax(video.videoId))
  const [hovered, setHovered] = useState(false)

  return (
    <article
      className={`reveal reveal-delay-${(index % 3) + 1}`}
      onClick={() => onClick(video)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
      tabIndex={0}
      role="button"
      aria-label={`Watch: ${video.title}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(video) } }}
    >
      {/* Thumbnail */}
      <div style={{
        position: 'relative', paddingTop: '56.25%',
        background: 'var(--color-walnut)', overflow: 'hidden',
      }}>
        <img
          src={imgSrc}
          alt=""
          aria-hidden="true"
          onError={() => setImgSrc(thumbHQ(video.videoId))}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
          }}
        />
        {/* Scrim */}
        <div style={{
          position: 'absolute', inset: 0,
          background: hovered
            ? 'linear-gradient(to bottom, rgba(8,6,4,0.15), rgba(8,6,4,0.6))'
            : 'linear-gradient(to bottom, rgba(8,6,4,0.05), rgba(8,6,4,0.45))',
          transition: 'background 0.3s ease',
        }} />
        {/* Play button */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: hovered ? '58px' : '50px', height: hovered ? '58px' : '50px',
            borderRadius: '50%',
            background: hovered ? 'var(--color-brass)' : 'rgba(184,154,90,0.88)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s ease',
            boxShadow: hovered ? '0 4px 20px rgba(184,154,90,0.4)' : 'none',
          }}>
            <Play size={hovered ? 21 : 17} strokeWidth={0} fill="var(--color-obsidian)" style={{ marginLeft: '3px' }} />
          </div>
        </div>
      </div>

      {/* Text */}
      <div style={{
        padding: 'clamp(0.875rem, 2vw, 1.25rem)',
        background: hovered ? 'rgba(42,33,24,0.95)' : 'var(--color-walnut)',
        borderTop: `1px solid ${hovered ? 'rgba(184,154,90,0.35)' : 'rgba(245,240,232,0.06)'}`,
        flex: 1, display: 'flex', flexDirection: 'column',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)',
          fontWeight: 500, color: 'var(--color-ivory)',
          lineHeight: 1.3, marginBottom: '0.5rem',
        }}>
          {video.title}
        </h3>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)',
          fontWeight: 300, color: 'rgba(245,240,232,0.5)',
          lineHeight: 1.65, flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        } as React.CSSProperties}>
          {video.description}
        </p>
      </div>
    </article>
  )
}

// ── Main Section ──────────────────────────────────────────────────────────────
const LegalInsights: React.FC = () => {
  const sectionRef = useRevealChildren(0.08)
  const [activeVideo, setActiveVideo] = useState<Video | null>(null)
  const openVideo  = useCallback((v: Video) => setActiveVideo(v), [])
  const closeVideo = useCallback(() => setActiveVideo(null), [])
  const videos = SITE_CONFIG.legalInsights

  return (
    <>
      <section
        id="legal-insights"
        style={{
          background: 'var(--color-obsidian)',
          padding: 'var(--section-padding-y) 0',
          position: 'relative', overflow: 'hidden',
        }}
        aria-labelledby="insights-heading"
      >
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 20% 60%, rgba(184,154,90,0.035) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        <div ref={sectionRef as React.RefObject<HTMLDivElement>} className="container-site" style={{ position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '2rem',
            marginBottom: 'clamp(3rem, 5vw, 4.5rem)',
          }}>
            <div>
              <span className="overline-label reveal" style={{ display: 'block', marginBottom: '1.25rem' }}>
                Legal Insights
              </span>
              <h2
                id="insights-heading"
                className="section-heading reveal reveal-delay-1"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
              >
                Know Your Rights<br />
                <em style={{ fontStyle: 'italic', color: 'var(--color-brass-light)', fontWeight: 300 }}>
                  Video Guides
                </em>
              </h2>
            </div>
            <p className="reveal reveal-delay-2" style={{
              fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
              fontWeight: 300, color: 'rgba(245,240,232,0.5)', lineHeight: 1.7, maxWidth: '36ch',
            }}>
              Attorney Ade Omojola shares practical legal guidance on the issues that matter most to New Jersey residents. Click any video to watch with a full description.
            </p>
          </div>

          {/* Grid — 3 col desktop, responsive */}
          <div className="insights-grid">
            {videos.map((video, i) => (
              <VideoCard key={video.id} video={video} index={i} onClick={openVideo} />
            ))}
          </div>

          {/* Disclaimer */}
          <p className="reveal" style={{
            marginTop: 'clamp(2rem, 4vw, 3rem)',
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)',
            fontWeight: 300, color: 'rgba(245,240,232,0.3)',
            textAlign: 'center', letterSpacing: '0.04em',
          }}>
            Videos are for general information purposes only and do not constitute legal advice.
          </p>
        </div>

        <style>{`
          .insights-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1px;
            background: rgba(245,240,232,0.05);
          }
          @media (max-width: 900px)  { .insights-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 520px)  { .insights-grid { grid-template-columns: 1fr; } }
        `}</style>
      </section>

      {activeVideo && <VideoModal video={activeVideo} onClose={closeVideo} />}
    </>
  )
}

export default LegalInsights
