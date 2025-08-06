import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import NewsSection from '../Components/NewsSection';
import Testimonials from '../Components/Testimonials';
import StatsSection from '../Components/StateSection';
import ScrollingBanner from '../Components/ScrollingBanner';
import SummerInternship from '../Components/SummerInternship';
import AboutSection from '../Components/AboutSection';
import Footer from '../Components/Footer';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    useEffect(() => {
        const hash = window.location.hash;
        if (hash === '#about') {
            const element = document.getElementById('about');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, []);

    return (
        <>
            <Head title="Accueil" />
            <Navbar />
            <Hero />
            <NewsSection />
            <Testimonials />
            <StatsSection />
            <ScrollingBanner />
            <SummerInternship />
            <section id="about">
                <AboutSection />
            </section>
            <Footer />
        </>
    );
}
