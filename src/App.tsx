import { FormEvent, useEffect, useMemo, useState } from 'react'
import './App.css'

type FormState = {
  name: string
  email: string
  phone: string
  goal: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const navItems = ['About', 'Services', 'Results', 'Pricing', 'Contact']

const services = [
  {
    icon: '⚡',
    title: 'Transformation Coaching',
    copy: 'A structured 12-week plan built around your lifestyle, training level, recovery, and measurable body-composition goals.',
  },
  {
    icon: '🥗',
    title: 'Nutrition Strategy',
    copy: 'Flexible meal guidance, macro targets, and simple habit systems that make fat loss or muscle gain sustainable.',
  },
  {
    icon: '💪',
    title: 'Strength Programming',
    copy: 'Progressive workouts for gym or home with technique cues, weekly check-ins, and performance tracking.',
  },
  {
    icon: '📲',
    title: 'Accountability Support',
    copy: 'Direct coaching touchpoints, progress reviews, mindset resets, and adjustments before plateaus slow you down.',
  },
]

const testimonials = [
  {
    quote:'I lost 10kg in 2 months.Best decision of my life.',
    name: 'Prasanna',
    role: 'Weight Loss Client',
  },
  {
    quote:
      'The weekly check-ins kept me honest. My lifts improved every month and the plan fit around my work travel perfectly.',
    name: 'Ricky',
    role: 'Online strength coaching',
  },
  {
    quote:
      'I had tried generic programs before. This was different—clear, elegant, data-driven, and genuinely motivating.',
    name: 'Ronaldo',
    role: 'Lifestyle transformation',
  },
]

const pricing = [
  {
    name: 'Starter',
    price: '₹2,999',
    tag: 'Build momentum',
    features: ['Personal workout plan', 'Nutrition starter guide', 'Bi-weekly progress review', 'WhatsApp support'],
  },
  {
    name: 'Elite',
    price: '₹5,999',
    tag: 'Most popular',
    featured: true,
    features: ['Custom training blocks', 'Macro-based nutrition plan', 'Weekly video check-in', 'Habit & progress dashboard', 'Priority WhatsApp support'],
  },
  {
    name: 'Athlete',
    price: '₹9,999',
    tag: 'Maximum accountability',
    features: ['Advanced periodized program', 'Meal timing strategy', '2 live coaching calls/month', 'Form review & adjustments', '24-hour response window'],
  },
]

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  goal: '',
  message: '',
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const whatsappMessage = useMemo(
    () => encodeURIComponent('Hi Sandeep, I want to start my fitness transformation. Please share coaching details.'),
    [],
  )

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length)
    }, 5200)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.16 },
    )

    revealElements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMenuOpen(false)
  }

  const validateForm = () => {
    const nextErrors: FormErrors = {}
    if (form.name.trim().length < 2) nextErrors.name = 'Please enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Please enter a valid email address.'
    if (!/^\+?[0-9\s-]{8,15}$/.test(form.phone.trim())) nextErrors.phone = 'Please enter a valid phone number.'
    if (!form.goal) nextErrors.goal = 'Choose your primary goal.'
    if (form.message.trim().length < 12) nextErrors.message = 'Tell us a little more about your current challenge.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(false)

    if (!validateForm()) return

    setSubmitted(true)
    setForm(initialForm)
    setErrors({})
  }

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }))
    }
  }

  return (
    <div className="site-shell">
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} aria-label="Primary navigation">
        <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); scrollToSection('home') }}>
        <img  className="logo-image"  src="/images/logo.png"  alt="Sandeep Fitness"   /> 
          <span>SandeepFitness</span>
        </a>

        <button className="menu-toggle" type="button" aria-label="Toggle navigation" onClick={() => setMenuOpen((open) => !open)}>
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(event) => {
                event.preventDefault()
                scrollToSection(item.toLowerCase())
              }}
            >
              {item}
            </a>
          ))}
          <button className="nav-cta" type="button" onClick={() => scrollToSection('contact')}>
            Free Assessment
          </button>
        </div>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-glow glow-one" />
          <div className="hero-glow glow-two" />
          <div className="hero-content reveal visible">
            <p className="eyebrow">Premium Fitness Coaching</p>
            <h1>
              Sculpt your strongest body with a coach who makes discipline feel
              <span className="gradient-text"> electric.</span>
            </h1>
            <p className="hero-copy">
              Modern training, sustainable nutrition, and relentless accountability for busy professionals ready to look, move, and live better.
            </p>
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={() => scrollToSection('pricing')}>
                View Coaching Plans
              </button>
              <button className="secondary-button" type="button" onClick={() => scrollToSection('about')}>
                Meet Sandeep
              </button>
            </div>
            <div className="hero-stats" aria-label="Coaching statistics">
              <span><strong>700+</strong> client check-ins</span>
              <span><strong>12wk</strong> transformation system</span>
              <span><strong>4.9★</strong> client experience</span>
            </div>
          </div>

          <div className="hero-card reveal visible">
            <div className="trainer-visual" role="img" aria-label="Abstract fitness coach portrait placeholder">
              <div className="pulse-ring" />
              <span>SF</span>
            </div>
            <div className="metric-card top">
              <small>Strength</small>
              <strong>+38%</strong>
            </div>
            <div className="metric-card bottom">
              <small>Consistency</small>
              <strong>92%</strong>
            </div>
          </div>
        </section>

        <section className="section about" id="about">
          <div className="section-heading reveal">
            <p className="eyebrow">About the coach</p>
            <h2>Built for people who want premium results without fitness confusion.</h2>
          </div>
          <div className="about-grid">
          <div className="coach-photo">           
   <img 
     src={`/images/coach.jpg?v=${Date.now()}`}         
     alt="Coach Sandeep" 
   />           
