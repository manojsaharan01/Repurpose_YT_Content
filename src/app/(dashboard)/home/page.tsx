import Navbar from '@/components/dashboard/Navbar';
import InputForm from '@/components/dashboard/generate/InputForm';
import React from 'react';

const page = () => {
  return (
    <div className='p-2 flex flex-col justify-between'>
      <div>
        <Navbar>
          <div className='text-lg font-semibold mt-5 mb-7'>Content Writer</div>
        </Navbar>
        <InputForm />
      </div>
    </div>
  );
};

export default page;
