import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import WorkSection from '@/components/WorkSection';
import AboutSection from '@/components/AboutSection';
import ProcessSection from '@/components/ProcessSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

import AmbientGlow from '@/components/AmbientGlow';

export default function Home() {
  return (
    <main>
      <AmbientGlow />
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <WorkSection />
      <AboutSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