</div>
            <div className="about-copy reveal">
              <h3>Hi, I’m Sandeep — your strategy partner for a fitter life.</h3>
              <p>
                SandeepFitness combines evidence-based programming with simple daily execution. Every plan is customized to your schedule, equipment, food preferences, and motivation style.
              </p>
              <p>
                No random workouts. No extreme diets. Just intelligent progression, high-touch accountability, and a premium coaching experience that keeps you moving forward.
              </p>
              <div className="about-badges">
                <span>Goal-first planning</span>
                <span>Weekly optimization</span>
                <span>Beginner to advanced</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section services" id="services">
          <div className="section-heading centered reveal">
            <p className="eyebrow">Services</p>
            <h2>Everything you need to train hard, eat smart, and stay accountable.</h2>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card reveal" key={service.title}>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section testimonials" id="results">
          <div className="testimonial-panel reveal">
            <div>
              <p className="eyebrow">Client results</p>
              <h2>Real accountability. Visible transformation.</h2>
            </div>
            <div className="testimonial-slider" aria-live="polite">
              {testimonials.map((testimonial, index) => (
                <figure className={`testimonial ${index === activeTestimonial ? 'active' : ''}`} key={testimonial.name}>
                  <blockquote>“{testimonial.quote}”</blockquote>
                  <figcaption>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="slider-controls">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.name}
                  className={index === activeTestimonial ? 'active' : ''}
                  type="button"
                  aria-label={`Show testimonial ${index + 1}`}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section pricing" id="pricing">
          <div className="section-heading centered reveal">
            <p className="eyebrow">Pricing</p>
            <h2>Choose your coaching intensity.</h2>
          </div>
          <div className="pricing-grid">
            {pricing.map((plan) => (
              <article className={`price-card reveal ${plan.featured ? 'featured' : ''}`} key={plan.name}>
                <p className="plan-tag">{plan.tag}</p>
                <h3>{plan.name}</h3>
                <div className="price"><span>{plan.price}</span><small>/ month</small></div>
                <ul>
                  {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                <button className={plan.featured ? 'primary-button' : 'secondary-button'} type="button" onClick={() => scrollToSection('contact')}>
                  Apply Now
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="contact-card reveal">
            <div className="contact-copy">
              <p className="eyebrow">Start today</p>
              <h2>Book your free assessment.</h2>
              <p>
                Share your goals and Sandeep will recommend the right coaching pathway. You’ll receive a response within one business day.
              </p>
            </div>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <label>
                Name
                <input value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Your full name" />
                {errors.name && <span className="error">{errors.name}</span>}
              </label>
              <label>
                Email
                <input value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="you@example.com" />
                {errors.email && <span className="error">{errors.email}</span>}
              </label>
              <label>
                Phone
                <input value={form.phone} onChange={(event) => updateField('phone', event.target.value)} placeholder="+91 98765 43210" />
                {errors.phone && <span className="error">{errors.phone}</span>}
              </label>
              <label>
                Primary goal
                <select value={form.goal} onChange={(event) => updateField('goal', event.target.value)}>
                  <option value="">Select a goal</option>
                  <option>Fat loss</option>
                  <option>Muscle gain</option>
                  <option>Strength & performance</option>
                  <option>Lifestyle reset</option>
                </select>
                {errors.goal && <span className="error">{errors.goal}</span>}
              </label>
              <label className="full-field">
                Message
                <textarea value={form.message} onChange={(event) => updateField('message', event.target.value)} placeholder="Tell us about your current routine, goal, and timeline." />
                {errors.message && <span className="error">{errors.message}</span>}
              </label>
              <button className="primary-button full-field" type="submit">Send My Assessment</button>
              {submitted && <p className="success full-field">Thank you! Your assessment request has been received.</p>}
            </form>
          </div>
        </section>
      </main>

      <a
        className="whatsapp-button"
        href={`https://wa.me/919876543210?text=${whatsappMessage}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with SandeepFitness on WhatsApp"
      >
        <span>☘</span>
      </a>

      <footer className="footer">
        <div>
          <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); scrollToSection('home') }}>
          <img
  className="logo-image"
  src="/images/logo.png"
  alt="Sandeep Fitness"
/>
            <span>SandeepFitness</span>
          </a>
          <p>Premium online fitness coaching for powerful, sustainable transformations.</p>
        </div>
        <div className="social-links" aria-label="Social links">
          <a href="https://www.instagram.com/_.sandeeppp//" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">YouTube</a>
         
        </div>
      </footer>
    </div>
  )
}

export default App
