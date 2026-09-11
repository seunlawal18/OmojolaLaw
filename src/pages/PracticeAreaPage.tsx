import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Phone } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'
import ConsultationCTA from '../components/ConsultationCTA'
import { useRevealChildren } from '../hooks/useReveal'

const practiceDetails: Record<string, { heading: string; intro: string; bullets: string[] }> = {
  'litigation': {
    heading: 'Strategic Litigation in New Jersey',
    intro: 'At times your rights may not be respected or your interests secured until a lawyer is involved. Omojola Law provides vigorous representation to protect your rights and interests when disputes require legal resolution.',
    bullets: ['Consumer Fraud Actions', 'Insurance & Banking Disputes', 'Commercial & Business Disputes', 'Administrative Law Proceedings', 'Personal Injury Claims'],
  },
  'domestic-violence-family': {
    heading: 'Domestic Violence & Family Law Representation',
    intro: 'Domestic violence and family matters are among the most sensitive legal matters because children, parental rights, and personal safety may all be at stake. Attorney Ade Omojola approaches every matter with discretion, compassion, and strategic advocacy.',
    bullets: ['Final & Temporary Restraining Orders', 'Domestic Violence Defense', 'Child Custody & Parenting Time', 'Child Support Matters', 'Related Family Court Proceedings'],
  },
  'dui-dwi': {
    heading: 'DUI/DWI Defense That Protects Your Future',
    intro: 'A DUI or DWI charge in New Jersey carries serious consequences including license suspension, fines, and potential incarceration. Omojola Law provides robust and strategic defense focused on protecting your freedom, your driving privileges, and your finances.',
    bullets: ['First-Offense DUI/DWI Defense', 'Repeat Offense DUI/DWI Representation', 'License Suspension Hearings', 'Breathalyzer & Field Sobriety Challenges', 'Negotiation with Prosecutors'],
  },
  'immigration': {
    heading: 'Immigration Law — Protecting Your Future in the United States',
    intro: 'Navigating U.S. immigration law requires a knowledgeable and experienced advocate. Omojola Law provides strategic immigration legal services covering the full spectrum of family-based and employment-based immigration matters.',
    bullets: ['Family-Based Immigration Petitions', 'Deportation Defense (Removal Proceedings)', 'Investor & Special Immigrant Visas', 'Permanent Residence (Green Card) Applications', 'Naturalization & Citizenship', 'Work Visa & Status Extensions'],
  },
}

const PracticeAreaPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const headerRef = useRevealChildren(0.1)

  const area = SITE_CONFIG.practiceAreas.find((a) => a.id === slug)
  const details = slug ? practiceDetails[slug] : null

  if (!area || !details) {
    return (
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 className="section-heading" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Practice Area Not Found</h1>
          <Link to="/#practice-areas" className="btn-primary">View All Practice Areas</Link>
        </div>
      </main>
    )
  }

  return (
    <main>
      {/* Page header */}
      <section style={{
        background: 'var(--color-walnut)',
        padding: 'clamp(5rem, 14vw, 10rem) 0 clamp(3rem, 7vw, 5rem)',
        borderBottom: '1px solid rgba(184,154,90,0.15)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 80% at 70% 50%, rgba(184,154,90,0.05) 0%, transparent 70%)',
        }} />

        <div ref={headerRef as React.RefObject<HTMLDivElement>} className="container-site" style={{ position: 'relative', zIndex: 1 }}>
          <Link
            to="/#practice-areas"
            className="reveal"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 500,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--color-stone-light)', marginBottom: '2rem',
              transition: 'color 0.2s ease', textDecoration: 'none',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-brass)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-stone-light)' }}
          >
            <ArrowLeft size={13} strokeWidth={2} /> Practice Areas
          </Link>

          <span className="overline-label reveal reveal-delay-1" style={{ display: 'block', marginBottom: '1.25rem' }}>
            {area.number} — Practice Area
          </span>
          <h1 className="section-heading reveal reveal-delay-2"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)', marginBottom: '1.5rem' }}>
            {area.title}
          </h1>
          <a href={SITE_CONFIG.contact.phoneHref} className="btn-primary reveal reveal-delay-3">
            <Phone size={14} strokeWidth={1.5} /> {SITE_CONFIG.contact.phone}
          </a>
        </div>
      </section>

      {/* Content — .grid-practice-page: 1fr 1fr → 1col at 768px */}
      <section style={{ background: 'var(--color-obsidian)', padding: 'var(--section-padding-y) 0' }}>
        <div className="container-site grid-practice-page">

          <div>
            <h2 className="section-heading" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', marginBottom: '1.5rem' }}>
              {details.heading}
            </h2>
            <div aria-hidden="true" style={{ width: '3rem', height: '1px', background: 'linear-gradient(90deg, var(--color-brass), transparent)', marginBottom: '1.5rem' }} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)', fontWeight: 300, color: 'rgba(245,240,232,0.7)', lineHeight: 1.8, marginBottom: '2rem' }}>
              {details.intro}
            </p>
            <Link to="/#contact" className="btn-primary">
              Schedule a Consultation
            </Link>
          </div>

          <div>
            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-brass)', marginBottom: '1.5rem' }}>
              Matters We Handle
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0' }}>
              {details.bullets.map((bullet, i) => (
                <li key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '1rem 0', borderBottom: '1px solid rgba(245,240,232,0.06)',
                  fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)',
                  fontWeight: 300, color: 'rgba(245,240,232,0.75)',
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-brass)', flexShrink: 0 }} aria-hidden="true" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      <ConsultationCTA />
    </main>
  )
}

export default PracticeAreaPage
