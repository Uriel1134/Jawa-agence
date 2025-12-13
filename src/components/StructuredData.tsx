import React from 'react';
import { Helmet } from 'react-helmet';

interface StructuredDataProps {
    type?: 'organization' | 'website' | 'faq' | 'service' | 'article';
    data?: any;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type = 'organization', data }) => {
    // Organization Schema (Default)
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "JAWA Agency",
        "alternateName": "JAWA Agence",
        "url": "https://www.jawa-agence.me",
        "logo": "https://www.jawa-agence.me/logo.png",
        "description": "Agence digitale innovante au Bénin spécialisée en développement web, applications mobiles, UI/UX design, branding et maintenance informatique.",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Cotonou",
            "addressCountry": "BJ"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "6.3702928",
            "longitude": "2.3508946"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "contact@jawa-agence.me",
            "availableLanguage": ["French", "English"]
        },
        "sameAs": [
            "https://www.linkedin.com/company/jawa-agency",
            "https://www.instagram.com/jawa.agency",
            "https://www.behance.net/jawa-agency"
        ]
    };

    // LocalBusiness Schema
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "JAWA Agency",
        "image": "https://www.jawa-agence.me/logo.png",
        "url": "https://www.jawa-agence.me",
        "telephone": "+229-XX-XX-XX-XX",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Cotonou",
            "addressLocality": "Cotonou",
            "addressCountry": "BJ"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "6.3702928",
            "longitude": "2.3508946"
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "09:00",
            "closes": "18:30"
        }
    };

    // WebSite Schema with SearchAction
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "JAWA Agency",
        "url": "https://www.jawa-agence.me",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.jawa-agence.me/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    };

    // Select schema based on type
    let schema;
    switch (type) {
        case 'website':
            schema = [organizationSchema, localBusinessSchema, websiteSchema];
            break;
        case 'faq':
            schema = data && Array.isArray(data) ? {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": data.map((faq: any) => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.answer
                    }
                }))
            } : null;
            break;
        case 'service':
            schema = data ? {
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": data.title,
                "provider": {
                    "@type": "Organization",
                    "name": "JAWA Agency"
                },
                "description": data.description,
                "areaServed": {
                    "@type": "Country",
                    "name": "Benin"
                }
            } : null;
            break;
        case 'article':
            schema = data ? {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": data.title,
                "description": data.description,
                "image": data.image,
                "author": {
                    "@type": "Organization",
                    "name": "JAWA Agency"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "JAWA Agency",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://www.jawa-agence.me/logo.png"
                    }
                },
                "datePublished": data.datePublished || new Date().toISOString(),
                "dateModified": data.dateModified || new Date().toISOString()
            } : null;
            break;
        default:
            schema = [organizationSchema, localBusinessSchema];
    }

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
};

export default StructuredData;
