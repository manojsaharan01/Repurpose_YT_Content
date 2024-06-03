'use client';

import { FC, useEffect, useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import GenerateContent from './GenerateContent';
import { TypeYoutubeContent } from '@/types/types';
import { convertToEmbedUrl, errorToast } from '@/utils/utils';
import { toast } from '@/components/ui/use-toast';
import { FaArrowRight, FaPlus } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { getYouTubeVideoSubTitle, saveSummary } from '@/app/(dashboard)/home/action';
import { AiOutlineLoading } from 'react-icons/ai';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

type SummaryProps = {
  data: TypeYoutubeContent;
};

const Summary: FC<SummaryProps> = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [summary, setSummary] = useState<string>(data.summary || '');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const embedUrl = convertToEmbedUrl(data.url);

  useEffect(() => {
    if (data.summary) return;

    const fetchSummary = async () => {
      setLoading(true);
      try {
        const subTitle = await getYouTubeVideoSubTitle(data.url);
        const summary = await generateSummary(subTitle);
        setSummary(summary);
        if (summary) {
          await saveSummary(summary, data.id);
          router.refresh();
        }
      } catch (error) {
        errorToast('Failed to get transcription summary. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [data.url]);

  const handleStream = async (data: ReadableStream) => {
    setLoading(false);
    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let streamData = '';

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      streamData += chunkValue;
      setSummary((prev) => prev + chunkValue);
    }

    return streamData;
  };

  const generateSummary = async (subTitle: string) => {
    const response = await fetch('/api/summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subTitle }),
    });

    const streamResponse = response.body;
    if (!streamResponse) {
      errorToast('Failed to get transcription summary. Please try again later.');
      return '';
    }
    return await handleStream(streamResponse);
  };

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
                    .writeText(summary)
                    .then(() => {
                      toast({ title: 'Content copied to clipboard' });
                    })
                    .catch(() => {
                      errorToast("Couldn't copy content to clipboard");
                    });
                }}
              />
            </div>
            {loading ? (
              <div className='flex flex-col items-center justify-center'>
                <AiOutlineLoading className='animate-spin size-8 mb-2' />
                <p className='text-default text-sm font-medium leading-6 text-justify'>Loading summary...</p>
              </div>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                className='text-default text-sm font-medium leading-6 text-justify space-y-2'>
                {summary}
              </ReactMarkdown>
            )}
          </div>
          {Array.isArray(data.chapters) && data.chapters.length > 0 && (
            <div className='space-y-2.5'>
              <p className='text-default font-semibold leading-6'>Chapters</p>
              {(data.chapters as { title?: string | undefined }[]).map((chapter, index) => (
                <div key={index} className='space-y-1.5'>
                  <div
                    className='flex justify-between items-center hover:bg-[#ECF6FF] dark:hover:bg-[#ECF6FF]/20 gap-2 rounded-lg px-2 py-1'
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}>
                    <p className='text-default text-sm font-medium leading-6'>{chapter?.title}</p>
                    <div className=''>
                      {hoveredIndex === index ? (
                        <FaPlus className='size-3.5 text-default' />
                      ) : (
                        <FaArrowRight className='size-3.5 text-default' />
                      )}
                    </div>
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

export default Summary;
