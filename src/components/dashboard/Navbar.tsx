import { FaPlus } from 'react-icons/fa';
import React from 'react';
import { SelectTheme } from '../SelectTheme';

type Props = {
  children: React.ReactNode;
};

const Navbar = ({ children }: Props) => {
  return (
    <div className='flex justify-between'>
      {children}
      <div className='flex items-center gap-5'>
        <SelectTheme />
        <div className='bg-[#FFF4F0] py-2 px-2.5 border border-[#FFE4D8] rounded-lg gap-3 flex items-center'>
          <p className='text-[#FF4D00] font-semibold'>Your Credits : 4</p>
          <div className='bg-[#FF4D00] p-1 rounded text-white'>
            <FaPlus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
