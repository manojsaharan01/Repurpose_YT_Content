import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { FiArrowUpRight } from 'react-icons/fi';
import { getUserDetails } from '@/utils/supabase/server';

const AccountSettings = async () => {
  const user = await getUserDetails();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='flex items-center relative select-none rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-gray-100 cursor-pointer'>
          <MdOutlineAccountCircle className='h-5 w-5' />
          <p className=' text-sm ml-2'>Account</p>
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px] max-w-[600px] gap-3 '>
        <DialogHeader className='flex flex-row justify-between items-start'>
          <div>
            <DialogTitle className='mb-2'>Account</DialogTitle>
            <DialogDescription className='text-[#475467]'>
              Choose the avatar that best describes your use case
            </DialogDescription>
          </div>
          <DialogClose>
            <div>
              <IoClose className='h-10 w-10 border rounded-full text-gray-500 p-2' />
            </div>
          </DialogClose>
        </DialogHeader>
        <DropdownMenuSeparator />
        {/* todo add credentials */}
        <div className='space-y-5'>
          <div className='space-y-1'>
            <p className='text-[#70747B] font-medium'>Display Name</p>
            <p className='font-semibold'>{user?.identities?.[0]?.identity_data?.full_name}</p>
          </div>
          <div className='space-y-1'>
            <p className='text-[#70747B] font-medium'>Email Address</p>
            <p className='font-semibold'>{user?.email}</p>
          </div>
          <div className='space-y-1'>
            <div className='flex justify-between items-center'>
              <div>
                <p className='text-[#70747B] font-medium'>Current Plan</p>
                <p className='font-semibold'>Free</p>
              </div>
              <Button
                variant='outline'
                className='flex items-center gap-x-2 py-4 bg-[#FFF4F0] hover:bg-[#FFF4F0] text-[#FF4D00] hover:text-[#FF4D00] font-bold border-none'>
                {'Upgrade Plan'}
                <FiArrowUpRight size={22} />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccountSettings;
