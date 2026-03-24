import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PROJECTS, PERSONAL } from '../constants/data'
import { SectionHeader } from './About'

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const staggerGrid = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

export default function Projects() {
  const featured = PROJECTS.filter((p) => p.featured)
  const others = PROJECTS.filter((p) => !p.featured)

  return (
    <section
      id="projects"
      style={{
        padding: '120px 0',
        backgroundColor: 'var(--color-bg-2)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-5%',
          left: '-2%',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(6rem, 18vw, 16rem)',
          fontWeight: 300,
          color: 'var(--color-border)',
          opacity: 0.2,
          pointerEvents: 'none',
          userSelect: 'none',
          letterSpacing: '-0.05em',
          lineHeight: 1,
        }}
      >
        Work
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeader
          label="WHAT I'VE BUILT"
          heading={
            <>
              Selected
              <br />
              <em>projects</em>
            </>
          }
        />

        <div style={{ marginTop: '4rem' }}>
          {featured.map((project) => (
            <FeaturedCard key={project.id} project={project} />
          ))}
        </div>

        {others.length > 0 && (
          <motion.div
            variants={staggerGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.2rem',
              marginTop: '1.5rem',
            }}
          >
            {others.map((project) => (
              <SmallCard key={project.id} project={project} />
            ))}
          </motion.div>
        )}

        <MoreProjectsCTA github={PERSONAL.github} />
      </div>
    </section>
  )
}

function FeaturedCard({ project }) {
  const [hovered, setHovered] = useState(false)
  const [expandDesc, setExpandDesc] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? 'var(--color-border-glow)' : 'var(--color-border)'}`,
        backgroundColor: hovered ? 'var(--color-bg-3)' : 'var(--color-bg)',
        padding: 'clamp(1.5rem, 4vw, 3rem)',
        marginBottom: '1.2rem',
        transition: 'border-color 0.4s ease, background-color 0.4s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '80px',
          height: '80px',
          background: 'linear-gradient(225deg, var(--color-primary-dim) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        <StatusBadge status={project.status} />
        <CategoryBadge label={project.category} />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            color: 'var(--color-text-faint)',
          }}
        >
          {project.year}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.12em',
            color: 'var(--color-primary)',
            marginLeft: 'auto',
          }}
        >
          ★ FEATURED PROJECT
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start',
        }}
      >
        <div>
          <motion.h3
            animate={{ x: hovered ? 6 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 300,
              color: 'var(--color-text)',
              margin: '0 0 0.5rem 0',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            {project.title}
          </motion.h3>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              color: 'var(--color-primary)',
              margin: '0 0 1.2rem 0',
            }}
          >
            {project.tagline}
          </p>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.8,
              margin: '0 0 1rem 0',
              fontWeight: 300,
            }}
          >
            {project.description}
          </p>

          <AnimatePresence>
            {expandDesc && project.longDesc.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 1rem 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  overflow: 'hidden',
                }}
              >
                {project.longDesc.map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.7,
                      paddingLeft: '1.2rem',
                      position: 'relative',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        color: 'var(--color-primary)',
                      }}
                    >
                      ›
                    </span>
                    {point}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {project.longDesc.length > 0 && (
            <button
              onClick={() => setExpandDesc((prev) => !prev)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                color: 'var(--color-primary)',
                padding: '0',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <motion.span
                animate={{ rotate: expandDesc ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                ›
              </motion.span>
              {expandDesc ? 'LESS DETAIL' : 'MORE DETAIL'}
            </button>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <ProjectButton href={project.github} label="VIEW CODE" icon="⌥" primary />
            <ProjectButton href={project.live} label="LIVE DEMO" icon="↗" />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <div
            style={{
              padding: '1rem 1.2rem',
              borderLeft: '2px solid var(--color-primary)',
              backgroundColor: 'var(--color-bg-2)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                color: 'var(--color-text-faint)',
                margin: '0 0 0.4rem 0',
              }}
            >
              KEY ACHIEVEMENT
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--color-text)',
                fontWeight: 400,
                margin: 0,
              }}
            >
              {project.highlight}
            </p>
          </div>

          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                color: 'var(--color-text-faint)',
                margin: '0 0 0.8rem 0',
              }}
            >
              TECH STACK
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              {project.tech.map((t) => (
                <TechTag key={t} label={t} />
              ))}
            </div>
          </div>

          <div
            style={{
              padding: '1.5rem',
              border: '1px dashed var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              minHeight: '100px',
              backgroundColor: 'var(--color-bg)',
            }}
          >
            <span style={{ fontSize: '1.2rem', opacity: 0.4 }}>◈</span>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                color: 'var(--color-text-faint)',
                textAlign: 'center',
                margin: 0,
              }}
            >
              SYSTEM DIAGRAM
              <br />
              COMING SOON
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function SmallCard({ project }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={cardVariants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? 'var(--color-border-glow)' : 'var(--color-border)'}`,
        backgroundColor: hovered ? 'var(--color-bg-3)' : 'var(--color-bg)',
        padding: '1.5rem',
        transition: 'border-color 0.3s ease, background-color 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <StatusBadge status={project.status} />
        <CategoryBadge label={project.category} />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.58rem',
            color: 'var(--color-text-faint)',
            marginLeft: 'auto',
          }}
        >
          {project.year}
        </span>
      </div>

      <div>
        <motion.h3
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.25 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
            fontWeight: 300,
            color: 'var(--color-text)',
            margin: '0 0 0.4rem 0',
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </motion.h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.82rem',
            color: 'var(--color-text-muted)',
            margin: 0,
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          {project.description}
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {project.tech.slice(0, 4).map((t) => (
          <TechTag key={t} label={t} small />
        ))}
        {project.tech.length > 4 && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              color: 'var(--color-text-faint)',
              padding: '0.25rem 0.6rem',
              border: '1px solid var(--color-border)',
            }}
          >
            +{project.tech.length - 4}
          </span>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          marginTop: 'auto',
          paddingTop: '0.5rem',
          borderTop: '1px solid var(--color-border)',
          flexWrap: 'wrap',
        }}
      >
        <ProjectButton href={project.github} label="CODE" icon="⌥" primary />
        <ProjectButton href={project.live} label="DEMO" icon="↗" />
      </div>
    </motion.div>
  )
}

