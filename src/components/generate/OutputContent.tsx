'use client';

import React, { Dispatch, FC, SetStateAction } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TypeContent } from '../../../types/utils';
import { FormFields } from './FormInput';

type OutputContentProps = {
  data: TypeContent[];
  contents?: TypeContent;
  onSelectContent: (value: TypeContent) => void;
  onSetFormData: (value: FormFields) => void;
};

const OutputContent: FC<OutputContentProps> = ({
  data,
  contents,
  onSelectContent,
  onSetFormData,
}: OutputContentProps) => {
  const [currentTab, setCurrentTab] = React.useState('output');

  return (
    <div className='w-full md:w-1/2 ml-0 md:ml-10'>
      <Tabs defaultValue='output' value={currentTab} className='w-full'>
        <div className='flex justify-center mb-6'>
          <TabsList className='rounded-full p-1'>
            <TabsTrigger onClick={() => setCurrentTab('output')} className='rounded-full' value='output'>
              Output
            </TabsTrigger>
            <TabsTrigger onClick={() => setCurrentTab('history')} className='rounded-full' value='history'>
              History
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value='output'>
          <div className='h-64 md:h-[25rem]  bg-[#9f9f9f]/5 rounded-lg border border-black/5 px-5 py-4 overflow-auto'>
            {contents ? (
              <p
                className=''
                dangerouslySetInnerHTML={{
                  __html: (contents?.results as string).replace(/^```html\s*|\s*```$/g, ''),
                }}
              />
            ) : (
              <p className='text-sm text-[#B9B9B9]'>See the output here...</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value='history'>
          <div className='h-64 md:h-[25rem] bg-[#9f9f9f]/5 rounded-lg border border-black/5 px-5 py-4 space-y-2 overflow-auto'>
            {data.length ? (
              data?.map((item, index) => (
                <div
                  key={index}
                  className='p-2 gap-4 flex items-center rounded-lg bg-[#ECECEC]/60 hover:bg-[#ECECEC] cursor-pointer mb-2'
                  onClick={() => {
                    setCurrentTab('output');
                    onSelectContent(item);
                    onSetFormData({ topic: item.topic, style: item.style });
                  }}>
                  <div className='text-[#B9B9B9] text-sm font-semibold'>{index + 1}.</div>
                  <p className='text-[#3E3E3E] text-sm font-semibold leading-5 truncate capitalize'>
                    {item.topic}
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
