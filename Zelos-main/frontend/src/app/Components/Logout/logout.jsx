'use client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-900 transition"
    >
      Sair
    </button>
  );
}
