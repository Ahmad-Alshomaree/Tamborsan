'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Feature {
    icon: string;
    title: string;
    description: string;
}

interface Stat {
    value: string;
    label: string;
}

export default function Welcome() {
    const [currentImage, setCurrentImage] = useState<number>(0);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const heroImages: string[] = [
        encodeURI('/Galary/Hero section/Adsız tasarım (7).jpg'),
        encodeURI('/Galary/Hero section/kaucuk-kaplama-tahrik-tamburu-327_03_2018_10_02_03.jpg'),
        encodeURI('/Galary/Hero section/orta-1.png'),
        encodeURI('/Galary/Hero section/TAM KARŞI 6,7,8.jpg'),
        encodeURI('/Galary/Hero section/tambur-kaplama-2.jpg')
    ];

    useEffect(() => {
        setIsLoaded(true);
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [heroImages.length]);

    const features: Feature[] = [
        {
            icon: '⚙️',
            title: 'Yüksek Kalite',
            description: 'Endüstri standardında üretim ve kaplama hizmetleri'
        },
        {
            icon: '🚀',
            title: 'Hızlı Teslimat',
            description: 'Zamanında ve güvenilir teslimat garantisi'
        },
        {
            icon: '🛡️',
            title: 'Uzman Ekip',
            description: 'Deneyimli mühendislik ve teknik destek'
        },
        {
            icon: '💎',
            title: 'Özel Çözümler',
            description: 'İhtiyaçlarınıza özel tasarım ve üretim'
        }
    ];

    const stats: Stat[] = [
        { value: '25+', label: 'Yıllık Deneyim' },
        { value: '500+', label: 'Mutlu Müşteri' },
        { value: '1000+', label: 'Tamamlanan Proje' }
    ];

    return (
        <div className="relative h-screen overflow-hidden bg-black">
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-10" />
                <div className="absolute inset-0 bg-secondary/20 z-10 mix-blend-overlay" />

                {/* Background Images with Slow Motion Crossfade */}
                {heroImages.map((image, index) => (
                    <div
                        key={index}
                        className={`
                            absolute inset-0 bg-cover bg-center transition-opacity duration-[3000ms] ease-in-out scale-110 animate-slow-zoom
                            ${index === currentImage ? 'opacity-50' : 'opacity-0'}
                        `}
                        style={{
                            backgroundImage: `url(${image})`
                        }}
                    />
                ))}

                {/* Subtle Gold Dust Particles */}
                <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary/40 rounded-full blur-[2px] animate-float" />
                    <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-primary/20 rounded-full blur-[3px] animate-float-delayed" />
                    <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-primary/30 rounded-full blur-[2px] animate-float" style={{ animationDelay: '3s' }} />
                </div>
            </div>

            {/* Cinematic Content Container */}
            <div className={`
                relative z-30 h-screen flex flex-col items-center justify-center px-6 py-6
                transition-all duration-2000 ease-out
                ${isLoaded ? 'opacity-100' : 'opacity-0'}
            `}>
                <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Brand Identity Branding */}
                    <div className="flex-1 flex flex-col items-center lg:items-start animate-fade-in-left">
                        <div className="mb-8 transform transition-all duration-1000 scale-90 hover:scale-100">
                            <div className="relative inline-block group">
                                <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-700" />
                                <img
                                    src="/logo.png"
                                    alt="Tambursan Logo"
                                    className="relative h-40 md:h-64 w-auto brightness-0 invert filter drop-shadow-[0_0_50px_rgba(198,156,46,0.3)]"
                                />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-thin tracking-[0.2em] text-white uppercase animate-reveal-text">
                            Tambursan
                        </h1>
                        <div className="h-0.5 w-48 bg-gradient-to-r from-transparent via-primary to-transparent mt-4 animate-glow-line" />
                    </div>

                    {/* Mission and CTA */}
                    <div className="flex-1 text-center lg:text-right flex flex-col items-center lg:items-end gap-10 animate-fade-in-right">
                        <p className="text-lg md:text-2xl text-gray-300 font-light tracking-widest leading-relaxed max-w-xl">
                            Endüstriyel Mükemmellik. <span className="text-primary font-medium italic">Geleceği Şekillendiren</span> Tambur ve Kaplama Çözümleri.
                        </p>

                        <div className="animate-fade-in-up animation-delay-1000">
                            <Link
                                href="/home"
                                className="group relative flex items-center justify-center px-16 py-5 bg-transparent border border-white/20 text-white text-base font-light tracking-[0.4em] uppercase transition-all duration-700 hover:border-primary overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                                    Keşfetmeye Başla
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Minimalist Bottom Stats Bar */}
                <div className="absolute bottom-8 left-0 right-0 px-6 hidden md:block">
                    <div className="max-w-7xl mx-auto flex items-center justify-center gap-24 animate-fade-in-up animation-delay-700">
                        {stats.map((stat, index) => (
                            <div key={index} className="flex items-center gap-6 opacity-50 hover:opacity-100 transition-opacity duration-500">
                                <span className="text-2xl font-light text-primary">{stat.value}</span>
                                <span className="text-[9px] text-gray-400 font-bold tracking-[0.3em] uppercase">{stat.label}</span>
                                {index < stats.length - 1 && <div className="w-[1px] h-4 bg-white/10" />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Gradient for Smooth Transition */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </div>
    );
}
