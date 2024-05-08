'use client';

import { toast } from '@/components/ui/use-toast';
import { TypeContent } from '@/types/types';
import { supabaseBrowserClient } from '@/utils/supabase/client';
import { errorToast } from '@/utils/utils';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { FaRegTrashAlt } from 'react-icons/fa';
import { format } from 'date-fns';

export const columns: ColumnDef<TypeContent>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: 'topic',
    header: 'Topic',
    cell: ({ row }) => {
      const router = useRouter();
      const handlePush = (id: string) => {
        router.push(`/home/${id}`);
      };

      return (
        <div className='cursor-pointer' onClick={() => handlePush(row.original.id)}>
          <div>
            {row.original.topic.length > 40
              ? `${row.original.topic.substring(0, 40)} ...`
              : row.original.topic}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
    cell: ({ row }) => {
      return <div>{format(new Date(row.original.created_at), 'MMM dd, yyyy')}</div>;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const supabase = supabaseBrowserClient();
      const router = useRouter();
      return (
        <div
          className='rounded w-fit p-1 border border-red-200 cursor-pointer'
          onClick={async () => {
            const { error } = await supabase.from('content_creations').delete().eq('id', row.original.id);

            if (!error) {
              toast({ title: 'Content deleted successfully', variant: 'default' });
              router.refresh();
            } else {
              errorToast('Something went wrong, please try again');
            }
          }}>
          <FaRegTrashAlt className='text-red-500 size-5' />
        </div>
      );
    },
  },
];
