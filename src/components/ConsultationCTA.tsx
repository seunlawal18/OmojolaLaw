import React, { useState } from 'react'
import { Phone, Mail, CheckCircle, AlertCircle } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'
import { useRevealChildren } from '../hooks/useReveal'

interface FormData {
  name: string; email: string; phone: string; subject: string; message: string
}
interface FormErrors {
  name?: string; email?: string; phone?: string; subject?: string; message?: string
}
type FormStatus = 'idle' | 'success' | 'error'

const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const validatePhone = (v: string) => /^[\d\s\-\.\(\)\+]{7,20}$/.test(v.trim())

const ConsultationCTA: React.FC = () => {
  const sectionRef = useRevealChildren(0.1)
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', subject: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = (): FormErrors => {
    const errs: FormErrors = {}
    if (!formData.name.trim() || formData.name.trim().length < 2) errs.name = 'Please enter your full name.'
    if (!formData.email.trim() || !validateEmail(formData.email)) errs.email = 'Please enter a valid email address.'
    if (!formData.phone.trim() || !validatePhone(formData.phone)) errs.phone = 'Please enter a valid phone number.'
    if (!formData.subject.trim() || formData.subject.trim().length < 3) errs.subject = 'Please provide a subject.'
    if (!formData.message.trim() || formData.message.trim().length < 10) errs.message = 'Please describe your matter (at least 10 characters).'
    return errs
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return }
    setIsSubmitting(true); setErrors({})
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1500))
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch { setStatus('error') }
    finally { setIsSubmitting(false) }
  }

  return (
    <section
      id="contact"
      style={{ background: 'var(--color-obsidian)', padding: 'var(--section-padding-y) 0' }}
      aria-labelledby="contact-heading"
    >
      <div
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        className="container-site"
      >
        {/* ── Section heading ── */}
        <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <span className="overline-label reveal" style={{ display: 'block', marginBottom: '1rem' }}>
            Free Consultation
          </span>
          <h2
            id="contact-heading"
            className="section-heading reveal reveal-delay-1"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
          >
            Schedule a Case Evaluation
          </h2>
        </div>

        {/* ── Two-column: form left | contact panel right ── */}
        <div className="contact-layout">

          {/* ── LEFT: Form ── */}
          <div className="reveal reveal-delay-1">
            {status === 'success' ? (
              <div style={{
                padding: 'clamp(2rem, 4vw, 3rem)',
                border: '1px solid rgba(184,154,90,0.3)',
                background: 'rgba(184,154,90,0.04)',
                textAlign: 'center',
              }} role="alert">
                <CheckCircle size={40} strokeWidth={1} style={{ color: 'var(--color-brass)', margin: '0 auto 1.25rem' }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 400, color: 'var(--color-ivory)', marginBottom: '0.75rem' }}>
                  Message Received
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 300, color: 'rgba(245,240,232,0.65)', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Thank you for reaching out. Attorney Omojola or a member of our team will be in touch shortly.
                </p>
                <button onClick={() => setStatus('idle')} className="btn-brass-outline" style={{ margin: '0 auto' }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Case evaluation request form"
              >
                {status === 'error' && (
                  <div role="alert" style={{ display: 'flex', gap: '0.75rem', padding: '1rem', background: 'rgba(224,112,112,0.08)', border: '1px solid rgba(224,112,112,0.3)', marginBottom: '1.5rem' }}>
                    <AlertCircle size={16} strokeWidth={1.5} style={{ color: '#e07070', flexShrink: 0, marginTop: '1px' }} />
                    <p style={{ fontSize: 'var(--text-sm)', color: '#e07070', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                      Something went wrong. Please try again or call us directly.
                    </p>
                  </div>
                )}

                {/* Name + Email */}
                <div className="grid-form-2col">
                  <div className="form-field">
                    <label htmlFor="name" className="form-label">Your Name <span aria-label="required">*</span></label>
                    <input id="name" name="name" type="text" autoComplete="name"
                      className={`form-input${errors.name ? ' error' : ''}`}
                      value={formData.name} onChange={handleChange}
                      placeholder="Your full name" aria-required="true"
                      aria-describedby={errors.name ? 'name-error' : undefined} />
                    {errors.name && <span id="name-error" className="form-error" role="alert">{errors.name}</span>}
                  </div>
                  <div className="form-field">
                    <label htmlFor="email" className="form-label">Your Email <span aria-label="required">*</span></label>
                    <input id="email" name="email" type="email" autoComplete="email"
                      className={`form-input${errors.email ? ' error' : ''}`}
                      value={formData.email} onChange={handleChange}
                      placeholder="your@email.com" aria-required="true"
                      aria-describedby={errors.email ? 'email-error' : undefined} />
                    {errors.email && <span id="email-error" className="form-error" role="alert">{errors.email}</span>}
                  </div>
                </div>

                {/* Subject + Phone */}
                <div className="grid-form-2col">
                  <div className="form-field">
                    <label htmlFor="subject" className="form-label">Subject <span aria-label="required">*</span></label>
                    <input id="subject" name="subject" type="text"
                      className={`form-input${errors.subject ? ' error' : ''}`}
                      value={formData.subject} onChange={handleChange}
                      placeholder="e.g. DUI Defense, Immigration" aria-required="true"
                      aria-describedby={errors.subject ? 'subject-error' : undefined} />
                    {errors.subject && <span id="subject-error" className="form-error" role="alert">{errors.subject}</span>}
                  </div>
                  <div className="form-field">
                    <label htmlFor="phone" className="form-label">Phone Number <span aria-label="required">*</span></label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel"
                      className={`form-input${errors.phone ? ' error' : ''}`}
                      value={formData.phone} onChange={handleChange}
                      placeholder="(732) 000-0000" aria-required="true"
                      aria-describedby={errors.phone ? 'phone-error' : undefined} />
                    {errors.phone && <span id="phone-error" className="form-error" role="alert">{errors.phone}</span>}
                  </div>
                </div>

                {/* Message */}
                <div className="form-field" style={{ marginBottom: '1.75rem' }}>
                  <label htmlFor="message" className="form-label">Message <span aria-label="required">*</span></label>
                  <textarea id="message" name="message"
                    className={`form-input${errors.message ? ' error' : ''}`}
                    value={formData.message} onChange={handleChange}
                    placeholder="Briefly describe your legal matter..."
                    style={{ minHeight: '8rem' }} aria-required="true"
                    aria-describedby={errors.message ? 'message-error' : undefined} />
                  {errors.message && <span id="message-error" className="form-error" role="alert">{errors.message}</span>}
                </div>

                {/* Disclaimer */}
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 300, color: 'rgba(245,240,232,0.3)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Submitting this form does not create an attorney-client relationship. This is attorney advertising for general information purposes only.
                </p>

                <button type="submit" className="btn-primary" disabled={isSubmitting}
                  style={{ width: '100%', justifyContent: 'center', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'wait' : 'pointer', fontSize: 'var(--text-sm)' }}
                  aria-busy={isSubmitting}>
                  {isSubmitting ? 'Sending…' : 'Submit Now'}
                </button>
              </form>
            )}
          </div>

          {/* ── RIGHT: Contact Us panel with image ── */}
          <div className="reveal reveal-delay-2 contact-panel">

            {/* Heading */}
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 400,
              color: 'var(--color-ivory)',
              marginBottom: '1.5rem',
            }}>
              Contact Us
            </h3>

            {/* Handshake / legal image */}
            <div style={{
              width: '100%',
              aspectRatio: '4/3',
              background: 'var(--color-walnut)',
              overflow: 'hidden',
              marginBottom: '1.75rem',
              position: 'relative',
            }}>
              <img
                src="/assets/contact-image.png"
                alt="Attorney consultation — handshake with gavel and legal documents"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                onError={(e) => {
                  // Fallback: show a dark styled placeholder if image not added yet
                  const img = e.currentTarget
                  img.style.display = 'none'
                  const placeholder = img.nextElementSibling as HTMLElement
                  if (placeholder) placeholder.style.display = 'flex'
                }}
              />
              {/* Placeholder if no image */}
              <div style={{
                display: 'none',
                position: 'absolute', inset: 0,
                alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                gap: '0.75rem',
                background: 'linear-gradient(135deg, var(--color-walnut) 0%, var(--color-walnut-mid) 100%)',
              }} aria-hidden="true">
                <div style={{ fontSize: 'clamp(2rem,4vw,3rem)', opacity: 0.15 }}>⚖</div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-stone-light)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Add contact-image.jpg to /public/assets/
                </span>
              </div>
            </div>

            {/* We're here to help */}
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
              fontWeight: 500,
              color: 'var(--color-ivory)',
              marginBottom: '0.5rem',
            }}>
              We're here to help you
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)', fontWeight: 300,
              color: 'rgba(245,240,232,0.6)',
              lineHeight: 1.6,
              marginBottom: '1.75rem',
            }}>
              Call Now at{' '}
              <a href={SITE_CONFIG.contact.phoneHref} style={{
                color: 'var(--color-brass)', fontWeight: 500, textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-brass-light)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-brass)' }}>
                {SITE_CONFIG.contact.phone}
              </a>{' '}
              and send us a message via the form.
            </p>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={SITE_CONFIG.contact.phoneHref} className="btn-primary"
                style={{ flex: 1, justifyContent: 'center', minWidth: '140px' }}>
                <Phone size={14} strokeWidth={1.5} />
                Contact Us
              </a>
              <a href={SITE_CONFIG.contact.emailHref}
                style={{
                  flex: 1, minWidth: '140px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)',
                  fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--color-obsidian)',
                  background: 'rgba(245,240,232,0.9)',
                  border: '1px solid rgba(245,240,232,0.9)',
                  padding: '0.75rem 1.25rem',
                  textDecoration: 'none',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#fff' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(245,240,232,0.9)' }}
                aria-label={`Email us at ${SITE_CONFIG.contact.email}`}
              >
                <Mail size={14} strokeWidth={1.5} />
                Email Us
              </a>
            </div>

            {/* Email address shown below */}
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)',
              color: 'var(--color-brass)', marginTop: '0.75rem',
              letterSpacing: '0.04em',
            }}>
              {SITE_CONFIG.contact.email}
            </p>
          </div>

        </div>
      </div>

      <style>{`
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2.5rem, 5vw, 5rem);
          align-items: start;
        }
        .contact-panel {
          background: var(--color-walnut);
          padding: clamp(2rem, 4vw, 3rem);
          border: 1px solid rgba(184,154,90,0.15);
        }
        @media (max-width: 900px) {
          .contact-layout {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 400px) {
          .grid-form-2col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

export default ConsultationCTA
