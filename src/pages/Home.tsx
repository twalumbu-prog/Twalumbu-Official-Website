import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/common/SEO';
import HeroSection from '../components/home/HeroSection';
import MarketingSummary from '../components/home/MarketingSummary';
import MissionSection from '../components/home/MissionSection';
import ServicesSection from '../components/home/ServicesSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import PricingSection from '../components/home/PricingSection';
import NewsSection from '../components/home/NewsSection';
import ContactSection from '../components/home/ContactSection';

const Home: React.FC = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [hash]);

    return (
        <div className="home-page">
            <SEO
                title="Home"
                description="Welcome to Twalumbu Education Centre. We provide excellence in early childhood, primary, and secondary education in Chongwe, Zambia. Join us for a holistic learning experience."
                keywords="Twalumbu, Education, Chongwe, Zambia, School, Best School, Primary School, Early Childhood"
            />
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
