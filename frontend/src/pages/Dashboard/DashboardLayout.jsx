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
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">

      {/* SIDEBAR */}
      <aside className="bg-white border-b lg:border-b-0 lg:border-r border-gray-500 lg:w-64 lg:min-h-screen lg:sticky lg:top-0 lg:flex lg:flex-col">

        {/* MOBILE HEADER */}
        <div className="lg:hidden p-4 border-b border-gray-500 tracking-wider">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate("/shop")}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100"
              aria-label="Back to home"
            >
              <ArrowLeft size={24} />
            </button>

            <h1 className="text-xl font-medium">
              {pageTitle}
            </h1>
          </div>

          <div>
            <p className="font-normal text-base">
              {user?.name}
            </p>

            <p className="text-base font-normal text-gray-500">
              {user?.email}
            </p>
          </div>
        </div>


        {/* DESKTOP HEADER */}
        <div className="hidden lg:flex flex-col gap-4 p-6 border-b border-gray-500">
          <button
            onClick={() => navigate("/shop")}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-black w-fit"
          >
            <ArrowLeft size={22} />
            Back to Shop
          </button>

          <div>
            <p className="font-light text-sm truncate">
              {user?.name}
            </p>

            <p className="text-xs text-gray-500 truncate">
              {user?.email}
            </p>
          </div>
        </div>


        {/* NAVIGATION */}
        <nav className="flex lg:flex-col gap-2 p-3 lg:p-4 overflow-x-auto lg:overflow-visible lg:flex-1">

          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-black text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={22} />

              <span className="hidden sm:inline lg:inline">
                {label}
              </span>
            </NavLink>
          ))}


          {/* Desktop spacer only */}
          <div className="hidden lg:block lg:flex-1" />


          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-600 hover:bg-red-50 whitespace-nowrap"
          >
            <LogOut size={20} />

            <span className="hidden sm:inline lg:inline">
              Log out
            </span>
          </button>

        </nav>

      </aside>


      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 lg:p-10">
        <Outlet />
      </main>

    </div>
  );
};

export default DashboardLayout;