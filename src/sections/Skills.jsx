// src/sections/Skills.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SKILLS_DATA, TECH_STACK } from '../constants/data'
import { SectionHeader } from './About'

// ─────────────────────────────────────────────
// TAB CONFIG — controls the tab labels + keys
// ─────────────────────────────────────────────
const TABS = [
  { key: 'backend',  label: 'Backend',  icon: '⬡' },
  { key: 'frontend', label: 'Frontend', icon: '◈' },
  { key: 'tools',    label: 'Tools',    icon: '◎' },
]

// ─────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────
const tabContentVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.07,
    },
  },
  exit: {
    opacity: 0, y: -10,
    transition: { duration: 0.2 },
  },
}

const skillRowVariants = {
  hidden:  { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }
  },
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function Skills() {
  const [activeTab, setActiveTab] = useState('backend')

  return (
    <section
      id="skills"
      style={{
        padding: '120px 0',
        backgroundColor: 'var(--color-bg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background watermark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          right: '-5%',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(6rem, 18vw, 16rem)',
          fontWeight: 300,
          color: 'var(--color-border)',
          opacity: 0.25,
          pointerEvents: 'none',
          userSelect: 'none',
          letterSpacing: '-0.05em',
        }}
      >
        Skills
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Section Header */}
        <SectionHeader
          label="WHAT I WORK WITH"
          heading={<>My technical<br /><em>arsenal</em></>}
        />

        {/* ── TAB SWITCHER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'flex',
            gap: '0',
            marginTop: '3rem',
            borderBottom: '1px solid var(--color-border)',
            width: 'fit-content',
          }}
        >
          {TABS.map(tab => (
            <TabButton
              key={tab.key}
              tab={tab}
              isActive={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
            />
          ))}
        </motion.div>

        {/* ── TAB CONTENT ── */}
        {/* AnimatePresence lets old content exit before new content enters */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              marginTop: '2.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
            }}
          >
            {SKILLS_DATA[activeTab].map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── TECH STACK PILLS ── */}
        <TechStackRow />

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// TAB BUTTON — single tab with active indicator
// ─────────────────────────────────────────────
function TabButton({ tab, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0.8rem 1.6rem',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'color 0.25s ease',
      }}
    >
      {/* Icon */}
      <span style={{
        fontSize: '0.75rem',
        color: isActive ? 'var(--color-primary)' : 'var(--color-text-faint)',
        transition: 'color 0.25s',
      }}>
        {tab.icon}
      </span>

      {/* Label */}
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        letterSpacing: '0.15em',
        color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
        transition: 'color 0.25s',
      }}>
        {tab.label.toUpperCase()}
      </span>

      {/* Active underline — slides in */}
      {isActive && (
        <motion.div
          layoutId="tab-indicator"
          style={{
            position: 'absolute',
            bottom: '-1px',
            left: 0,
            right: 0,
            height: '1px',
            backgroundColor: 'var(--color-primary)',
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      )}
    </button>
  )
}

// ─────────────────────────────────────────────
// SKILL CARD — one skill with animated bar
// ─────────────────────────────────────────────
function SkillCard({ skill, index }) {
  // Color based on proficiency level
  const getLevelColor = (level) => {
    if (level >= 80) return 'var(--color-primary)'       // gold = strong
    if (level >= 65) return '#a8d8a8'                    // soft green = good
    return 'var(--color-text-muted)'                     // muted = learning
  }

  const getLevelLabel = (level) => {
    if (level >= 80) return 'Strong'
    if (level >= 65) return 'Proficient'
    return 'Learning'
  }

  return (
    <motion.div
      variants={skillRowVariants}
      whileHover={{
        borderColor: 'var(--color-border-glow)',
        backgroundColor: 'var(--color-bg-2)',
      }}
      style={{
        padding: '1.2rem 1.4rem',
        border: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg)',
        cursor: 'default',
        transition: 'background-color 0.25s, border-color 0.25s',
      }}
    >
      {/* Top row: name + level label */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '0.6rem',
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.92rem',
            fontWeight: 500,
            color: 'var(--color-text)',
            margin: '0 0 0.2rem 0',
          }}>
            {skill.name}
          </p>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            color: 'var(--color-text-muted)',
            margin: 0,
          }}>
            {skill.note}
          </p>
        </div>

        {/* Percentage */}
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: getLevelColor(skill.level),
          letterSpacing: '0.05em',
        }}>
          {getLevelLabel(skill.level)}
        </span>
      </div>

      {/* Progress bar track */}
      <div style={{
        width: '100%',
        height: '2px',
        backgroundColor: 'var(--color-border)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Animated fill */}
        <motion.div
          initial={{ width: '0%' }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            delay: index * 0.08,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{
            height: '100%',
            backgroundColor: getLevelColor(skill.level),
            position: 'relative',
          }}
        >
          {/* Glowing tip on the bar */}
          <div style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: getLevelColor(skill.level),
            boxShadow: `0 0 6px ${getLevelColor(skill.level)}`,
          }} />
        </motion.div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// TECH STACK ROW — pill badges at the bottom
// ─────────────────────────────────────────────
function TechStackRow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      style={{ marginTop: '4rem' }}
    >
      {/* Label */}
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        letterSpacing: '0.2em',
        color: 'var(--color-text-faint)',
        marginBottom: '1.2rem',
      }}>
        FULL STACK ──
      </p>

      {/* Pills */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.6rem',
      }}>
        {TECH_STACK.map((tech, i) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            whileHover={{
              borderColor: 'var(--color-primary)',
              color: 'var(--color-primary)',
              scale: 1.04,
            }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              color: 'var(--color-text-muted)',
              border: '1px solid var(--color-border)',
              padding: '0.4rem 0.9rem',
              cursor: 'default',
              transition: 'color 0.2s, border-color 0.2s',
              display: 'inline-block',
            }}
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}