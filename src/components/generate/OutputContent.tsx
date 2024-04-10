'use client';

import React, { Dispatch, FC, SetStateAction } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TypeContent } from '../../../types/utils';
import { FormFields } from './FormInput';
type OutputContentProps = {
  data: TypeContent[];
  contents?: TypeContent;
  onSelectContent: (value: TypeContent) => void;
  setFormData: Dispatch<SetStateAction<FormFields>>;
  response?: string;
  setResponse?: Dispatch<SetStateAction<string>>;
};

const OutputContent: FC<OutputContentProps> = ({
  data,
  contents,
  onSelectContent,
  setFormData,
  response,
  setResponse,
}: OutputContentProps) => {
  const [currentTab, setCurrentTab] = React.useState('output');

  console.log(contents?.results);

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
            {response ? (
              <div
                className=''
                dangerouslySetInnerHTML={{ __html: response.replace(/^```html\s*|\s*```$/g, '') }}></div>
            ) : contents ? (
              <p
                className=''
                dangerouslySetInnerHTML={{
                  __html: (contents?.results as string).replace(/^```html\s*|\s*```$/g, ''),
                }}></p>
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
                    setFormData({ topic: item.topic, style: item.style });
                    setResponse && setResponse('');
                  }}>
                  <div className='text-[#B9B9B9] text-sm font-semibold'>{index + 1}.</div>
                  <div className='space-y-1'>
                    <p className='text-[#3E3E3E] text-sm font-semibold leading-5'>
                      {item.topic.charAt(0).toUpperCase() + item.topic.slice(1).toLowerCase()}
                    </p>
                  </div>
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
