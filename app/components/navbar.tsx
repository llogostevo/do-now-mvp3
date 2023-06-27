"use client"
import { useState } from 'react';
import Link from 'next/link';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <nav className="w-full bg-black py-6">
        <div className="flex items-center justify-between px-4">
          <div>
            <Link href="/" className="text-white">&#x1f916;</Link>
          </div>
          <div className="hidden md:flex space-x-10">
            <Link href="/compsci" className="text-white">Computer Science</Link>
            <Link href="/geography" className="text-white">Geography</Link>
            <Link href="/history" className="text-white">History</Link>
            <Link href="/drama" className="text-white">Drama</Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center p-1 text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden px-4 pt-2 pb-3 space-y-1">
            <Link href="/compsci" className="text-white mx-2">Computer Science</Link>
            <Link href="/geography" className="text-white mx-2">Geography</Link>
            <Link href="/history" className="text-white mx-2">History</Link>
            <Link href="/drama" className="text-white mx-2">Drama</Link>
          </div>
        )}
      </nav>
    );
}

export default Navbar;
