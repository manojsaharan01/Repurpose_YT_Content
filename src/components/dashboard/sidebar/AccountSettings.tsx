import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import React, { useEffect, useState } from 'react';
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
import Link from 'next/link';
import { supabaseBrowserClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

const AccountSettings = () => {
  const supabase = supabaseBrowserClient();

  const [user, setUser] = useState(User);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUserDetails();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer'>
          <div className='flex items-center text-grey dark:text-white'>
            <MdOutlineAccountCircle className='size-5' />
            <p className='text-sm ml-2'>Account</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px] max-w-[600px] gap-3 '>
        <DialogHeader className='flex flex-row justify-between items-start'>
          <div>
            <DialogTitle className='mb-2 text-grey dark:text-white'>Account</DialogTitle>
            <DialogDescription
              className='text-light-grey dark:text-white/90
            '>
              Choose the avatar that best describes your use case
            </DialogDescription>
          </div>
          <DialogClose>
            <div>
              <IoClose className='size-10 border rounded-full text-grey dark:text-white p-2' />
            </div>
          </DialogClose>
        </DialogHeader>
        <DropdownMenuSeparator />
        {/* todo add credentials */}
        <div className='space-y-5'>
          <div className='space-y-1'>
            <p className='font-medium text-title'>Display Name</p>
            <p className='font-semibold text-grey dark:text-white'>{user?.user_metadata.full_name}</p>
          </div>
          <div className='space-y-1'>
            <p className='font-medium text-title'>Email Address</p>
            <p className='font-semibold text-grey dark:text-white'>{user?.email}</p>
          </div>
          <div className='space-y-1'>
            <div className='flex justify-between items-center'>
              <div>
                <p className='font-medium text-title'>Current Plan</p>
                <p className='font-semibold text-grey dark:text-white'>Free</p>
              </div>
              <Link href='/pricing'>
                <Button
                  variant='outline'
                  className='flex items-center gap-x-2 py-4 bg-[#FFF4F0] hover:bg-[#FFF4F0] text-orange hover:text-orange font-bold border-none'>
                  {'Upgrade Plan'}
                  <FiArrowUpRight size={22} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccountSettings;
