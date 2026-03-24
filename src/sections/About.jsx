import { motion } from 'framer-motion'
import { ABOUT } from '../constants/data'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

export function SectionHeader({ label, heading }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={staggerContainer}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <motion.div
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: {
            scaleX: 1,
            opacity: 1,
            transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
          },
        }}
        style={{
          width: '60px',
          height: '1px',
          backgroundColor: 'var(--color-primary)',
          transformOrigin: 'left center',
        }}
      />

      <motion.p
        variants={fadeUp}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.25em',
          color: 'var(--color-primary)',
          margin: 0,
        }}
      >
        {label}
      </motion.p>

      <motion.h2
        variants={fadeUp}
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 300,
          color: 'var(--color-text)',
          margin: 0,
        }}
      >
        {heading}
      </motion.h2>
    </motion.div>
  )
}

function TimelineItem({ item, isLast, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        display: 'grid',
        gridTemplateColumns: '56px 16px 1fr',
        gap: '0 1rem',
        paddingBottom: isLast ? 0 : '1.4rem',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--color-primary)',
          letterSpacing: '0.1em',
          paddingTop: '2px',
          textAlign: 'right',
        }}
      >
        {item.year}
      </span>

      <div
        style={{
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary)',
            border: '2px solid var(--color-bg)',
            flexShrink: 0,
            marginTop: '3px',
          }}
        />
        {!isLast && (
          <div
            style={{
              width: '1px',
              flex: 1,
              backgroundColor: 'var(--color-border)',
              marginTop: '4px',
            }}
          />
        )}
      </div>

      <div style={{ paddingBottom: isLast ? 0 : '0.5rem' }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.88rem',
            fontWeight: 500,
            color: 'var(--color-text)',
            margin: '0 0 0.25rem 0',
          }}
        >
          {item.title}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            color: 'var(--color-text-muted)',
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          {item.desc}
        </p>
      </div>
    </motion.div>
  )
}

export default function About() {
  return (
    <section
      id="about"
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
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(8rem, 20vw, 18rem)',
          fontWeight: 300,
          color: 'var(--color-border)',
          opacity: 0.3,
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          letterSpacing: '-0.05em',
        }}
      >
        About
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeader
          label="WHO I AM"
          heading={
            <>
              The person
              <br />
              <em>behind the code</em>
            </>
          }
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            marginTop: '4rem',
            alignItems: 'start',
          }}
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {ABOUT.story.map((para, i) => (
              <motion.p
                key={i}
                variants={fadeLeft}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.92rem, 1.5vw, 1.02rem)',
                  color: i === 0 ? 'var(--color-text)' : 'var(--color-text-muted)',
                  lineHeight: 1.85,
                  margin: 0,
                  fontWeight: i === 0 ? 400 : 300,
                }}
              >
                {i === 0 ? (
                  <>
                    <span style={{ color: 'var(--color-primary)' }}>
                      {para.split(' ')[0]}
                    </span>
                    {' ' + para.split(' ').slice(1).join(' ')}
                  </>
                ) : (
                  para
                )}
              </motion.p>
            ))}

            <motion.div
              variants={fadeUp}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginTop: '0.5rem',
                padding: '0.5rem 1rem',
                border: '1px solid var(--color-border)',
                width: 'fit-content',
                backgroundColor: 'var(--color-bg)',
              }}
            >
              <span style={{ display: 'inline-flex' }}>
                <span
                  style={{
                    display: 'block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#4ade80',
                  }}
                />
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  color: 'var(--color-text-muted)',
                }}
              >
                OPEN TO INTERNSHIP OPPORTUNITIES
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <motion.div
              variants={fadeRight}
              style={{
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                padding: '1.8rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  color: 'var(--color-primary)',
                  marginBottom: '1.5rem',
                }}
              >
                BY THE NUMBERS
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1.5rem',
                }}
              >
                {ABOUT.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                        fontWeight: 300,
                        color: 'var(--color-primary)',
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        letterSpacing: '0.12em',
                        color: 'var(--color-text-muted)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              style={{
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                padding: '1.8rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  color: 'var(--color-primary)',
                  marginBottom: '1.5rem',
                }}
              >
                MY JOURNEY
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0',
                }}
              >
                {ABOUT.timeline.map((item, i) => (
                  <TimelineItem
                    key={i}
                    item={item}
                    isLast={i === ABOUT.timeline.length - 1}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}