import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Heart, User, ShoppingBag, Menu, X
} from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Shop', href: '#products' },
    { name: 'Categories', href: '#categories' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#footer' },
  ];

  return (
    <>
      {/* ========== TOP NAVBAR ========== */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled 
            ? 'bg-white shadow-md border-b border-blue-100' 
            : 'bg-white border-b border-blue-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Main Row: Logo | Search | Account + Cart */}
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24 gap-2 sm:gap-4">

            {/* Left: Logo */}
            <motion.a 
              href="#home" 
              className="flex items-center flex-shrink-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <img 
                src={logo} 
                alt="Krishalaa" 
                className="h-10 sm:h-14 lg:h-20 w-auto object-contain"
              />
            </motion.a>

            {/* Center: Search Bar - only md+ */}
            <div className="hidden md:flex flex-1 max-w-xl mx-4 lg:mx-8">
              <div className="relative w-full">
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full overflow-hidden focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                  <Search className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 ml-3 lg:ml-4 flex-shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Search for products..." 
                    className="w-full px-2 lg:px-3 py-2.5 lg:py-3 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                  />
                  <button className="px-4 lg:px-6 py-2 mr-1 bg-blue-700 text-white text-xs lg:text-sm font-bold rounded-full hover:bg-blue-800 transition-colors whitespace-nowrap">
                    FIND
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Account + Cart */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search Icon - Mobile only */}
              <button 
                className="p-2 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-200 md:hidden" 
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist - hidden on mobile */}
              <button 
                className="p-2 lg:p-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-200 hidden sm:block" 
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </button>

              {/* Account - hidden on mobile */}
              <button 
                className="flex items-center gap-1.5 px-3 lg:px-4 py-2 lg:py-2.5 text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-200 hidden sm:flex"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
                <span className="text-[13px] lg:text-[14px] font-bold uppercase tracking-wide hidden lg:inline">Account</span>
              </button>

              {/* Cart */}
              <button 
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-5 py-2 lg:py-2.5 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-all duration-200 relative"
                aria-label="Cart"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[12px] sm:text-[13px] lg:text-[14px] font-bold uppercase tracking-wide hidden xs:inline">Cart</span>
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 text-white text-[10px] sm:text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  2
                </span>
              </button>

              {/* Mobile/Tablet Menu Button */}
              <button 
                className="p-2 text-slate-600 hover:text-blue-700 rounded-xl hover:bg-blue-50 transition-all lg:hidden ml-0.5"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* ========== SECONDARY NAVBAR (Categories) - Desktop only ========== */}
        <div className="hidden lg:block border-t border-blue-50 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-1 py-3">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="relative px-5 py-2 text-[14px] font-bold text-slate-500 hover:text-blue-700 uppercase tracking-wider rounded-lg hover:bg-blue-50 transition-all duration-200 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-5 right-5 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ========== MOBILE/TABLET MENU DROPDOWN ========== */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden bg-white border-t border-blue-100 overflow-hidden max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              <div className="px-4 py-4 space-y-1">
                {/* Mobile Search */}
                <div className="mb-4 md:hidden">
                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full overflow-hidden">
                    <Search className="w-4 h-4 text-gray-400 ml-4 flex-shrink-0" />
                    <input 
                      type="text" 
                      placeholder="Search for products..." 
                      className="w-full px-3 py-3 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                    />
                    <button className="px-4 py-2.5 mr-1 bg-blue-700 text-white text-sm font-bold rounded-full hover:bg-blue-800 transition-colors">
                      FIND
                    </button>
                  </div>
                </div>

                {/* Nav Links */}
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center px-4 py-3 text-[16px] font-bold text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                ))}

                {/* Mobile-only icons row */}
                <div className="flex items-center justify-center gap-4 pt-4 mt-2 border-t border-blue-50">
                  <button className="flex flex-col items-center gap-1 p-3 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all" aria-label="Search">
                    <Search className="w-5 h-5" />
                    <span className="text-[10px] font-semibold">Search</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 p-3 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all" aria-label="Wishlist">
                    <Heart className="w-5 h-5" />
                    <span className="text-[10px] font-semibold">Wishlist</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 p-3 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all" aria-label="Login">
                    <User className="w-5 h-5" />
                    <span className="text-[10px] font-semibold">Account</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 p-3 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all relative" aria-label="Cart">
                    <ShoppingBag className="w-5 h-5" />
                    <span className="text-[10px] font-semibold">Cart</span>
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-blue-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white">
                      2
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/20 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
});

export default Navbar;