import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { FaPlus } from 'react-icons/fa';
import SidebarItems from './SidebarItems';
import UserButton from './UserButton';
import Link from 'next/link';
import SidebarUpgradePlan from './SidebarUpgradePlan';
import { SidebarRoutes } from './content';

const Sidebar = () => {
  return (
    <div className='h-full border rounded-xl p-2.5 flex flex-col justify-between'>
      <div>
        <div className='mb-6'>
          <Logo />
        </div>

        <Link href='/home'>
          <Button size='lg' className='w-full mb-3'>
            <FaPlus className='mr-2' /> New Content
          </Button>
        </Link>

        <div className='space-y-1'>
          {SidebarRoutes?.map((item) => <SidebarItems key={item.label} route={item} />)}
        </div>
      </div>

      <div className='space-y-3'>
        <SidebarUpgradePlan />

        <UserButton />
      </div>
    </div>
  );
};

export default Sidebar;
