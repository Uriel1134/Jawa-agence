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

            {/* Outline Text Background with Rolling Chain Animation */}
            <div
                className="absolute -top-8 md:-top-20 opacity-80 pointer-events-none select-none w-full overflow-visible z-0"
                aria-hidden="true"
            >
                <svg
                    className="w-full h-[120px] md:h-[200px]"
                    viewBox="0 0 1000 200"
                    preserveAspectRatio={align === 'center' ? "xMidYMid meet" : align === 'right' ? "xMaxYMid meet" : "xMinYMid meet"}
                >
                    <defs>
                        <linearGradient id={`${backgroundTitle || title}-gradient`} x1="0%" y1="0%" x2="200%" y2="0%">
                            {/* Base: Faint Blueish Gray */}
                            <stop offset="0%" stopColor="rgba(200,200,220,0.15)" />

                            {/* Light Beam Start */}
                            <stop offset="40%" stopColor="rgba(200,200,220,0.15)" />

                            {/* The Light: Bright Cyan/Blue */}
                            <stop offset="50%" stopColor="#60a5fa" />

                            {/* Light Beam End */}
                            <stop offset="60%" stopColor="rgba(200,200,220,0.15)" />

                            {/* Base Cont. */}
                            <stop offset="100%" stopColor="rgba(200,200,220,0.15)" />

                            <animate attributeName="x1" from="-100%" to="100%" dur="3s" repeatCount="indefinite" />
                            <animate attributeName="x2" from="100%" to="300%" dur="3s" repeatCount="indefinite" />
                        </linearGradient>
                    </defs>
                    <text
                        x={align === 'center' ? "50%" : align === 'right' ? "100%" : "0"}
                        y="50%"
                        dy=".35em"
                        textAnchor={align === 'center' ? "middle" : align === 'right' ? "end" : "start"}
                        className="font-display font-bold text-[6rem] md:text-[9rem] lg:text-[11rem] uppercase tracking-tighter"
                        fill="none"
                        stroke={`url(#${backgroundTitle || title}-gradient)`}
                        strokeWidth="2"
                    >
                        {backgroundTitle || title}
                    </text>
                </svg>
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
