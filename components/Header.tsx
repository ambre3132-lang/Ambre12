
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';
import { useScroll } from '../hooks/useScroll';

const Header: React.FC = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrolled = useScroll();

  const navLinks = [
    { path: '/', label: t('nav_home') },
    { path: '/services', label: t('nav_services') },
    { path: '/offres', label: t('nav_offers') },
    { path: '/resultats', label: t('nav_results') },
    { path: '/a-propos', label: t('nav_about') },
    { path: '/contact', label: t('nav_contact') },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-lg bg-white/80 backdrop-blur-sm' : 'bg-brand-beige'}`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <NavLink to="/">
              <img className="h-14 w-auto" src="https://i.postimg.cc/L63Nd8Bx/image.png" alt={t('logo_alt')} />
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map(link => (
                <NavLink key={link.path} to={link.path} className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-brand-pink' : 'text-brand-gray hover:text-brand-pink'}`}>{link.label}</NavLink>
              ))}
              <NavLink to="/booking" className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-brand-pink hover:bg-pink-700">{t('book_now')}</NavLink>
              <LanguageSelector />
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-brand-gray hover:text-brand-pink focus:outline-none">
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            {navLinks.map(link => (
              <NavLink key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'text-brand-pink bg-pink-50' : 'text-brand-gray hover:text-brand-pink hover:bg-gray-50'}`}>{link.label}</NavLink>
            ))}
            <NavLink to="/booking" onClick={() => setIsMenuOpen(false)} className="block w-full text-center mt-2 px-3 py-2 rounded-md text-base font-medium text-white bg-brand-pink hover:bg-pink-700">{t('book_now')}</NavLink>
            <div className="pt-4 pb-2 px-3">
              <LanguageSelector />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;