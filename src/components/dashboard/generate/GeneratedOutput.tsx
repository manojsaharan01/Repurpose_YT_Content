'use client';

import { FC, useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import GenerateContent from './GenerateContent';
import { TypeYoutubeContent } from '@/types/types';
import { convertToEmbedUrl, errorToast } from '@/utils/utils';
import { toast } from '@/components/ui/use-toast';
import { FaArrowRight, FaPlus } from 'react-icons/fa6';

type GeneratedOutputProps = {
  data: TypeYoutubeContent;
};

const GeneratedOutput: FC<GeneratedOutputProps> = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
          <div className='space-y-2.5'>
            <div className='flex justify-between items-center'>
              <p className='text-default font-semibold leading-6'>Summary</p>
              <BiCopy
                className='size-8 p-1.5 rounded border text-default cursor-pointer'
                onClick={() => {
                  navigator.clipboard
                    .writeText(data.summary)
                    .then(() => {
                      toast({ title: 'Content copied to clipboard' });
                    })
                    .catch(() => {
                      errorToast("Couldn't copy content to clipboard");
                    });
                }}
              />
            </div>
            <p className='text-default text-sm font-medium leading-6 text-justify'>{data.summary}</p>
          </div>
          {Array.isArray(data.chapters) && data.chapters.length > 0 && (
            <div className='space-y-2.5'>
              <p className='text-default font-semibold leading-6'>Chapters</p>
              {(data.chapters as { title?: string | undefined }[]).map((chapter, index) => (
                <div key={index} className='space-y-1.5'>
                  <div
                    className='flex justify-between items-center hover:bg-[#ECF6FF] rounded-lg px-2 py-1'
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}>
                    <p className='text-default text-sm font-medium leading-6'>{chapter?.title}</p>
                    {hoveredIndex === index ? (
                      <FaPlus className='size-3.5 text-default' />
                    ) : (
                      <FaArrowRight className='size-3.5 text-default' />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <GenerateContent data={data} />
    </div>
  );
};

export default GeneratedOutput;
