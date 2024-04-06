import { cn } from '@/utils/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { HiBars3 } from 'react-icons/hi2';
import ButtonCta from './landing-page/ButtonCta';

const NavbarRoutes = [
  { label: 'Features', url: '/#features' },
  { label: 'Products', url: '/#products' },
  { label: 'Testimonials', url: '/#testimonials' },
  { label: 'FAQ', url: '/#faq' },
];

export default async function Navbar() {
  return (
    <div className='w-full  text-white'>
      <div className={cn('max-w-6xl mx-auto flex justify-between p-4')}>
        <Link href='/'>
          <div className='flex items-center gap-1'>
            <Image src='/logo.svg' className='size-6 ' width={50} height={50} alt='logo' />
            <p className='text-2xl not-italic font-bold leading-6'>GenAI</p>
          </div>
        </Link>
        <ul className='hidden md:flex items-center gap-6'>
          {NavbarRoutes.map((item, index) => (
            <li key={index} className='text-sm cursor-pointer font-medium leading-6'>
              <Link href={item.url}>{item.label}</Link>
            </li>
          ))}
        </ul>

        <ButtonCta label='Sign Up' className='hidden md:flex' />
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
