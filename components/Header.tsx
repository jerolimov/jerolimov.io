import Link from 'next/link'

const navItems = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'About',
    href: '/blog/[slug]',
    as: '/blog/about',
  },
]

export default function Header() {
  return (
    <header>
      <strong>Christoph Jerolimov</strong>
      <ul>
        {navItems.map(navItem => (
          <li key={navItem.title}>
            <Link href={navItem.href} as={navItem.as}>
              <a>{navItem.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
