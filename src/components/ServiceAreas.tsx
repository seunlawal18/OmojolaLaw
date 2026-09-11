import React from 'react'
import { Link } from 'react-router-dom'
import {
  Users, Globe, Scale, ShieldAlert,
  MapPin, ArrowRight, CheckCircle2,
} from 'lucide-react'
import { SITE_CONFIG } from '../config/site'
import { useRevealChildren } from '../hooks/useReveal'

const ICON_MAP: Record<string, React.FC<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>> = {
  Users,
  Globe,
  Scale,
  ShieldAlert,
}

const ServiceAreas: React.FC = () => {
  const sectionRef = useRevealChildren(0.08)
  const { serviceAreas } = SITE_CONFIG

  return (
    <section
      id="service-areas"
      style={{
        background: 'var(--color-obsidian)',
        padding: 'var(--section-padding-y) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-labelledby="service-areas-heading"
    >
      {/* Subtle radial glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(184,154,90,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        className="container-site"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* ── Header ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(2rem, 5vw, 6rem)',
          alignItems: 'start',
          marginBottom: 'clamp(3rem, 6vw, 5rem)',
        }} className="service-header-grid">
          <div>
            <span className="overline-label reveal" style={{ display: 'block', marginBottom: '1.25rem' }}>
              Service Areas
            </span>
            <h2
              id="service-areas-heading"
              className="section-heading reveal reveal-delay-1"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Serving Clients<br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-brass-light)', fontWeight: 300 }}>
                Throughout New Jersey
              </em>
            </h2>
          </div>

          <div className="reveal reveal-delay-2" style={{ paddingTop: '0.5rem' }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.875rem, 1.4vw, 1rem)',
              fontWeight: 300,
              color: 'rgba(245,240,232,0.65)',
              lineHeight: 1.8,
              marginBottom: '1.5rem',
            }}>
              {serviceAreas.intro}
            </p>

            {/* Region pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {serviceAreas.regions.map((region) => (
                <span key={region} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)', fontWeight: 500,
                  letterSpacing: '0.06em',
                  color: 'var(--color-brass)',
                  border: '1px solid rgba(184,154,90,0.3)',
                  padding: '0.25rem 0.75rem',
                  background: 'rgba(184,154,90,0.06)',
                }}>
                  <MapPin size={10} strokeWidth={2} aria-hidden="true" />
                  {region}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Service Cards Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1px',
          background: 'rgba(245,240,232,0.06)',
          marginBottom: 'clamp(3rem, 5vw, 4rem)',
        }} className="service-cards-grid">
          {serviceAreas.sections.map((section, index) => {
            const Icon = ICON_MAP[section.icon] ?? Scale
            return (
              <div
                key={section.title}
                className={`reveal reveal-delay-${index + 1}`}
                style={{
                  background: 'var(--color-walnut)',
                  padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                  position: 'relative',
                  transition: 'background 0.3s ease',
                  borderTop: '2px solid transparent',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.background = 'rgba(26,20,16,0.95)'
                  el.style.borderTopColor = 'var(--color-brass)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.background = 'var(--color-walnut)'
                  el.style.borderTopColor = 'transparent'
                }}
              >
                {/* Icon */}
                <div style={{
                  width: '46px', height: '46px',
                  border: '1px solid rgba(184,154,90,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-brass)',
                  marginBottom: '1.25rem',
                  background: 'rgba(184,154,90,0.05)',
                }}>
                  <Icon size={20} strokeWidth={1.5} />
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
                  fontWeight: 500,
                  color: 'var(--color-ivory)',
                  lineHeight: 1.25,
                  marginBottom: '0.6rem',
                }}>
                  {section.title}
                </h3>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 300,
                  color: 'rgba(245,240,232,0.45)',
                  marginBottom: '1.25rem',
                  lineHeight: 1.6,
                }}>
                  {section.description}
                </p>

                {/* Item list */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {section.items.map((item) => (
                    <li key={item} style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)', fontWeight: 300,
                      color: 'rgba(245,240,232,0.7)',
                      lineHeight: 1.5,
                    }}>
                      <CheckCircle2
                        size={12} strokeWidth={2}
                        style={{ color: 'var(--color-brass)', flexShrink: 0 }}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* ── Why Choose Omojola Law callout bar ── */}
        <div
          className="reveal service-why-grid"
          style={{
            border: '1px solid rgba(184,154,90,0.2)',
            padding: 'clamp(1.5rem, 3vw, 2.25rem) clamp(1.5rem, 3vw, 2.5rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            background: 'rgba(184,154,90,0.06)',
          }}
        >
          {SITE_CONFIG.whyChooseUs.map((item, i) => (
            <div key={item.title} style={{
              padding: 'clamp(1rem, 2vw, 1.5rem)',
              borderRight: i < 3 ? '1px solid rgba(184,154,90,0.12)' : 'none',
            }}
            className="service-why-item"
            >
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)', fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'var(--color-brass)', marginBottom: '0.4rem',
              }}>
                {item.title}
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)', fontWeight: 300,
                color: 'rgba(245,240,232,0.6)', lineHeight: 1.6,
              }}>
                {item.body}
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="reveal" style={{
          marginTop: 'clamp(2.5rem, 4vw, 3.5rem)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)', fontWeight: 300,
            color: 'rgba(245,240,232,0.6)',
          }}>
            No matter where you are in New Jersey — Omojola Law is ready to help.
          </p>
          <Link to="/#contact" className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Get a Free Consultation
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </div>

      <style>{`
        .service-header-grid  { grid-template-columns: 1fr 1fr; }
        .service-cards-grid   { grid-template-columns: repeat(4, 1fr); }

        @media (max-width: 1024px) {
          .service-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .service-header-grid { grid-template-columns: 1fr !important; }
          .service-cards-grid  { grid-template-columns: 1fr !important; }
          .service-why-item    { border-right: none !important; border-bottom: 1px solid rgba(184,154,90,0.12); }
        }
        @media (max-width: 600px) {
          .service-why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

export default ServiceAreas
