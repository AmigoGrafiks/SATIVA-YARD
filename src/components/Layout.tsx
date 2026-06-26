import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, MapPin, Phone, Mail, Instagram, Facebook, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';
import { AnimatePresence, motion } from 'motion/react';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { cartItemCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  // Unify Breakpoint system with Tailwind's md (768px)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
      if (!e.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    // Initial check
    handleScroll();
    handleMediaChange(mediaQuery);

    window.addEventListener('scroll', handleScroll);
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  // Handle Search Input Focus Trap and Escape
  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsSearchOpen(false);
          searchButtonRef.current?.focus();
        }
      };
      
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isSearchOpen]);

  // Handle Mobile Menu Focus Trap and Escape
  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      const focusableElements = mobileMenuRef.current.querySelectorAll('a, button');
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
          menuButtonRef.current?.focus();
        } else if (e.key === 'Tab') {
          const first = focusableElements[0] as HTMLElement;
          const last = focusableElements[focusableElements.length - 1] as HTMLElement;
          
          if (e.shiftKey) {
            if (document.activeElement === first) {
              last.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === last) {
              first.focus();
              e.preventDefault();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isMobileMenuOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Sticky Two-tier Header */}
      <header className={cn(
        "sticky top-0 z-50 w-full transition-shadow duration-300",
        isScrolled ? "shadow-md shadow-forest/5" : ""
      )}>
        {/* Tier 1: Utility Bar */}
        <div className="bg-forest text-cream py-2 border-b border-forest/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-brass" />
                <span>26 Van Beek St, New Doornfontein, Johannesburg, 2094</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-brass transition-colors" 
                aria-label="Instagram"
              >
                <Instagram className="h-3.5 w-3.5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-brass transition-colors border-r border-cream/15 pr-4" 
                aria-label="Facebook"
              >
                <Facebook className="h-3.5 w-3.5" />
              </a>
              <span className="bg-brass text-forest text-[9px] font-black px-1.5 py-0.5 rounded leading-none">
                18+
              </span>
            </div>
          </div>
        </div>

        {/* Tier 2: Main Nav */}
        <div className="bg-cream text-forest border-b border-forest/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-3 group">
                <img 
                  src="/logo.jpg" 
                  alt="Sativa Yard Logo" 
                  className="h-16 w-auto object-contain rounded-2xl transition-transform duration-300 group-hover:scale-105 shadow-md border border-forest/5"
                />
                <span className="font-serif text-2xl font-black text-forest tracking-tight transition-colors duration-300 group-hover:text-forest/80">
                  Sativa Yard
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            {!isMobile && (
              <nav className="flex items-center gap-8" aria-label="Main Navigation">
                {navigation.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={cn(
                        "relative py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300",
                        isActive ? "text-forest" : "text-forest/60 hover:text-forest"
                      )}
                    >
                      {link.name}
                      {isActive && (
                        <motion.div
                          layoutId="activeUnderline"
                          className="absolute bottom-0 left-0 right-0 h-[3px] bg-brass rounded-full"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>
            )}

            {/* Right side utility icons / CTA */}
            <div className="flex items-center gap-3">
              {/* Search Toggle */}
              <div className="relative flex items-center">
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.form
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 180, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      onSubmit={handleSearchSubmit}
                      className="relative"
                    >
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-forest/5 text-forest pl-3 pr-8 py-1.5 rounded-xl text-xs border border-forest/10 focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/50 focus:bg-white transition-all"
                      />
                      <button 
                        type="submit" 
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-forest/40 hover:text-forest transition-colors cursor-pointer" 
                        aria-label="Submit search"
                      >
                        <Search className="h-3.5 w-3.5" />
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>

                <button
                  ref={searchButtonRef}
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-forest/70 hover:text-forest hover:bg-forest/5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest cursor-pointer"
                  aria-label={isSearchOpen ? "Close search bar" : "Open search bar"}
                  aria-expanded={isSearchOpen}
                >
                  {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                </button>
              </div>

              {/* Cart Bag */}
              <Link
                to="/cart"
                className="relative p-2 text-forest/70 hover:text-forest hover:bg-forest/5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                aria-label={`Shopping cart, ${cartItemCount} items`}
              >
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 inline-flex items-center justify-center min-w-4 h-4 px-1 text-[9px] font-black leading-none text-forest transform translate-x-1/4 -translate-y-1/4 bg-brass rounded-full shadow-sm">
                    {cartItemCount}
                  </span>
                )}
                {/* Screen Reader Announcer */}
                <span className="sr-only" aria-live="polite">
                  Cart items count: {cartItemCount}
                </span>
              </Link>

              {/* Shop Now CTA */}
              {!isMobile && (
                <Link
                  to="/products"
                  className="bg-forest hover:bg-forest/90 text-cream font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow hover:-translate-y-0.5 text-[11px] uppercase tracking-widest active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                >
                  Shop Now
                </Link>
              )}

              {/* Hamburger Button */}
              {isMobile && (
                <button
                  ref={menuButtonRef}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-forest/70 hover:text-forest hover:bg-forest/5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest cursor-pointer"
                  aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                  aria-expanded={isMobileMenuOpen}
                >
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {isMobile && isMobileMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-forest/10 bg-cream"
            >
              <div className="px-4 py-6 space-y-4 max-w-7xl mx-auto">
                {navigation.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={cn(
                        "block py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300",
                        isActive ? "text-forest border-l-2 border-brass pl-3 font-extrabold" : "text-forest/70 hover:text-forest"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <div className="pt-4 border-t border-forest/10">
                  <Link
                    to="/products"
                    className="block text-center bg-forest hover:bg-forest/90 text-cream font-bold py-3 rounded-xl transition-colors text-xs uppercase tracking-widest focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-emerald-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-emerald-900">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <img 
                  src="/logo.jpg" 
                  alt="Sativa Yard Logo" 
                  className="h-12 w-auto"
                />
              </Link>
              <p className="text-emerald-800/70 text-sm leading-relaxed mb-6">
                Redefining the cannabis experience in Johannesburg through premium products, education, and unparalleled customer service.
              </p>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener" 
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 hover:bg-emerald-100 transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener" 
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 hover:bg-emerald-100 transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-black tracking-widest text-emerald-600/60 mb-4 uppercase">Shop</h3>
              <ul className="space-y-3">
                {['Cannabis Flower', 'Pre-Rolls', 'Concentrates', 'Edibles', 'Vapes', 'Accessories'].map((item) => (
                  <li key={item}>
                    <Link to="/products" className="text-emerald-800/80 hover:text-emerald-900 text-sm font-medium transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-black tracking-widest text-emerald-600/60 mb-4 uppercase">Company</h3>
              <ul className="space-y-3">
                {['About Us', 'Contact', 'FAQ', 'Shipping Policy', 'Privacy Policy'].map((item) => (
                  <li key={item}>
                    <Link to="/about" className="text-emerald-800/80 hover:text-emerald-900 text-sm font-medium transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-black tracking-widest text-emerald-600/60 mb-4 uppercase">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-emerald-700 shrink-0" />
                  <span className="text-sm font-medium text-emerald-800/80">26 Van Beek St, New Doornfontein<br/>Johannesburg, 2094</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-emerald-700 shrink-0" />
                  <span className="text-sm font-medium text-emerald-800/80">+27 78 587 0868</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-emerald-700 shrink-0" />
                  <span className="text-sm font-medium text-emerald-800/80">hello@sativayard.co.za</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-emerald-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600/60">
              &copy; {new Date().getFullYear()} Sativa Yard. All rights reserved. Not for sale to persons under the age of 18.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
