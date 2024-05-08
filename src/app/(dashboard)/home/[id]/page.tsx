import Navbar from '@/components/dashboard/Navbar';
import InputForm from '@/components/dashboard/generate/InputForm';
import { supabaseServerClient } from '@/utils/supabase/server';

export default async function Generate({ params }: { params: { id: string } }) {
  const supabase = supabaseServerClient();

  const { data } = await supabase
    .from('content_creations')
    .select()
    .eq('id', params.id)
    .not('results', 'is', null)
    .order('created_at', { ascending: false });

  return (
    <div className='p-2 flex flex-col justify-between min-h-screen'>
      <div>
        <Navbar>
          <div className='text-lg font-semibold mt-5 mb-7'>Content Writer</div>
        </Navbar>
        <InputForm generatedData={data?.[0]} />
      </div>
    </div>
  );
}
