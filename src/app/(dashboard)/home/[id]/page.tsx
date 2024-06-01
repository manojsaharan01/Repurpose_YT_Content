import GeneratedOutput from '@/components/dashboard/generate/GeneratedOutput';
import { supabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Generate({ params }: { params: { id: string } }) {
  const supabase = supabaseServerClient();

  const id = params.id;
  const { data } = await supabase.from('youtube_content_generator').select('*').eq('id', id).single();

  if (!data) {
    redirect('/home');
  }
  return <GeneratedOutput data={data} />;
}
