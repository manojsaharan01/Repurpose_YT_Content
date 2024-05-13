'use client';

import React, { FC } from 'react';
import { DropdownMenuContent } from '@/components/ui/dropdown-menu';

type UserButtonContentProps = {
  children: React.ReactNode;
};

const UserButtonContent: FC<UserButtonContentProps> = ({ children }) => {
  const isMobile = window.innerWidth < 768;
  return (
    <DropdownMenuContent className='rounded-lg m-4 mb-5' side={isMobile ? 'top' : 'right'}>
      {children}
    </DropdownMenuContent>
  );
};

export default UserButtonContent;
