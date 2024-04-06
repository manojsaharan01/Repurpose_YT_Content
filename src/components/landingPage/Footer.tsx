import React from 'react';
import { Button } from '../ui/button';
import { CiTwitter } from 'react-icons/ci';
import { FaDribbble, FaInstagram } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';

const footerItems = ['Home', 'Pricing', 'FAQ', 'Changelog', 'License', 'Terms', 'Contact'];

const socialMediaIcons = [
  { icon: <CiTwitter className='h-5 w-5 text-white' />, name: 'Twitter' },
  { icon: <FaInstagram className='h-5 w-5 text-white' />, name: 'Instagram' },
  { icon: <FaDribbble className='h-5 w-5 text-white' />, name: 'Dribbble' },
  { icon: <MdOutlineEmail className='h-5 w-5 text-white' />, name: 'Email' },
];

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
            <Button className='rounded-lg border border-[#51DCA3] green-btn-gradient'>Get Started</Button>
          </div>
          <div className='flex gap-10 justify-center'>
            {socialMediaIcons.map((socialMedia, index) => (
              <div
                key={index}
                className='flex w-12 h-12 justify-center items-center border rounded-full social-background cursor-pointer'>
                {socialMedia.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='border-t border-white/10 space-y-12 py-16'>
        <ul className='flex gap-5 justify-center text-[#A5ABB6]'>
          {footerItems.map((item, index) => (
            <li key={index} className='text-[#A5ABB6] text-base font-normal'>
              {item}
            </li>
          ))}
        </ul>
        <div className='text-[#676D79] font-normal flex justify-center'>
          © 2020 – 2022 GenAI. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
