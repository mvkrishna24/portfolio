export default function About() {
  return (
    <section
      id="about"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-bg-2)',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-primary)',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
          }}
        >
          DAY 4 — COMING SOON
        </p>
        <h2 style={{ marginTop: '1rem' }}>About</h2>
      </div>
    </section>
  )
}