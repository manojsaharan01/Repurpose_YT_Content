import Features from '@/components/landingPage/Features';
import Footer from '@/components/landingPage/Footer';
import FrequentlyAskedQuestions from '@/components/landingPage/FrequentlyAskedQuestions';
import Hero from '@/components/landingPage/Hero';
import Pricing from '@/components/landingPage/Pricing';
import WorkFlow from '@/components/landingPage/WorkFlow';

export default async function Home() {
  return (
    <div className='space-y-[200px]'>
      <Hero />
      {/* <Features /> */}
      <WorkFlow />
      <Pricing />
      <FrequentlyAskedQuestions />
      <Footer />
    </div>
  );
}
