"use client";

import { useState } from 'react';
import styles from './BookingForm.module.css';

const servicesList = [
  { id: 'ceramic', name: 'Ceramic Coating' },
  { id: 'paint', name: 'Paint Correction' },
  { id: 'bodywork', name: 'Bodywork & Resprays' },
  { id: 'wheel', name: 'Wheel Colour Change' },
  { id: 'tints', name: 'Tints' },
  { id: 'mot', name: 'MOT' },
  { id: 'mechanic', name: 'Mechanic' },
  { id: 'tyres', name: 'Tyres' }
];

export default function BookingForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isCustomSelected, setIsCustomSelected] = useState(false);
  const [customServiceText, setCustomServiceText] = useState("");

  const toggleService = (serviceName: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceName) 
        ? prev.filter(s => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const handleQuoteClick = () => {
    if (selectedServices.length === 0 && (!isCustomSelected || customServiceText.trim() === "")) {
      alert("Please select at least one service or describe what you need.");
      return;
    }

    let messageServices = [...selectedServices];
    if (isCustomSelected && customServiceText.trim() !== "") {
      messageServices.push(`Other: ${customServiceText.trim()}`);
    }

    const message = `Hi slough Autos, I would like to get a quote for the following services:\n\n${messageServices.map(s => `- ${s}`).join('\n')}`;
    const encodedMessage = encodeURIComponent(message);
    
    // Placeholder number - user will update this later
    const whatsappNumber = "1234567890"; 
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={`glass-panel ${styles.bookingContainer}`} id="booking">
      <h2 className={styles.title}>Book a Service</h2>
      <p className={styles.subtitle}>Select the services you need and get a direct quote via WhatsApp.</p>
      
      <div className={styles.servicesGrid}>
        {servicesList.map(service => (
          <div 
            key={service.id}
            className={`${styles.serviceCard} ${selectedServices.includes(service.name) ? styles.selected : ''}`}
            onClick={() => toggleService(service.name)}
          >
            <div className={styles.checkbox}>
              {selectedServices.includes(service.name) && <span className={styles.checkIcon}>✓</span>}
            </div>
            <span>{service.name}</span>
          </div>
        ))}
        
        {/* Custom Service Option */}
        <div 
          className={`${styles.serviceCard} ${styles.customCard} ${isCustomSelected ? styles.selected : ''}`}
        >
          <div 
            className={styles.customCardHeader}
            onClick={() => setIsCustomSelected(!isCustomSelected)}
          >
            <div className={styles.checkbox}>
              {isCustomSelected && <span className={styles.checkIcon}>✓</span>}
            </div>
            <div className={styles.customLabel}>
              <span>Other</span>
              <span className={styles.specifyText}>(Please Specify)</span>
            </div>
          </div>
          
          {isCustomSelected && (
            <input 
              type="text" 
              className={styles.customInput}
              placeholder="E.g., Interior Deep Clean"
              value={customServiceText}
              onChange={(e) => setCustomServiceText(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      </div>

      <button 
        className={`btn-primary ${styles.quoteBtn}`} 
        onClick={handleQuoteClick}
      >
        GET A QUOTE
      </button>
    </div>
  );
}
