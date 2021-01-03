import Link from 'next/link'

const navItems = [
  {
    title: 'About',
    href: '/blog/[slug]',
    as: '/blog/about',
  },
  {
    title: 'Imprint',
    href: '/blog/[slug]',
    as: '/blog/about',
  },
  {
    title: 'Privacy',
    href: '/blog/[slug]',
    as: '/blog/privacy',
  },
]

export default function Footer() {
  return (
    <footer>
      &copy; Christoph Jerolimov 2021<br/>
      <ul>
        {navItems.map(navItem => (
          <li key={navItem.title}>
            <Link href={navItem.href} as={navItem.as}>
              <a>{navItem.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
