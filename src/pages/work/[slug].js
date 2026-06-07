import Head from 'next/head';
import { projects } from '@/content/projects';
import SiteNav from '@/components/layout/SiteNav';
import Footer from '@/components/layout/Footer';
import ProjectDetail from '@/components/work/ProjectDetail';

export async function getStaticPaths() {
  return {
    paths: projects.filter((p) => p.featured).map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const project = projects.find((p) => p.slug === params.slug) || null;
  if (!project) return { notFound: true };
  return { props: { project } };
}

export default function WorkPage({ project }) {
  return (
    <>
      <Head>
        <title>{`${project.title} — Prithvi B S`}</title>
        <meta name="description" content={project.oneLiner} />
      </Head>
      <SiteNav />
      <main>
        <ProjectDetail project={project} />
      </main>
      <Footer />
    </>
  );
}
