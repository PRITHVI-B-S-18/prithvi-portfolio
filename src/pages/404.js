import Head from 'next/head';
import Link from 'next/link';
import SiteNav from '@/components/layout/SiteNav';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Not found | Prithvi B S</title>
      </Head>
      <SiteNav />
      <main className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-6">
        <div className="pointer-events-none absolute left-1/4 top-1/3 h-72 w-72 glow blur-3xl" aria-hidden="true" />
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">404</p>
        <h1 className="mt-4 font-sans text-5xl font-bold tracking-tight text-ink sm:text-6xl">
          <span className="text-gradient">Page not found</span>
        </h1>
        <p className="mt-4 text-lg text-muted">That page doesn&apos;t exist, or it moved.</p>
        <Link
          href="/"
          className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-line px-5 py-2.5 font-mono text-sm text-ink transition-colors hover:border-accent hover:text-accent"
        >
          ← Back home
        </Link>
      </main>
      <Footer />
    </>
  );
}
