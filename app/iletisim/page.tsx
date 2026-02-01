'use client';

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Contact, ContactFormData } from '../../types';

type SubmitStatus = 'success' | null;

export default function IletisimPage() {
    const [contact, setContact] = useState<Contact | null>(null);
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);

    useEffect(() => {
        fetch('/api/iletisim')
            .then(res => res.json())
            .then((data: Contact[]) => {
                if (data.length > 0) {
                    setContact(data[0]);
                }
            })
            .catch(err => console.error(err));
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

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
        <div className="min-h-screen bg-white">
            {/* Premium Hero Section */}
            <section className="relative py-24 bg-gradient-to-br from-secondary via-secondary-light to-secondary-dark text-white overflow-hidden">
                {/* Animated Background Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 animate-gradient"></div>

                {/* Floating Geometric Shapes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-10 right-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-float-delayed"></div>
                </div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-down">Bizimle İletişime Geçin</h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto animate-fade-in-down animation-delay-200">
                        Sorularınız, teklif talepleriniz veya projeleriniz için uzman ekibimizle görüşün.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <div className="animate-fade-in-down">
                        <h2 className="text-3xl font-bold text-secondary mb-4 relative inline-block">
                            İletişim Formu
                            <div className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></div>
                        </h2>
                        <p className="text-gray-600 mb-10 mt-4">
                            Formu doldurarak bize ulaşabilirsiniz. Size en kısa sürede dönüş yapacağız.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-8 bg-gray-50 p-10 rounded-3xl border border-gray-100 shadow-xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold text-secondary mb-3 uppercase tracking-wider">Ad Soyad *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Adınız ve soyadınız"
                                        className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 outline-none"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-secondary mb-3 uppercase tracking-wider">E-posta *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="ornek@email.com"
                                        className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-bold text-secondary mb-3 uppercase tracking-wider">Telefon</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+90 (5XX) XXX XX XX"
                                        className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 outline-none"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-bold text-secondary mb-3 uppercase tracking-wider">Konu *</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        placeholder="Mesajınızın konusu"
                                        className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-bold text-secondary mb-3 uppercase tracking-wider">Mesajınız *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    placeholder="Mesajınızı buraya yazın..."
                                    className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 outline-none resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-primary to-primary-light text-white text-lg font-bold rounded-full hover:shadow-[0_20px_40px_rgba(198,156,46,0.3)] hover:scale-105 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Gönderiliyor...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                                            <line x1="22" y1="2" x2="11" y2="13"></line>
                                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                        </svg>
                                        <span>Mesajı Gönder</span>
                                    </>
                                )}
                            </button>

                            {submitStatus === 'success' && (
                                <div className="p-6 bg-green-50 border border-green-200 text-green-700 rounded-2xl animate-fade-in-down flex items-center gap-4">
                                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white flex-shrink-0">✓</div>
                                    <p className="font-semibold">Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.</p>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-12 animate-fade-in-down animation-delay-400">
                        <div>
                            <h2 className="text-3xl font-bold text-secondary mb-10 relative inline-block">
                                İletişim Bilgileri
                                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></div>
                            </h2>

                            <div className="grid grid-cols-1 gap-6">
                                {[
                                    {
                                        title: 'Telefon',
                                        value: contact?.phone_number || 'Yükleniyor...',
                                        link: `tel:+90${contact?.phone_number?.replace(/\D/g, '')}`,
                                        linkText: 'Hemen Ara',
                                        icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    },
                                    {
                                        title: 'E-posta',
                                        value: contact?.email_address || 'Yükleniyor...',
                                        link: `mailto:${contact?.email_address}`,
                                        linkText: 'E-posta Gönder',
                                        icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></>
                                    },
                                    {
                                        title: 'Adres',
                                        value: contact?.location || 'Yükleniyor...',
                                        link: "https://maps.google.com/?q=1200+Ostim+Industrial+Sites+Sokak+No:84,+06370+Yenimahalle/Ankara",
                                        linkText: 'Haritada Gör',
                                        icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></>
                                    }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-50 group">
                                        <div className="flex items-start gap-6">
                                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 text-primary">
                                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                    {item.icon}
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-secondary mb-2 uppercase tracking-wide">{item.title}</h3>
                                                <p className="text-gray-600 mb-4 whitespace-pre-line leading-relaxed">{item.value}</p>
                                                <a href={item.link} className="text-primary font-bold hover:text-primary-dark transition-colors flex items-center gap-2 group/link">
                                                    <span>{item.linkText}</span>
                                                    <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Working Hours */}
                        <div className="bg-secondary text-white rounded-3xl p-10 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/20 transition-all duration-1000"></div>
                            <h3 className="text-2xl font-bold mb-8 relative z-10">Çalışma Saatleri</h3>
                            <div className="space-y-6 relative z-10">
                                {[
                                    { day: 'Pazartesi - Cuma', hours: '08:00 - 18:00' },
                                    { day: 'Cumartesi', hours: '09:00 - 14:00' },
                                    { day: 'Pazar', hours: 'Kapalı', isClosed: true }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center py-4 border-b border-white/10 last:border-0 hover:translate-x-2 transition-transform duration-300">
                                        <span className="font-semibold text-gray-300 tracking-wider uppercase text-sm">{item.day}</span>
                                        <span className={`font-bold tracking-widest ${item.isClosed ? 'text-red-400' : 'text-primary'}`}>{item.hours}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Map */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-secondary relative inline-block">
                                Konumumuz
                                <div className="absolute -bottom-2 left-0 w-10 h-1 bg-primary rounded-full"></div>
                            </h3>
                            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white group relative">
                                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-all duration-700 z-10 pointer-events-none"></div>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.0846471819356!2d32.7399191!3d39.9701205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d349c77005bcab%3A0x6fa679a04e4c1cf8!2s1200%20Ostim%20Industrial%20Sites%20Sokak%20No%3A84%2C%2006370%20Yenimahalle%2FAnkara!5e0!3m2!1sen!2str!4v1643000000000"
                                    width="100%"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="relative z-0"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
