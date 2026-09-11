import React from 'react'
import AttorneyProfile from '../components/AttorneyProfile'
import WhyChooseUs from '../components/WhyChooseUs'
import ConsultationCTA from '../components/ConsultationCTA'
import { useRevealChildren } from '../hooks/useReveal'

const AboutPage: React.FC = () => {
  const headerRef = useRevealChildren(0.1)

  return (
    <main>
      {/* Page Header */}
      <section
        style={{
          background: 'var(--color-walnut)',
          padding: 'clamp(5rem, 14vw, 10rem) 0 clamp(3rem, 7vw, 5rem)',
          borderBottom: '1px solid rgba(184,154,90,0.15)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 60% 80% at 70% 50%, rgba(184,154,90,0.05) 0%, transparent 70%)',
          }}
        />
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className="container-site"
          style={{ position: 'relative', zIndex: 1 }}
        >
          <span className="overline-label reveal" style={{ display: 'block', marginBottom: '1.25rem' }}>
            About the Firm
          </span>
          <h1
            className="section-heading reveal reveal-delay-1"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Omojola Law
          </h1>
          <p
            className="reveal reveal-delay-2"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'var(--color-brass-light)',
              marginTop: '0.5rem',
            }}
          >
            A Trusted Firm Solving Legal Problems
          </p>
        </div>
      </section>

      {/* Attorney Profile */}
      <AttorneyProfile />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* CTA */}
      <ConsultationCTA />
    </main>
  )
}

export default AboutPage
