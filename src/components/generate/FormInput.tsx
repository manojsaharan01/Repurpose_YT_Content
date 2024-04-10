'use client';

import { FC, useState } from 'react';
import InputWrapper from '../InputWrapper';
import { SubmitButton } from '../SubmitButton';
import { Input } from '../ui/input';
import OutputContent from './OutputContent';
import { TypeContent } from '../../../types/utils';
import { generateContentFn } from '@/app/(main)/generate/actions';

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
  const [response, setResponse] = useState('');

  const handleSubmit = async (inputData: FormData) => {
    setResponse('');

    const res = await fetch('/api/response', {
      method: 'POST',
      body: inputData,
    });

    if (!res.ok) throw new Error(res.statusText);

    const data = res.body;
    if (!data) return;

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    // Here intialized string to store the response data because we dont get data from response state
    let streamDta = '';

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setResponse((prev) => prev + chunkValue);
      streamDta += chunkValue;
    }
    if (done) {
      await generateContentFn(inputData, streamDta)
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
              <SubmitButton className='w-full ' formAction={handleSubmit}>
                Generate
              </SubmitButton>
            </div>
          </form>
        </div>

        <OutputContent
          data={data}
          contents={contents}
          onSelectContent={(value) => setContents(value)}
          setFormData={setFormData}
          response={response}
          setResponse={setResponse}
        />
      </div>
    </div>
  );
};

export default FormInput;
