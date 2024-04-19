'use client';

import { FC, useState } from 'react';
import InputWrapper from '../InputWrapper';
import { SubmitButton } from '../SubmitButton';
import { Input } from '../ui/input';
import OutputContent from './OutputContent';
import { TypeContent } from '@/types/types';
import { saveContent } from '@/app/generate/actions';
import { errorToast } from '@/utils/utils';

type FormInputProps = {
  data: TypeContent[];
};

type FormFields = {
  topic: string;
  style: string;
};

const FormInput: FC<FormInputProps> = ({ data }) => {
  const [contentData, setContentData] = useState<string>();
  const [formData, setFormData] = useState<FormFields>({ topic: '', style: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStream = async (data: ReadableStream) => {
    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let streamData = '';

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      streamData += chunkValue;
      setContentData(streamData.replace(/^```html\s*|\s*```$/g, ''));
    }

    return streamData;
  };

  const handleGeneration = async (inputData: FormData) => {
    const topic = inputData.get('topic') as string;
    const style = inputData.get('style') as string;

    if (!topic || !style) {
      errorToast('Please fill all required fields');
      return;
    }

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic, style }),
    });

    if (!res.ok) {
      errorToast('Something went wrong, please try again');
      return;
    }

    const data = res.body;
    if (!data) {
      errorToast('Something went wrong, please try again');
      return;
    }

    const streamData = await handleStream(data);

    await saveContent(topic, style, streamData).catch((error) => errorToast(error));
  };

  return (
    <div className='p-5 xl:p-0 h-auto md:h-auto mb-5'>
      <div className='block md:flex items-start space-y-10 md:space-y-0'>
        <div className='w-full md:w-1/2 md:border-r pr-0 md:pr-10'>
          <div className='mb-6'>
            <p className='text-white text-xl font-bold leading-10'>AI Content Creator</p>
          </div>

          <form className='md:h-[455px] flex flex-col justify-between'>
            <div className='mb-5'>
              <InputWrapper id='topic' label='Topic' className='mb-6 text-white'>
                <Input
                  id='topic'
                  name='topic'
                  placeholder="What's new in AI?"
                  autoFocus
                  value={formData.topic}
                  onChange={handleInputChange}
                  className='bg-[#1b1b1b80] border border-transparent'
                />
              </InputWrapper>

              <InputWrapper id='style' label='Content Style' className='mb-6 text-white'>
                <Input
                  id='style'
                  name='style'
                  placeholder='Educational, Facts, Entertainment'
                  value={formData.style}
                  onChange={handleInputChange}
                  className='bg-[#1b1b1b80] border border-transparent'
                />
              </InputWrapper>
            </div>

            <SubmitButton className='w-full bg-[#161616] rounded-2xl' formAction={handleGeneration}>
              Generate
            </SubmitButton>
          </form>
        </div>

        <OutputContent
          data={data}
          content={contentData}
          onSelectContent={(value) => {
            setContentData(value.results!);
            setFormData({ topic: value.topic, style: value.style });
          }}
        />
      </div>
    </div>
  );
};

export default FormInput;
