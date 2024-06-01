import UpgradePlan from '@/components/dashboard/UpgradePlan';
import { DataTable } from '@/components/dashboard/history/HistoryTable';
import { columns } from '@/components/dashboard/history/columns';
import { supabaseServerClient } from '@/utils/supabase/server';
import { errorToast } from '@/utils/utils';

const page = async () => {
  const supabase = supabaseServerClient();

  // Retrieves all content creation entries from 'content_creations' table
  // Ordered by creation date, newest first

  const { data, error } = await supabase
    .from('youtube_content_generator')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    errorToast('Something went wrong, please try again');
  }

  if (!data) {
    return null;
  }

  return (
    <div className='flex flex-col justify-between items-center h-[calc(100vh-86px)]'>
      <div className='w-full'>
        <DataTable columns={columns} data={data} />
      </div>
      <UpgradePlan />
    </div>
  );
};

export default page;
