import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function DashboardIndex() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to summary page by default
    router.replace('/dashboard/summary');
  }, [router]);

  return null;
}


