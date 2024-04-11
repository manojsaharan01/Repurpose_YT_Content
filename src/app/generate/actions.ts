'use server';

import { getUserDetails, supabaseServerClient } from '@/utils/supabase/server';

export async function updateContent(topic: string, style: string, response: string) {
  try {
    const user = await getUserDetails();

    const userId = user?.id;

    const supabase = supabaseServerClient();

    const { data, error } = await supabase
      .from('content_creations')
      .insert({
        user_id: userId!,
        topic,
        style,
        results: response,
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
