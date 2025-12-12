import React, { useEffect, useState } from 'react';

const ScrollBackground: React.FC = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden">
            {/* Base Background Layer - Tech Dark/Light */}
            <div className="absolute inset-0 bg-jawaWhite dark:bg-jawaBlack transition-colors duration-300" />

            {/* Orbs Layer - Digital Agency Palette (Blue, Cyan, Indigo) */}
            <div className="absolute inset-0 opacity-60 dark:opacity-80">

                {/* Orb 1 - Primary Blue - The Core */}
                <div
                    className="absolute w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[100px] dark:bg-blue-600/15 transition-transform duration-100 ease-out will-change-transform"
                    style={{
                        top: '-10%',
                        left: '-10%',
                        transform: `translate3d(0, ${scrollY * 0.2}px, 0)`,
                    }}
                />

                {/* Orb 2 - Cyan/Teal - The Innovation */}
                <div
                    className="absolute w-[500px] h-[500px] rounded-full bg-cyan-400/20 blur-[120px] dark:bg-cyan-500/15 transition-transform duration-100 ease-out will-change-transform"
                    style={{
                        top: '30%',
                        right: '-10%',
                        transform: `translate3d(0, ${scrollY * 0.12}px, 0)`,
                    }}
                />

                {/* Orb 3 - Deep Indigo/Purple - The Depth */}
                <div
                    className="absolute w-[700px] h-[700px] rounded-full bg-indigo-600/20 blur-[130px] dark:bg-indigo-500/15 transition-transform duration-100 ease-out will-change-transform"
                    style={{
                        bottom: '-10%',
                        left: '20%',
                        transform: `translate3d(0, ${-scrollY * 0.15}px, 0)`,
                    }}
                />

                {/* Orb 4 - Accent Blue - Floating */}
                <div
                    className="absolute w-[300px] h-[300px] rounded-full bg-sky-500/15 blur-[80px] dark:bg-sky-600/10 transition-transform duration-100 ease-out will-change-transform"
                    style={{
                        top: '50%',
                        left: '10%',
                        transform: `translate3d(0, ${scrollY * 0.08}px, 0)`,
                    }}
                />
            </div>

            {/* Tech Grid Overlay (Very Subtle) - Optional for extra "Digital" feel */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
            />

            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
        </div>
    );
};

export default ScrollBackground;
