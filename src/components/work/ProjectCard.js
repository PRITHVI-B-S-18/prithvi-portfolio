import Link from 'next/link';
import Tag from '@/components/ui/Tag';

export default function ProjectCard({ project }) {
  const inner = (
    <article className="group flex h-full flex-col border-t border-line pt-5 transition-colors hover:border-accent">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-xl text-ink transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <span className="font-mono text-xs text-muted">{project.year}</span>
      </div>
      <p className="mt-2 text-muted">{project.oneLiner}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.slice(0, 5).map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      {project.featured && (
        <span className="mt-4 font-mono text-xs text-accent">Read more &rarr;</span>
      )}
    </article>
  );

  return project.featured ? (
    <Link href={`/work/${project.slug}`} className="block h-full">
      {inner}
    </Link>
  ) : (
    <div className="h-full">{inner}</div>
  );
}
