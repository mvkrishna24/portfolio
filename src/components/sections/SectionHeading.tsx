interface Props {
  index: string;
  label: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ index, label, title, subtitle }: Props) {
  return (
    <div data-reveal className="mb-16">
      <p className="mb-4 font-mono text-xs tracking-[0.3em] text-signal">
        {index} ▸ {label.toUpperCase()}
      </p>
      <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-xl text-base leading-relaxed text-mist">
          {subtitle}
        </p>
      )}
    </div>
  );
}
