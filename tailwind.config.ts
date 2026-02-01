import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#C69C2E',
                    light: '#D4A942',
                    dark: '#B38A1F',
                },
                secondary: {
                    DEFAULT: '#1A1A1A',
                    light: '#2A2A2A',
                    dark: '#0A0A0A',
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            keyframes: {
                'reveal-text': {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                'slow-zoom': {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.15)' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0) translateX(0)' },
                    '25%': { transform: 'translateY(-20px) translateX(10px)' },
                    '50%': { transform: 'translateY(-10px) translateX(20px)' },
                    '75%': { transform: 'translateY(-25px) translateX(5px)' },
                },
                'glow-line': {
                    '0%, 100%': { opacity: '0.3', transform: 'scaleX(0.5)' },
                    '50%': { opacity: '1', transform: 'scaleX(1)' },
                },
                'shimmer': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
            },
            animation: {
                'reveal-text': 'reveal-text 1.5s cubic-bezier(0.77, 0, 0.175, 1) forwards',
                'slow-zoom': 'slow-zoom 20s linear infinite alternate',
                'float': 'float 15s ease-in-out infinite',
                'float-delayed': 'float 18s ease-in-out infinite 2s',
                'glow-line': 'glow-line 3s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },
    plugins: [],
};

export default config;
