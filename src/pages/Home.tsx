import React, { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import MarketingSummary from '../components/home/MarketingSummary';
import MissionSection from '../components/home/MissionSection';
import ServicesSection from '../components/home/ServicesSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import PricingSection from '../components/home/PricingSection';
import NewsSection from '../components/home/NewsSection';
import ContactSection from '../components/home/ContactSection';

const Home: React.FC = () => {
    useEffect(() => {
        // Smooth scroll for anchor links
        const hash = window.location.hash;
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, []);

    return (
        <div className="home-page">
            <HeroSection />
            <MarketingSummary />
            <MissionSection />
            <ServicesSection />
            <WhyChooseUs />
            <PricingSection />
            <NewsSection />
            <ContactSection />
        </div>
    );
};

export default Home;
