'use server';

import { getUserDetails, supabaseServerClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function generateContentFn(formData: FormData, response: string) {
  try {
    const user = await getUserDetails();

    console.log(response);

    if (user == null) {
      throw new Error('Please login to create contents.');
    }

    const topic = formData.get('topic') as string;
    const style = formData.get('style') as string;

    if (!topic || !style) {
      throw new Error('Missing required fields.');
    }

    const supabase = supabaseServerClient();

    const { data, error } = await supabase
      .from('content_creations')
      .insert({
        user_id: user.id,
        topic,
        style,
        results: response,
      })
      .select()
      .single();

    console.log(data);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath('/generate');

    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
