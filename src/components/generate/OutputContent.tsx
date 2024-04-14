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
          <TabsList className='rounded-full p-1'>
            <TabsTrigger onClick={() => setCurrentTab('output')} className='rounded-full' value='output'>
              Output
            </TabsTrigger>
            <TabsTrigger onClick={() => setCurrentTab('history')} className='rounded-full' value='history'>
              Contents
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value='output' className='h-full bg-[#9f9f9f]/5'>
          <div className='h-full md:h-[25rem] rounded-lg border border-black/5 px-5 py-4 overflow-auto'>
            {content ? (
              <p dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <p className='text-sm text-[#B9B9B9]'>See the output here...</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value='history' className='h-full bg-[#9f9f9f]/5'>
          <div className='h-full rounded-lg border border-black/5 px-5 py-4 space-y-2 overflow-auto'>
            {data?.length > 0 ? (
              data.map((item, index) => (
                <div
                  key={index}
                  className='p-2 gap-4 flex items-center rounded-lg bg-[#ECECEC]/60 hover:bg-[#ECECEC] cursor-pointer mb-2'
                  onClick={() => {
                    setCurrentTab('output');
                    onSelectContent(item);
                  }}>
                  <div className='text-[#B9B9B9] text-sm font-semibold'>{index + 1}.</div>
                  <p className='text-[#3E3E3E] text-sm font-semibold leading-5 truncate'>
                    {item.topic.charAt(0).toUpperCase() + item.topic.slice(1).toLowerCase()}
                  </p>
                </div>
              ))
            ) : (
              <p className='text-sm text-[#B9B9B9]'>No history found...</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OutputContent;
