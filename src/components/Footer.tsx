import { profile } from "@/lib/profile";

export default function Footer() {
  return (
    <footer className="hairline border-x-0 border-b-0">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <p className="font-mono text-xs tracking-widest text-mist">
          © {new Date().getFullYear()} {profile.name.toUpperCase()}
        </p>
        <div className="flex gap-6 font-mono text-xs tracking-widest">
          <a href={profile.github} className="text-mist transition-colors hover:text-signal" target="_blank" rel="noreferrer">
            GITHUB
          </a>
          <a href={profile.linkedin} className="text-mist transition-colors hover:text-signal" target="_blank" rel="noreferrer">
            LINKEDIN
          </a>
          <a href={`mailto:${profile.email}`} className="text-mist transition-colors hover:text-signal">
            EMAIL
          </a>
        </div>
        <p className="font-mono text-xs tracking-widest text-mist">
          NEXT.JS · R3F · GSAP
        </p>
      </div>
    </footer>
  );
}
