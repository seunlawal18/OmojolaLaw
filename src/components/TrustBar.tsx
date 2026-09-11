import React from 'react'
import { Award, DollarSign, Phone } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'
import { useRevealChildren } from '../hooks/useReveal'

const TrustBar: React.FC = () => {
  const sectionRef = useRevealChildren(0.1)

  const items = [
    { icon: Award,       headline: 'Over 14 Years Of Experience', sub: 'Providing exceptional legal services',  href: undefined },
    { icon: DollarSign,  headline: 'Reasonable Attorney Fees',    sub: 'Flat Fees & Payment Plans',             href: undefined },
    { icon: Phone,       headline: 'Call For A Free Consultation', sub: SITE_CONFIG.contact.phone,              href: SITE_CONFIG.contact.phoneHref },
  ]

  return (
    <section
      id="trust"
      style={{
        background: 'var(--color-walnut)',
        borderTop: '1px solid rgba(184,154,90,0.2)',
        borderBottom: '1px solid rgba(184,154,90,0.2)',
        padding: 'clamp(2.5rem, 5vw, 4rem) 0',
      }}
      aria-label="Trust indicators"
    >
      <div
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        className="container-site"
        style={{
          display: 'grid',
          /* auto-fit so it wraps naturally; on small screens 220px cards go to 1col */
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '0',
        }}
      >
        {items.map((item, index) => {
          const Icon = item.icon
          const isLast = index === items.length - 1

          const content = (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
              <div style={{
                width: '44px', height: '44px',
                border: '1px solid rgba(184,154,90,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, color: 'var(--color-brass)',
              }}>
                <Icon size={18} strokeWidth={1.5} />
              </div>
              <div>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                  fontWeight: 500, color: 'var(--color-ivory)',
                  lineHeight: 1.3, marginBottom: '0.25rem',
                }}>
                  {item.headline}
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)', fontWeight: 300,
                  color: 'var(--color-brass-light)', letterSpacing: '0.02em',
                }}>
                  {item.sub}
                </p>
              </div>
            </div>
          )

          return (
            <div
              key={index}
              className={`reveal reveal-delay-${index + 1}${!isLast ? ' trust-item-border' : ''}`}
              style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 3vw, 3rem)' }}
            >
              {item.href ? (
                <a href={item.href} style={{ display: 'block', textDecoration: 'none' }}
                  aria-label={`${item.headline}: ${item.sub}`}>
                  {content}
                </a>
              ) : content}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default TrustBar
