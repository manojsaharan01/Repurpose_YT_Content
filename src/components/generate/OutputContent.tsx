'use client';

import { FC, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TypeContent } from '@/types/types';

type OutputContentProps = {
  data: TypeContent[];
  content?: string;
  onSelectContent: (value: TypeContent) => void;
};

const OutputContent: FC<OutputContentProps> = ({ data, content, onSelectContent }: OutputContentProps) => {
  const [currentTab, setCurrentTab] = useState('output');

  return (
    <div className='w-full md:w-1/2 ml-0 md:ml-10'>
      <Tabs defaultValue='output' value={currentTab} className='w-full h-[460px]'>
        <div className='flex justify-center mb-6'>
          <TabsList className='rounded-full p-1 bg-transparent border dark:border-[#272626]'>
            <TabsTrigger onClick={() => setCurrentTab('output')} className='rounded-full' value='output'>
              Output
            </TabsTrigger>
            <TabsTrigger onClick={() => setCurrentTab('history')} className='rounded-full' value='history'>
              Contents
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value='output' className='h-full bg-[#FCFAFA] dark:bg-[#9f9f9f]/5 rounded-lg'>
          <div className='h-full md:h-[455px] rounded-lg border border-black/5 px-5 py-4 overflow-auto'>
            {content ? (
              <p dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <p className='text-sm dark:text-[#4F4F4F]'>See the output here...</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value='history' className='h-full bg-[#9f9f9f]/5 rounded-lg'>
          <div className='h-full rounded-lg border border-black/5 px-5 py-4 space-y-2 overflow-auto'>
            {data?.length > 0 ? (
              data.map((item, index) => (
                <div
                  key={index}
                  className='p-2 gap-4 flex items-center rounded-lg bg-white hover:bg-gray-200 dark:bg-[#1F1F1F] dark:hover:bg-[#383838] cursor-pointer mb-2'
                  onClick={() => {
                    setCurrentTab('output');
                    onSelectContent(item);
                  }}>
                  <div className=' text-sm font-semibold'>{index + 1}.</div>
                  <p className='text-sm font-semibold leading-5 truncate'>
                    {item.topic.charAt(0).toUpperCase() + item.topic.slice(1).toLowerCase()}
                  </p>
                </div>
              ))
            ) : (
              <p className='text-sm '>No history found...</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OutputContent;
