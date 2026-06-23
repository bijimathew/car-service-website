import styles from "./page.module.css";
import BookingForm from "@/components/BookingForm";

const services = [
  {
    number: "01",
    title: "Ceramic Coating",
    description: "Long-term gloss and paint protection against environmental contaminants. Uncompromising durability.",
  },
  {
    number: "02",
    title: "Paint Correction",
    description: "Machine polishing to remove defects, swirls, and light scratches. Restoring factory finish.",
  },
  {
    number: "03",
    title: "Bodywork & Resprays",
    description: "Cosmetic smart repairs and full panel resprays for a flawless, pristine look.",
  },
  {
    number: "04",
    title: "Wheel Colour Change",
    description: "Gloss, satin and custom finishes to make your wheels stand out from the crowd.",
  },
  {
    number: "05",
    title: "Window Tints",
    description: "Premium window and light styling tints for maximum privacy and striking aesthetics.",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero} id="home">
        <div className={`container ${styles.heroContent} animate-slide-up`}>
          <div className={styles.heroTextWrap}>
            <p className={styles.heroEyebrow}>Precision & Performance</p>
            <h1 className={styles.heroTitle}>
              Wicked<br /><span>Detailing</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Unleash the ultimate shine. Premium ceramic coating, paint correction, and custom automotive styling.
            </p>
            <div className={styles.heroActions}>
              <div className={styles.locationBadge}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Slough | Berkshire</span>
              </div>
              <a href="#booking" className="btn-whatsapp">WhatsApp for a Quote</a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`section ${styles.servicesSection}`} id="services">
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
        </div>
      </section>

      {/* Gallery Section */}
      <section className={`section ${styles.gallerySection}`} id="gallery">
        <div className="container">
          <h2 className="section-title">Gallery</h2>
          <div className={styles.galleryGrid}>
            <div className={`${styles.galleryItem} ${styles.galleryLarge}`}>
              <div className={styles.galleryPlaceholder}>PROJECT ALPHA</div>
            </div>
            <div className={styles.galleryItem}>
              <div className={styles.galleryPlaceholder}>DETAIL 01</div>
            </div>
            <div className={styles.galleryItem}>
              <div className={styles.galleryPlaceholder}>DETAIL 02</div>
            </div>
            <div className={`${styles.galleryItem} ${styles.galleryWide}`}>
              <div className={styles.galleryPlaceholder}>PROJECT BETA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className={`section ${styles.bookingSection}`} id="contact">
        <div className="container">
          <div className={styles.bookingWrapper}>
            <div className={styles.bookingInfo}>
              <h2 className="section-title">Ready for perfection?</h2>
              <p>Contact us to discuss your vehicle's needs. We provide bespoke detailing services tailored to your exact specifications.</p>
            </div>
            <BookingForm />
          </div>
        </div>
      </section>
    </div>
  );
}
