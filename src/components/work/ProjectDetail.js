import Link from 'next/link';
import Tag from '@/components/ui/Tag';

export default function ProjectDetail({ project }) {
  const { title, oneLiner, role, year, tech, detail } = project;
  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <Link href="/#work" className="font-mono text-sm text-muted transition-colors hover:text-accent">
        &larr; Work
      </Link>
      <h1 className="mt-8 font-serif text-4xl text-ink sm:text-5xl">{title}</h1>
      <p className="mt-4 text-xl text-muted">{oneLiner}</p>
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-muted">
        {role && <span>{role}</span>}
        {year && <span>{year}</span>}
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {tech.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      {detail?.problem && (
        <section className="mt-12">
          <h2 className="font-mono text-sm text-accent">Problem</h2>
          <p className="mt-3 text-lg leading-relaxed text-ink">{detail.problem}</p>
        </section>
      )}
      {detail?.build?.length > 0 && (
        <section className="mt-10">
          <h2 className="font-mono text-sm text-accent">What I built</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ink">
            {detail.build.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </section>
      )}
      {detail?.outcome && (
        <section className="mt-10">
          <h2 className="font-mono text-sm text-accent">Outcome</h2>
          <p className="mt-3 text-lg leading-relaxed text-ink">{detail.outcome}</p>
        </section>
      )}
    </article>
  );
}
