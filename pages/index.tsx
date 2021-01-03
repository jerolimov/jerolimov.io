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

      <div className="relative bg-indigo-600">
        <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div className="pr-16 sm:text-center sm:px-16">
            <p className="font-medium text-white">
              Page is work in process! :)
            </p>
          </div>
        </div>
      </div>

      <Header />

      {/*
      <main>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            All posts
            </h2>
          </div>
        </div>

        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
          Snippet
        </span>

        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href="/blog/[slug]" as={`/blog/${post.slug}`}>
                <a>{post.data.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      */}

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
