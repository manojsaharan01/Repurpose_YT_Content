'use client';

import React, { FC } from 'react';
import InputWrapper from './InputWrapper';
import { Textarea } from './ui/textarea';
import { SubmitButton } from './SubmitButton';
import { Input } from './ui/input';
import GeneratedContentOutput from './GeneratedContentOutput';
import { TypeContent } from '../../types/utils';

type GeneratedContentProps = {
  createContentFn: (formData: FormData) => void;
  searchParams: { error: string };
  data: any;
};

const GeneratedContent: FC<GeneratedContentProps> = ({ searchParams, createContentFn, data }) => {
  
  const [contents, setContents] = React.useState<TypeContent | undefined>();

  return (
    <div className='p-5 md:p-0'>
      <div className='block md:flex items-start space-y-10 md:space-y-0'>
        <div className='w-full md:w-1/2 md:border-r pr-0 md:pr-10 flex flex-col justify-between'>
          <form>
            <div>
              <p className='text-[#27262B] text-xl font-bold leading-10'>Name of the tool</p>
            </div>
            <div className='mt-[24px] mb-[16px]'>
              <InputWrapper
                id='topic'
                label='Content'
                className='text-[#27262B] text-lg font-semibold leading-6'>
                <Textarea
                  id='topic'
                  name='topic'
                  className='bg-[#9f9f9f21] h-[185px]'
                  defaultValue={contents?.topic}
                />
              </InputWrapper>
            </div>
            <div className='mt-[32px] mb-[16px]'>
              <InputWrapper
                id='style'
                label='Select tone'
                className='mb-4 text-[#27262B] text-lg font-semibold leading-6'>
                <Input
                  id='style'
                  name='style'
                  placeholder='Educational, Facts, Opportunities'
                  defaultValue={contents?.style}
                />
              </InputWrapper>
            </div>
            {searchParams?.error && (
              <p className='mt-4 py-2.5 bg-red-500/20 rounded text-xs text-red-700 text-center'>
                {searchParams.error}
              </p>
            )}
            <div className='mt-5'>
              <SubmitButton className='w-full' formAction={createContentFn}>
                Generate
              </SubmitButton>
            </div>
          </form>
        </div>
        <GeneratedContentOutput contents={contents} setContents={setContents} data={data} />
      </div>
    </div>
  );
};

export default GeneratedContent;
