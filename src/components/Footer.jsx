import { motion } from 'framer-motion'
import { PERSONAL } from '../constants/data'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
        padding: '3rem 0 2rem',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '2rem',
            marginBottom: '2.5rem',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 300,
                color: 'var(--color-text)',
                margin: '0 0 0.4rem 0',
              }}
            >
              {PERSONAL.name}
              <span style={{ color: 'var(--color-primary)' }}>.</span>
            </p>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                color: 'var(--color-text-muted)',
                margin: 0,
              }}
            >
              {PERSONAL.role}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {[
              { label: 'GitHub', href: PERSONAL.github },
              { label: 'LinkedIn', href: PERSONAL.linkedin },
              { label: 'Email', href: `mailto:${PERSONAL.email}` },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? '_self' : '_blank'}
                rel="noreferrer"
                whileHover={{ color: 'var(--color-primary)' }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  color: 'var(--color-text-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                {link.label} ↗
              </motion.a>
            ))}
          </div>
        </div>

        <div
          style={{
            height: '1px',
            backgroundColor: 'var(--color-border)',
            marginBottom: '1.5rem',
          }}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.12em',
              color: 'var(--color-text-faint)',
              margin: 0,
            }}
          >
            © {year} {PERSONAL.name}. Built with React + Framer Motion.
          </p>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.12em',
              color: 'var(--color-text-faint)',
              margin: 0,
            }}
          >
            Designed & developed from scratch.
          </p>
        </div>
      </div>
    </footer>
  )
}