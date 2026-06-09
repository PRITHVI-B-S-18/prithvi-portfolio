import { useState } from 'react';
import { profile } from '@/content/profile';
import { RisoHeading, Label, Press, CORAL, TEAL } from './Primitives';

export default function RisoContact() {
  const { links, name, role, available } = profile;
  const year = 2026;
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const send = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Hello from ${form.name || 'the print shop'}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ''}`);
    window.location.href = `mailto:${links.email}?subject=${subject}&body=${body}`;
  };

  const channels = [
    { label: 'Email', value: links.email, href: `mailto:${links.email}` },
    { label: 'GitHub', value: links.githubLabel, href: links.github },
    { label: 'LinkedIn', value: links.linkedinLabel, href: links.linkedin },
  ];

  const field =
    'w-full border-[1.5px] border-[#1a1210] bg-[#fff8f0] px-3 py-2.5 font-body text-[15px] text-[#1a1210] placeholder-[#1a1210]/35 outline-none transition-colors focus:border-coral';

  return (
    <section id="contact" className="scroll-mt-20 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Label ink={TEAL}>Say Hello</Label>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div>
            <Press>
              <RisoHeading as="h2" ink={CORAL} className="font-bold leading-[0.95]" style={{ fontSize: 'clamp(2.6rem, 7vw, 5rem)' }}>
                Let&apos;s print something together.
              </RisoHeading>
            </Press>
            <Press delay={0.08}>
              <p className="mt-6 max-w-md font-body text-lg leading-[1.85] text-[#1a1210]/75">
                {available ? 'Open to work and collaborations.' : 'Reach out anytime.'} Drop a note in the form, or
                find me on any channel below.
              </p>
            </Press>

            <Press delay={0.14} className="mt-8 divide-y divide-dashed divide-[#1a1210]/30 border-y-[1.5px] border-[#1a1210]">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-3.5 transition-colors hover:bg-[#1a1210]/[0.04]"
                >
                  <span className="font-body text-xs font-medium uppercase tracking-[0.18em] text-[#1a1210]/55">{c.label}</span>
                  <span className="font-body text-sm text-[#1a1210] group-hover:text-coral">
                    {c.value} <span aria-hidden="true">↗</span>
                  </span>
                </a>
              ))}
            </Press>
          </div>

          {/* Paper form */}
          <Press delay={0.1}>
            <form
              onSubmit={send}
              className="relative bg-[#fff8f0] p-6 sm:p-8"
              style={{ border: '1.5px solid #1a1210', outline: '1px dashed rgba(26,18,16,0.28)', outlineOffset: '-6px' }}
            >
              <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-[#1a1210]/50">Direct message</p>
              <div className="mt-5 space-y-4">
                <div>
                  <label className="mb-1.5 block font-body text-[11px] font-medium uppercase tracking-[0.14em] text-[#1a1210]/55">Name</label>
                  <input className={field} type="text" value={form.name} onChange={set('name')} placeholder="Your name" required />
                </div>
                <div>
                  <label className="mb-1.5 block font-body text-[11px] font-medium uppercase tracking-[0.14em] text-[#1a1210]/55">Email</label>
                  <input className={field} type="email" value={form.email} onChange={set('email')} placeholder="you@email.com" required />
                </div>
                <div>
                  <label className="mb-1.5 block font-body text-[11px] font-medium uppercase tracking-[0.14em] text-[#1a1210]/55">Message</label>
                  <textarea className={`${field} resize-none`} rows={4} value={form.message} onChange={set('message')} placeholder="What shall we make?" required />
                </div>
              </div>
              <button
                type="submit"
                className="mt-5 w-full border-[1.5px] border-[#1a1210] bg-coral px-6 py-3 font-body text-sm font-medium uppercase tracking-[0.14em] text-[#fff8f0] transition-transform hover:-translate-y-0.5"
              >
                Send it <span aria-hidden="true">→</span>
              </button>
              <p className="mt-3 font-body text-[11px] text-[#1a1210]/45">Opens your mail app, pre-filled to {links.email}.</p>
            </form>
          </Press>
        </div>

        {/* Footer colophon */}
        <div className="mt-20 flex flex-col items-start gap-3 border-t-[1.5px] border-[#1a1210] pt-6 font-body text-xs uppercase tracking-[0.16em] text-[#1a1210]/55 sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} {name}</span>
          <span style={{ color: CORAL }}>{role}</span>
          <span>Printed in cream, coral &amp; teal ○</span>
        </div>
      </div>
    </section>
  );
}
