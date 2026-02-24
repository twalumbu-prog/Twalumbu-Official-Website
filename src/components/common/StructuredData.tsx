import React from 'react';
import { Helmet } from 'react-helmet-async';

const StructuredData: React.FC = () => {
    const websiteData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Twalumbu Education Centre",
        "url": "https://www.twalumbueducentre.com"
    };

    const schoolData = {
        "@context": "https://schema.org",
        "@type": "School",
        "name": "Twalumbu Education Centre",
        "url": "https://www.twalumbueducentre.com",
        "logo": "https://www.twalumbueducentre.com/logo.png",
        "description": "Nurturing excellence, character, and innovation in every learner. The best school in Chongwe, Zambia.",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Chongwe",
            "addressCountry": "ZM"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-15.3283",
            "longitude": "28.6792"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+260 977 123 456",
            "contactType": "admissions",
            "email": "info@twalumbu.edu.zm"
        },
        "sameAs": [
            "https://www.facebook.com/TwalumbuEducationCentre",
            "https://www.instagram.com/twalumbu_education"
        ]
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(websiteData)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(schoolData)}
            </script>
        </Helmet>
    );
};

export default StructuredData;
