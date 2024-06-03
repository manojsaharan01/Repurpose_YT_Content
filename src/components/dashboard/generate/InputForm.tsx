'use client';

import { Input } from '@/components/ui/input';
import React, { FC, useState } from 'react';
import UpgradePlan from '../UpgradePlan';
import { FaArrowRight } from 'react-icons/fa6';
import { SubmitButton } from '@/components/SubmitButton';
import { errorToast } from '@/utils/utils';
import axios from 'axios';
import GeneratedOutput from './GeneratedOutput';
import { TypeYoutubeContent } from '@/types/types';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';

type InputFormProps = {};

const InputForm: FC<InputFormProps> = () => {
  const [data, setData] = useState<TypeYoutubeContent | undefined>(undefined);
  const router = useRouter();

  const handleGeneration = async (formData: FormData) => {
    const url = formData.get('url') as string;
    if (!url) {
      return errorToast('Please provide YouTube video URL.');
    }

    const isYouTubeUrl = url.includes('youtube.com');

    if (!isYouTubeUrl) {
      return errorToast('Please provide a valid YouTube video URL.');
    }

    try {
      const response = await axios.post('/api/summary', { url });
      router.replace(`/home/${response.data.data.id}`);
      setData(response.data.data);
    } catch (error: any) {
      errorToast("YouTube video couldn't be processed");
    }
  };

  return (
    <div className='flex flex-col justify-between items-center h-[calc(100vh-86px)]'>
      {data ? (
        <GeneratedOutput data={data} />
      ) : (
        <>
          <div className='w-full flex flex-col items-center justify-center mt-12'>
            <Logo />
            <p className='text-default font-medium leading-6 max-w-96 mt-5'>
              Generate content from your favourite YouTube videos. Paste the URL below and create content
            </p>
            <form className='mt-11 w-full flex items-center mx-auto max-w-2xl relative'>
              <Input
                placeholder='https://youtube.com/'
                className='rounded-md pl-4 pr-10 py-2 border w-full'
                type='url'
                name='url'
              />
              <SubmitButton
                size='icon'
                variant='secondary'
                className='rounded-r-md absolute right-0 top-0 h-full rounded-l-none border'
                formAction={handleGeneration}>
                <FaArrowRight />
              </SubmitButton>
            </form>
          </div>
          <UpgradePlan />
        </>
      )}
    </div>
  );
};

export default InputForm;
