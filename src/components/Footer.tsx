import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.brand}>
          <img src="/logo_wd.png" alt="slough Autos Logo" className={styles.logoImage} />
          <h2>slough <span>Autos</span></h2>
          <p>Premium car detailing services ensuring long-term gloss and paint protection</p>
        </div>
        
        <div className={styles.links}>
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        
        <div className={styles.contact}>
          <h3>Contact Us</h3>
          <p>Email: info@sloughautos.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
      </div>
      
      <div className={styles.bottomBar}>
        <p>&copy; {new Date().getFullYear()} slough Autos<br></br>All Rights Reserved</p>
      </div>
    </footer>
  );
}
