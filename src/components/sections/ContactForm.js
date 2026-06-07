import { useState } from 'react';
import { profile } from '@/content/profile';

const field =
  'w-full rounded-lg border border-line bg-bg px-4 py-3 font-sans text-sm text-ink placeholder:text-faint transition-colors focus:border-accent focus:outline-none';

// Free, no-backend form delivery via Web3Forms (https://web3forms.com).
// The access key is public by design (it only routes mail to the address it was
// registered with). Override per-environment with NEXT_PUBLIC_WEB3FORMS_KEY if needed.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '7c602e90-f719-4f90-a46d-3c07719ea40e';
const configured = ACCESS_KEY && ACCESS_KEY !== 'your-web3forms-access-key';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!configured) {
      // Fallback: compose an email in the visitor's mail client.
      const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || 'someone'}`);
      const body = encodeURIComponent(`${form.message}\n\nFrom ${form.name}${form.email ? ` (${form.email})` : ''}`);
      window.location.href = `mailto:${profile.links.email}?subject=${subject}&body=${body}`;
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
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl bg-surface p-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-2xl text-accent">✓</div>
        <h3 className="mt-5 font-sans text-xl font-semibold text-ink">Message sent</h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
          Thanks for reaching out. I&apos;ll get back to you within a day.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 font-mono text-xs text-accent transition-colors hover:text-ink"
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-surface p-6 sm:p-8">
      {/* Honeypot for spam bots */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        onChange={(e) => setForm((f) => ({ ...f, botcheck: e.target.checked }))}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block font-mono text-xs uppercase tracking-wider text-faint">
            Name
          </label>
          <input id="name" type="text" required value={form.name} onChange={update('name')} className={field} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block font-mono text-xs uppercase tracking-wider text-faint">
            Email
          </label>
          <input id="email" type="email" required value={form.email} onChange={update('email')} className={field} placeholder="you@example.com" />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="message" className="mb-2 block font-mono text-xs uppercase tracking-wider text-faint">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={update('message')}
          className={`${field} resize-none`}
          placeholder="What are you building?"
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-grad px-5 py-3 font-mono text-sm font-medium text-white shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5 hover:shadow-accent/40 disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send message →'}
        </button>
        {status === 'error' && (
          <span className="font-mono text-xs text-red-400">Something went wrong. Try email instead.</span>
        )}
      </div>
    </form>
  );
}
