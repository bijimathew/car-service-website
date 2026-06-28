import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Gallery | Slough Autos – Our Detailing Work",
  description: "Browse our gallery showcasing premium ceramic coating, paint correction, and detailing transformations on luxury and everyday vehicles in Slough, Berkshire.",
};

export default function GalleryPage() {
  return (
    <div className={styles.page}>
      <section className={`section ${styles.gallerySection}`}>
        <div className="container">
          <h1 className="section-title">Gallery</h1>
          <div className={styles.galleryGrid}>
            <div className={`${styles.galleryItem} ${styles.galleryLarge}`}>
              <img src="/img2.jpg" alt="Premium BMW detailing with ceramic coating" />
            </div>
            <div className={styles.galleryItem}>
              <img src="/img1.jpg" alt="White Land Rover Defender after full detail" />
            </div>
            <div className={styles.galleryItem}>
              <img src="/img3.jpg" alt="Professional paint correction results" />
            </div>
            <div className={styles.galleryItem}>
              <img src="/img4.jpg" alt="Luxury vehicle bodywork respray" />
            </div>
            <div className={styles.galleryItem}>
              <img src="/img5.jpg" alt="Custom wheel colour change finish" />
            </div>
            <div className={styles.galleryItem}>
              <img src="/img6.jpg" alt="Window tinting on sports car" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
