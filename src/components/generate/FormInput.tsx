'use client';

import { FC, useState } from 'react';
import InputWrapper from '../InputWrapper';
import { SubmitButton } from '../SubmitButton';
import { Input } from '../ui/input';
import OutputContent from './OutputContent';
import { TypeContent } from '../../../types/utils';
import { toast } from '../ui/use-toast';
import { updateContent } from '@/app/generate/actions';

type FormInputProps = {
  data: TypeContent[];
};

export type FormFields = {
  topic: string;
  style: string;
};

const FormInput: FC<FormInputProps> = ({ data }) => {
  const [contents, setContents] = useState<TypeContent | undefined>();
  const [formData, setFormData] = useState<FormFields>({ topic: '', style: '' });

  const handleStream = async (data: ReadableStream) => {
    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let streamData = '';

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      //Todo fix this ts error temporary i used ts-expect-error
      //@ts-expect-error
      setContents({
        results: (streamData += chunkValue),
      });
      streamData += chunkValue;
    }

    return streamData;
  };

  const handleGenerate = async (inputData: FormData) => {
    const topic = inputData.get('topic') as string;
    const style = inputData.get('style') as string;

    if (!topic || !style) {
      toast({
        description: 'Please fill all required fields',
        variant: 'destructive',
      });
      return;
    }

    const res = await fetch('/api/response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic, style }),
    });

    const data = res.body;
    if (!data) {
      toast({
        description: 'Something went wrong, please try again',
      });
      return;
    }

    const streamData = await handleStream(data);

    await updateContent(topic, style, streamData).catch((error) => {
      toast({
        description: error,
      });
    });
  };

  return (
    <div className='p-5 xl:p-0 h-auto md:h-auto '>
      <div className='block md:flex items-start space-y-10 md:space-y-0'>
        <div className='w-full md:w-1/2 md:border-r pr-0 md:pr-10'>
          <div className='mb-6'>
            <p className='text-[#27262B] text-xl font-bold leading-10'>AI Content Creator</p>
          </div>

          <form className='h-full flex flex-col'>
            <div className='mb-5'>
              <InputWrapper id='topic' label='Topic' className='mb-6'>
                <Input
                  id='topic'
                  name='topic'
                  placeholder="What's new in AI?"
                  autoFocus
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                />
              </InputWrapper>

              <InputWrapper id='style' label='Content Style' className='mb-6'>
                <Input
                  id='style'
                  name='style'
                  placeholder='Educational, Facts, Entertainment'
                  value={formData.style}
                  onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                />
              </InputWrapper>
            </div>
            <div className='mt-5 md:mt-44'>
              <SubmitButton className='w-full ' formAction={handleGenerate}>
                Generate
              </SubmitButton>
            </div>
          </form>
        </div>

        <OutputContent
          data={data}
          contents={contents}
          onSelectContent={(value) => setContents(value)}
          onSetFormData={(value) => setFormData(value)}
        />
      </div>
    </div>
  );
};

export default FormInput;
