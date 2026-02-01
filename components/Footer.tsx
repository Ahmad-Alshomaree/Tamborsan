"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Contact } from '../types';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [contact, setContact] = useState<Contact | null>(null);

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

    return (
        <footer className="relative bg-black text-white overflow-hidden pt-24 pb-12 border-t border-white/5">
            {/* Cinematic Particles & Glow */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />

                {/* Gold Dust */}
                <div className="absolute top-10 right-20 w-1 h-1 bg-primary/40 rounded-full blur-[1px] animate-float" />
                <div className="absolute bottom-40 left-10 w-2 h-2 bg-primary/20 rounded-full blur-[2px] animate-float-delayed" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
                    {/* Brand Section */}
                    <div className="md:col-span-5 space-y-10">
                        <div className="group inline-block">
                            <Image
                                src="/logo-footer.png"
                                alt="Tambursan"
                                width={240}
                                height={90}
                                className="brightness-0 invert filter drop-shadow-[0_0_15px_rgba(198,156,46,0.2)] group-hover:drop-shadow-[0_0_25px_rgba(198,156,46,0.4)] transition-all duration-700"
                            />
                        </div>

                        <p className="text-gray-400 text-lg font-light leading-relaxed max-w-md">
                            Endüstriyel mükemmeliyete giden yolda, <span className="text-white">30 yılı aşkın</span> tecrübe ve hassasiyetle yanınızdayız.
                        </p>

                        <div className="flex gap-6">
                            {[
                                { icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z', link: contact?.facebook_account, label: 'Facebook' },
                                { icon: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z', link: contact?.x_account, label: 'X', isPath: true },
                                { icon: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z', link: contact?.instagram_account, label: 'Instagram', secondPath: 'M17.5 6.5h.01' }
                            ].map((social, idx) => (
                                social.link && (
                                    <Link
                                        key={idx}
                                        href={social.link}
                                        target="_blank"
                                        aria-label={social.label}
                                        className="group relative w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:border-primary/50 transition-all duration-500 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 text-white group-hover:text-black transition-colors duration-500">
                                            {social.isPath ? <path d={social.icon} fill="currentColor" /> : <path d={social.icon} />}
                                            {social.secondPath && <path d={social.secondPath} />}
                                        </svg>
                                    </Link>
                                )
                            ))}
                        </div>
                    </div>

                    {/* Contact Details */}
                    <div className="md:col-span-4 space-y-12">
                        <div className="flex items-center gap-4">
                            <span className="text-primary text-[10px] font-bold tracking-[0.5em] uppercase">Bize Ulaşın</span>
                            <div className="h-[1px] flex-grow bg-white/10" />
                        </div>

                        <div className="space-y-8">
                            {[
                                { icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z', value: contact?.phone_number, label: 'Telefon' },
                                { icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22,6 12,13 2,6', value: contact?.email_address, label: 'E-posta' },
                                { icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10 a3 3 0 1 0 0 -6 a3 3 0 0 0 0 6', value: contact?.location, label: 'Adres' }
                            ].map((item, idx) => (
                                <div key={idx} className="group flex items-start gap-6">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d={item.icon.split(' ')[0]} />
                                            {item.icon.split(' ')[1] && <path d={item.icon.split(' ')[1]} />}
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase mb-1">{item.label}</span>
                                        <span className="text-gray-200 text-sm font-light tracking-wide max-w-[240px]">{item.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Minimal Map Section */}
                    <div className="md:col-span-3 space-y-12">
                        <div className="flex items-center gap-4">
                            <span className="text-primary text-[10px] font-bold tracking-[0.5em] uppercase">Konum</span>
                            <div className="h-[1px] flex-grow bg-white/10" />
                        </div>

                        <div className="relative group grayscale hover:grayscale-0 transition-all duration-1000">
                            <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="relative rounded-2xl overflow-hidden border border-white/10 group-hover:border-primary/30 transition-colors duration-1000">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.0846471819356!2d32.7399191!3d39.9701205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d349c77005bcab%3A0x6fa679a04e4c1cf8!2s1200%20Ostim%20Industrial%20Sites%20Sokak%20No%3A84%2C%2006370%20Yenimahalle%2FAnkara!5e0!3m2!1sen!2str!4v1643000000000"
                                    width="100%"
                                    height="180"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    className="filter contrast-[1.1]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-gray-600 text-[10px] font-bold tracking-[0.4em] uppercase">
                        &copy; {currentYear} Tambursan Industrial. Tüm hakları saklıdır.
                    </p>

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2 group cursor-default">
                            <div className="h-[1px] w-6 bg-primary/40 group-hover:w-12 transition-all duration-700" />
                            <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">Technologic Fabrications</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
