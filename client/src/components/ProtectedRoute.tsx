import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { auth } from '@/lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      setLocation('/login');
    }
  }, [setLocation]);

  if (!auth.isAuthenticated()) {
    return null;
  }

  return <>{children}</>;
}
