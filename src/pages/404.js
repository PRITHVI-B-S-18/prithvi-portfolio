import Head from 'next/head';
import Link from 'next/link';
import SiteNav from '@/components/layout/SiteNav';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Not found — Prithvi B S</title>
      </Head>
      <SiteNav />
      <main className="mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-center px-6">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-4 font-serif text-4xl text-ink sm:text-5xl">Page not found</h1>
        <p className="mt-4 text-muted">That page doesn&apos;t exist.</p>
        <Link href="/" className="mt-8 font-mono text-sm text-ink transition-colors hover:text-accent">
          &larr; Home
        </Link>
      </main>
      <Footer />
    </>
  );
}
