import React from 'react';
import { Button } from '../ui/button';
import { CiTwitter } from 'react-icons/ci';
import { FaDribbble, FaInstagram } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';

const Footer = () => {
  return (
    <div className='space-y-[154px]'>
      <div className=''>
        <div className='space-y-10 max-w-[676px] mx-auto'>
          <h1 className='text-[#ABABB0] text-[56px] text-center font-medium'>Unleash the power of AI</h1>
          <p className='text-[#ABABB0] text-[22px] font-normal leading-[34.54px] tracking-[0.2px] text-center'>
            Feel free to customize your reports. Utilize our super-table instead of exporting and importing
            data
          </p>
          <div className='mt-8 flex justify-center'>
            <Button className=''>Get Started</Button>
          </div>
          <div className='flex gap-10 justify-center'>
            <div className='flex w-12 h-12 justify-center items-center border rounded-full  social-background'>
              <CiTwitter className='h-5 w-5 text-white' />
            </div>
            <div className='flex w-12 h-12 justify-center items-center border rounded-full  social-background'>
              <FaInstagram className='h-5 w-5 text-white' />
            </div>
            <div className='flex w-12 h-12 justify-center items-center border rounded-full  social-background'>
              <FaDribbble className='h-5 w-5 text-white' />
            </div>
            <div className='flex w-12 h-12 justify-center items-center border rounded-full  social-background'>
              <MdOutlineEmail className='h-5 w-5 text-white' />
            </div>
          </div>
        </div>
      </div>
      <div className='border-t border-white/10 space-y-12 py-16'>
        <ul className='flex gap-5 justify-center text-[#A5ABB6]'>
          <li>Home</li>
          <li>Pricing</li>
          <li>FAQ</li>
          <li>Changlog</li>
          <li>Licence</li>
          <li>Terms</li>
          <li>Contact</li>
        </ul>
        <div className='text-[#676D79] font-normal flex justify-center'>
          © 2020 – 2022 GenAI. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
