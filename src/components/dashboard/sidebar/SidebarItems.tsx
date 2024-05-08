'use client';

import { cn } from '@/utils/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiLayoutGridFill } from 'react-icons/ri';
import { PiMagicWand } from 'react-icons/pi';
import { MdHistory } from 'react-icons/md';

export const SidebarRoutes = [
  {
    icon: <RiLayoutGridFill />,
    label: 'Home',
    path: '/home',
  },
  {
    icon: <MdHistory />,
    label: 'History',
    path: '/history',
  },
  {
    icon: <PiMagicWand />,
    label: 'prompt library',
    path: '/prompt-library',
  },
];

const SidebarItems = () => {
  const pathname = usePathname();

  return (
    <div className='space-y-1'>
      {SidebarRoutes.map((route, index) => {
        const isActive = pathname.startsWith(route.path);

        return (
          <Link
            key={index}
            href={route.path}
            className={cn(
              isActive &&
                'border !border-[#E8E8E8] dark:!border-[#3b3a3a] rounded-lg bg-[#F9F9F9] dark:bg-[#5a5959]/10 !text-black dark:!text-white',
              'flex items-center px-2 py-1.5 gap-3 font-semibold tracking-tight border border-transparent hover:bg-[#F9F9F9] hover:dark:bg-[#5a5959]/10 hover:border hover:border-[#E8E8E8] hover:dark:!border-[#3b3a3a] hover:!text-black rounded-lg text-[#8C8C8C] dark:!text-white'
            )}>
            <div>{route.icon}</div>
            <span>{route.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarItems;
