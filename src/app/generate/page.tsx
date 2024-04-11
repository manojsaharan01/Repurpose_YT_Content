import { supabaseServerClient } from '@/utils/supabase/server';
import FormInput from '@/components/generate/FormInput';
import Navbar from '@/components/generate/Navbar';

export default async function Home() {
  const supabase = supabaseServerClient();

  const { data } = await supabase
    .from('content_creations')
    .select()
    .order('created_at', { ascending: false });

  return (
    <>
      <Navbar />
      <div className='max-w-6xl mx-auto pt-14'>
        <FormInput data={data!} />
      </div>
    </>
  );
}
