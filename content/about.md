---
title: 'About'
---
# About

hello {title}

```diff
function foo() {
  return bar()
+    .then(res => {
-      return res.doSomething()
    })
}
```

```js {1,2,,4-5,a,b-c}
function foo() {
  return bar()
    .then(res => {
      return res.doSomething()
    })
}
```

```tsx
import Link from 'next/link'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <a href="/about">About</a>

        <Link href="/">
          <a>Home</a>
        </Link>
      </div>

      <Footer />
    </>
  )
}
```
