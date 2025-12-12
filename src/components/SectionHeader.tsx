import React from 'react';

interface SectionHeaderProps {
    number: string;
    title: string;
    backgroundTitle?: string;
    description?: string;
    className?: string;
    align?: 'left' | 'center' | 'right';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    number,
    title,
    backgroundTitle,
    description,
    className = "",
    align = 'left'
}) => {
    // Determine alignment classes
    const alignClasses = {
        left: 'items-start text-left',
        center: 'items-center text-center',
        right: 'items-end text-right',
    };

    return (
        <div className={`relative flex flex-col ${alignClasses[align]} mb-16 md:mb-24 ${className}`}>

            {/* Outline Text Background */}
            <div
                className="absolute -top-6 md:-top-16 opacity-10 pointer-events-none select-none w-full"
                aria-hidden="true"
            >
                <span
                    className="font-display font-bold text-[5rem] md:text-[8rem] lg:text-[10rem] leading-none text-transparent stroke-text"
                >
                    {backgroundTitle || title}
                </span>
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 flex flex-col gap-4">
                <span className="text-primary font-bold text-lg md:text-xl tracking-widest uppercase">
                    {number}
                </span>

                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-jawaBlack dark:text-white leading-tight">
                    {title}
                </h2>

                {description && (
                    <div className={`h-1 w-20 bg-primary mt-4 ${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''
                        }`} />
                )}

                {description && (
                    <p className="mt-4 max-w-lg text-gray-500 dark:text-white/60 text-sm md:text-base leading-relaxed">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default SectionHeader;
