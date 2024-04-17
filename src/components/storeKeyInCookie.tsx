import { cookies } from 'next/headers';

export function storeKeyInCookie(openAiKey: string) {
  const cookieStore = cookies();

  const sevenDays = 7 * 24 * 60 * 60 * 1000;

  const options = {
    domain: 'builderkit.ai',
    secure: true,
    maxAge: sevenDays,
    httpOnly: true,
  };

  cookieStore.set('x-openai-key', openAiKey, options);
}
