import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Services | Slough Autos – Ceramic Coating, Paint Correction & More",
  description: "Explore our full range of premium car services including ceramic coating, paint correction, bodywork & resprays, wheel colour change, window tints, MOT, mechanic services, and tyres in Slough, Berkshire.",
};

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
  {
    number: "04",
    title: "Wheel Colour Change",
    description: "Gloss, satin and custom finishes to make your wheels stand out from the crowd",
  },
  {
    number: "05",
    title: "Window Tints",
    description: "Premium window and light styling tints for maximum privacy and striking aesthetics",
  },
  {
    number: "06",
    title: "MOT",
    description: "Full MOT testing to ensure your vehicle meets all road safety and environmental standards",
  },
  {
    number: "07",
    title: "Mechanic",
    description: "Professional mechanical repairs, servicing, and diagnostics for all makes and models",
  },
  {
    number: "08",
    title: "Tyres",
    description: "Premium tyre fitting, balancing, and alignment to keep you safe on the road",
  },
];

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <section className={`section ${styles.servicesSection}`}>
        <div className="container">
          <h1 className="section-title">Our Services</h1>
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
    </div>
  );
}
