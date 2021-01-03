import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import type { MdxRemote } from 'next-mdx-remote/types'

import SyntaxHighlighter from '../../components/SyntaxHighlighter'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const components: MdxRemote.Components = {
  code: SyntaxHighlighter,
}

type BlogPostPageProps = {
  data: Record<string, any>,
  source: MdxRemote.Source,
}

export default function BlogPostPage({ data, source }: BlogPostPageProps) {
  const content = hydrate(source, { components })

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        {content}
      </main>
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  const fs = await import('fs');
  const path = await import('path');

  const contentRoot = path.join(process.cwd(), 'content');

  const fileNames = fs.readdirSync(contentRoot).filter(filename => filename.endsWith('.md'));

  const paths = fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.mdx?/, ''),
      },
    };
  });

  return {
    fallback: false,
    paths,
  }
}

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async (context) => {
  const fs = await import('fs');
  const path = await import('path');
  const matter = await import('gray-matter');

  const contentRoot = path.join(process.cwd(), 'content');

  const { data, content } = matter.read(path.join(contentRoot, `${context.params.slug}.md`));

  const source: MdxRemote.Source = await renderToString(content, { components, scope: data })

  return { props: { data, source } }
}
