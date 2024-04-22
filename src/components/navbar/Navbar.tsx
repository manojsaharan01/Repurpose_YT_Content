// This component serves as the navigation bar for the application, which appears across various pages.
// It dynamically adjusts to display different links based on the user's authentication status and screen size.
// The component uses both responsive and conditional rendering techniques for optimization across devices.

import { cn } from '@/utils/utils';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { HiBars3 } from 'react-icons/hi2';
import { getUserDetails } from '@/utils/supabase/server';
import ButtonCta from '../landing-page/ButtonCta';
import ButtonSignout from './ButtonSignout';
import Logo from '../Logo';

const NavbarRoutes = [
  { label: 'Features', url: '/#features' },
  { label: 'Products', url: '/#products' },
  { label: 'Testimonials', url: '/#testimonials' },
  { label: 'FAQ', url: '/#faq' },
];

export default async function Navbar() {
  // Fetch user information to determine authentication state.
  const user = await getUserDetails();

  return (
    <div className='w-full  text-white bg-[#031614]'>
      <div className={cn('max-w-6xl mx-auto flex justify-between items-center p-4')}>
        <Logo />

        <ul className='hidden md:flex items-center gap-6'>
          {NavbarRoutes.map((item, index) => (
            <li key={index} className='text-sm cursor-pointer font-medium leading-6'>
              <Link href={item.url}>{item.label}</Link>
            </li>
          ))}
        </ul>

        {user ? <ButtonSignout /> : <ButtonCta label='Sign In' />}

        <Sheet>
          <SheetTrigger className='block md:hidden'>
            <HiBars3 />
          </SheetTrigger>
          <SheetContent className=''>
            <div className='space-y-6'>
              <ul className='gap-6'>
                {NavbarRoutes.map((item, index) => (
                  <li key={index} className='text-sm cursor-pointer font-medium leading-6 py-2'>
                    <Link href={item.url}>{item.label}</Link>
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
}
