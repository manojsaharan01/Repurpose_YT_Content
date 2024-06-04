'use client';

import { Input } from '@/components/ui/input';
import { useCallback, useEffect, useState } from 'react';
import UpgradePlan from '../UpgradePlan';
import { FaArrowRight } from 'react-icons/fa6';
import { SubmitButton } from '@/components/SubmitButton';
import { errorToast } from '@/utils/utils';
import Summary from './Summary';
import { TypeYoutubeContent } from '@/types/types';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import { getYoutubeVideoDetails } from '@/app/(dashboard)/home/action';
import { supabaseBrowserClient } from '@/utils/supabase/client';
import ModalLimitExceeded from './ModalLimitExceeded';

const InputForm = () => {
  const [data, setData] = useState<TypeYoutubeContent | null>(null);
  // State to check if the user has reached the limit of content creations
  const [hasLimitExceeded, setHasLimitExceeded] = useState(false);

  const supabase = supabaseBrowserClient();
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
      const data = await getYoutubeVideoDetails(url);
      setData(data);
      router.replace(`/home/${data?.id}`);
    } catch (error: any) {
      errorToast(error.message || 'An unexpected error occurred.');
    }
  };

  //function to check the limit of content creations and set the state accordingly
  const limitUser = useCallback(async () => {
    const { error, count } = await supabase
      .from('youtube_content_generator')
      .select('*', { count: 'exact', head: true });

    if (error) {
      return errorToast(error.message);
    }
    if (count && count >= 5) {
      setHasLimitExceeded(true);
    }
  }, [supabase]);

  //checking on load if the user has reached the limit of content creations
  useEffect(() => {
    limitUser();
  }, [limitUser]);

  return (
    <div className='flex flex-col justify-between items-center h-[calc(100vh-86px)]'>
      {hasLimitExceeded && <ModalLimitExceeded isModalOpen={hasLimitExceeded} />}
      {data ? (
        <Summary data={data} />
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
                disabled={hasLimitExceeded}
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
