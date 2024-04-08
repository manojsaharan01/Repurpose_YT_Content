'use server';

import openaiCreateContent from '@/utils/openai';
import { getUserDetails, supabaseServerClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function generateContentFn(formData: FormData) {
  try {
    const user = await getUserDetails();

    if (user == null) {
      throw new Error('Please login to create contents.');
    }

    const topic = formData.get('topic') as string;
    const style = formData.get('style') as string;

    if (!topic || !style) {
      throw new Error('Missing required fields.');
    }

    const supabase = supabaseServerClient();

    const response = await openaiCreateContent(topic, style);

    const { error } = await supabase.from('content_creations').insert({
      user_id: user.id,
      topic,
      style,
      results: response.outputs,
    });

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath('/preview');
    
    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
