'use client';

import React, { FC } from 'react';
import InputWrapper from '../InputWrapper';
import { SubmitButton } from '../SubmitButton';
import { Input } from '../ui/input';
import OutputContent from './OutputContent';
import { TypeContent } from '../../../types/utils';
import { generateContentFn } from '@/app/(main)/generate/actions';
import { toast } from '../ui/use-toast';

type FormInputProps = {
  data: TypeContent[];
};

const FormInput: FC<FormInputProps> = ({ data }) => {
  const [contents, setContents] = React.useState<TypeContent | undefined>();
  const [topic, setTopic] = React.useState(contents?.topic);
  const [style, setStyle] = React.useState(contents?.style);

  const handleGeneration = async (formData: FormData) => {
    try {
      const response = await generateContentFn(formData);
      setContents(response.outputs);
    } catch (error) {
      console.log(error);
      toast({ description: (error as Error).toString(), variant: 'destructive' });
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
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </InputWrapper>

              <InputWrapper id='style' label='Content Style' className='mb-6'>
                <Input
                  id='style'
                  name='style'
                  placeholder='Educational, Facts, Entertainment'
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                />
              </InputWrapper>
            </div>
            <div className='mt-5 md:mt-24'>
              <SubmitButton className='w-full ' formAction={handleGeneration}>
                Generate
              </SubmitButton>
            </div>
          </form>
        </div>

        <OutputContent
          data={data}
          contents={contents}
          onSelectContent={(value) => setContents(value)}
          setStyle={setStyle}
          setTopic={setTopic}
        />
      </div>
    </div>
  );
};

export default FormInput;
