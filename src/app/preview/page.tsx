import React from 'react';
import { redirect } from 'next/navigation';
import { getUserDetails, supabaseServerClient } from '@/utils/supabase/server';
import openaiCreateContent from '@/utils/openai';
import { revalidatePath } from 'next/cache';
import GeneratedContent from '@/components/GeneratedContent';

//todo temporary i used white bg color in future we will change it
type TypesParams = {
  searchParams: { error: string; id: string };
};
export default async function Home({ searchParams }: TypesParams) {
  const supabase = supabaseServerClient();

  const { data } = await supabase
    .from('content_creations')
    .select()
    .order('created_at', { ascending: false });

  const createContentFn = async (formData: FormData) => {
    'use server';

    const topic = formData.get('topic') as string;
    const style = formData.get('style') as string;

    if (!topic || !style) {
      return redirect(`/preview?error=Required fields are missing.`);
    }

    const supabase = supabaseServerClient();
    const user = await getUserDetails();

    if (user == null) {
      return redirect(`/preview?error=Please login to create contents.`);
    }

    try {
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <GeneratedContent searchParams={searchParams} createContentFn={createContentFn} data={data} />
    </>
  );
}
