import { FC } from 'react';
import { getOpenaiKeyFromCookie, storeKeyInCookie } from '@/utils/cookie-store';
import InputWrapper from './InputWrapper';
import { Input } from './ui/input';
import { SubmitButton } from './SubmitButton';
import Modal from './Model';

const ModalUserKeys: FC = () => {
  const openAIKey = getOpenaiKeyFromCookie();

  if (openAIKey) {
    return null;
  }

  const handleSubmit = async (formData: FormData) => {
    'use server';

    const openAiKey = formData.get('openai');
    if (openAiKey) {
      storeKeyInCookie(openAiKey as string);
    }
  };

  return (
    <div>
      <Modal>
        <p className='font-medium text-black mb-6'>
          Please enter the keys below to use the respective tools.
        </p>
        <form>
          <InputWrapper id='openai' label='OpenAI' className='mt-5'>
            <Input placeholder='sk-****************************' id='openai' name='openai' />
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
