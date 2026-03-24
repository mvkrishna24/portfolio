import { motion } from 'framer-motion'

export default function SectionDivider({ label = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        padding: '0 clamp(1rem, 5vw, 4rem)',
        maxWidth: '1200px',
        margin: '0 auto',
        overflow: 'hidden',
      }}
    >
      {label && (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: 'var(--color-text-faint)',
            flexShrink: 0,
          }}
        >
          {label}
        </span>
      )}

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          flex: 1,
          height: '1px',
          backgroundColor: 'var(--color-border)',
          transformOrigin: 'left center',
        }}
      />

      <motion.div
        initial={{ scale: 0, rotate: 45 }}
        whileInView={{ scale: 1, rotate: 45 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{
          width: '6px',
          height: '6px',
          backgroundColor: 'var(--color-primary)',
          flexShrink: 0,
          transform: 'rotate(45deg)',
        }}
      />
    </motion.div>
  )
}