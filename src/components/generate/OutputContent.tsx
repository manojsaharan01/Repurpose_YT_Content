'use client';

import React, { FC } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TypeContent } from '../../../types/utils';

type OutputContentProps = {
  data: TypeContent[];
  contents?: TypeContent;
  onSelectContent: (value: TypeContent) => void;
  setTopic: React.Dispatch<React.SetStateAction<string | undefined>>;
  setStyle: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const OutputContent: FC<OutputContentProps> = ({
  data,
  contents,
  onSelectContent,
  setTopic,
  setStyle,
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
          <ScrollArea className='h-[380px] bg-[#9f9f9f]/5 rounded-lg border border-black/5 px-5 py-4'>
            {(contents && Array.isArray(contents)
              ? contents
              : contents && Array.isArray(contents.results)
                ? contents.results
                : []
            ).map((item: any, index: any) => (
              <div key={index} className='text-sm'>
                <p className='font-semibold mb-2'>{item.title}</p>
                <p className='text-justify'>{item?.content}</p>
                {index !==
                  (contents && Array.isArray(contents.results) ? contents.results.length - 1 : -1) && (
                  <Separator className='my-5' />
                )}
              </div>
            ))}

            {!contents ||
            (Array.isArray(contents) && contents.length === 0) ||
            (contents && Array.isArray(contents.results) && contents.results.length === 0) ? (
              <p className='text-sm text-[#B9B9B9]'>See the output here...</p>
            ) : null}
          </ScrollArea>
        </TabsContent>

        <TabsContent value='history'>
          <ScrollArea className='h-[380px] bg-[#9f9f9f]/5 rounded-lg border border-black/5 px-5 py-4 space-y-2'>
            {data?.map((item, index) => (
              <div
                key={index}
                className='p-2 gap-4 flex items-center rounded-lg bg-[#ECECEC]/60 hover:bg-[#ECECEC] cursor-pointer mb-2'
                onClick={() => {
                  setCurrentTab('output');
                  onSelectContent(item);
                  setTopic(item.topic);
                  setStyle(item.style);
                }}>
                <div className='text-[#B9B9B9] text-sm font-semibold'>{index + 1}.</div>
                <div className='space-y-1'>
                  <p className='text-[#3E3E3E] text-sm font-semibold leading-5'>
                    {item.topic.charAt(0).toUpperCase() + item.topic.slice(1).toLowerCase()}
                  </p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OutputContent;
