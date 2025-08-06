import { usePage, router } from '@inertiajs/react';
import { useEffect } from 'react';

export default function ProtectedLayout({ children }) {
  const { props } = usePage();
  const user = props.auth?.user;

  useEffect(() => {
    if (!user) {
      router.visit('/login');
    }
  }, [user]);

  if (!user) {
    return <div>Redirection en cours...</div>;
  }

  return (
    <div>
      {/* Tu peux ajouter ici un <Navbar /> si tu veux */}
      {children}
    </div>
  );
}
