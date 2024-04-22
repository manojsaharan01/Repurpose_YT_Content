// Layout component that includes the Navbar and ensures user authentication

import Navbar from '@/components/generate/Navbar';
import { getUserDetails } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

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
    <>
      <Navbar />
      {children}
    </>
  );
}
