// Main component for the content creation interface
// Contains a form to create content and displays the latest content creation entries from the database

import { supabaseServerClient } from '@/utils/supabase/server';
import FormInput from '@/components/generate/FormInput';

export default async function Generate() {
  const supabase = supabaseServerClient();

  // Retrieves all content creation entries from 'content_creations' table
  // Ordered by creation date, newest first
  const { data } = await supabase
    .from('content_creations')
    .select()
    .order('created_at', { ascending: false });

  return (
    <>
      <div className='max-w-6xl mx-auto pt-14'>
        <FormInput data={data!} />
      </div>
    </>
  );
}
