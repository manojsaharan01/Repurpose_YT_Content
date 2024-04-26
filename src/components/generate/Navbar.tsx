// Navbar component used in the generate page for navigation and theme selection
// It dynamically adjusts based on user authentication state

import { cn } from '@/utils/utils';
import { getUserDetails } from '@/utils/supabase/server';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { HiBars3 } from 'react-icons/hi2';
import { SelectTheme } from '../SelectTheme';
import ButtonSignout from './ButtonSignout';
import ModalAccount from '../ModalAccount';
import Logo from '../Logo';
import { Button } from '../ui/button';
import { IoMdArrowBack } from 'react-icons/io';
import Link from 'next/link';

export default async function Navbar() {
  const user = await getUserDetails();

  return (
    <div className='w-full'>
      <div className={cn('max-w-6xl mx-auto flex justify-between items-center p-4 xl:px-0 xl:py-4')}>
        <Logo />

        <div className='hidden md:flex items-center gap-4'>
          <SelectTheme /> {/* Theme selection widget */}
          {user && (
            <>
              <ModalAccount user={user} /> {/* Modal for account management */}
              <Link href='https://apps.builderkit.ai/' target='_blank'>
                <Button variant='outline' className='gap-3'>
                  <IoMdArrowBack className='h-5 w-5' />
                  Back to Tools
                </Button>
              </Link>
              <ButtonSignout /> {/* Button to handle user sign-out */}
            </>
          )}
        </div>

        {/* Hamburger menu for mobile view only */}
        <div className='flex md:hidden items-center gap-2'>
          <div className='block md:hidden'>
            <SelectTheme />
          </div>
          <Sheet>
            <SheetTrigger className='block md:hidden'>
              <HiBars3 />
            </SheetTrigger>
            <SheetContent className=''>
              <Logo />

              {user && (
                <div className='space-y-6'>
                  <ModalAccount user={user} className='font-medium' />
                  <Link href='https://apps.builderkit.ai/' target='_blank'>
                    <Button variant='outline' className='gap-3'>
                      <IoMdArrowBack className='h-5 w-5' />
                      Back to Tools
                    </Button>
                  </Link>
                  <ButtonSignout className='w-full' />
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
