import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import SidebarItems from './SidebarItems';
import { LuArrowUpRight } from 'react-icons/lu';
import UserButton from './UserButton';

const Sidebar = () => {
  return (
    <div className='h-full border border-[#F2F2F2] dark:border-[#272626] m-2 rounded-xl p-3 flex flex-col justify-between'>
      <div>
        <div className='mb-6'>
          <Logo />
        </div>
        <Button className='w-full mb-3' variant="blue">
          <FaPlus className='mr-2' /> New Content
        </Button>
        <SidebarItems />
      </div>
      <div className='space-y-3'>
        <div className='border border-[#FFDDCB] bg-[#FFEFE8] py-3 px-4 rounded-lg space-y-3'>
          <div className='flex justify-between items-center text-[#FF4D00]'>
            <p className='font-semibold'>Upgrade plan</p>
            <LuArrowUpRight className='size-5' />
          </div>
          <div className='text-[#3E3E3E]'>
            <p>Upgrade to experience the pro benefits.</p>
          </div>
        </div>

        <UserButton />
      </div>
    </div>
  );
};

export default Sidebar;
