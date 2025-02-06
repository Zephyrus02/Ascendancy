import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, GamepadIcon, Swords, ChevronLeft, ChevronRight } from 'lucide-react';

interface MenuItem {
  key: string;
  icon: JSX.Element;
  label: string;
  path: string;
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    {
      key: 'dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: 'Dashboard',
      path: '/admin'
    },
    {
      key: 'teams',
      icon: <Users className="w-5 h-5" />,
      label: 'Manage Teams',
      path: '/admin/teams'
    },
    {
      key: 'schedule',
      icon: <Calendar className="w-5 h-5" />,
      label: 'Match Schedule',
      path: '/admin/schedule'
    },
    {
      key: 'rooms',
      icon: <GamepadIcon className="w-5 h-5" />,
      label: 'Rooms',
      path: '/admin/room'
    },
    {
      key: 'matches',
      icon: <Swords className="w-5 h-5" />,
      label: 'Set Matches',
      path: '/admin/matches'
    }
  ];

  return (
    <div className={`bg-[#1a1a1a] border-r border-white/10 relative transition-all duration-300
                    ${collapsed ? 'w-20' : 'w-64'}`}>
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

      <div className="py-8 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => navigate(item.path)}
            className={`w-full px-4 py-3 flex items-center space-x-4
                     transition-colors hover:bg-[#FF4655]/10
                     ${location.pathname === item.path ? 'bg-[#FF4655]/10 text-[#FF4655]' : 'text-white/70'}`}
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}