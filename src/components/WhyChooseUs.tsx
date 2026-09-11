import React from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'
import { useRevealChildren } from '../hooks/useReveal'

const WhyChooseUs: React.FC = () => {
  const sectionRef = useRevealChildren(0.1)

  return (
    <section
      id="why-us"
      style={{
        background: 'var(--color-obsidian)',
        padding: 'var(--section-padding-y) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-labelledby="why-heading"
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 50% at 80% 50%, rgba(184,154,90,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        className="container-site"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Header row — .grid-why-header stacks to 1col at 768px */}
        <div className="grid-why-header">
          <div>
            <span className="overline-label reveal" style={{ display: 'block', marginBottom: '1.25rem' }}>
              Why Choose Us
            </span>
            <h2
              id="why-heading"
              className="section-heading reveal reveal-delay-1"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Why Choose<br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-brass-light)', fontWeight: 300 }}>
                Omojola Law?
              </em>
            </h2>
          </div>

          <div className="reveal reveal-delay-2">
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
              fontWeight: 300,
              color: 'rgba(245,240,232,0.65)',
              lineHeight: 1.8,
              marginBottom: '2rem',
            }}>
              At Omojola Law, legal representation is built on experience,
              strategic advocacy, and genuine commitment to each client's outcome.
              We bring 14+ years of focused legal expertise to every case.
            </p>
            <Link to="/#contact" className="btn-brass-outline">
              Start Your Consultation
            </Link>
          </div>
        </div>

        {/* Pillars — .grid-pillars: 4col → 2col at 1024px → 1col at 600px */}
        <div className="grid-pillars">
          {SITE_CONFIG.whyChooseUs.map((item, index) => (
            <div
              key={item.title}
              className={`reveal reveal-delay-${index + 1}`}
              style={{
                background: 'var(--color-obsidian)',
                padding: 'clamp(2rem, 3.5vw, 2.5rem)',
                position: 'relative',
                borderTop: '2px solid transparent',
                transition: 'border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderTopColor = 'var(--color-brass)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderTopColor = 'transparent'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <CheckCircle
                  size={18} strokeWidth={1.5}
                  style={{ color: 'var(--color-brass)', flexShrink: 0 }}
                  aria-hidden="true"
                />
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                  fontWeight: 500,
                  color: 'var(--color-ivory)',
                  lineHeight: 1.2,
                }}>
                  {item.title}
                </h3>
              </div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                fontWeight: 300,
                color: 'rgba(245,240,232,0.6)',
                lineHeight: 1.75,
              }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
