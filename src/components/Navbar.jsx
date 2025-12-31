"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
 
// If you kept it in assets, uncomment below and ensure file exists:
import logoImg from '../assets/logo.svg'; 
const logo = logoImg.src || logoImg;

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [token, setToken] = useState(null);

  // Check token only on client side to avoid hydration mismatch
  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('dashboardData');
    setToken(null);
    router.push('/login');
  };

  // Helper to check active state
  const isActive = (path) => pathname === path;
  const getLinkClass = (path) => `nav-link ${isActive(path) ? 'text-sky-600 font-bold' : 'text-slate-600 hover:text-sky-500'}`;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src={logo} alt="Tour&Travel logo" className="h-8 w-8" />
          <span className="font-[Poppins] font-bold text-xl">Tour&Travel</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className={getLinkClass('/')}>Home</Link>
          <Link href="/services" className={getLinkClass('/services')}>Services</Link>
          <Link href="/about" className={getLinkClass('/about')}>About</Link>
          <Link href="/contact" className={getLinkClass('/contact')}>Contact</Link>
          <Link href="/dashboard" className={getLinkClass('/dashboard')}>Dashboard</Link>
          <Link href="/budget" className={getLinkClass('/budget')}>Budget Calculator</Link>
        </nav>

        <div className="flex items-center gap-2">
          {token ? (
            <button onClick={logout} className="px-4 py-2 border border-slate-200 rounded-full text-sm font-semibold hover:bg-slate-50 transition" aria-label="Logout">
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 border border-slate-200 rounded-full text-sm font-semibold hover:bg-slate-50 transition" aria-label="Login">
                Login
              </Link>
              <Link href="/registration" className="px-4 py-2 bg-sky-600 text-white rounded-full text-sm font-semibold hover:bg-sky-700 transition" aria-label="Sign up">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}