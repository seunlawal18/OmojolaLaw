import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Scale, Shield, Car, Globe, ArrowRight } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'
import { useRevealChildren } from '../hooks/useReveal'

const ICONS: Record<string, React.FC<{ size?: number; strokeWidth?: number }>> = {
  Scale,
  Shield,
  Gavel: Car,
  Globe,
}

const PracticeAreas: React.FC = () => {
  const sectionRef = useRevealChildren(0.08)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section
      id="practice-areas"
      style={{
        background: 'var(--color-walnut)',
        padding: 'var(--section-padding-y) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-labelledby="practice-heading"
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-0.1em', right: '-0.05em',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(12rem, 25vw, 22rem)',
          fontWeight: 300, lineHeight: 1,
          color: 'rgba(184,154,90,0.04)',
          pointerEvents: 'none', userSelect: 'none',
        }}
      >
        Law
      </div>

      <div ref={sectionRef as React.RefObject<HTMLDivElement>} className="container-site">
        {/* Header */}
        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)', maxWidth: '600px' }}>
          <span className="overline-label reveal" style={{ display: 'block', marginBottom: '1.25rem' }}>
            Practice Areas
          </span>
          <h2
            id="practice-heading"
            className="section-heading reveal reveal-delay-1"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Legal Representation<br />
            <em style={{ fontStyle: 'italic', color: 'var(--color-brass-light)', fontWeight: 300 }}>
              Across Four Core Areas
            </em>
          </h2>
        </div>

        {/* Cards — .grid-practice: 4col → 2col at 1024px → 1col at 600px */}
        <div className="grid-practice">
          {SITE_CONFIG.practiceAreas.map((area, index) => {
            const Icon = ICONS[area.icon] ?? Scale
            const isActive = activeIndex === index

            return (
              <article
                key={area.id}
                className="practice-card reveal"
                style={{
                  position: 'relative',
                  background: isActive ? 'rgba(26,20,16,0.9)' : 'var(--color-walnut)',
                  padding: 'clamp(2rem, 4vw, 3rem)',
                  cursor: 'pointer',
                  transition: 'background 0.35s ease',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onFocus={() => setActiveIndex(index)}
                onBlur={() => setActiveIndex(null)}
              >
                <span className="practice-number" aria-hidden="true">{area.number}</span>

                <div
                  style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                    background: isActive ? 'linear-gradient(90deg, var(--color-brass), transparent)' : 'transparent',
                    transition: 'background 0.4s ease',
                  }}
                  aria-hidden="true"
                />

                <div style={{
                  width: '48px', height: '48px',
                  border: '1px solid rgba(184,154,90,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.5rem',
                  color: 'var(--color-brass)',
                  transition: 'border-color 0.3s ease, background 0.3s ease',
                  background: isActive ? 'rgba(184,154,90,0.06)' : 'transparent',
                }} aria-hidden="true">
                  <Icon size={20} strokeWidth={1.5} />
                </div>

                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  color: 'var(--color-brass-dim)',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                  display: 'block',
                }}>
                  {area.number}
                </span>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)',
                  fontWeight: 500,
                  color: 'var(--color-ivory)',
                  lineHeight: 1.2,
                  marginBottom: '1rem',
                }}>
                  {area.title}
                </h3>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 300,
                  color: 'rgba(245,240,232,0.6)',
                  lineHeight: 1.75,
                  flex: 1,
                  marginBottom: '2rem',
                }}>
                  {area.description}
                </p>

                <Link
                  to={area.href}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-brass)',
                    textDecoration: 'none',
                    transition: 'gap 0.2s ease, color 0.2s ease',
                    alignSelf: 'flex-start',
                  }}
                  aria-label={`Learn more about ${area.title}`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.gap = '0.85rem'
                    e.currentTarget.style.color = 'var(--color-brass-light)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.gap = '0.5rem'
                    e.currentTarget.style.color = 'var(--color-brass)'
                  }}
                >
                  Learn More <ArrowRight size={13} strokeWidth={2} />
                </Link>
              </article>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="reveal" style={{
          marginTop: 'clamp(2.5rem, 4vw, 4rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-base)',
            fontWeight: 300,
            color: 'var(--color-stone-light)',
          }}>
            Let's Discuss and Start an Effective Strategy To Protect Your Legal Rights.
          </p>
          <Link to="/#contact" className="btn-primary">
            Schedule a Consultation
          </Link>
        </div>
      </div>
    </section>
  )
}

export default PracticeAreas
