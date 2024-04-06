import { cn } from '@/utils/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { HiBars3 } from 'react-icons/hi2';

const NavbarRoutes = ['Features', 'Products', 'Testimonials', 'FAQ'];

const Navbar2 = () => {
  return (
    <div className='w-full  text-white'>
      <div className={cn('max-w-6xl mx-auto flex justify-between p-4')}>
        <Link href='/'>
          <div className='flex items-center gap-1'>
            <Image src='/logo.svg' className='h-6 w-6 ' width={50} height={50} alt='logo' />
            <p className='text-2xl not-italic font-bold leading-6'>GenAI</p>
          </div>
        </Link>
        <ul className='hidden md:flex items-center gap-6'>
          {NavbarRoutes.map((item, index) => (
            <li key={index} className='text-sm cursor-pointer font-medium leading-6'>
              {item}
            </li>
          ))}
        </ul>

        <Button className='rounded-lg hidden md:flex border border-[#51DCA3] green-btn-gradient'>
          Sign Up
        </Button>
        <Sheet>
          <SheetTrigger className='block md:hidden'>
            <HiBars3 />
          </SheetTrigger>
          <SheetContent className=''>
            <div className='space-y-6'>
              <ul className='gap-6'>
                {NavbarRoutes.map((item, index) => (
                  <li key={index} className='text-sm cursor-pointer font-medium leading-6 py-2'>
                    {item}
                  </li>
                ))}
              </ul>
              <Button className='rounded-lg w-full flex border border-[#51DCA3] green-btn-gradient'>
                Sign Up
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar2;