function StatusBadge({ status }) {
  const isComplete = status === 'Complete'
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.58rem',
        letterSpacing: '0.12em',
        padding: '0.25rem 0.6rem',
        border: `1px solid ${isComplete ? '#4ade8040' : 'var(--color-primary-dim)'}`,
        color: isComplete ? '#4ade80' : 'var(--color-primary)',
        backgroundColor: isComplete ? '#4ade8010' : 'var(--color-primary-dim)',
      }}
    >
      {isComplete ? '● COMPLETE' : '◌ IN PROGRESS'}
    </span>
  )
}

function CategoryBadge({ label }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.58rem',
        letterSpacing: '0.1em',
        color: 'var(--color-text-muted)',
        border: '1px solid var(--color-border)',
        padding: '0.25rem 0.6rem',
      }}
    >
      {label.toUpperCase()}
    </span>
  )
}

function TechTag({ label, small = false }) {
  return (
    <motion.span
      whileHover={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: small ? '0.58rem' : '0.63rem',
        letterSpacing: '0.1em',
        color: 'var(--color-text-muted)',
        border: '1px solid var(--color-border)',
        padding: small ? '0.2rem 0.5rem' : '0.3rem 0.7rem',
        transition: 'color 0.2s, border-color 0.2s',
        display: 'inline-block',
        cursor: 'default',
      }}
    >
      {label}
    </motion.span>
  )
}

function ProjectButton({ href, label, icon, primary = false }) {
  const isDisabled = !href || href === '#'

  return (
    <motion.a
      href={isDisabled ? undefined : href}
      target={isDisabled ? undefined : '_blank'}
      rel={isDisabled ? undefined : 'noreferrer'}
      whileHover={isDisabled ? {} : { scale: 1.04 }}
      whileTap={isDisabled ? {} : { scale: 0.97 }}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        letterSpacing: '0.18em',
        color: primary ? 'var(--color-bg)' : 'var(--color-text-muted)',
        backgroundColor: primary ? 'var(--color-primary)' : 'transparent',
        border: `1px solid ${primary ? 'var(--color-primary)' : 'var(--color-border)'}`,
        padding: '0.5rem 1.1rem',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.25s ease',
        opacity: isDisabled ? 0.5 : 1,
      }}
      onClick={(e) => {
        if (isDisabled) e.preventDefault()
      }}
      onMouseEnter={(e) => {
        if (!primary && !isDisabled) {
          e.currentTarget.style.borderColor = 'var(--color-primary)'
          e.currentTarget.style.color = 'var(--color-text)'
        }
      }}
      onMouseLeave={(e) => {
        if (!primary && !isDisabled) {
          e.currentTarget.style.borderColor = 'var(--color-border)'
          e.currentTarget.style.color = 'var(--color-text-muted)'
        }
      }}
    >
      <span>{icon}</span>
      {label}
    </motion.a>
  )
}

function MoreProjectsCTA({ github }) {
  const href = github || '#'
  const isDisabled = href === '#'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{
        marginTop: '4rem',
        paddingTop: '3rem',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem',
      }}
    >
      <div>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: 'var(--color-text-faint)',
            margin: '0 0 0.5rem 0',
          }}
        >
          MORE ON GITHUB
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: 'var(--color-text-muted)',
            margin: 0,
          }}
        >
          Smaller experiments, DSA solutions, and learning projects.
        </p>
      </div>

      <motion.a
        href={isDisabled ? undefined : href}
        target={isDisabled ? undefined : '_blank'}
        rel={isDisabled ? undefined : 'noreferrer'}
        whileHover={isDisabled ? {} : { scale: 1.03, borderColor: 'var(--color-primary)' }}
        whileTap={isDisabled ? {} : { scale: 0.97 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          letterSpacing: '0.18em',
          color: 'var(--color-text-muted)',
          border: '1px solid var(--color-border)',
          padding: '0.7rem 1.5rem',
          textDecoration: 'none',
          transition: 'all 0.25s',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          whiteSpace: 'nowrap',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          opacity: isDisabled ? 0.5 : 1,
        }}
        onClick={(e) => {
          if (isDisabled) e.preventDefault()
        }}
        onMouseEnter={(e) => {
          if (!isDisabled) {
            e.currentTarget.style.borderColor = 'var(--color-primary)'
            e.currentTarget.style.color = 'var(--color-text)'
          }
        }}
        onMouseLeave={(e) => {
          if (!isDisabled) {
            e.currentTarget.style.borderColor = 'var(--color-border)'
            e.currentTarget.style.color = 'var(--color-text-muted)'
          }
        }}
      >
        VIEW ALL REPOS ↗
      </motion.a>
    </motion.div>
  )
}