import { useState } from 'react';
import { profile } from '@/content/profile';
import Motto from '@/components/ui/Motto';
import { MailIcon, GitHubIcon, LinkedInIcon } from '@/components/ui/Icons';
import PerspectiveSection from './PerspectiveSection';
import { SectionMarker } from './Primitives';
import Reveal from './Reveal';

// Free, no-backend delivery via Web3Forms (same key as the main site). The key
// is public by design — it only routes mail to the registered address.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '7c602e90-f719-4f90-a46d-3c07719ea40e';
const configured = ACCESS_KEY && ACCESS_KEY !== 'your-web3forms-access-key';

export default function SpatialContact() {
  const { links, name, role, available, resume } = profile;
  const year = 2026;

  const [form, setForm] = useState({ name: '', email: '', message: '', botcheck: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();

    // Fallback to the mail client if no key is configured.
    if (!configured) {
      const subject = encodeURIComponent(`Portfolio — message from ${form.name || 'someone'}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ''}`);
      window.location.href = `mailto:${links.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio message from ${form.name}`,
          from_name: form.name,
          name: form.name,
          email: form.email,
          message: form.message,
          botcheck: form.botcheck || '',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '', botcheck: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const channels = [
    { label: 'Email', value: links.email, href: `mailto:${links.email}`, Icon: MailIcon, mark: '↗' },
    { label: 'GitHub', value: links.githubLabel, href: links.github, Icon: GitHubIcon, mark: '↗' },
    { label: 'LinkedIn', value: links.linkedinLabel, href: links.linkedin, Icon: LinkedInIcon, mark: '↗' },
    { label: 'Résumé', value: 'Download PDF', href: resume, Icon: null, mark: '↓', download: 'Prithvi-B-S-Resume.pdf' },
  ];

  const field =
    'w-full border border-white/12 bg-white/[0.02] px-3 py-2.5 font-plex text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#3b82f6]';

  return (
    <PerspectiveSection id="contact" className="mx-auto max-w-6xl px-6 pb-10 pt-10 md:pt-14" lift={6}>
      <SectionMarker index="05" label="Contact" />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
        <Reveal>
          <h2 className="font-grotesk font-bold leading-[0.95] tracking-tight text-white" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4rem)' }}>
            Let&apos;s build
            <br />
            something solid.
          </h2>
          <p className="mt-5 max-w-md font-plex text-base leading-relaxed text-white/60">
            {available ? 'Open to work and collaborations.' : 'Reach out anytime.'} Send a note below, or reach me on any channel.
          </p>

          <div className="mt-8 grid gap-px border border-white/10 bg-white/5">
            {channels.map(({ label, value, href, Icon, mark, download }) => (
              <a
                key={label}
                href={href}
                // Résumé downloads (same-origin file); others open in a new tab.
                download={download || undefined}
                target={download || href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 bg-[#070713] px-5 py-3.5 transition-colors hover:bg-[#3b82f6]/[0.06]"
              >
                <span className="flex items-center gap-3 font-grotesk text-[11px] uppercase tracking-[0.2em] text-white/45">
                  <span className="flex h-4 w-4 items-center justify-center text-white/55 transition-colors group-hover:text-[#3b82f6]">
                    {Icon ? <Icon size={16} /> : <span aria-hidden="true">▤</span>}
                  </span>
                  {label}
                </span>
                <span className="truncate font-plex text-sm text-white/75 transition-colors group-hover:text-[#3b82f6]">
                  {value} <span aria-hidden="true">{mark}</span>
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        {/* Direct message form — delivered via Web3Forms */}
        <Reveal delay={0.1}>
          {status === 'success' ? (
            <div className="relative flex min-h-[340px] flex-col items-center justify-center border border-[#3b82f6]/30 bg-[#070713] p-8 text-center">
              <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#3b82f6] to-transparent" aria-hidden="true" />
              <div className="grid h-14 w-14 place-items-center border border-[#3b82f6]/50 text-2xl text-[#60a5fa]">✓</div>
              <h3 className="mt-5 font-grotesk text-xl font-semibold text-white">Transmission received</h3>
              <p className="mt-2 max-w-xs font-plex text-sm leading-relaxed text-white/60">
                Thanks for reaching out — I usually reply within a day.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-6 font-grotesk text-[11px] uppercase tracking-[0.18em] text-[#3b82f6] transition-colors hover:text-[#60a5fa]"
              >
                Send another →
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="relative border border-white/10 bg-[#070713] p-6 sm:p-8">
              {/* Honeypot for bots */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                onChange={(e) => setForm((f) => ({ ...f, botcheck: e.target.checked }))}
              />

              <p className="font-grotesk text-[10px] uppercase tracking-[0.3em] text-white/40">Direct message</p>
              <div className="mt-5 space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-name" className="mb-1.5 block font-grotesk text-[10px] uppercase tracking-[0.18em] text-white/40">Name</label>
                    <input id="c-name" name="name" autoComplete="name" className={field} type="text" value={form.name} onChange={set('name')} placeholder="Your name" required />
                  </div>
                  <div>
                    <label htmlFor="c-email" className="mb-1.5 block font-grotesk text-[10px] uppercase tracking-[0.18em] text-white/40">Email</label>
                    <input id="c-email" name="email" autoComplete="email" className={field} type="email" value={form.email} onChange={set('email')} placeholder="you@email.com" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="c-message" className="mb-1.5 block font-grotesk text-[10px] uppercase tracking-[0.18em] text-white/40">Message</label>
                  <textarea id="c-message" name="message" className={`${field} resize-none`} rows={4} value={form.message} onChange={set('message')} placeholder="What would you like to build?" required />
                </div>
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="group mt-5 inline-flex w-full items-center justify-center gap-2 bg-[#3b82f6] px-6 py-3 font-grotesk text-sm font-medium uppercase tracking-[0.16em] text-[#050510] transition-colors hover:bg-[#60a5fa] disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
                {status !== 'sending' && <span className="transition-transform group-hover:translate-x-1">→</span>}
              </button>
              {status === 'error' ? (
                <p className="mt-3 font-plex text-[11px] text-red-400">
                  Something went wrong — please email me directly at {links.email}.
                </p>
              ) : (
                <p className="mt-3 font-plex text-[11px] text-white/35">Sent straight to my inbox — I usually reply within a day.</p>
              )}
            </form>
          )}
        </Reveal>
      </div>

      {/* Blueprint footer bar with the motto quote */}
      <div className="mt-16 flex flex-col items-center gap-4 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
        <span className="font-grotesk text-[11px] uppercase tracking-[0.2em] text-white/40">
          © {year} {name}
        </span>
        <div className="order-first sm:order-none">
          <Motto />
        </div>
        <span className="font-grotesk text-[11px] uppercase tracking-[0.2em] text-white/40">{role}</span>
      </div>
    </PerspectiveSection>
  );
}
