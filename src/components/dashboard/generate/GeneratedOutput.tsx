'use client';

import { FC } from 'react';
import { BiCopy } from 'react-icons/bi';
import GenerateContent from './GenerateContent';
import { TypeYoutubeContent } from '@/types/types';
import { convertToEmbedUrl, errorToast } from '@/utils/utils';
import { toast } from '@/components/ui/use-toast';

type GeneratedOutputProps = {
  data: TypeYoutubeContent;
};

const GeneratedOutput: FC<GeneratedOutputProps> = ({ data }) => {
  const embedUrl = convertToEmbedUrl(data.url);
  return (
    <div className='block lg:flex justify-between gap-1 h-[calc(100vh-86px)] space-y-10 lg:space-y-0'>
      <div className='w-full lg:w-1/2 border rounded-xl overflow-auto'>
        <div className='space-y-6 p-4 lg:px-10 lg:py-8'>
          <p className='text-default font-semibold text-xl leading-8'>{data.youtube_title}</p>
          <iframe
            className='h-48 sm:h-72 w-full rounded-lg'
            src={embedUrl}
            title={data.youtube_title}
            allowFullScreen
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          />
          <div className='text-default leading-6 font-semibold space-y-2.5'>
            <div className='flex justify-between items-center'>
              <p className='text-default font-semibold leading-6'>Summary</p>
              <BiCopy
                className='size-8 p-1.5 rounded border text-default cursor-pointer'
                onClick={() => {
                  navigator.clipboard
                    .writeText(data.summary)
                    .then(() => {
                      toast({ title: 'Content copied to clipboard', variant: 'default' });
                    })
                    .catch(() => {
                      errorToast("Couldn't copy content to clipboard");
                    });
                }}
              />
            </div>
            <p className='text-default text-sm font-medium leading-6 text-justify'>{data.summary}</p>
          </div>
        </div>
      </div>
      <GenerateContent data={data} />
    </div>
  );
};

export default GeneratedOutput;
