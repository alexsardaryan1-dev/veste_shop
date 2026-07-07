import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

import {
  User,
  Package,
  ShoppingCart,
  Heart,
  Settings as SettingsIcon,
  ArrowLeft,
  LogOut,
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Back', icon: ArrowLeft },
  { to: '/dashboard/profile', label: 'Profile', icon: User },
  { to: '/dashboard/orders', label: 'Orders', icon: Package },
  { to: '/dashboard/cart', label: 'Cart', icon: ShoppingCart },
  { to: '/dashboard/favorites', label: 'Favorites', icon: Heart },
  { to: '/dashboard/settings', label: 'Settings', icon: SettingsIcon },
];

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await api.post('/api/auth/logout');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className='flex flex-col lg:flex-row min-h-screen'>

      {/* SIDEBAR */}
      <aside className='border-b lg:border-b-0 lg:border-r border-gray-200 lg:w-64'>

        <nav className='flex overflow-x-auto gap-2 p-3 lg:flex-col lg:overflow-visible lg:p-6'>

          {/* NAV ITEMS */}
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm whitespace-nowrap lg:whitespace-normal transition-colors ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}

          {/* LOGOUT ACTION */}
          <button
            onClick={handleLogout}
            className='flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-600 hover:bg-red-50 lg:mt-4'
          >
            <LogOut size={18} />
            Log out
          </button>

        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className='flex-1 bg-gray-50 p-4 lg:p-10'>
        <Outlet />
      </main>

    </div>
  );
};

export default DashboardLayout;