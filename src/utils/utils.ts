import { toast } from '@/components/ui/use-toast';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// This utility function combines and deduplicates class names using clsx and twMerge.
export const errorToast = (description: string, title?: string) =>
  toast({ title, description, variant: 'destructive' });

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToEmbedUrl(youtubeUrl: string): string {
  const url = new URL(youtubeUrl);
  const videoId = url.searchParams.get('v');
  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }
  return `https://www.youtube.com/embed/${videoId}`;
}
