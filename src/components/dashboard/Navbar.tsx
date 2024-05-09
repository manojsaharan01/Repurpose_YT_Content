'use client';

import { FaPlus } from 'react-icons/fa';
import React from 'react';
import { SelectTheme } from '../SelectTheme';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  console.log(pathname);

  console.log(pathname);

  return (
    <div className='h-14 flex items-center justify-between mb-3.5'>
      <div className='text-lg font-semibold'>
        {pathname === '/home'
          ? 'Home'
          : pathname === '/history'
            ? 'History'
            : pathname === '/pricing'
              ? 'Pricing'
              : pathname === '/prompt-library'
                ? 'Prompt Library'
                : 'Dashboard'}
      </div>

      <div className='flex items-center gap-5'>
        <SelectTheme />

        <div className='bg-[#FFF4F0] py-2 px-2.5 border border-[#FFE4D8] rounded-lg gap-3 flex items-center'>
          <p className='text-[#FF4D00] font-medium'>Your Credits : 4</p>
          <div className='bg-[#FF4D00] p-1 rounded text-white'>
            <FaPlus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
