import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Minus, HelpCircle, Scale, Shield, Car, Globe } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'
import { useRevealChildren } from '../hooks/useReveal'

// Icon per FAQ topic — keyed by substring in question text
const topicIcon = (q: string): React.FC<{ size?: number; strokeWidth?: number }> => {
  if (/DUI|breath|refus/i.test(q)) return Car
  if (/domestic|restraining/i.test(q)) return Shield
  if (/immigration|visa/i.test(q)) return Globe
  return Scale
}

// ── Animated accordion item ───────────────────────────────────────────────────
const FAQItem: React.FC<{
  item: { q: string; a: string }
  index: number
  isOpen: boolean
  onToggle: () => void
}> = ({ item, index, isOpen, onToggle }) => {
  const bodyRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  const Icon = topicIcon(item.q)

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(isOpen ? bodyRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  return (
    <div
      className={`reveal reveal-delay-${(index % 4) + 1}`}
      style={{
        borderBottom: '1px solid rgba(245,240,232,0.08)',
        transition: 'background 0.25s ease',
        background: isOpen ? 'rgba(184,154,90,0.04)' : 'transparent',
      }}
    >
      {/* Question row — button */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-body-${index}`}
        id={`faq-trigger-${index}`}
        style={{
          width: '100%', background: 'transparent', border: 'none',
          cursor: 'pointer', padding: 'clamp(1.25rem, 2.5vw, 1.625rem) 0',
          display: 'flex', alignItems: 'center', gap: '1rem',
          textAlign: 'left',
        }}
      >
        {/* Topic icon */}
        <div style={{
          width: '36px', height: '36px', flexShrink: 0,
          border: `1px solid ${isOpen ? 'rgba(184,154,90,0.5)' : 'rgba(184,154,90,0.2)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: isOpen ? 'var(--color-brass)' : 'var(--color-brass-dim)',
          background: isOpen ? 'rgba(184,154,90,0.08)' : 'transparent',
          transition: 'all 0.25s ease',
        }}>
          <Icon size={14} strokeWidth={1.5} />
        </div>

        {/* Question text */}
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          fontWeight: 500,
          color: isOpen ? 'var(--color-ivory)' : 'rgba(245,240,232,0.8)',
          lineHeight: 1.35,
          flex: 1,
          transition: 'color 0.25s ease',
        }}>
          {item.q}
        </span>

        {/* Toggle icon */}
        <div style={{
          width: '32px', height: '32px', flexShrink: 0,
          border: '1px solid rgba(184,154,90,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--color-brass)',
          transition: 'transform 0.25s ease, background 0.25s ease',
          background: isOpen ? 'rgba(184,154,90,0.1)' : 'transparent',
        }}>
          {isOpen
            ? <Minus size={14} strokeWidth={2} />
            : <Plus  size={14} strokeWidth={2} />
          }
        </div>
      </button>

      {/* Answer — animated height */}
      <div
        id={`faq-body-${index}`}
        role="region"
        aria-labelledby={`faq-trigger-${index}`}
        style={{
          height: `${height}px`,
          overflow: 'hidden',
          transition: 'height 0.35s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div ref={bodyRef} style={{
          paddingBottom: 'clamp(1.25rem, 2.5vw, 1.75rem)',
          paddingLeft: 'calc(36px + 1rem)',
        }}>
          {/* Split on double newline so multi-paragraph answers render properly */}
          {item.a.split('\n\n').map((para, i) => (
            <p key={i} style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.875rem, 1.4vw, 0.95rem)',
              fontWeight: 300,
              color: 'rgba(245,240,232,0.7)',
              lineHeight: 1.8,
              marginBottom: i < item.a.split('\n\n').length - 1 ? '0.875rem' : 0,
            }}>
              {para}
            </p>
          ))}

          {/* Inline CTA on last answer paragraph */}
          <div style={{ marginTop: '1rem' }}>
            <Link
              to="/#contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)', fontWeight: 500,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--color-brass)', textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-brass-light)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-brass)' }}
            >
              Speak with Attorney Omojola →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main Section ──────────────────────────────────────────────────────────────
const FAQ: React.FC = () => {
  const sectionRef = useRevealChildren(0.08)
  const [openIndex, setOpenIndex] = useState<number | null>(0) // first item open by default

  const toggle = (i: number) => setOpenIndex(prev => prev === i ? null : i)

  return (
    <section
      id="faq"
      style={{
        background: 'var(--color-walnut-mid)',
        padding: 'var(--section-padding-y) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-labelledby="faq-heading"
    >
      {/* Watermark */}
      <div aria-hidden="true" style={{
        position: 'absolute', right: '-5%', top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(8rem, 18vw, 16rem)',
        fontWeight: 700, lineHeight: 1,
        color: 'rgba(184,154,90,0.04)',
        pointerEvents: 'none', userSelect: 'none',
        letterSpacing: '-0.04em',
      }}>
        FAQ
      </div>

      <div
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        className="container-site"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* ── Header ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: 'clamp(2.5rem, 6vw, 7rem)',
          alignItems: 'start',
        }} className="faq-layout-grid">

          {/* Left sticky label column */}
          <div style={{ position: 'sticky', top: '6rem' }} className="faq-sticky-col">
            <div style={{
              width: '48px', height: '48px',
              border: '1px solid rgba(184,154,90,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--color-brass)',
              marginBottom: '1.5rem',
              background: 'rgba(184,154,90,0.06)',
            }}>
              <HelpCircle size={22} strokeWidth={1.5} />
            </div>

            <span className="overline-label reveal" style={{ display: 'block', marginBottom: '1.25rem' }}>
              Common Questions
            </span>

            <h2
              id="faq-heading"
              className="section-heading reveal reveal-delay-1"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', marginBottom: '1.25rem' }}
            >
              Frequently<br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-brass-light)', fontWeight: 300 }}>
                Asked Questions
              </em>
            </h2>

            <p className="reveal reveal-delay-2" style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)', fontWeight: 300,
              color: 'rgba(245,240,232,0.5)',
              lineHeight: 1.75,
              marginBottom: '2rem',
            }}>
              Can't find your answer? Call us for a free consultation.
            </p>

            <a href={SITE_CONFIG.contact.phoneHref} className="btn-brass-outline reveal reveal-delay-3"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              {SITE_CONFIG.contact.phone}
            </a>
          </div>

          {/* Right — accordion */}
          <div>
            {SITE_CONFIG.faq.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .faq-layout-grid  { grid-template-columns: 1fr 2fr; }
        .faq-sticky-col   { position: sticky; top: 6rem; }

        @media (max-width: 900px) {
          .faq-layout-grid { grid-template-columns: 1fr !important; }
          .faq-sticky-col  { position: static !important; }
        }
      `}</style>
    </section>
  )
}

export default FAQ
