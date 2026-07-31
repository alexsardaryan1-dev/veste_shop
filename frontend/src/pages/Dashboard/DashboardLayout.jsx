import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

import {
  User,
  Package,
  ShoppingCart,
  Heart,
  Settings as SettingsIcon,
  ArrowLeft,
  LogOut,
} from "lucide-react";

const navItems = [
  { to: "/dashboard/profile", label: "Profile", icon: User },
  { to: "/dashboard/orders", label: "Orders", icon: Package },
  { to: "/dashboard/cart", label: "Cart", icon: ShoppingCart },
  { to: "/dashboard/favorites", label: "Favorites", icon: Heart },
  { to: "/dashboard/settings", label: "Settings", icon: SettingsIcon },
];

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, setUser } = useContext(AuthContext);

  const pageTitle =
    navItems.find((item) => item.to === location.pathname)?.label ||
    "Dashboard";

  const initial = user?.name?.charAt(0).toUpperCase() || "?";

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-start min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="bg-white border-b lg:border-b-0 lg:border-r border-gray-300 lg:w-64 lg:h-screen lg:sticky lg:top-0 flex flex-col">
        {/* HEADER (shared mobile + desktop) */}
        <div className="p-4 lg:p-6 border-b border-gray-300 tracking-wider flex flex-col gap-4 shrink-0">
          <button
            onClick={() => navigate("/shop")}
            className="flex items-center gap-2 text-sm lg:text-base uppercase text-gray-500 hover:text-black transition duration-200 w-fit"
          >
            <ArrowLeft size={18} />
            Back to Shop
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-base font-medium shrink-0">
              {initial}
            </div>
            <div className="min-w-0">
              <p className="font-medium text-black text-sm lg:text-base truncate">
                {user?.name}
              </p>
              <p className="text-xs lg:text-sm text-gray-500 truncate">
                {user?.email}
              </p>
            </div>
          </div>

          <p className="lg:hidden text-xs uppercase tracking-widest text-gray-400">
            {pageTitle}
          </p>
        </div>

        {/* NAVIGATION */}
        <nav className="flex lg:flex-col gap-1 p-2 lg:p-4 overflow-x-auto lg:overflow-y-auto lg:flex-1 tracking-wider">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-xs lg:text-base uppercase whitespace-nowrap transition duration-200 ${
                  isActive
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-black"
                }`
              }
            >
              <Icon size={18} />
              <span className="hidden sm:inline">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="hidden lg:flex items-center gap-3 px-4 py-3 mx-2 mb-4 rounded-lg text-xs lg:text-base uppercase text-red-500 hover:bg-red-50 transition duration-200 whitespace-nowrap shrink-0"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Log out</span>
        </button>
      </aside>

      {/* MOBILE LOGOUT (inline with nav row) */}
      <button
        onClick={handleLogout}
        className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 text-xs uppercase text-red-500 border-t border-gray-300 bg-white"
      >
        <LogOut size={16} />
        Log out
      </button>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 lg:p-10 min-w-0">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
