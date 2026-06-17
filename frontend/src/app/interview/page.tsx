"use client";

import dynamic from 'next/dynamic';

const InterviewClient = dynamic(
  () => import('@/components/features/interview/InterviewClient'),
  { ssr: false }
);

export default function InterviewPage() {
  return <InterviewClient />;
}
