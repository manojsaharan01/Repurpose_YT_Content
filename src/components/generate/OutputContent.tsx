// Component for displaying output content or history of generated content
// It supports interactive selection from the history to re-display content

'use client';

import { FC, useRef, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TypeContent } from '@/types/types';
import { IoMdCopy } from 'react-icons/io';
import { toast } from '../ui/use-toast';
import { errorToast } from '@/utils/utils';
import { Button } from '../ui/button';

type OutputContentProps = {
  data: TypeContent[];
  content?: string;
  onSelectContent: (value: TypeContent) => void;
};

const OutputContent: FC<OutputContentProps> = ({ data, content, onSelectContent }: OutputContentProps) => {
  // Manages the active tab state
  const [currentTab, setCurrentTab] = useState('output');

  const copiedRef = useRef(false);

  const copyContent = () => {
    const contentToCopy = document.querySelector('.output-content') as HTMLElement;
    if (contentToCopy) {
      navigator.clipboard.writeText(contentToCopy.innerText);
      copiedRef.current = true; // Update copied state
      toast({
        title: 'Content copied to clipboard',
        className: 'green-btn-gradient shadow rounded-lg border border-[#51DCA3] text-white',
      });
      setTimeout(() => {
        copiedRef.current = false; // Reset copied state after 2 seconds
      }, 2000);
    } else {
      errorToast('Failed to copy content');
    }
  };

  return (
    <div className='w-full md:w-1/2 ml-0 md:ml-10'>
      <Tabs defaultValue='output' value={currentTab} className='w-full h-[480px]'>
        {/* Tab option to select which section to see (e.g. History | Output) */}
        <div className='flex justify-center mb-6'>
          <TabsList className='rounded-full p-1 bg-transparent border dark:border-[#272626]'>
            <TabsTrigger onClick={() => setCurrentTab('output')} className='rounded-full' value='output'>
              Output
            </TabsTrigger>
            <TabsTrigger onClick={() => setCurrentTab('history')} className='rounded-full' value='history'>
              History
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Output tab shows complete content for the selected option */}
        <TabsContent
          value='output'
          className='h-full bg-[#FCFAFA] dark:bg-[#9f9f9f]/5 rounded-lg overflow-hidden relative'>
          <div className='h-full md:h-[480px] rounded-lg border border-black/5 px-5 py-4 overflow-auto'>
            {content ? (
              <>
                <div className=''>
                  <p className='output-content' dangerouslySetInnerHTML={{ __html: content }} />
                </div>
              </>
            ) : (
              <p className='text-sm dark:text-[#4F4F4F]'>See the output here...</p>
            )}
          </div>

          {content && (
            <div className='flex relative bottom-[60px] items-center bg-[#FCFAFA] dark:bg-[#1d1d1d] p-2 dark:border-[#272626] rounded-b-lg border border-t'>
              <Button
                className='w-1/2 h-[42px] flex items-center justify-center gap-3 py-2.5 md:p-3 rounded-lg  text-sm '
                onClick={copyContent}
                variant='outline'>
                <IoMdCopy className='h-5 w-5 ' />
                Copy to clipboard
              </Button>
            </div>
          )}
        </TabsContent>

        {/* History tab conatining the already generated contents */}
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
              <p className='text-sm '>No Generations found...</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OutputContent;
