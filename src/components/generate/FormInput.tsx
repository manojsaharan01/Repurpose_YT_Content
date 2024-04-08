'use client';

import { FC, useState } from 'react';
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

type FormFields = {
  topic: string;
  style: string;
};

const FormInput: FC<FormInputProps> = ({ data }) => {
  const [contents, setContents] = useState<TypeContent | undefined>();
  const [formData, setFormData] = useState<FormFields>({ topic: '', style: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGeneration = async (data: FormData) => {
    try {
      const response = await generateContentFn(data);
      setContents(response);
    } catch (error) {
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

            <SubmitButton className='w-full ' formAction={handleGeneration}>
              Generate
            </SubmitButton>
          </form>
        </div>

        <OutputContent
          data={data}
          contents={contents}
          onSelectContent={(value) => {
            setContents(value);
            setFormData({
              topic: value.topic,
              style: value.style,
            });
          }}
        />
      </div>
    </div>
  );
};

export default FormInput;
