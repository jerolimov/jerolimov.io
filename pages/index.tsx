import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

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

      <h1>My blog</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href="/blog/[slug]" as={`/blog/${post.slug}`}>
              <a>{post.data.title}</a>
            </Link>
          </li>
        ))}
      </ul>
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
