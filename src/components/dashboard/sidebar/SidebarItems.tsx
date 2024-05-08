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
              isActive && 'border !border-[#E8E8E8] rounded-lg bg-[#F9F9F9] !text-black',
              'flex items-center px-2 py-1.5 gap-3 font-semibold  tracking-tight border border-transparent hover:bg-[#F9F9F9] hover:border hover:border-[#E8E8E8] hover:!text-black rounded-lg text-[#8C8C8C]'
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
