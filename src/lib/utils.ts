import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};


export const calculateCountdown = (startDate: string) => {
  const now = new Date();
  const start = new Date(startDate);
  const totalSeconds = Math.floor((start.getTime() - now.getTime()) / 1000);
  
  return {
    days: Math.floor(totalSeconds / (3600 * 24)),
    hours: Math.floor((totalSeconds % (3600 * 24)) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
};