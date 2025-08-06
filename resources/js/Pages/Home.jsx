import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import LatestOffersSection from '../Components/LatestOffersSection';
import Testimonials from '../Components/Testimonials';
import StatsSection from '../Components/StateSection';
import ScrollingBanner from '../Components/ScrollingBanner';
import SummerInternship from '../Components/SummerInternship';
import Footer from '../Components/Footer';
import AboutSection from '../Components/AboutSection';

export default function HomePage() {
  
  const { stats, latestOffers, scrollToAbout } = usePage().props;

  
  const handleApply = (offerId, motivation) => {
    
    console.log('Postuler à l’offre', offerId, 'avec motivation :', motivation);
  };

  
  useEffect(() => {
    if (scrollToAbout) {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        setTimeout(() => {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }
    }
  }, [scrollToAbout]);

  return (
    <>
      <Navbar />
      <Hero />
      <LatestOffersSection offers={latestOffers} onApply={handleApply} />
      <Testimonials />
      <StatsSection stats={stats} />
      <ScrollingBanner />
      <SummerInternship />
      <section id="about">
        <AboutSection />
      </section>
      <Footer />
    </>
  );
}
