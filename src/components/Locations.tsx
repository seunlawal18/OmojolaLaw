import React, { useState } from 'react'
import { MapPin, Phone, Mail, ExternalLink, Navigation } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'
import { useRevealChildren } from '../hooks/useReveal'

const Locations: React.FC = () => {
  const sectionRef = useRevealChildren(0.1)
  // Track which location card is active for the map tab switcher
  const primaryIdx = SITE_CONFIG.locations.findIndex((l) => l.isPrimary)
  const [activeIdx, setActiveIdx] = useState(primaryIdx >= 0 ? primaryIdx : 0)
  const active = SITE_CONFIG.locations[activeIdx]

  return (
    <section
      id="locations"
      style={{ background: 'var(--color-walnut-mid)', padding: 'var(--section-padding-y) 0' }}
      aria-labelledby="locations-heading"
    >
      <div ref={sectionRef as React.RefObject<HTMLDivElement>} className="container-site">

        {/* ── Header ── */}
        <div style={{ marginBottom: 'clamp(3rem, 5vw, 4.5rem)' }}>
          <span className="overline-label reveal" style={{ display: 'block', marginBottom: '1.25rem' }}>
            Office Locations
          </span>
          <h2
            id="locations-heading"
            className="section-heading reveal reveal-delay-1"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
          >
            Serving Clients<br />
            <em style={{ fontStyle: 'italic', color: 'var(--color-brass-light)', fontWeight: 300 }}>
              Across New Jersey
            </em>
          </h2>
        </div>

        {/* ── Main layout: map left, cards right ── */}
        <div className="locations-main-grid reveal">

          {/* ── Interactive Google Map ── */}
          <div style={{ position: 'relative' }}>
            {/* Tab switcher — only show if >1 location has an embedUrl */}
            <div style={{
              display: 'flex',
              gap: '0',
              marginBottom: '0',
              borderBottom: '1px solid rgba(245,240,232,0.08)',
            }}>
              {SITE_CONFIG.locations.map((loc, i) => (
                <button
                  key={loc.city}
                  onClick={() => setActiveIdx(i)}
                  aria-pressed={i === activeIdx}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: i === activeIdx ? 'var(--color-brass)' : 'rgba(245,240,232,0.4)',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: i === activeIdx ? '2px solid var(--color-brass)' : '2px solid transparent',
                    padding: '0.75rem 1.25rem',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease, border-color 0.2s ease',
                    marginBottom: '-1px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {loc.city}
                </button>
              ))}
            </div>

            {/* Map iframe — Google Maps embed for the active location */}
            <div style={{
              position: 'relative',
              paddingTop: '62%',   /* 16:10 aspect ratio */
              background: 'var(--color-walnut)',
              overflow: 'hidden',
              border: '1px solid rgba(245,240,232,0.07)',
              borderTop: 'none',
            }}>
              {active.embedUrl ? (
                <iframe
                  key={active.city}   /* re-mount on city change */
                  title={`Map — Omojola Law ${active.city}`}
                  src={active.embedUrl}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    display: 'block',
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                /* Fallback for offices without embedUrl — show a "View on Google Maps" card */
                <a
                  href={active.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    background: 'linear-gradient(135deg, var(--color-walnut) 0%, var(--color-walnut-mid) 100%)',
                    textDecoration: 'none',
                  }}
                >
                  <div style={{
                    width: '56px', height: '56px',
                    border: '1px solid rgba(184,154,90,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--color-brass)',
                  }}>
                    <Navigation size={22} strokeWidth={1.5} />
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)', fontWeight: 500,
                    color: 'var(--color-ivory)', letterSpacing: '0.06em',
                  }}>
                    View on Google Maps
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)', fontWeight: 300,
                    color: 'var(--color-stone-light)',
                  }}>
                    {active.address}, {active.cityState}
                  </span>
                </a>
              )}
            </div>

            {/* Directions CTA below map */}
            <a
              href={active.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.9rem',
                background: 'rgba(184,154,90,0.08)',
                border: '1px solid rgba(184,154,90,0.2)',
                borderTop: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-brass)',
                textDecoration: 'none',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(184,154,90,0.14)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(184,154,90,0.08)' }}
              aria-label={`Get directions to ${active.city} office (opens Google Maps)`}
            >
              <ExternalLink size={13} strokeWidth={2} />
              Get Directions to {active.city}
            </a>
          </div>

          {/* ── Location Cards ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(245,240,232,0.05)' }}>
            {SITE_CONFIG.locations.map((loc, index) => {
              const isActive = index === activeIdx
              return (
                <button
                  key={loc.city}
                  onClick={() => setActiveIdx(index)}
                  aria-pressed={isActive}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: isActive ? 'rgba(26,20,16,0.95)' : 'var(--color-walnut-mid)',
                    padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background 0.25s ease',
                  }}
                >
                  {/* Active accent line */}
                  <div style={{
                    position: 'absolute',
                    left: 0, top: 0, bottom: 0,
                    width: '3px',
                    background: isActive ? 'var(--color-brass)' : 'transparent',
                    transition: 'background 0.25s ease',
                  }} aria-hidden="true" />

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                    <div style={{
                      width: '36px', height: '36px', flexShrink: 0,
                      border: `1px solid ${isActive ? 'rgba(184,154,90,0.5)' : 'rgba(184,154,90,0.2)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: isActive ? 'var(--color-brass)' : 'var(--color-brass-dim)',
                      transition: 'border-color 0.25s ease, color 0.25s ease',
                      marginTop: '2px',
                    }}>
                      <MapPin size={14} strokeWidth={1.5} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                        fontWeight: 500,
                        color: isActive ? 'var(--color-ivory)' : 'rgba(245,240,232,0.7)',
                        lineHeight: 1.2,
                        marginBottom: '0.5rem',
                        transition: 'color 0.25s ease',
                      }}>
                        {loc.city}
                        {loc.isPrimary && (
                          <span style={{
                            marginLeft: '0.6rem',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 500,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--color-brass)',
                            verticalAlign: 'middle',
                          }}>
                            Primary
                          </span>
                        )}
                      </h3>
                      <address style={{
                        fontStyle: 'normal',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 300,
                        color: isActive ? 'rgba(245,240,232,0.65)' : 'rgba(245,240,232,0.4)',
                        lineHeight: 1.6,
                        transition: 'color 0.25s ease',
                      }}>
                        {loc.address}<br />{loc.cityState}
                      </address>
                    </div>
                  </div>
                </button>
              )
            })}

            {/* Contact block at bottom of cards */}
            <div style={{
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              background: 'rgba(12,10,8,0.6)',
              display: 'flex', flexDirection: 'column', gap: '0.75rem',
            }}>
              <a href={SITE_CONFIG.contact.phoneHref} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
                color: 'rgba(245,240,232,0.6)',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-brass-light)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,240,232,0.6)' }}>
                <Phone size={14} strokeWidth={1.5} style={{ color: 'var(--color-brass)', flexShrink: 0 }} aria-hidden="true" />
                {SITE_CONFIG.contact.phone}
              </a>
              <a href={SITE_CONFIG.contact.emailHref} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
                color: 'rgba(245,240,232,0.6)',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-brass-light)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,240,232,0.6)' }}>
                <Mail size={14} strokeWidth={1.5} style={{ color: 'var(--color-brass)', flexShrink: 0 }} aria-hidden="true" />
                {SITE_CONFIG.contact.email}
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Responsive grid */}
      <style>{`
        .locations-main-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 0;
          border: 1px solid rgba(245,240,232,0.07);
        }
        @media (max-width: 900px) {
          .locations-main-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}

export default Locations
