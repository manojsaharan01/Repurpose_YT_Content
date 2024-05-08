import Navbar from '@/components/dashboard/Navbar';
import UpgradePlan from '@/components/dashboard/UpgradePlan';
import { DataTable } from '@/components/dashboard/history/HistoryTable';
import { columns } from '@/components/dashboard/history/columns';
import { supabaseServerClient } from '@/utils/supabase/server';
import React from 'react';

const page = async () => {
  const supabase = supabaseServerClient();

  // Retrieves all content creation entries from 'content_creations' table
  // Ordered by creation date, newest first
  const { data } = await supabase
    .from('content_creations')
    .select()
    .order('created_at', { ascending: false })
    .not('topic', 'is', null);

  return (
    <div className='p-2 flex flex-col justify-between'>
      <div>
        <Navbar>
          <div className='text-lg font-semibold mt-5 mb-7'>History</div>
        </Navbar>
        <DataTable columns={columns} data={data ?? []} />
      </div>
      <UpgradePlan />
    </div>
  );
};

export default page;
