import { profile } from '@/content/profile';
import Section from './Section';

export default function Contact() {
  const { links, name, available } = profile;
  const rows = [
    { k: 'email', v: links.email, href: `mailto:${links.email}` },
    { k: 'github', v: links.githubLabel, href: links.github },
    { k: 'linkedin', v: links.linkedinLabel, href: links.linkedin },
    { k: 'resume', v: 'résumé.pdf', href: profile.resume },
  ];

  return (
    <Section id="contact" command="cat contact.txt" title="contact.txt">
      <p className="mb-4 text-sm text-term-fg/75">
        {available ? '# status: open to work and collaborations' : '# status: reach out anytime'}
      </p>
      <div className="space-y-1 text-sm">
        {rows.map((r) => (
          <div key={r.k} className="flex items-baseline gap-2 whitespace-nowrap">
            <span className="inline-block w-[80px] text-phosphor">{r.k}:</span>
            <a
              href={r.href}
              target={r.href.startsWith('mailto') || r.href.startsWith('/') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="text-term-fg hover:bg-phosphor hover:text-term-bg"
            >
              {r.v}
            </a>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-term-dim">
        <span className="text-phosphor">$</span> echo &quot;fly higher than your fear&quot;
      </p>
      <p className="text-sm text-term-fg/60">fly higher than your fear</p>

      <footer className="mt-10 border-t border-term-dim/20 pt-4 text-xs text-term-dim">
        © 2026 {name} · built with next.js + tailwind · no templates, hand-coded
        <span className="term-caret" aria-hidden="true" />
      </footer>
    </Section>
  );
}
