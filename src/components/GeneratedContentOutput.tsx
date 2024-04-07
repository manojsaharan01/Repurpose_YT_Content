'use client';

import React, { FC, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TypeContent } from '../../types/utils';

type GeneratedContentOutputProps = {
  data: TypeContent[];
  contents?: TypeContent;
  setContents: React.Dispatch<React.SetStateAction<TypeContent | undefined>>;
};

const GeneratedContentOutput: FC<GeneratedContentOutputProps> = ({
  data,
  contents,
  setContents,
}: GeneratedContentOutputProps) => {
  const [currentTab, setCurrentTab] = React.useState('output');

  return (
    <div className='w-full md:w-1/2 ml-0 md:ml-10'>
      <Tabs defaultValue='output' value={currentTab} className='w-full'>
        <div className='flex justify-center'>
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
          <ScrollArea className='h-[380px] bg-[#9f9f9f21] rounded-lg p-5'>
            {Array.isArray(contents?.results) && contents.results.length > 0 ? (
              contents.results.map((item: any, index: any) => (
                <div key={index}>
                  <p className=' font-semibold mb-2'>{item.title}</p>
                  <p className='text-sm text-justify'>{item?.content}</p>
                  {Array.isArray(contents?.results) && index !== contents.results.length - 1 && (
                    <Separator className='my-4' />
                  )}
                </div>
              ))
            ) : (
              <div>See the output here</div>
            )}
          </ScrollArea>
        </TabsContent>
        <TabsContent value='history'>
          <ScrollArea className='h-[380px] bg-[#9f9f9f21] rounded-lg p-5 space-y-2'>
            {data?.map((item, index) => (
              <>
                <div
                  key={index}
                  className='px-2 py-1 gap-4 flex items-center rounded-lg hover:bg-[#ECECEC] cursor-pointer'
                  onClick={() => {
                    setCurrentTab('output');
                    setContents(item);
                  }}>
                  <div className='text-[#B9B9B9] font-semibold'>{index + 1}</div>
                  <div className='space-y-1'>
                    <p className='text-[#3E3E3E] text-base font-bold leading-5'>{item.topic}</p>
                  </div>
                </div>
              </>
            ))}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GeneratedContentOutput;
