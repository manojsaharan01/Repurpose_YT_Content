'use client';

import { TypeYoutubeContent } from '@/types/types';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import ModalDeleteContent from './ModalDeleteContent';
import TopicCell from './ContentRow';

export const columns: ColumnDef<TypeYoutubeContent>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: 'youtube_title',
    header: 'Title',
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
      return <ModalDeleteContent row={row} />;
    },
  },
];
