import { Link } from "react-router-dom";

const DesktopHeader = () => {
  return (
    <header className="w-full">
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-6 py-3 bg-white text-black">
        {/* LEFT: SEARCH */}
        <div className="flex items-center gap-2 border-b border-black pb-1">
          <i className="fa-solid fa-magnifying-glass text-xl" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-xl placeholder-black/70"
          />
        </div>

        {/* CENTER: FREE SHIPPING */}
        <span className="text-xl tracking-widest font-light uppercase">
          Free Shipping
        </span>

        {/* RIGHT: LOGIN AND CART */}
        <div className="flex items-center gap-6 text-xl">
          {/* LOGIN */}
          <Link to="/login" className="flex items-center gap-2">
            <i className="fa-solid fa-user" />
            <span>Login</span>
          </Link>

          {/* CART */}
          <button className="flex items-center gap-2">
            <i className="fa-solid fa-bag-shopping" />
            <span>Cart (0)</span>
          </button>
        </div>
      </div>

      {/* SECOND BAR */}
      <div className="flex items-center justify-between px-6 py-5 bg-black">
        {/* LOGO */}
        <h1 className="text-3xl tracking-[0.3em] font-light text-white">
          VESTE
        </h1>

        {/* MENU */}
        <nav className="flex items-center gap-8 text-base uppercase tracking-wider text-white">
          <Link
            to="/"
            className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-full after:bg-white after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-full after:bg-white after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            Shop
          </Link>
          <Link
            to="/lookbook"
            className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-full after:bg-white after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            Lookbook
          </Link>
          <Link
            to="/customer-care"
            className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-full after:bg-white after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            Customer Care
          </Link>
          <Link
            to="/visit-us"
            className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-full after:bg-white after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            Visit Us
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default DesktopHeader;
