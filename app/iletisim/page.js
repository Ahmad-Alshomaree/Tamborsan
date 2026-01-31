'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './iletisim.module.css';

export default function IletisimPage() {
    const [contact, setContact] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    useEffect(() => {
        fetch('/api/iletisim')
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    setContact(data[0]);
                }
            })
            .catch(err => console.error(err));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission (you can connect to your backend here)
        setTimeout(() => {
            setSubmitStatus('success');
            setIsSubmitting(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });

            setTimeout(() => setSubmitStatus(null), 5000);
        }, 1500);
    };

    return (
        <div className={styles.container}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Bizimle İletişime Geçin</h1>
                    <p className={styles.heroSubtitle}>
                        Sorularınız, teklif talepleriniz veya projeleriniz için uzman ekibimizle görüşün.
                        Size en kısa sürede dönüş yapacağız.
                    </p>
                </div>
            </section>

            <div className="container">
                <div className={styles.content}>
                    {/* Contact Form */}
                    <div className={styles.formSection}>
                        <h2 className={styles.sectionTitle}>İletişim Formu</h2>
                        <p className={styles.sectionSubtitle}>
                            Formu doldurarak bize ulaşabilirsiniz
                        </p>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name">Ad Soyad *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Adınız ve soyadınız"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="email">E-posta *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="ornek@email.com"
                                    />
                                </div>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="phone">Telefon</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+90 (5XX) XXX XX XX"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="subject">Konu *</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        placeholder="Mesajınızın konusu"
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="message">Mesajınız *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="6"
                                    placeholder="Mesajınızı buraya yazın..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className={styles.spinner}></span>
                                        Gönderiliyor...
                                    </>
                                ) : (
                                    <>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="22" y1="2" x2="11" y2="13"></line>
                                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                        </svg>
                                        Mesaj Gönder
                                    </>
                                )}
                            </button>

                            {submitStatus === 'success' && (
                                <div className={styles.successMessage}>
                                    ✓ Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className={styles.infoSection}>
                        <h2 className={styles.sectionTitle}>İletişim Bilgileri</h2>
                        <p className={styles.sectionSubtitle}>
                            Doğrudan bize ulaşmak için
                        </p>

                        <div className={styles.contactCards}>
                            <div className={styles.contactCard}>
                                <div className={styles.cardIcon}>
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                </div>
                                <h3>Telefon</h3>
                                <p>{contact?.phone_number || 'Yükleniyor...'}</p>
                                <a href={`tel:+90${contact?.phone_number?.replace(/\D/g, '')}`} className={styles.cardLink}>
                                    Hemen Ara
                                </a>
                            </div>

                            <div className={styles.contactCard}>
                                <div className={styles.cardIcon}>
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                </div>
                                <h3>E-posta</h3>
                                <p>{contact?.email_address || 'Yükleniyor...'}</p>
                                <a href={`mailto:${contact?.email_address}`} className={styles.cardLink}>
                                    E-posta Gönder
                                </a>
                            </div>

                            <div className={styles.contactCard}>
                                <div className={styles.cardIcon}>
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                </div>
                                <h3>Adres</h3>
                                <p>{contact?.location || 'Yükleniyor...'}</p>
                                <a href="https://maps.google.com/?q=1200+Ostim+Industrial+Sites+Sokak+No:84,+06370+Yenimahalle/Ankara" target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
                                    Haritada Gör
                                </a>
                            </div>
                        </div>

                        {/* Map */}
                        <div className={styles.mapSection}>
                            <h3 className={styles.mapTitle}>Konumumuz</h3>
                            <div className={styles.mapContainer}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.0846471819356!2d32.7399191!3d39.9701205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d349c77005bcab%3A0x6fa679a04e4c1cf8!2s1200%20Ostim%20Industrial%20Sites%20Sokak%20No%3A84%2C%2006370%20Yenimahalle%2FAnkara!5e0!3m2!1sen!2str!4v1643000000000"
                                    width="100%"
                                    height="400"
                                    style={{ border: 0, borderRadius: '16px' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>

                        {/* Working Hours */}
                        <div className={styles.hoursCard}>
                            <h3>Çalışma Saatleri</h3>
                            <div className={styles.hoursList}>
                                <div className={styles.hoursItem}>
                                    <span>Pazartesi - Cuma</span>
                                    <span>08:00 - 18:00</span>
                                </div>
                                <div className={styles.hoursItem}>
                                    <span>Cumartesi</span>
                                    <span>09:00 - 14:00</span>
                                </div>
                                <div className={styles.hoursItem}>
                                    <span>Pazar</span>
                                    <span>Kapalı</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
