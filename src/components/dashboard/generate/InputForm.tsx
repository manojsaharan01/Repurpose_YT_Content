'use client';

import React, { useState } from 'react';
import OutputContent from './OutputContent';
import InputWrapper from '@/components/InputWrapper';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/SubmitButton';
import { errorToast } from '@/utils/utils';
import { saveContent } from '@/app/generate/actions';
import { TypeContent } from '@/types/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Props = {
  generatedData?: TypeContent;
};

type FormFields = {
  topic: string;
  style: string;
  wordLimit: string;
  voice: string;
};

const InputForm = ({ generatedData }: Props) => {
  const [formData, setFormData] = useState<FormFields>({
    topic: generatedData?.topic ?? '',
    style: generatedData?.style ?? '',
    wordLimit: generatedData?.word_limit ?? '',
    voice: generatedData?.voice ?? '',
  });

  const parsedContentData = generatedData?.results ? JSON.parse(generatedData.results) : {};

  const [contentData, setContentData] = useState(parsedContentData.content_ideas ?? []);

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
    }

    if (done) {
      const parsedData = JSON.parse(streamData);
      setContentData(parsedData.content_ideas);
    }

    return streamData;
  };

  const handleGeneration = async (inputData: FormData) => {
    const { topic, style, wordLimit, voice } = formData;

    if (!topic || !style || !wordLimit || !voice) {
      errorToast('Please fill all required fields');
      return;
    }

    // Makes an api call to /api/generate and receives a stream response
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
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
    await saveContent(topic, style, wordLimit, voice, streamData).catch((error) => errorToast(error));
  };

  return (
    <div className='block lg:flex items-start space-y-10 md:space-y-0'>
      <div className='w-full lg:w-1/2 mr-0 lg:mr-8'>
        <form>
          <InputWrapper id='topic' label='What do you want to generate?' className='mb-5'>
            <Input
              id='topic'
              name='topic'
              placeholder='AI news show'
              autoFocus
              value={formData.topic}
              onChange={handleInputChange}
            />
          </InputWrapper>

          <InputWrapper id='wordLimit' label='Word Limit' className='mb-5'>
            <Input
              id='wordLimit'
              name='wordLimit'
              placeholder='120'
              value={formData.wordLimit}
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

          <InputWrapper id='voice' label='voice' className='mb-6'>
            <Select
              value={formData.voice}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  voice: value,
                }))
              }>
              <SelectTrigger>
                <SelectValue placeholder='voice of' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='formal'>Formal</SelectItem>
                <SelectItem value='informal'>Informal</SelectItem>
                <SelectItem value='professional'>Professional</SelectItem>
                <SelectItem value='academic'>Academic</SelectItem>
              </SelectContent>
            </Select>
          </InputWrapper>

          <SubmitButton className='w-full rounded-lg mt-8' formAction={handleGeneration}>
            Generate
          </SubmitButton>
        </form>
      </div>
      <OutputContent contentData={contentData} />
    </div>
  );
};

export default InputForm;
