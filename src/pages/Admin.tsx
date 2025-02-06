import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { checkAdminStatus } from '../services/api';
import {
  LayoutDashboard,
  Users,
  ChevronLeft,
  ChevronRight,
  Calendar,
  GamepadIcon,
  Swords
} from 'lucide-react';

type MenuItem = {
  key: string;
  icon: JSX.Element;
  label: string;
}

export function Admin() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const isUserAdmin = await checkAdminStatus(user?.id as string);
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

    if (user?.id) {
      verifyAdmin();
    }
  }, [user, navigate]);

  const menuItems: MenuItem[] = [
    {
      key: 'dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: 'Dashboard',
    },
    {
      key: 'teams',
      icon: <Users className="w-5 h-5" />, 
      label: 'Manage Teams',
    },
    {
      key: 'schedule',
      icon: <Calendar className="w-5 h-5" />,
      label: 'Match Schedule', 
    },
    {
      key: 'rooms',
      icon: <GamepadIcon className="w-5 h-5" />,
      label: 'Rooms',
    },
    {
      key: 'matches',
      icon: <Swords className="w-5 h-5" />,
      label: 'Set Matches',
    }
  ];

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <Navbar />
      
      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div className={`bg-[#1a1a1a] border-r border-white/10 relative transition-all duration-300
                      ${collapsed ? 'w-20' : 'w-64'}`}>
          {/* Toggle Button */}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-4 top-6 bg-[#FF4655] p-2 rounded-full z-50
                     hover:bg-[#ff5e6b] transition-colors"
          >
            {collapsed ? 
              <ChevronRight className="w-4 h-4" /> : 
              <ChevronLeft className="w-4 h-4" />
            }
          </button>

          {/* Menu Items */}
          <div className="py-8 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveMenu(item.key)}
                className={`w-full px-4 py-3 flex items-center space-x-4
                         transition-colors hover:bg-[#FF4655]/10
                         ${activeMenu === item.key ? 'bg-[#FF4655]/10 text-[#FF4655]' : 'text-white/70'}`}
              >
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8">
          <div className="relative h-[30vh] bg-cover bg-center flex items-center justify-center mb-8"
               style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542751371-adc38448a05e)' }}>
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 text-center">
              <h1 className="text-4xl font-bold mb-4">
                ADMIN <span className="text-[#FF4655]">DASHBOARD</span>
              </h1>
            </div>
          </div>

          <div className="bg-[#1a1a1a] p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Welcome, Admin</h2>
            <p className="text-white/70">
              Manage tournaments, teams, and users from this dashboard. Use the sidebar navigation to access different sections.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}