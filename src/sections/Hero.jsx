// src/sections/Hero.jsx
import { motion } from "framer-motion";
import { PERSONAL } from "../constants/data";

// ─────────────────────────────────────────────
// ANIMATION VARIANTS
// Think of variants as "named states" for motion.
// 'hidden' = starting state, 'visible' = end state
// ─────────────────────────────────────────────

// Container variant — controls stagger timing for children
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12, // each child animates 0.12s after previous
      delayChildren: 0.3, // wait 0.3s before starting first child
    },
  },
};

// Each letter slides up and fades in
const letterVariants = {
  hidden: {
    opacity: 0,
    y: 60, // starts 60px below
    rotateX: 40, // slight 3D tilt for cinematic feel
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Fade up — used for subtitle, role, buttons
const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Gold line grows from left
const lineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─────────────────────────────────────────────
// HELPER — splits a word into individually
// animated letter spans
// ─────────────────────────────────────────────
function AnimatedWord({ word, className }) {
  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        overflow: "hidden",
        paddingBottom: "0.1em",
      }}
    >
      {word.split("").map((letter, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          style={{ display: "inline-block" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}

// ─────────────────────────────────────────────
// MAIN HERO COMPONENT
// ─────────────────────────────────────────────
export default function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "var(--color-bg)",
      }}
    >
      {/* ── LAYER 1: Grid background ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(var(--color-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
          `,
          backgroundSize: "52px 52px",
          opacity: 0.3,
        }}
      />

      {/* ── LAYER 2: Radial vignette — darkens edges ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 20%, var(--color-bg) 90%)",
        }}
      />

      {/* ── LAYER 3: Gold glow orb — subtle warmth ── */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, var(--color-primary-dim) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          pointerEvents: "none",
        }}
      />

      {/* ── LAYER 4: Main content ── */}
      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.8rem",
        }}
      >
        {/* Gold line — grows in from left */}
        <motion.div
          variants={lineVariants}
          style={{
            width: "60px",
            height: "1px",
            backgroundColor: "var(--color-primary)",
            transformOrigin: "left center",
          }}
        />

        {/* Label */}
        <motion.p
          variants={fadeUpVariants}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            letterSpacing: "0.25em",
            color: "var(--color-primary)",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {PERSONAL.role}
        </motion.p>

        {/* ── MAIN HEADING — letter by letter ── */}
        <motion.div
          variants={containerVariants}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.2rem",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--color-text-muted)",
              letterSpacing: "0.05em",
              display: "flex",
              gap: "0.3em",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <AnimatedWord word="Hello," />
            <AnimatedWord word="I'm" />
          </div>

          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.2rem, 8vw, 7rem)",
              fontWeight: 300,
              color: "var(--color-text)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              textAlign: "center",
              maxWidth: "1100px",
              margin: "0 auto",
            }}
          >
            <AnimatedWord word={PERSONAL.name} />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fadeUpVariants}
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
            color: "var(--color-text-muted)",
            fontWeight: 300,
            maxWidth: "520px",
            margin: 0,
          }}
        >
          {PERSONAL.tagline}
        </motion.p>

        {/* Divider dots */}
        <motion.div
          variants={fadeUpVariants}
          style={{ display: "flex", gap: "8px", alignItems: "center" }}
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              style={{
                width: i === 1 ? "20px" : "4px",
                height: "1px",
                backgroundColor: "var(--color-primary)",
                opacity: i === 1 ? 1 : 0.4,
              }}
            />
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUpVariants}
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <HeroButton href="#projects" primary label="VIEW MY WORK" />
          <HeroButton href={PERSONAL.github} label="GITHUB ↗" external />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeUpVariants}
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              color: "var(--color-text-faint)",
            }}
          >
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "1px",
              height: "40px",
              backgroundColor: "var(--color-primary)",
              opacity: 0.5,
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────
// REUSABLE BUTTON — used only inside Hero
// ─────────────────────────────────────────────
function HeroButton({ href, label, primary = false, external = false }) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : "_self"}
      rel={external ? "noreferrer" : undefined}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.72rem",
        letterSpacing: "0.2em",
        textDecoration: "none",
        padding: "0.75rem 1.8rem",
        border: `1px solid ${primary ? "var(--color-primary)" : "var(--color-border)"}`,
        color: primary ? "var(--color-bg)" : "var(--color-text-muted)",
        backgroundColor: primary ? "var(--color-primary)" : "transparent",
        cursor: "pointer",
        transition: "all 0.25s ease",
        display: "inline-block",
      }}
      onMouseEnter={(e) => {
        if (!primary) {
          e.currentTarget.style.borderColor = "var(--color-primary)";
          e.currentTarget.style.color = "var(--color-text)";
        }
      }}
      onMouseLeave={(e) => {
        if (!primary) {
          e.currentTarget.style.borderColor = "var(--color-border)";
          e.currentTarget.style.color = "var(--color-text-muted)";
        }
      }}
    >
      {label}
    </motion.a>
  );
}
