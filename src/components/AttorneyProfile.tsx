import React from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Scale, User } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'
import { useRevealChildren } from '../hooks/useReveal'

const AttorneyProfile: React.FC = () => {
  const sectionRef = useRevealChildren(0.1)
  const { attorney } = SITE_CONFIG

  return (
    <section
      id="attorney"
      style={{
        background: 'var(--color-walnut-mid)',
        padding: 'var(--section-padding-y) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-labelledby="attorney-heading"
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: 0, top: 0, bottom: 0,
          width: '40%',
          background: 'linear-gradient(to left, rgba(12,10,8,0.6), transparent)',
          pointerEvents: 'none',
        }}
      />

      <div
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        className="container-site"
      >
        {/* .grid-2col-wide → stacks to 1col at 768px */}
        <div className="grid-2col-wide" style={{ position: 'relative', zIndex: 1 }}>

          {/* Left: Image */}
          <div className="reveal" style={{ position: 'relative' }}>
            {/* .attorney-frame-offset fixes left:-1rem overflow on mobile */}
            <div className="attorney-frame-offset" aria-hidden="true" />

            <div style={{
              position: 'relative',
              zIndex: 1,
              aspectRatio: '4/5',
              background: 'var(--color-walnut)',
              overflow: 'hidden',
            }}>
              <img
                src={attorney.imagePath}
                alt={`${attorney.name}, ${attorney.title}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  display: 'block',
                }}
                onError={(e) => {
                  const img = e.currentTarget
                  img.style.display = 'none'
                  const next = img.nextElementSibling as HTMLElement
                  if (next) next.style.display = 'flex'
                }}
              />
              <div
                style={{
                  display: 'none',
                  width: '100%', height: '100%',
                  background: 'var(--color-walnut)',
                  alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column', gap: '1rem',
                  color: 'var(--color-stone-light)',
                }}
                aria-hidden="true"
              >
                <User size={64} strokeWidth={0.75} style={{ opacity: 0.3 }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', opacity: 0.5 }}>
                  {attorney.name}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Bio */}
          <div>
            <span className="overline-label reveal" style={{ display: 'block', marginBottom: '1.25rem' }}>
              Experienced Legal Counsel
            </span>

            <h2
              id="attorney-heading"
              className="section-heading reveal reveal-delay-1"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', marginBottom: '0.5rem' }}
            >
              {attorney.name}
            </h2>

            <p className="reveal reveal-delay-1" style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-brass)',
              marginBottom: '0.5rem',
            }}>
              {attorney.title}
            </p>

            <p className="reveal reveal-delay-2" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              fontStyle: 'italic',
              color: 'var(--color-stone-light)',
              marginBottom: '1.75rem',
            }}>
              {attorney.tagline}
            </p>

            <div
              className="reveal reveal-delay-2"
              aria-hidden="true"
              style={{
                width: '3rem', height: '1px',
                background: 'linear-gradient(90deg, var(--color-brass), transparent)',
                marginBottom: '1.75rem',
              }}
            />

            <p className="reveal reveal-delay-2" style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.875rem, 1.4vw, 1rem)',
              fontWeight: 300,
              color: 'rgba(245,240,232,0.7)',
              lineHeight: 1.8,
              marginBottom: '2.5rem',
            }}>
              {attorney.bio}
            </p>

            {/* Education & Admissions — .grid-2col-inner stacks to 1col at 768px */}
            <div className="reveal reveal-delay-3 grid-2col-inner">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <GraduationCap size={14} strokeWidth={1.5} style={{ color: 'var(--color-brass)' }} aria-hidden="true" />
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 500,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--color-brass)',
                  }}>
                    Education
                  </span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {attorney.education.map((edu) => (
                    <li key={edu} style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 300,
                      color: 'rgba(245,240,232,0.65)',
                      lineHeight: 1.5,
                    }}>
                      {edu}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <Scale size={14} strokeWidth={1.5} style={{ color: 'var(--color-brass)' }} aria-hidden="true" />
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 500,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--color-brass)',
                  }}>
                    Admissions
                  </span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {attorney.admissions.map((admission) => (
                    <li key={admission} style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 300,
                      color: 'rgba(245,240,232,0.65)',
                      lineHeight: 1.5,
                    }}>
                      {admission}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="reveal reveal-delay-4">
              <Link to="/#contact" className="btn-primary">
                Schedule a Consultation
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default AttorneyProfile
