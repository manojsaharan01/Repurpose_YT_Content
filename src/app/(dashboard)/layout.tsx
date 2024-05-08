// Layout component that includes the Navbar and ensures user authentication

import { getUserDetails } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { ThemeProvider } from '@/components/theme-provider';
import Sidebar from '@/components/dashboard/sidebar/Sidebar';

type Props = {
  children: React.ReactNode;
};

// Server-side component to check user authentication and render the Navbar
export default async function Layout({ children }: Props) {
  const user = await getUserDetails();

  // Redirects to login page if user is not authenticated
  if (user == null) {
    redirect('/login');
  }

  return (
    // Wraps a ThemeProvider around the Navbar and children components. It allows user to switch between light and dark themes.
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
      <div className='max-w-[90rem] min-h-screen mx-auto'>
        <div className='hidden md:flex w-[17rem] flex-col inset-y-0 fixed z-50'>
          <Sidebar />
        </div>
        <div className='md:pl-[17rem] w-full'>{children}</div>
      </div>
    </ThemeProvider>
  );
}
