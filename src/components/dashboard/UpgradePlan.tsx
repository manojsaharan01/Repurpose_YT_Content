import React from 'react';
import { Button } from '../ui/button';

const UpgradePlan = () => {
  return (
    <div className='p-4 border border-[#ECECEC] rounded-lg mt-10'>
      <p className='font-semibold text-lg mb-3'>Upgrade now to experience the best of builderkit</p>

      <ul className='list-disc list-inside '>
        <li>Get access to advanced features.</li>
        <li>Get GPT-4 and Claude 3 level quality on Builderkit.</li>
        <li>Also get unlimited access to all our standard features.</li>
      </ul>
      <Button className='mt-6 w-full font-normal' variant='blue'>
        Upgrade Plan
      </Button>
    </div>
  );
};

export default UpgradePlan;
