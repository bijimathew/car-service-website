"use client";

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import styles from './BookingCatalog.module.css';

type ServiceCategory = 'all' | 'valeting-standard' | 'valeting-large' | 'paint-protection' | 'tinting' | 'repairs';

interface ServiceItem {
  id: string;
  name: string;
  duration: string;
  price: string;
  numericPrice: number;
  image: string;
  category: ServiceCategory[];
  description: string;
}

const categories: { id: ServiceCategory; label: string }[] = [
  { id: 'all', label: 'All Services' },
  { id: 'valeting-standard', label: 'Valeting – Standard Vehicles' },
  { id: 'valeting-large', label: 'Valeting – Large Vehicles' },
  { id: 'paint-protection', label: 'Paint Protection' },
  { id: 'tinting', label: 'Tinting & Styling' },
  { id: 'repairs', label: 'Repairs & Resprays' },
];

const services: ServiceItem[] = [
  {
    id: 's1',
    name: 'Wicked Exterior (Quick Wash)',
    duration: '45 mins',
    price: '£60',
    numericPrice: 60,
    image: '/img1.jpg',
    category: ['valeting-standard'],
    description: 'Exterior-only wash designed for regular maintenance. Includes jet wash rinse, snow foam, safe hand wash, wheel and tyre clean, dried finish and spray wax. No interior work included.'
  },
  {
    id: 's2',
    name: 'Mini Valet',
    duration: '1 hr 30 mins',
    price: '£90',
    numericPrice: 90,
    image: '/img2.jpg',
    category: ['valeting-standard'],
    description: 'A quick refresh for both interior and exterior. Includes exterior wash, interior vacuum, wipe down of surfaces, and glass cleaning.'
  },
  {
    id: 's3',
    name: 'Full Valet',
    duration: '3 hrs',
    price: '£180',
    numericPrice: 180,
    image: '/img3.jpg',
    category: ['valeting-standard'],
    description: 'Comprehensive deep clean. Exterior safe wash and decontamination. Interior deep vacuum, shampooing of seats and carpets, and full interior dress.'
  },
  {
    id: 's4',
    name: 'Full Valet Plus',
    duration: '5 hrs',
    price: '£250',
    numericPrice: 250,
    image: '/img4.jpg',
    category: ['valeting-standard'],
    description: 'The ultimate detailing package. Everything in a Full Valet plus a single-stage machine polish to enhance gloss and remove light swirl marks.'
  },
  {
    id: 's5',
    name: 'Wicked Showroom Standard',
    duration: '8 hrs',
    price: '£500',
    numericPrice: 500,
    image: '/img5.jpg',
    category: ['valeting-standard'],
    description: 'Restores your vehicle to better-than-new condition. Multi-stage paint correction and comprehensive interior restoration. Uncompromising quality.'
  },
  {
    id: 's6',
    name: 'Interior Treatment',
    duration: '2 hrs 30 mins',
    price: 'Request Quote',
    numericPrice: 0,
    image: '/img6.jpg',
    category: ['valeting-standard'],
    description: 'Deep cleaning and sanitization of the entire interior. Ideal for removing stains, odors, and heavily soiled areas.'
  },
  {
    id: 's7',
    name: 'Engine Bay Detail',
    duration: '1 hr',
    price: '£90',
    numericPrice: 90,
    image: '/img1.jpg',
    category: ['valeting-standard', 'valeting-large'],
    description: 'Safe degreasing, cleaning, and dressing of the engine bay area to restore a clean, factory look.'
  },
  {
    id: 's8',
    name: 'Maintenance Valet',
    duration: '3 hrs',
    price: '£80',
    numericPrice: 80,
    image: '/img2.jpg',
    category: ['valeting-standard'],
    description: 'Regular upkeep detail for vehicles that have previously received a Full Valet or Ceramic Coating.'
  },
  {
    id: 's9',
    name: 'Seats Steam Wash (Per Seat)',
    duration: '2 hrs',
    price: '£25',
    numericPrice: 25,
    image: '/img3.jpg',
    category: ['valeting-standard', 'valeting-large'],
    description: 'Targeted deep steam cleaning extraction for heavily stained or soiled fabric seats.'
  },
  {
    id: 's10',
    name: 'PPF - Basic Package',
    duration: '24 hrs',
    price: '£450',
    numericPrice: 450,
    image: '/img4.jpg',
    category: ['paint-protection'],
    description: 'Clear paint protection film applied to the front bumper and leading edges to protect against stone chips and scratches.'
  },
  {
    id: 's11',
    name: 'Ceramic Coating',
    duration: '24 hrs',
    price: 'Request Quote',
    numericPrice: 0,
    image: '/img5.jpg',
    category: ['paint-protection'],
    description: 'Long-lasting nano-ceramic protection. Enhances gloss, makes washing easier, and protects paint from environmental contaminants.'
  },
  {
    id: 's12',
    name: 'Full Vehicle Window Tint',
    duration: '3 hrs',
    price: '£160',
    numericPrice: 160,
    image: '/img6.jpg',
    category: ['tinting'],
    description: 'Premium automotive window tinting for enhanced privacy, UV protection, and a sleek aesthetic upgrade.'
  },
];

