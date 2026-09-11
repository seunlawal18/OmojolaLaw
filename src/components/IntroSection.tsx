import React from 'react'
import { Link } from 'react-router-dom'
import { useRevealChildren } from '../hooks/useReveal'
import { SITE_CONFIG } from '../config/site'

const IntroSection: React.FC = () => {
  const sectionRef = useRevealChildren(0.1)

  return (
    <section
      id="about"
      style={{
        background: 'var(--color-obsidian)',
        padding: 'var(--section-padding-y) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-labelledby="intro-heading"
    >
      {/* ── Big watermark logo — centred behind content ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(340px, 65vw, 720px)',
          aspectRatio: '1 / 1',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}
      >
        <img
          src={SITE_CONFIG.media.logoPath}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            /*
             * mix-blend-mode: screen on a dark background effectively inverts
             * the white areas to transparent and makes the coloured crest glow
             * softly — giving a natural watermark feel without needing a
             * transparent PNG.
             */
            mixBlendMode: 'screen',
            opacity: 0.09,
            filter: 'saturate(0.6) brightness(1.4)',
          }}
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      </div>

      {/* ── Content (sits above the watermark) ── */}
      <div
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        className="container-site"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Two-column grid — stacks to 1col at 768px via .grid-2col-wide */}
        <div className="grid-2col-wide">

          {/* Left — Typography */}
          <div>
            <span
              className="overline-label reveal"
              style={{ display: 'block', marginBottom: '1.25rem' }}
            >
              The Firm
            </span>

            <h2
              id="intro-heading"
              className="section-heading reveal reveal-delay-1"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '2rem' }}
            >
              A Trusted Firm<br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-brass-light)', fontWeight: 300 }}>
                Solving Legal Problems
              </em>
            </h2>

            <div
              className="reveal reveal-delay-2"
              style={{
                width: '3rem',
                height: '1px',
                background: 'linear-gradient(90deg, var(--color-brass), transparent)',
                marginBottom: '2rem',
              }}
            />

            <p
              className="reveal reveal-delay-2"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
                fontWeight: 300,
                color: 'rgba(245,240,232,0.7)',
                lineHeight: 1.8,
                marginBottom: '1.5rem',
              }}
            >
              Omojola Law is a client-focused law firm with a relentless problem-solving approach,
              dedicated to exceptional legal services in Litigation, Domestic Violence and Family
              Matters, DUI/DWI Defense, and Immigration.
            </p>

            <p
              className="reveal reveal-delay-3"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
                fontWeight: 300,
                color: 'rgba(245,240,232,0.7)',
                lineHeight: 1.8,
                marginBottom: '2.5rem',
              }}
            >
              Where litigation becomes necessary, the firm offers strategic and robust representation
              to address disputes efficiently and secure clients' interests. The firm handles domestic
              violence matters, child custody, and child support issues with sensitivity and
              professionalism.
            </p>

            <div
              className="reveal reveal-delay-4"
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
            >
              <Link to="/#practice-areas" className="btn-primary">
                Practice Areas
              </Link>
              <Link to="/about" className="btn-brass-outline">
                About the Firm
              </Link>
            </div>
          </div>

          {/* Right — Stats column */}
          <div className="reveal reveal-delay-2 stats-col">
            {[
              { num: '14+', label: 'Years of Practice', note: 'Serving New Jersey clients' },
              { num: '4',   label: 'Practice Areas',    note: 'Focused & strategic legal services' },
              { num: '3',   label: 'Office Locations',  note: 'Toms River · Newark · Jersey City' },
            ].map((stat, i) => (
              <div
                key={stat.num}
                style={{
                  paddingBlock: 'clamp(1.5rem, 3vw, 2rem)',
                  borderBottom: i < 2 ? '1px solid rgba(245,240,232,0.06)' : 'none',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 300,
                  lineHeight: 1,
                  color: 'var(--color-brass)',
                  marginBottom: '0.4rem',
                }}>
                  {stat.num}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 500,
                  color: 'var(--color-ivory)',
                  marginBottom: '0.2rem',
                }}>
                  {stat.label}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 300,
                  color: 'var(--color-stone-light)',
                }}>
                  {stat.note}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default IntroSection
