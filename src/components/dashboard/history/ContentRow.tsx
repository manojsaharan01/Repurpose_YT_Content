import { useRouter } from 'next/navigation';

const TopicCell = ({ row }: { row: any }) => {
  const router = useRouter();

  const handlePush = (id: string) => {
    router.push(`/home/${id}`);
  };

  return (
    <div className='cursor-pointer' onClick={() => handlePush(row.original.id)}>
      <div className='w-48 truncate'>{row.original.youtube_title}</div>
    </div>
  );
};

export default TopicCell;
