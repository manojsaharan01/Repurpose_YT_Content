import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Button } from '../ui/button';
import Image from 'next/image';
import dashboard from '../../assets/images/dashboard.png';
import FlickIcon from '@/assets/icons/FlickIcon';

const Hero = () => {
  return (
    <section className='space-y-[72px]'>
      <div className='flex flex-col justify-center '>
        <div className='space-y-[18px] max-w-2xl mx-auto'>
          <div className='px-4 py-[6px] gap-2 bg-[#006C40]/30 rounded-full w-[15.3rem] mx-auto'>
            <div className='text-[#18EDA7] text-[14px] font-semibold flex items-center gap-2'>
              Unlock Your Creative Spark! <FaArrowRight className='h-3 w-3' />
            </div>
          </div>
          <div className='text-center text-[64px] font-bold leading-[4rem] -tracking-[1.28px] bg-gradient-to-b from-white via-white to-[rgba(255, 255, 255, 0.70)] bg-clip-text text-transparent relative'>
            <div className='absolute left-10'>
              <FlickIcon />
            </div>
            <span className='bg-clip-text text-transparent'>Generate AI Apps with ease</span>
          </div>
          <div className='max-w-96 mx-auto text-center font-inter text-base font-medium leading-[28.8px] tracking-tighter text-gray-400'>
            Unleash Your Creative Potential by Turning What You Consume into Engaging Content Ideas
          </div>
        </div>
        <div className='mt-8 mx-auto'>
          <Button className='rounded-lg border border-[#51DCA3] green-btn-gradient'>Get Started</Button>
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <Image src={dashboard} width={1000} height={1000} alt='hero' />
      </div>
    </section>
  );
};

export default Hero;
