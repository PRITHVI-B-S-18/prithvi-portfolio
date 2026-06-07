import Head from 'next/head';
import { projects } from '@/content/projects';
import SiteNav from '@/components/layout/SiteNav';
import Footer from '@/components/layout/Footer';
import ProjectDetail from '@/components/work/ProjectDetail';

const featured = projects.filter((p) => p.featured);

export async function getStaticPaths() {
  return {
    paths: featured.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const idx = featured.findIndex((p) => p.slug === params.slug);
  if (idx === -1) return { notFound: true };

  const project = featured[idx];
  const pick = (p) => (p ? { slug: p.slug, title: p.title } : null);

  return {
    props: {
      project,
      prev: pick(featured[idx - 1] || null),
      next: pick(featured[idx + 1] || null),
    },
  };
}

export default function WorkPage({ project, prev, next }) {
  return (
    <>
      <Head>
        <title>{`${project.title} | Prithvi B S`}</title>
        <meta name="description" content={project.oneLiner} />
        <meta property="og:title" content={`${project.title} | Prithvi B S`} />
        <meta property="og:description" content={project.oneLiner} />
      </Head>
      <SiteNav />
      <main>
        <ProjectDetail project={project} prev={prev} next={next} />
      </main>
      <Footer />
    </>
  );
}
