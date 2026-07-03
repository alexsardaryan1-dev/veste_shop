import { useContext } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingBag, User } from "lucide-react";
import { AuthContext } from "../../../context/AuthContext";

const DesktopHeader = () => {
  const { user } = useContext(AuthContext);

  const navLinkClass =
    "relative inline-block text-white after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-full after:bg-white after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100";

  return (
    <header className="w-full">

      {/* TOP BAR */}
      <div className="flex items-center justify-between px-6 py-3 bg-white text-black">

        <div className="flex items-center gap-2 border-b border-black pb-1">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-xl placeholder-black/70"
          />
        </div>

        <span className="text-xl tracking-widest font-light uppercase">
          Free Shipping
        </span>

        <div className="flex items-center gap-6 text-xl">
          <button className="flex items-center gap-2">
            <ShoppingBag size={20} />
            <span>Cart (0)</span>
          </button>

          {!user ? (
            <Link to="/login" className="flex items-center gap-2">
              <User size={20} />
              <span>Login</span>
            </Link>
          ) : (
            <Link to="/dashboard" className="flex items-center gap-2">
              <User size={20} />
              <span>My Profile</span>
            </Link>
          )}
        </div>
      </div>

      {/* SECOND BAR */}
      <div className="flex items-center justify-between px-6 py-5 bg-black">

        <h1 className="text-3xl tracking-[0.3em] font-light text-white">
          VESTE
        </h1>

        <nav className="flex items-center gap-8 text-base uppercase tracking-wider text-white">
          <Link to="/" className={navLinkClass}>Home</Link>
          <Link to="/shop" className={navLinkClass}>Shop</Link>
          <Link to="/lookbook" className={navLinkClass}>Lookbook</Link>
          <Link to="/customer-care" className={navLinkClass}>Customer Care</Link>
          <Link to="/visit-us" className={navLinkClass}>Visit Us</Link>
        </nav>

      </div>
    </header>
  );
};

export default DesktopHeader;