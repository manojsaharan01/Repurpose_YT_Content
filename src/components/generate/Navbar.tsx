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
import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { RxExternalLink } from 'react-icons/rx';

export default async function Navbar() {
  const user = await getUserDetails();

  return (
    <div className='w-full'>
      <div className={cn('max-w-6xl mx-auto flex justify-between items-center p-4 xl:px-0 xl:py-4')}>
        <Logo />

        <div className='hidden md:flex items-center gap-4'>
          <SelectTheme /> {/* Theme selection widget */}
          {user && <NavItems user={user} />}
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
            <SheetContent>
              <Logo />

              {user && (
                <div className='space-y-6 mt-8'>
                  <NavItems user={user} />
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

function NavItems({ user }: { user: User }) {
  return (
    <>
      <Link href='https://apps.builderkit.ai/' target='_blank' className='block w-full'>
        <Button variant='outline' className='gap-3 w-full'>
          Demo Apps
          <RxExternalLink />
        </Button>
      </Link>
      <ModalAccount user={user} />
      <ButtonSignout className='w-full' />
    </>
  );
}
