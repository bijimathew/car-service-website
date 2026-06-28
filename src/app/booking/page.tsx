import type { Metadata } from "next";
import BookingCatalog from "@/components/BookingCatalog";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Book Online | Slough Autos – Appointments & Pricing",
  description: "Book your car detailing appointment online with Slough Autos. Browse our full service menu with transparent pricing including valeting, paint protection, tinting, and more.",
};

export default function BookingPage() {
  return (
    <div className={styles.page}>
      <section className={styles.bookingSection}>
        <div className="container">
          <BookingCatalog />
        </div>
      </section>
    </div>
  );
}
