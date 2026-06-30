"use client";

import { use } from 'react';
import dynamic from 'next/dynamic';

const InterviewClient = dynamic(
  () => import('@/components/features/interview/InterviewClient'),
  { ssr: false }
);

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function InterviewPage({ params }: PageProps) {
  const { id } = use(params);
  return <InterviewClient sessionId={id} />;
}
