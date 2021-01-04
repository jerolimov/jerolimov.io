import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Footer from '../components/Footer'
import Header from '../components/Header'

type BlogPost = {
  slug: string,
  data: Record<string, any>,
  content: string,
}

type IndexPageProps = {
  posts: BlogPost[],
}

export default function IndexPage({ posts }: IndexPageProps) {
  return (
    <>
      <Head>
        <title>My blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <div className="relative max-w-7xl mx-auto">
          <div className="mt-32 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Hi! My name is Christoph Jerolimov, I'm a Software Engineer working at Red Hat.
          </div>
          <div className="mt-8 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            This page is <span style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0) 60%, #0af5f4 60%, #0af5f4 90%, rgba(255,255,255,0) 90%)' }}>work in progress.</span> :)
          </div>
        </div>

        <div className="relative mt-32 max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              All posts
            </h2>
          </div>
        </div>

        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
                <a>{post.data.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps<IndexPageProps> = async (context) => {
  const fs = await import('fs');
  const path = await import('path');
  const matter = await import('gray-matter');

  const contentRoot = path.join(process.cwd(), 'content');

  const fileNames = fs.readdirSync(contentRoot).filter(filename => filename.endsWith('.md'));

  const posts: BlogPost[] = fileNames.map((fileName) => {
    const { data, content } = matter.read(path.join(contentRoot, fileName));
    return {
      slug: fileName.replace(/\.mdx?/, ''),
      data,
      content,
    }
  })

  return { props: { posts } }
}
