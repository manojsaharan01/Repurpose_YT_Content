'use client';

import { cn } from '@/utils/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';
import { FC } from 'react';

interface SidebarItemProps {
  route: { icon: JSX.Element; label: string; path: string };
}

const SidebarItems: FC<SidebarItemProps> = ({ route }) => {
  const pathname = usePathname();

  const isActive = pathname.startsWith(route.path);
  return (
    <Link
      href={route.path}
      className={cn(
        buttonVariants({ variant: 'light-gray' }),
        isActive && 'border-border  rounded-lg bg-muted/30 !text-default'
      )}>
      <div>{route.icon}</div>
      <span className='text-[14px]'>{route.label}</span>
    </Link>
  );
};

export default SidebarItems;
