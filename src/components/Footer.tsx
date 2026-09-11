import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'

const Footer: React.FC = () => {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{ background: 'var(--color-obsidian)', borderTop: '1px solid rgba(184,154,90,0.15)' }}
      role="contentinfo"
    >
      {/* .grid-footer: 4col → 2col at 1024px → 1col at 600px */}
      <div className="container-site grid-footer">

        {/* Column 1 — Brand */}
        <div>
          <Link to="/" style={{ display: 'inline-block', marginBottom: '1.25rem' }}>
            <img
              src={SITE_CONFIG.media.logoWhitePath}
              alt="Omojola Law"
              style={{ height: '72px', width: 'auto', objectFit: 'contain' }}
              onError={(e) => {
                const img = e.currentTarget
                if (!img.dataset.fallback) {
                  img.dataset.fallback = '1'
                  img.src = SITE_CONFIG.media.logoPath
                } else {
                  img.style.display = 'none'
                  const next = img.nextElementSibling as HTMLElement
                  if (next) next.style.display = 'block'
                }
              }}
            />
            <span style={{ display: 'none', fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 500, color: 'var(--color-ivory)' }}>
              Omojola <span style={{ color: 'var(--color-brass)' }}>Law</span>
            </span>
          </Link>

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 300,
            color: 'rgba(245,240,232,0.5)', lineHeight: 1.75, marginBottom: '1.5rem', maxWidth: '28ch',
          }}>
            Strategic legal representation across New Jersey. Protecting your rights with client-focused advocacy.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { href: SITE_CONFIG.contact.phoneHref, icon: Phone, label: SITE_CONFIG.contact.phone },
              { href: SITE_CONFIG.contact.emailHref, icon: Mail,  label: SITE_CONFIG.contact.email },
            ].map(({ href, icon: Icon, label }) => (
              <a key={label} href={href} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
                color: 'rgba(245,240,232,0.55)', textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-brass-light)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,240,232,0.55)' }}>
                <Icon size={13} strokeWidth={1.5} aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 — Nav */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-brass)', marginBottom: '1.25rem' }}>
            Navigation
          </h3>
          <nav aria-label="Footer navigation">
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {SITE_CONFIG.nav.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} style={{
                    fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 300,
                    color: 'rgba(245,240,232,0.5)', textDecoration: 'none',
                    transition: 'color 0.2s ease', display: 'block',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-ivory)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,240,232,0.5)' }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Column 3 — Practice Areas */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-brass)', marginBottom: '1.25rem' }}>
            Practice Areas
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {SITE_CONFIG.practiceAreas.map((area) => (
              <li key={area.id}>
                <Link to={area.href} style={{
                  fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 300,
                  color: 'rgba(245,240,232,0.5)', textDecoration: 'none',
                  transition: 'color 0.2s ease', display: 'block',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-ivory)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,240,232,0.5)' }}>
                  {area.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Offices */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-brass)', marginBottom: '1.25rem' }}>
            Offices
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {SITE_CONFIG.locations.map((loc) => (
              <li key={loc.city}>
                <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer"
                  style={{ textDecoration: 'none', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}
                  aria-label={`${loc.city} office — ${loc.address}`}>
                  <MapPin size={12} strokeWidth={1.5} style={{ color: 'var(--color-brass-dim)', marginTop: '3px', flexShrink: 0 }} aria-hidden="true" />
                  <address style={{
                    fontStyle: 'normal', fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)', fontWeight: 300,
                    color: 'rgba(245,240,232,0.5)', lineHeight: 1.6,
                  }}>
                    <strong style={{ color: 'rgba(245,240,232,0.65)', display: 'block', fontWeight: 400 }}>{loc.city}</strong>
                    {loc.address}<br />{loc.cityState}
                  </address>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(245,240,232,0.06)' }}>
        <div className="container-site" style={{
          paddingBlock: '1.5rem',
          display: 'flex', alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '1.5rem', flexWrap: 'wrap',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 300,
            color: 'rgba(245,240,232,0.3)', lineHeight: 1.6,
          }}>
            © {year} Omojola Law. All rights reserved. &nbsp;|&nbsp;
            The information on this website is attorney advertising for general information purposes only.
            Nothing herein should be taken as legal advice for any individual case or situation.
            Submitting a form does not create an attorney-client relationship.
            Prior results do not guarantee a similar outcome.
          </p>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 300,
            color: 'rgba(245,240,232,0.2)', whiteSpace: 'nowrap',
          }}>
            New Jersey Law Firm
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
