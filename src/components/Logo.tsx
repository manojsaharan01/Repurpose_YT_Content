// Logo Component that redirects users to the homepage.
// It is used across various parts of the application to provide a consistent way to return to the main page.

'use client';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  const { theme } = useTheme();
  const logoSrc = theme === 'dark' ? '/dark-logo.png' : '/light-logo.png';

  return (
    <Link href='/'>
      <div className='flex items-center gap-2 w-fit'>
        <Image src={logoSrc} width={150} height={128} alt='logo' />
      </div>
    </Link>
  );
}
