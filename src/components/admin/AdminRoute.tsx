import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { checkAdminStatus } from '../../services/api';
import { ClipLoader } from 'react-spinners';

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        if (!user?.id) {
          navigate('/');
          return;
        }
        
        const isUserAdmin = await checkAdminStatus(user.id);
        if (!isUserAdmin) {
          navigate('/');
          return;
        }
        
        setIsAdmin(true);
      } catch (error) {
        console.error('Error:', error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    verifyAdmin();
  }, [user, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#111] flex items-center justify-center">
        <ClipLoader color="#FF4655" size={40} />
      </div>
    );
  }

  return isAdmin ? children : null;
}