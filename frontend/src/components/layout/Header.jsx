import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  User,
  Heart,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

const shopLinks = [
  { to: "/shop?category=men", label: "Men" },
  { to: "/shop?category=women", label: "Women" },
  { to: "/shop?category=accessories", label: "Accessories" },
  { to: "/shop?category=sale", label: "Sale" },
];

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/lookbook", label: "Lookbook" },
  { to: "/customer-care", label: "Customer Care" },
  { to: "/visit-us", label: "Visit Us" },
];

const Header = () => {
  const { user } = useContext(AuthContext);
  // user exists when someone is logged in.
  const { cartCount } = useContext(CartContext);
  // Used to show the number near the cart icon.
  const { wishlistItems } = useContext(WishlistContext);
  // Get wishlist products from global WishlistContext.
  const navigate = useNavigate();
  // Example: after search, redirect user to /shop.

  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const headerRef = useRef(null);
  // useRef gives direct access to the header DOM element.
  // We use it to measure header height.

  const navLinkClass =
    "relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-full after:bg-white after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100";
  // This helps me to create an underline animation on hover.

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        document.documentElement.style.setProperty(
          "--header-height",
          `${headerRef.current.offsetHeight}px`,
        );
      }
    };
    // We use useEffect when useEffect when we want React to do something after the component appears or after some data changes. React's main job: State -> JSX -> UI. But sometimes our component needs to intearct with the outside world: browser APIs, APIs/backend, timers, event listeners, localStorage, DOM elements, subscriptions. For them we use useEffect.
    // For example,
    // useEffect(() => {
    //      console.log(user);
    // }, [user]);
    // When user changes, run this code.

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, [mobileSearchOpen]);
  // When the header appears or mobile search opens/closes, recalculate the header height.

  const runSearch = () => {
    const trimmed = searchQuery.trim();
    // Removes extra spaces.
    if (!trimmed) return;
    // Does nothing if search is empty.
    navigate(`/shop?search=${encodeURIComponent(trimmed)}`);
    // Navigates user to shop page with search query.
    setMobileSearchOpen(false);
    // Close mobile search after searching.
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      runSearch();
    }
  };
  // Allows pressing ENTER to search.

  return (
    <header
      ref={headerRef}
      className="w-full fixed top-0 left-0 right-0 z-[100]"
    >
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 lg:px-6 py-3 bg-white text-black">
        <div className="hidden md:flex items-center gap-2 border-b border-black pb-1">
          <button type="button" onClick={runSearch} aria-label="Search">
            <Search size={20} />
          </button>
          <input
            type="text"
            placeholder="Search"
            aria-label="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="bg-transparent outline-none text-xl placeholder-black/70"
          />
        </div>

        <button
          type="button"
          className="md:hidden"
          aria-label="Search"
          onClick={() => setMobileSearchOpen((prev) => !prev)}
        >
          <Search size={20} />
        </button>

        <span className="text-xl tracking-wider font-light uppercase">
          Free Shipping
        </span>

        <div className="flex items-center gap-4 lg:gap-6 text-base lg:text-xl">
          <Link
            to="/dashboard/favorites"
            className="relative flex items-center justify-center"
            aria-label="Wishlist"
          >
            <Heart size={20} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-light text-white">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link
            to="/dashboard/cart"
            className="relative flex items-center justify-center"
            aria-label="Open cart"
          >
            <ShoppingBag size={20} />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-light text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {!user ? (
            <Link to="/login" className="flex items-center gap-2">
              <User size={20} />
              <span className="hidden sm:inline">Login</span>
            </Link>
          ) : (
            <Link to="/dashboard/profile" className="flex items-center gap-2">
              <User size={20} />
            </Link>
          )}
        </div>
      </div>

      {/* MOBILE SEARCH BAR */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 py-3 bg-white border-t border-black flex items-center gap-2">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search products..."
            aria-label="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            autoFocus
            className="flex-1 outline-none text-base"
          />
          <button
            type="button"
            onClick={runSearch}
            className="flex items-center justify-center"
            aria-label="Search"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      )}

      {/* SECOND BAR */}
      <div className="flex items-center justify-between px-4 lg:px-6 py-5 bg-black text-white">
        <h1 className="text-2xl lg:text-3xl tracking-[0.3em] font-light">
          <Link to="/">VESTE</Link>
        </h1>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-8 text-lg uppercase tracking-wider">
          <Link to="/" className={navLinkClass}>
            Home
          </Link>

          <div className="relative group">
            <Link to="/shop" className={navLinkClass}>
              Shop
            </Link>
            <div className="absolute top-full left-0 pt-4 hidden group-hover:block">
              <div className="bg-white text-black flex flex-col min-w-[160px] shadow-lg py-2">
                {shopLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className="px-4 py-2 hover:bg-gray-100 normal-case tracking-normal"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link to="/lookbook" className={navLinkClass}>
            Lookbook
          </Link>
          <Link to="/customer-care" className={navLinkClass}>
            Customer Care
          </Link>
          <Link to="/visit-us" className={navLinkClass}>
            Visit Us
          </Link>
        </nav>

        {/* BURGER (mobile or tablet) */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="lg:hidden border border-white p-1.5"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* MOBILE MENU DRAWER */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />
      <nav
        aria-label="Main navigation"
        aria-modal="true"
        role="dialog"
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 transform transition-transform duration-300 lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col gap-8 text-black font-light tracking-wider h-full overflow-y-auto">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="self-end bg-black text-white p-3"
          >
            <X size={20} />
          </button>

          <ul className="flex flex-col gap-4 text-lg uppercase">
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>

            <li>
              <div className="flex items-center justify-between">
                <Link to="/shop" onClick={() => setMenuOpen(false)}>
                  Shop
                </Link>
                <button
                  type="button"
                  onClick={() => setShopOpen((prev) => !prev)}
                  aria-label="Toggle shop categories"
                  aria-expanded={shopOpen}
                  aria-controls="shop-categories"
                >
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${shopOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              {shopOpen && (
                <ul
                  id="shop-categories"
                  className="mt-3 ml-4 flex flex-col gap-3 text-lg normal-case"
                >
                  {shopLinks.map(({ to, label }) => (
                    <li key={to}>
                      <Link to={to} onClick={() => setMenuOpen(false)}>
                        #{label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {navLinks
              .filter((l) => l.to !== "/")
              .map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} onClick={() => setMenuOpen(false)}>
                    {label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
