import UpgradePlan from '@/components/dashboard/UpgradePlan';
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaPlus } from 'react-icons/fa';
import Navbar from '@/components/dashboard/Navbar';

const page = () => {
  return (
    <div className='p-2 flex flex-col justify-between min-h-screen'>
      <Navbar>
        <div className='text-lg font-semibold mt-5 mb-7'>Pricing</div>
      </Navbar>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {Array.from({ length: 10 }, (_, index) => (
          <Card key={index}>
            <CardHeader className='pb-2 font-normal'>
              <p>Academic Research</p>
            </CardHeader>
            <CardContent>
              <p className='text-[#83888B] text-sm'>
                Write in a scholarly tone, utilising accurate, authoritative sources and citations. Ensure
                that your...
              </p>
            </CardContent>
            <CardFooter>
              <Button className='w-full' variant="blue">
                <FaPlus className='mr-2' /> Create content
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <UpgradePlan />
    </div>
  );
};

export default page;
