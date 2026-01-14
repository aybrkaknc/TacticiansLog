import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LandingPage = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full flex flex-col items-center justify-center relative z-10"
        >
            {/* Main Glass Panel */}
            <div className="relative p-12 md:p-16 rounded-3xl bg-black/40 backdrop-blur-lg border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.6)] flex flex-col items-center text-center max-w-4xl mx-auto overflow-hidden">

                {/* Cinematic Borders */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent"></div>
                <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-gold/20 to-transparent"></div>
                <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-gold/20 to-transparent"></div>

                {/* Animated Background Glow */}
                <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay animate-pulse-slow pointer-events-none"></div>

                {/* Logo with Float Animation */}
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative mb-10"
                >
                    <div className="absolute inset-0 bg-gold/20 blur-[60px] rounded-full transform scale-75"></div>
                    <img
                        src="assets/pngkey.com-fire-emblem-logo-png-1740104 (3).png"
                        alt="Fire Emblem Awakening"
                        className="w-[400px] md:w-[500px] relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                    />
                </motion.div>

                {/* Typography */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-cinzel font-black text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5C3] via-[#D4AF37] to-[#8B7355] drop-shadow-sm mb-6 tracking-wide">
                        {t('landing.title')}
                    </h1>

                    <div className="flex items-center justify-center gap-4 text-gray-400 font-cinzel text-sm md:text-lg tracking-[0.3em] uppercase opacity-80">
                        <span className="w-8 h-[1px] bg-gold/50"></span>
                        <span>{t('landing.tagline')}</span>
                        <span className="w-8 h-[1px] bg-gold/50"></span>
                    </div>
                </motion.div>

                {/* Decorative Shine Overlay */}
                <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] animate-shine pointer-events-none"></div>
            </div>

            {/* Bottom Credit */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 text-gray-600 font-cinzel text-xs tracking-widest opacity-50"
            >
                {t('landing.archives')}
            </motion.p>
        </motion.div>
    );
};

export default LandingPage;
