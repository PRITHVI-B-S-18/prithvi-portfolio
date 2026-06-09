import { useState } from 'react';
import { profile } from '@/content/profile';
import Motto from '@/components/ui/Motto';
import PerspectiveSection from './PerspectiveSection';
import { SectionMarker } from './Primitives';
import Reveal from './Reveal';

export default function SpatialContact() {
  const { links, name, role, available } = profile;
  const year = 2026;

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const sendMail = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio — message from ${form.name || 'someone'}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ''}`);
    window.location.href = `mailto:${links.email}?subject=${subject}&body=${body}`;
  };

  const channels = [
    { label: 'Email', value: links.email, href: `mailto:${links.email}` },
    { label: 'GitHub', value: links.githubLabel, href: links.github },
    { label: 'LinkedIn', value: links.linkedinLabel, href: links.linkedin },
  ];

  const field =
    'w-full border border-white/12 bg-white/[0.02] px-3 py-2.5 font-plex text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#3b82f6]';

  return (
    <PerspectiveSection id="contact" className="mx-auto max-w-6xl px-6 pb-10 pt-16 md:pt-28" lift={6}>
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
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group flex items-center justify-between bg-[#070713] px-5 py-3.5 transition-colors hover:bg-[#3b82f6]/[0.06]"
              >
                <span className="font-grotesk text-[11px] uppercase tracking-[0.2em] text-white/45">{c.label}</span>
                <span className="font-plex text-sm text-white/75 transition-colors group-hover:text-[#3b82f6]">{c.value} ↗</span>
              </a>
            ))}
          </div>
        </Reveal>

        {/* Direct message form */}
        <Reveal delay={0.1}>
          <form onSubmit={sendMail} className="relative border border-white/10 bg-[#070713] p-6 sm:p-8">
            <p className="font-grotesk text-[10px] uppercase tracking-[0.3em] text-white/40">Direct message</p>
            <div className="mt-5 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block font-grotesk text-[10px] uppercase tracking-[0.18em] text-white/40">Name</label>
                  <input className={field} type="text" value={form.name} onChange={set('name')} placeholder="Your name" required />
                </div>
                <div>
                  <label className="mb-1.5 block font-grotesk text-[10px] uppercase tracking-[0.18em] text-white/40">Email</label>
                  <input className={field} type="email" value={form.email} onChange={set('email')} placeholder="you@email.com" required />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block font-grotesk text-[10px] uppercase tracking-[0.18em] text-white/40">Message</label>
                <textarea className={`${field} resize-none`} rows={4} value={form.message} onChange={set('message')} placeholder="What would you like to build?" required />
              </div>
            </div>
            <button
              type="submit"
              className="group mt-5 inline-flex w-full items-center justify-center gap-2 bg-[#3b82f6] px-6 py-3 font-grotesk text-sm font-medium uppercase tracking-[0.16em] text-[#050510] transition-colors hover:bg-[#60a5fa]"
            >
              Send message
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
            <p className="mt-3 font-plex text-[11px] text-white/35">Opens your mail app, pre-filled to {links.email}.</p>
          </form>
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
