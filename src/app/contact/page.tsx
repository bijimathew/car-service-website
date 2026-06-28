import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact & Book | Slough Autos – Get a Quote via WhatsApp",
  description: "Book a premium car detailing service with Slough Autos. Select from ceramic coating, paint correction, MOT, mechanic services and more. Get an instant quote via WhatsApp.",
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <section className={`section ${styles.bookingSection}`}>
        <div className="container">
          <BookingForm />
        </div>
      </section>
    </div>
  );
}
