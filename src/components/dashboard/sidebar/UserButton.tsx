import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { IoIosHelpCircleOutline } from 'react-icons/io';
import { FiLogOut } from 'react-icons/fi';
import AccountSettings from './AccountSettings';
import { getUserDetails } from '@/utils/supabase/server';
import { AiFillDollarCircle } from 'react-icons/ai';
import Link from 'next/link';

const UserButton = async () => {
  const user = await getUserDetails();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='bg-[#F9F9F9] dark:bg-[#5a5959]/10 rounded-lg px-1.5 py-2.5 flex items-center gap-2 overflow-hidden cursor-pointer'>
          <Image
            src={user?.user_metadata?.avatar_url ?? '/avatar.png'}
            className='size-5 rounded-full'
            width={20}
            height={20}
            alt='avatar'
          />
          <p className='font-semibold'>{user?.identities?.[0]?.identity_data?.full_name}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='rounded-lg w-60 mb-2'>
        <DropdownMenuItem className='flex items-start gap-3 overflow-hidden'>
          <Image
            src={user?.user_metadata?.avatar_url ?? '/avatar.png'}
            className='size-10 rounded-full'
            width={20}
            height={20}
            alt='avatar'
          />
          <div>
            <p className='font-semibold'>{user?.identities?.[0]?.identity_data?.full_name}</p>
            <p>{user?.email}</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <AccountSettings />
        <DropdownMenuSeparator />

        <DropdownMenuItem className='cursor-pointer'>
          <IoIosHelpCircleOutline className='size-5 mr-2' />
          Support
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <Link href='/pricing'>
          <DropdownMenuItem className='cursor-pointer'>
            <AiFillDollarCircle className='size-5 mr-2' />
            Pricing
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </Link>
        <DropdownMenuItem className='cursor-pointer'>
          <FiLogOut className='size-5 mr-2' />
          Log Out
        </DropdownMenuItem>
        <div className='flex items-center m-2 text-[12px]'>
          <a href=''>
            <span className='border-b'> Privacy policy</span> ,
            <span className='border-b'> Terms & conditions</span>
          </a>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
