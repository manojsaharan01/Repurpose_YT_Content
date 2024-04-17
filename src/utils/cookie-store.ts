import { cookies } from 'next/headers';

export type TypeKeysInCookie = 'openai-key';

export function getKeyFromCookie(keyName: TypeKeysInCookie) {
  const cookieStore = cookies();
  const key = cookieStore.get(`x-${keyName}`)?.value;
  return key;
}
