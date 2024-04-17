import { cookies } from 'next/headers';

export type TypeKeysInCookie = 'openai';

export function getKeyFromCookie(keyName: TypeKeysInCookie) {
  const cookieStore = cookies();
  const key = cookieStore.get(`x-${keyName}-key`)?.value;
  return key;
}

export function storeKeyInCookie(openAiKey: string) {
  const cookieStore = cookies();

  const sevenDays = 7 * 24 * 60 * 60 * 1000;

  console.log(openAiKey);
  

  const options = {
    // domain: 'builderkit.ai',
    secure: true,
    maxAge: sevenDays,
    httpOnly: true,
  };

  cookieStore.set('x-openai-key', openAiKey, options);
}
