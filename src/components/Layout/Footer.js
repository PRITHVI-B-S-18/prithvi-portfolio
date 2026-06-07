import Link from 'next/link';
import { profile } from '@/content/profile';

const nav = [
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Work', href: '/#work' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Contact', href: '/#contact' },
];

export default function Footer() {
  const { links } = profile;
  const socials = [
    { label: 'Email', href: `mailto:${links.email}` },
    { label: 'GitHub', href: links.github, ext: true },
    { label: 'LinkedIn', href: links.linkedin, ext: true },
  ];

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Identity */}
          <div>
            <Link href="/#top" className="font-sans text-lg font-bold tracking-tight text-gradient">
              Prithvi B S
            </Link>
            <p className="mt-1 font-mono text-xs text-muted">Software Engineer · secure systems &amp; internal tools</p>
            <div className="mt-4 flex gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.ext ? '_blank' : undefined}
                  rel={s.ext ? 'noopener noreferrer' : undefined}
                  className="font-mono text-xs text-muted transition-colors hover:text-accent"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick nav */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-mono text-sm text-muted transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Back to top */}
          <a
            href="#top"
            aria-label="Back to top"
            className="group inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <span className="transition-transform duration-200 group-hover:-translate-y-0.5">↑</span>
          </a>
        </div>

        <div className="mt-10 flex flex-col gap-1.5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-faint">© {new Date().getFullYear()} Prithvi B S. All rights reserved.</p>
          <p className="font-mono text-xs text-faint">Built with Next.js &amp; Tailwind</p>
        </div>
      </div>
    </footer>
  );
}
