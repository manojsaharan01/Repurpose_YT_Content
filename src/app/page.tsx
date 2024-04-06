import Features from '@/components/landing-page/Features';
import FeaturedOn from '@/components/landing-page/FeaturedOn';
import Footer from '@/components/landing-page/Footer';
import FAQs from '@/components/landing-page/FAQs';
import Hero from '@/components/landing-page/Hero';
import Pricing from '@/components/landing-page/Pricing';
import WorkFlow from '@/components/landing-page/WorkFlow';

export default async function Home() {
  return (
    <div className='space-y-[200px]'>
      <Hero />
      <FeaturedOn />
      <Features />
      <WorkFlow />
      <Pricing />
      <FAQs />
      <Footer />
    </div>
  );
}
