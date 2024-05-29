import UpgradePlan from '@/components/dashboard/UpgradePlan';
import { DataTable } from '@/components/dashboard/history/HistoryTable';
import { columns } from '@/components/dashboard/history/columns';
import { supabaseServerClient } from '@/utils/supabase/server';

const page = async () => {
  const supabase = supabaseServerClient();

  // Retrieves all content creation entries from 'content_creations' table
  // Ordered by creation date, newest first

  return (
    <div className='flex flex-col justify-between items-center h-[calc(100vh-86px)]'>
      <div className='w-full'>
        <DataTable columns={columns} data={[]} />
      </div>
      <UpgradePlan />
    </div>
  );
};

export default page;
