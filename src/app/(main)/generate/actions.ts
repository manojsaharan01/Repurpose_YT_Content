'use server';

import openaiCreateContent from '@/utils/openai';
import { getUserDetails, supabaseServerClient } from '@/utils/supabase/server';

export async function generateContentFn(formData: FormData) {
  try {
    const user = await getUserDetails();

    if (user == null) {
      throw 'Please login to create contents.';
    }

    const topic = formData.get('topic') as string;
    const style = formData.get('style') as string;

    if (!topic || !style) {
      throw 'Missing required fields.';
    }

    const supabase = supabaseServerClient();

    const response = await openaiCreateContent(topic, style);

    const { data, error } = await supabase
      .from('content_creations')
      .insert({
        user_id: user.id,
        topic,
        style,
        results: response.outputs,
      })
      .select()
      .single();

    if (error) {
      throw error.message;
    }

    return data;
  } catch (error) {
    return `${error}`;
  }
}
