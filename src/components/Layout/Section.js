export default function Section({ id, number, title, children }) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
      <header className="mb-12 flex items-baseline gap-4 border-b border-line pb-4">
        <span className="font-mono text-sm text-accent">{number}</span>
        <h2 className="font-serif text-3xl text-ink sm:text-4xl">{title}</h2>
      </header>
      {children}
    </section>
  );
}
