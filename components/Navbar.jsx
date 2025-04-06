import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex flex-col md:flex-row justify-between text-base font-satoshi font-medium">
  <div className="mb-4 md:mb-0">K</div>
  <div className="hidden md:block mb-4 md:mb-0 text-center">Currently a Freelance Developer</div>
  <div className="hidden lg:block mb-4 md:mb-0 text-center">Based in Indore, India</div>
  <div className="hidden md:block text-right space-x-2">
    <Link href="/work" className="nav-hover-btn">Work</Link>
    <Link href="/about" className="nav-hover-btn">About</Link>
    <Link href="/contact" className="nav-hover-btn">Contact</Link>
  </div>
</nav>
  )
}

export default Navbar