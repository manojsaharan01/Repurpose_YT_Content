import { FC } from 'react';
import { getKeyFromCookie, storeKeyInCookie } from '@/utils/cookie-store';
import InputWrapper from './InputWrapper';
import { Input } from './ui/input';
import { SubmitButton } from './SubmitButton';
import Modal from './Model';

const ModalUserKeys: FC = () => {
  const openAIKey = getKeyFromCookie('openai');

  if (openAIKey) {
    return null;
  }

  const handleSubmit = async (formData: FormData) => {
    'use server';

    const openAiKey = formData.get('key') as string;
    storeKeyInCookie(openAiKey);
  };

  return (
    <div>
      <Modal>
        <p className='font-medium text-black mb-6'>
          Please enter the keys below to use the respective tools.
        </p>
        <form>
          <InputWrapper id='key' label='OpenAI' className='mt-5'>
            <Input placeholder='sk-****************************' id='key' name='key' />
          </InputWrapper>
          <SubmitButton className='w-full mt-5' formAction={handleSubmit}>
            Submit
          </SubmitButton>
        </form>
      </Modal>
    </div>
  );
};

export default ModalUserKeys;
