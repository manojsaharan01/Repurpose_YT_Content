import React from 'react';

const Features = () => {
  return (
    <div className='flex flex-col justify-center items-center space-y-[64px]'>
      <div className='text-[#ABABB0] text-[32px] font-normal leading-10'>Featured on:</div>
      <div className=' flex flex-wrap gap-[88px]'>
        <div className='text-3xl font-bold text-white'>Google</div>
        <div className='text-3xl font-bold text-white'>Google</div>
        <div className='text-3xl font-bold text-white'>Google</div>
        <div className='text-3xl font-bold text-white'>Google</div>
      </div>
    </div>
  );
};

export default Features;
