import { FC } from 'react';
import { getKeyFromCookie } from '@/utils/cookie-store';
import { storeKeyInCookie } from './storeKeyInCookie';
import Modal from './ui/model';
import InputWrapper from './InputWrapper';
import { Input } from './ui/input';
import { SubmitButton } from './SubmitButton';

const ModalUserKeys: FC = () => {
  const openAIKey = getKeyFromCookie('openai-key');

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
        <p className='text-lg font-medium'>Please enter the key below to use the respective tools.</p>
        <form>
          <InputWrapper id='key' label='OpenAI API Key' className='mt-5'>
            <Input className='' placeholder='sk-**********' id='key' name='key' />
          </InputWrapper>
          <SubmitButton className='w-full mt-5' formAction={handleSubmit}>
            Generate
          </SubmitButton>
        </form>
      </Modal>
    </div>
  );
};

export default ModalUserKeys;
