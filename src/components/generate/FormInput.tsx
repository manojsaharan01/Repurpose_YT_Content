'use client';

import React, { FC } from 'react';
import InputWrapper from '../InputWrapper';
import { SubmitButton } from '../SubmitButton';
import { Input } from '../ui/input';
import OutputContent from './OutputContent';
import { TypeContent } from '../../../types/utils';
import { generateContentFn } from '@/app/generate/actions';
import { toast } from '../ui/use-toast';

type FormInputProps = {
  data: any;
};

const FormInput: FC<FormInputProps> = ({ data }) => {
  const [contents, setContents] = React.useState<TypeContent | undefined>();

  const handleGeneration = async (formData: FormData) => {
    const error = await generateContentFn(formData);

    if (error) {
      toast({ description: error, variant: 'destructive' });
    }
  };

  return (
    <div className='p-5 md:p-0'>
      <div className='block md:flex items-start space-y-10 md:space-y-0'>
        <div className='w-full md:w-1/2 md:border-r pr-0 md:pr-10 flex flex-col justify-between'>
          <div className='mb-6'>
            <p className='text-[#27262B] text-xl font-bold leading-10'>AI Content Creator</p>
          </div>

          <form>
            <InputWrapper id='topic' label='Topic' className='mb-6'>
              <Input
                id='topic'
                name='topic'
                placeholder="What's new in AI?"
                autoFocus
                defaultValue={contents?.topic}
              />
            </InputWrapper>

            <InputWrapper id='style' label='Content Style' className='mb-6'>
              <Input
                id='style'
                name='style'
                placeholder='Educational, Facts, Entertainment'
                defaultValue={contents?.style}
              />
            </InputWrapper>

            <SubmitButton className='w-full mt-5' formAction={handleGeneration}>
              Generate
            </SubmitButton>
          </form>
        </div>

        <OutputContent data={data} contents={contents} onSelectContent={(value) => setContents(value)} />
      </div>
    </div>
  );
};

export default FormInput;
