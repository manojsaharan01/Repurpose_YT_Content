import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import SidebarItems from './SidebarItems';
import { LuArrowUpRight } from 'react-icons/lu';
import UserButton from './UserButton';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className='h-full border border-[#F2F2F2] dark:border-[#272626] rounded-xl p-2.5 flex flex-col justify-between'>
      <div>
        <div className='mb-6'>
          <Logo />
        </div>

        <Link href='/home'>
          <Button size='lg' className='w-full mb-3'>
            <FaPlus className='mr-2' /> New Chat
          </Button>
        </Link>

        <SidebarItems />
      </div>

      <div className='space-y-3'>
        <Link href='/pricing'>
          <div className='border border-[#FFDDCB] bg-[#FFEFE8] dark:bg-orange-200/10 dark:border-orange-500 py-3 px-4 rounded-lg space-y-3'>
            <div className='flex justify-between items-center text-orange'>
              <p className='font-semibold'>Upgrade plan</p>
              <LuArrowUpRight className='size-5' />
            </div>
            <div className='text-grey dark:text-white'>
              <p>Upgrade to experience the pro benefits.</p>
            </div>
          </div>
        </Link>

        <UserButton />
      </div>
    </div>
  );
};

export default Sidebar;
