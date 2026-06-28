import styles from "./page.module.css";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";

const services = [
  {
    number: "01",
    title: "Ceramic Coating",
    description: "Long-term gloss and paint protection against environmental contaminants. Uncompromising durability",
  },
  {
    number: "02",
    title: "Paint Correction",
    description: "Machine polishing to remove defects, swirls, and light scratches. Restoring factory finish",
  },
  {
    number: "03",
    title: "Bodywork & Resprays",
    description: "Cosmetic smart repairs and full panel resprays for a flawless, pristine look",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero} id="home">
        <div className={`container ${styles.heroContent} animate-slide-up`}>
          <div className={styles.heroTextWrap}>
            <p className={styles.heroEyebrow}></p>
            <h1 className={styles.heroTitle}>
              slough<br /><span>Autos</span>
            </h1>
            <p className={styles.heroSubtitle}>
              VEHICLE APPEARANCE <br />
              AND <br />
              COSMETIC WORK
            </p>
            <div className={styles.heroActions}>
              <div className={styles.locationBadge}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Slough | Berkshire</span>
              </div>
              <Link href="/contact" className="btn-whatsapp">WhatsApp for a Quote</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Teaser Section */}
      <section className={`section ${styles.servicesSection}`}>
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div key={index} className={`panel ${styles.serviceCard}`}>
                <div className={styles.serviceNumber}>{service.number}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className={styles.cardLine}></div>
              </div>
            ))}
          </div>
          <div className={styles.viewAllWrapper}>
            <Link href="/services" className={styles.viewAllLink}>
              View All Services
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Teaser Section */}
      <section className={`section ${styles.gallerySection}`}>
        <div className="container">
          <h2 className="section-title">Gallery</h2>
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
          </div>
          <div className={styles.viewAllWrapper}>
            <Link href="/gallery" className={styles.viewAllLink}>
              View Full Gallery
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className={`section ${styles.bookingSection}`} id="contact">
        <div className="container">
          <BookingForm />
        </div>
      </section>
    </div>
  );
}