const INITIAL_SHOW = 9;

// Helper to generate a simple month calendar for UI purposes
const generateCalendarDays = () => {
  const days = [];
  // Dummy month (June 2026) for styling
  // 1st is a Monday
  for (let i = 0; i < 1; i++) days.push(null); // Empty slots for Sunday
  for (let i = 1; i <= 30; i++) days.push(i);
  return days;
};

export default function BookingCatalog() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [showAll, setShowAll] = useState(false);
  const { addToCart } = useCart();

  // Booking Flow State
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter(s => s.category.includes(activeCategory));

  const displayedServices = showAll ? filteredServices : filteredServices.slice(0, INITIAL_SHOW);

  const handleCategoryChange = (cat: ServiceCategory) => {
    setActiveCategory(cat);
    setShowAll(false);
  };

  const handleInitialBookClick = (service: ServiceItem) => {
    setSelectedService(service);
    setSelectedDate(30); // Default selection for mockup
    setSelectedTime(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalBookClick = () => {
    if (!selectedService || !selectedDate || !selectedTime) return;

    // Create a real Date object for the cart (using June 2026 as per mockup)
    const dateObj = new Date(2026, 5, selectedDate);

    addToCart({
      serviceName: selectedService.name,
      priceString: selectedService.price,
      numericPrice: selectedService.numericPrice,
      date: dateObj,
      time: selectedTime,
      image: selectedService.image
    });

    // Reset flow
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const renderDetailedView = () => {
    if (!selectedService) return null;

    const calendarDays = generateCalendarDays();
    const isReadyToBook = selectedDate !== null && selectedTime !== null;

    return (
      <div className={styles.detailedView}>
        <div className={styles.detailedLeft}>
          <button className={styles.backBtn} onClick={() => setSelectedService(null)}>
            &lt; View all services
          </button>
          
          <div className={styles.calendarHeader}>
            <button className={styles.calNav}>&lt;</button>
            <span className={styles.calMonth}>June 2026</span>
            <button className={styles.calNav}>&gt;</button>
          </div>

          <div className={styles.calendarGrid}>
            <div className={styles.calDayName}>Su</div>
            <div className={styles.calDayName}>Mo</div>
            <div className={styles.calDayName}>Tu</div>
            <div className={styles.calDayName}>We</div>
            <div className={styles.calDayName}>Th</div>
            <div className={styles.calDayName}>Fr</div>
            <div className={styles.calDayName}>Sa</div>
            
            {calendarDays.map((day, idx) => (
              <div 
                key={idx} 
                className={`${styles.calDay} ${day === null ? styles.calEmpty : ''} ${selectedDate === day ? styles.calSelected : ''}`}
                onClick={() => day !== null && setSelectedDate(day)}
              >
                {day}
              </div>
            ))}
          </div>

          <p className={styles.timezone}>(GMT+01:00) Edinburgh, London</p>

          <div className={styles.timeSlotsWrapper}>
            <div className={styles.timeColumn}>
              <h4>Morning</h4>
              <button className={`${styles.timeBtn} ${selectedTime === '9:00 AM' ? styles.timeSelected : ''}`} onClick={() => setSelectedTime('9:00 AM')}>9:00 AM</button>
              <button className={`${styles.timeBtn} ${selectedTime === '9:30 AM' ? styles.timeSelected : ''}`} onClick={() => setSelectedTime('9:30 AM')}>9:30 AM</button>
              <button className={`${styles.timeBtn} ${selectedTime === '10:00 AM' ? styles.timeSelected : ''}`} onClick={() => setSelectedTime('10:00 AM')}>10:00 AM</button>
              <button className={`${styles.timeBtn} ${selectedTime === '10:30 AM' ? styles.timeSelected : ''}`} onClick={() => setSelectedTime('10:30 AM')}>10:30 AM</button>
              <button className={`${styles.timeBtn} ${selectedTime === '11:00 AM' ? styles.timeSelected : ''}`} onClick={() => setSelectedTime('11:00 AM')}>11:00 AM</button>
              <button className={`${styles.timeBtn} ${selectedTime === '11:30 AM' ? styles.timeSelected : ''}`} onClick={() => setSelectedTime('11:30 AM')}>11:30 AM</button>
            </div>
            
            <div className={styles.timeColumn}>
              <h4>Afternoon</h4>
              <button className={`${styles.timeBtn} ${selectedTime === '12:00 PM' ? styles.timeSelected : ''}`} onClick={() => setSelectedTime('12:00 PM')}>12:00 PM</button>
              <button className={`${styles.timeBtn} ${selectedTime === '12:30 PM' ? styles.timeSelected : ''}`} onClick={() => setSelectedTime('12:30 PM')}>12:30 PM</button>
              <button className={`${styles.timeBtn} ${selectedTime === '1:00 PM' ? styles.timeSelected : ''}`} onClick={() => setSelectedTime('1:00 PM')}>1:00 PM</button>
              <button className={`${styles.timeBtn} ${selectedTime === '1:30 PM' ? styles.timeSelected : ''}`} onClick={() => setSelectedTime('1:30 PM')}>1:30 PM</button>
              <button className={`${styles.timeBtn} ${selectedTime === '2:00 PM' ? styles.timeSelected : ''}`} onClick={() => setSelectedTime('2:00 PM')}>2:00 PM</button>
              <button className={`${styles.timeBtn} ${selectedTime === '2:30 PM' ? styles.timeSelected : ''}`} onClick={() => setSelectedTime('2:30 PM')}>2:30 PM</button>
              <button className={`${styles.timeBtn} ${selectedTime === '3:00 PM' ? styles.timeSelected : ''}`} onClick={() => setSelectedTime('3:00 PM')}>3:00 PM</button>
              <button className={`${styles.timeBtn} ${selectedTime === '3:30 PM' ? styles.timeSelected : ''}`} onClick={() => setSelectedTime('3:30 PM')}>3:30 PM</button>
              <button className={`${styles.timeBtn} ${selectedTime === '4:00 PM' ? styles.timeSelected : ''}`} onClick={() => setSelectedTime('4:00 PM')}>4:00 PM</button>
              <button className={`${styles.timeBtn} ${selectedTime === '4:30 PM' ? styles.timeSelected : ''}`} onClick={() => setSelectedTime('4:30 PM')}>4:30 PM</button>
              <button className={`${styles.timeBtn} ${selectedTime === '5:00 PM' ? styles.timeSelected : ''}`} onClick={() => setSelectedTime('5:00 PM')}>5:00 PM</button>
              <button className={`${styles.timeBtn} ${selectedTime === '5:30 PM' ? styles.timeSelected : ''}`} onClick={() => setSelectedTime('5:30 PM')}>5:30 PM</button>
            </div>
            
            <div className={styles.timeColumn}>
              <h4>Evening</h4>
              <button className={`${styles.timeBtn} ${selectedTime === '6:00 PM' ? styles.timeSelected : ''}`} onClick={() => setSelectedTime('6:00 PM')}>6:00 PM</button>
            </div>
          </div>

          <div className={styles.finalBookWrapper}>
            <button 
              className={styles.finalBookBtn} 
              disabled={!isReadyToBook}
              onClick={handleFinalBookClick}
            >
              BOOK
            </button>
          </div>
        </div>

        <div className={styles.detailedRight}>
          <h2 className={styles.detailedTitle}>{selectedService.name}</h2>
          <p className={styles.detailedMeta}>
            {selectedDate ? `${selectedDate} June 2026` : 'Select a date'}
            {selectedTime ? `, ${selectedTime}` : ''}
          </p>
          <p className={styles.detailedDuration}>
            {selectedService.duration} | {selectedService.price}
          </p>
          
          <img src={selectedService.image} alt={selectedService.name} className={styles.detailedImage} />
          
          <p className={styles.detailedDesc}>{selectedService.description}</p>
          
          <div className={styles.shareRow}>
            Share: 
            <button aria-label="Share on Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></button>
            <button aria-label="Share on Twitter"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg></button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.catalog}>
      {/* Pricing Notice */}
      <div className={styles.pricingNotice}>
        <p className={styles.vatNotice}>ALL PRICES SHOWN INCLUDE VAT</p>
        <p className={styles.quoteTitle}>OTHER SERVICES (QUOTE REQUIRED)</p>
        <p className={styles.quoteDesc}>
          Paint correction, ceramic coating, PPF, and bodywork repairs require inspection.<br />
          Send photos on WhatsApp for an accurate quote.
        </p>
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappBtn}
        >
          WHATSAPP FOR A QUOTE
        </a>
      </div>

      {/* Main Content Area */}
      {selectedService ? (
        renderDetailedView()
      ) : (
        <div className={styles.appointmentsSection}>
          <h2 className={styles.appointmentsTitle}>ONLINE APPOINTMENTS</h2>

          {/* Category Tabs */}
          <div className={styles.categoryTabs}>
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`${styles.categoryTab} ${activeCategory === cat.id ? styles.activeTab : ''}`}
                onClick={() => handleCategoryChange(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className={styles.servicesGrid}>
            {displayedServices.map((service, index) => (
              <div key={`${service.name}-${index}`} className={styles.serviceCard}>
                <div className={styles.serviceImageWrap}>
                  <img src={service.image} alt={service.name} className={styles.serviceImage} />
                </div>
                <div className={styles.serviceInfo}>
                  <h3 className={styles.serviceName}>{service.name}</h3>
                  <p className={styles.serviceMeta}>
                    {service.duration}  |  <span className={styles.servicePrice}>{service.price}</span>
                  </p>
                  <button
                    className={styles.bookBtn}
                    onClick={() => handleInitialBookClick(service)}
                  >
                    BOOK
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* See All */}
          {!showAll && filteredServices.length > INITIAL_SHOW && (
            <button className={styles.seeAllBtn} onClick={() => setShowAll(true)}>
              + See All
            </button>
          )}
        </div>
      )}
    </div>
  );
}
