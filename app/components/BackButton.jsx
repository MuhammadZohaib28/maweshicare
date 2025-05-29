'use client';
import { useRouter } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';

export default function BackButton() {
  const router = useRouter();
  
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
    >
      <FiArrowLeft className="mr-2" /> Back
    </button>
  );
}