import Link from 'next/link'

export default function Navbar() {
  return (
    <div>
      <Link href="/">Home</Link>
      <Link href="/about-us">About Us</Link>
      <Link href="/community">Community</Link>
      <Link href="/contact">Contact</Link>
    </div>
  )
}
