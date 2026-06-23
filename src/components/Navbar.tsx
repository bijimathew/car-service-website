"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={`${styles.logo} ${isMobileMenuOpen ? styles.logoRight : ''}`} onClick={closeMenu}>
          <img src="/logo_wd.png" alt="Wicked Car Detailing Logo" className={styles.logoImage} />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className={styles.navDesktop}>
          <ul className={styles.navList}>
            <li><Link href="/" className={styles.navLink}>HOME</Link></li>
            <li><Link href="#services" className={styles.navLink}>SERVICES</Link></li>
            <li><Link href="#gallery" className={styles.navLink}>GALLERY</Link></li>
            <li><Link href="#contact" className={styles.navLink}>CONTACT</Link></li>
          </ul>
        </nav>
        
        <div className={styles.actionsDesktop}>
          <Link href="#booking" className={`btn-primary ${styles.bookBtn}`}>
            BOOK NOW
          </Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <button 
          className={`${styles.hamburger} ${isMobileMenuOpen ? styles.hamburgerHidden : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Sidebar Overlay Backdrop */}
      <div 
        className={`${styles.sidebarBackdrop} ${isMobileMenuOpen ? styles.backdropOpen : ''}`}
        onClick={closeMenu}
      ></div>

      {/* Mobile Sidebar Panel */}
      <div className={`${styles.sidebarPanel} ${isMobileMenuOpen ? styles.sidebarOpen : ''}`}>
        <button className={styles.closeBtn} onClick={closeMenu} aria-label="Close menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <nav className={styles.sidebarNav}>
          <ul className={styles.sidebarNavList}>
            <li><Link href="/" className={styles.sidebarNavLink} onClick={closeMenu}>Home</Link></li>
            <li><Link href="#services" className={styles.sidebarNavLink} onClick={closeMenu}>Services</Link></li>
            <li><Link href="#gallery" className={`${styles.sidebarNavLink} ${styles.active}`} onClick={closeMenu}>Gallery</Link></li>
            <li><Link href="#booking" className={styles.sidebarNavLink} onClick={closeMenu}>Bookings</Link></li>
            <li><Link href="#contact" className={styles.sidebarNavLink} onClick={closeMenu}>Contact</Link></li>
          </ul>

          <div className={styles.sidebarAccountSection}>
            <span className={styles.accountHeading}>Account</span>
            <ul className={styles.sidebarNavList}>
              <li><Link href="#" className={styles.sidebarNavLink} onClick={closeMenu}>Sign In</Link></li>
              <li><Link href="#booking" className={styles.sidebarNavLink} onClick={closeMenu}>Bookings</Link></li>
              <li><Link href="#" className={styles.sidebarNavLink} onClick={closeMenu}>My Account</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
