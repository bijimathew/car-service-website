"use client";

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import styles from './CartDrawer.module.css';
import Image from 'next/image';

export default function CartDrawer() {
  const { cart, isCartOpen, closeCart, removeFromCart } = useCart();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.numericPrice, 0);
  const vat = subtotal * 0.20;
  const total = subtotal + vat;

  // Formatting helpers
  const formatPrice = (num: number) => num > 0 ? `£${num.toFixed(2)}` : 'Quote Required';
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }); // e.g., 30 Jun
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !email || !phone) {
      alert("Please fill in all required details.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    let message = `*New Booking Request*\n\n*Customer Details:*\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\n\n*Selected Services:*\n`;
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.serviceName}\n   Date: ${formatDate(item.date)} at ${item.time}\n   Price: ${item.priceString}\n`;
    });

    message += `\n*Total Estimate:*\nSubtotal: ${formatPrice(subtotal)}\nVAT (20%): ${formatPrice(vat)}\nTotal: ${formatPrice(total)}\n\nLooking forward to hearing from you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/1234567890?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <div 
        className={`${styles.backdrop} ${isCartOpen ? styles.backdropOpen : ''}`} 
        onClick={closeCart} 
        aria-hidden="true" 
      />
      <div className={`${styles.drawer} ${isCartOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span className={styles.itemCount}>{cart.length}</span>
          </div>
          <button className={styles.closeBtn} onClick={closeCart} aria-label="Close cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className={styles.content}>
          {cart.length === 0 ? (
            <div className={styles.emptyCart}>
              <p>Your cart is empty.</p>
              <button className={styles.bookMoreBtn} onClick={closeCart}>Browse Services</button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className={styles.cartItems}>
                {cart.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.itemImageWrap}>
                      <img src={item.image} alt={item.serviceName} className={styles.itemImage} />
                    </div>
                    <div className={styles.itemDetails}>
                      <h4 className={styles.itemName}>{item.serviceName}</h4>
                      <p className={styles.itemTime}>Lucky</p>
                      <p className={styles.itemTime}>{formatDate(item.date)}, {item.time}</p>
                    </div>
                    <div className={styles.itemPriceAction}>
                      <span className={styles.itemPrice}>{item.priceString}</span>
                      <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className={styles.section}>
                <label className={styles.label}>Have a coupon code?</label>
                <div className={styles.couponGroup}>
                  <input type="text" placeholder="Enter Code" className={styles.input} />
                  <button className={styles.applyBtn}>Apply</button>
                </div>
              </div>

              {/* Totals */}
              <div className={styles.totals}>
                <div className={styles.totalRow}>
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className={styles.totalRow}>
                  <span>VAT (20%)</span>
                  <span>{formatPrice(vat)}</span>
                </div>
                <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className={`${styles.totalRow} ${styles.dueNow}`}>
                  <span>Due now</span>
                  <span>£0.00</span>
                </div>
              </div>

              {/* Details Form */}
              <form onSubmit={handleConfirmBooking} className={styles.detailsForm}>
                <div className={styles.formHeader}>
                  <h3 className={styles.formTitle}>Add your details</h3>
                  <p className={styles.signInText}>Already have an account? <a href="#">Sign in</a></p>
                </div>
                
                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>First Name *</label>
                    <input type="text" required value={firstName} onChange={e => setFirstName(e.target.value)} className={styles.input} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Last Name *</label>
                    <input type="text" required value={lastName} onChange={e => setLastName(e.target.value)} className={styles.input} />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Email *</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className={styles.input} />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Phone Number *</label>
                  <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} className={styles.input} />
                </div>

                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" />
                    <span>Store my information for faster checkout in the future.</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" />
                    <span>Send me occasional marketing emails.</span>
                  </label>
                </div>

                <button type="submit" className={styles.confirmBtn}>Confirm Booking</button>
                <button type="button" className={styles.bookMoreBtn} onClick={closeCart}>Book More Services</button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
