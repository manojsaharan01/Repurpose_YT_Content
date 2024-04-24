// Component for rendering and interacting with the form used to generate new content
// It handles content creation data input and sends it to the server for processing

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
  // Holds content from the server response stream
  const [contentData, setContentData] = useState<string>();
  // Holds user input for form fields
  const [formData, setFormData] = useState<FormFields>({ topic: '', style: '' });

  // Handles user input changes, updating form state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handles the streaming of content generation data from the server response
  const handleStream = async (data: ReadableStream) => {
    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let streamData = '';

    // Append the stream data to the contentData state as it arrives
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      streamData += chunkValue;
      setContentData(streamData.replace(/^```html\s*|\s*```$/g, ''));
    }

    return streamData;
  };

  // Handles the form submission, invokes content generation, and saves the generated content
  const handleGeneration = async (inputData: FormData) => {
    const topic = inputData.get('topic') as string;
    const style = inputData.get('style') as string;

    if (!topic || !style) {
      errorToast('Please fill all required fields');
      return;
    }

    // Makes an api call to /api/generate and receives a stream response
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

    // Handle the stream data
    const streamData = await handleStream(data);

    // Save the generated content once the stream is complete
    await saveContent(topic, style, streamData).catch((error) => errorToast(error));
  };

  return (
    <div className='p-4 xl:p-0 h-auto md:h-auto mb-5'>
      <div className='block md:flex items-start space-y-10 md:space-y-0'>
        <div className='w-full md:w-1/2 md:border-r border-[#ECECEC] dark:border-[#272626] pr-0 md:pr-10'>
          <div className='mb-6'>
            <p className='text-xl font-bold leading-10'>AI Content Creator</p>
          </div>

          {/* Input form */}
          <form className='md:h-[455px] flex flex-col justify-between'>
            <div className='mb-5'>
              <InputWrapper id='topic' label='Topic' className='mb-6'>
                <Input
                  id='topic'
                  name='topic'
                  placeholder="What's new in AI?"
                  autoFocus
                  value={formData.topic}
                  onChange={handleInputChange}
                />
              </InputWrapper>

              <InputWrapper id='style' label='Content Style' className='mb-6'>
                <Input
                  id='style'
                  name='style'
                  placeholder='Educational, Facts, Entertainment'
                  value={formData.style}
                  onChange={handleInputChange}
                />
              </InputWrapper>
            </div>

            <SubmitButton className='w-full rounded-xl' variant='blue' formAction={handleGeneration}>
              Generate
            </SubmitButton>
          </form>
        </div>

        {/* Show the generated content here */}
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
