'use client';

import { Separator } from '@/components/ui/separator';
import { FC, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { BiCopy } from 'react-icons/bi';
import { cn, errorToast } from '@/utils/utils';
import { AiOutlineLoading } from 'react-icons/ai';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { TypeYoutubeContent } from '@/types/types';
import { supabaseBrowserClient } from '@/utils/supabase/client';
import { toast } from '@/components/ui/use-toast';
import Image from 'next/image';
import ZeroState from '@/assets/images/zero-state.png';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

type GenerateContentProps = {
  data: TypeYoutubeContent;
};

interface ContentItem {
  title: string;
  description: string;
}

const languages = [
  { value: 'English', label: 'English' },
  { value: 'French', label: 'French' },
  { value: 'Hindi', label: 'Hindi' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'German', label: 'German' },
  { value: 'Japanese', label: 'Japanese' },
  { value: 'Chinese', label: 'Chinese' },
  { value: 'Russian', label: 'Russian' },
];

const GenerateContent: FC<GenerateContentProps> = ({ data }) => {
  const supabase = supabaseBrowserClient();
  const [contentData, setContentData] = useState<ContentItem[]>(
    (data?.generated_content as unknown as ContentItem[]) || []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<string | undefined>(data.language || 'English');

  const summary = data.summary;

  // Handles the streaming of content generation data from the server response
  const handleStream = async (redablestream: ReadableStream) => {
    const reader = redablestream.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let streamData = '';

    // Append the stream data to the contentData state as it arrives
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      streamData += chunkValue;
    }

    if (done) {
      const parsedData = JSON.parse(streamData);
      // Explicitly provide type annotation for prevContentData
      setContentData((prevContentData: any[]) => [...parsedData.content_ideas, ...prevContentData]);
      // Save the generated content once the stream is complete
      const { error } = await supabase
        .from('youtube_content_generator')
        .update({ generated_content: [...parsedData.content_ideas, ...contentData], language })
        .eq('id', data.id)
        .select();

      if (error) {
        errorToast('Error saving generated content');
      }
    }

    return streamData;
  };

  const handleGenerate = async (type: string) => {
    setIsLoading(true);

    if (!summary || !language || !type) {
      errorToast('Please provide all the required fields');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, summary, language }),
      });

      if (!res.ok) {
        throw new Error('Failed to get response from the server');
      }

      const responseBody = res.body;

      if (!responseBody) {
        throw new Error('Something went wrong, please try again');
      }

      // Handle the stream data
      await handleStream(responseBody);
    } catch (error: any) {
      errorToast(error?.message ?? `${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (containerClassName: string) => {
    // Get the text content of the container element bec
    const textContent = document.querySelector(containerClassName)?.textContent || '';

    navigator.clipboard
      .writeText(textContent)
      .then(() => {
        toast({ description: 'Text copied to clipboard' });
      })
      .catch(() => {
        toast({ description: 'Failed to copy text to clipboard', variant: 'destructive' });
      });
  };

  return (
    <div className='w-full lg:w-1/2 border rounded-xl overflow-auto'>
      <form className='space-y-6 p-4 lg:px-6 lg:py-8'>
        <p>What are the benefits of labeling ai-generated videos on youtube</p>
        <Separator />
        <div className='space-y-2'>
          <div className='text-default font-semibold text-sm'>Content output language</div>
          <Select onValueChange={(value) => setLanguage(value)} value={language}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select Language' />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.value} value={language.value}>
                  {language.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='mt-3 grid grid-cols-2 gap-2'>
          <Button
            disabled={isLoading || !summary}
            onClick={() => handleGenerate('blog')}
            variant='secondary'
            size='sm'
            className='bg-[#FFEFE8] dark:bg-[#FFEFE8]/5 text-[#FF740F] w-full'>
            Generate Blog
          </Button>
          <Button
            disabled={isLoading || !summary}
            onClick={() => handleGenerate('twitter')}
            variant='secondary'
            size='sm'
            className='bg-[#E8F4FF] dark:bg-[#E8F4FF]/5 text-[#0F6FFF] w-full'>
            Generate Twitter ‘X’ Post
          </Button>
          <Button
            disabled={isLoading || !summary}
            onClick={() => handleGenerate('reddit')}
            variant='secondary'
            size='sm'
            className='bg-[#FFE8E8] dark:bg-[#FFE8E8]/5 text-[#FF4500] w-full'>
            Generate Reddit Post
          </Button>
          <Button
            disabled={isLoading || !summary}
            onClick={() => handleGenerate('linkedin')}
            variant='secondary'
            size='sm'
            className='bg-[#E8EEFF] dark:bg-[#E8EEFF]/5 text-[#0836BB] w-full'>
            Generate Linkedin Post
          </Button>
        </div>
        <Separator />
        <div>
          <p className='text-default font-semibold font-sm leading-6 mb-4'>Generated content</p>
          {contentData.length > 0 ? (
            <div className='space-y-5'>
              <div className='flex items-center justify-center'>
                {isLoading && <AiOutlineLoading3Quarters className='animate-spin size-8' />}
              </div>
              {contentData.map((content: { title: string; description: string }, index) => (
                <div key={index} className='border rounded-lg p-4 space-y-2'>
                  <div className='flex justify-between items-center'>
                    <p className='text-default text-sm font-bold leading-6'>{content?.title}</p>
                    <BiCopy
                      className='size-8 p-1.5 rounded border text-default cursor-pointer'
                      onClick={() => handleCopy(`.content-${index}`)}
                    />
                  </div>

                  <ReactMarkdown
                    className={cn(`content-${index}`, 'text-subtle text-sm font-medium leading-6 markdown')}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}>
                    {content.description}
                  </ReactMarkdown>
                  <p className='text-muted-foreground text-xs font-medium leading-6'>
                    {format(data.created_at, 'MMM d, yyyy')}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className='flex items-center justify-center'>
              {isLoading ? (
                <AiOutlineLoading className='animate-spin size-8' />
              ) : (
                <div className='flex flex-col justify-center items-center'>
                  <Image src={ZeroState} height={150} width={150} alt='zero-state' />
                  <p className='text-subtle font-medium mt-4'>No content generated yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default GenerateContent;
