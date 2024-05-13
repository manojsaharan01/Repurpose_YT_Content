'use client';

import { toast } from '@/components/ui/use-toast';
import { TypeContent } from '@/types/types';
import { supabaseBrowserClient } from '@/utils/supabase/client';
import { cn, errorToast } from '@/utils/utils';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { FaRegTrashAlt } from 'react-icons/fa';
import { format } from 'date-fns';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { buttonVariants } from '@/components/ui/button';

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
    cell: ({ row }) => <TopicCell row={row} />,
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
    cell: ({ row }) => {
      return <DeleteActionCell row={row} />;
    },
  },
];

const DeleteActionCell = ({ row }: { row: any }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const supabase = supabaseBrowserClient();

    try {
      const { error } = await supabase.from('content_creations').delete().eq('id', row.original.id);

      if (!error) {
        toast({ title: 'Content deleted successfully', variant: 'default' });
        router.refresh();
      } else {
        errorToast('Something went wrong, please try again');
      }
    } catch (error) {
      console.error('Error deleting content:', error);
      errorToast('Something went wrong, please try again');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='flex justify-end'>
          <div className='rounded p-1 border cursor-pointer'>
            <FaRegTrashAlt className='size-5' />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from
            our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}>Cancel</DialogClose>
          <DialogClose
            className={cn(buttonVariants({ variant: 'destructive' }), 'w-full')}
            onClick={handleDelete}>
            Delete
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const TopicCell = ({ row }: { row: any }) => {
  const router = useRouter();

  const handlePush = (id: string) => {
    router.push(`/home/${id}`);
  };

  return (
    <div className='cursor-pointer' onClick={() => handlePush(row.original.id)}>
      <div>
        {row.original.topic.length > 40 ? `${row.original.topic.substring(0, 40)} ...` : row.original.topic}
      </div>
    </div>
  );
};
