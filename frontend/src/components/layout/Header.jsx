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
  const {
    cartItems,
    cartCount,
    isMiniCartOpen,
    closeMiniCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const miniCartRef = useRef(null);

  const navLinkClass =
    "relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-full after:bg-white after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100";

  const getImage = (item) => item.images?.[0]?.image_url || item.images?.[0];
  const getPrice = (item) => Number(item.sale_price || item.price);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + getPrice(item) * item.quantity,
    0,
  );

  useEffect(() => {
    if (!isMiniCartOpen) return;
    const handleClickOutside = (e) => {
      if (miniCartRef.current && !miniCartRef.current.contains(e.target)) {
        closeMiniCart();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMiniCartOpen, closeMiniCart]);

  const runSearch = () => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;
    navigate(`/shop?search=${encodeURIComponent(trimmed)}`);
    setMobileSearchOpen(false);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      runSearch();
    }
  };

  return (
    <header className="w-full">
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 lg:px-6 py-3 bg-white text-black">
        <div className="hidden md:flex items-center gap-2 border-b border-black pb-1">
          <button type="button" onClick={runSearch} aria-label="Search">
            <Search size={20} />
          </button>
          <input
            type="text"
            placeholder="Search"
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
          <Search size={22} />
        </button>

        <span className="hidden md:block text-xl tracking-widest font-light uppercase">
          Free Shipping
        </span>

        <div className="flex items-center gap-4 lg:gap-6 text-base lg:text-xl">
          <Link to="/dashboard/favorites" className="relative flex items-center justify-center">
            <Heart size={22} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <div className="relative" ref={miniCartRef}>
            <Link to="/cart" className="relative flex items-center justify-center" aria-label="Open cart">
              <ShoppingBag size={22} />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {isMiniCartOpen && (
              <div className="fixed inset-0 z-50 flex items-start justify-end sm:items-start sm:absolute sm:inset-auto sm:top-full sm:right-0 sm:mt-4">
                <div className="bg-white text-black shadow-lg border border-gray-200 w-full h-full sm:h-auto sm:w-80 flex flex-col">
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <span className="text-sm font-medium">
                      Cart ({cartCount})
                    </span>
                    <button type="button" onClick={closeMiniCart} aria-label="Close">
                      <X size={18} />
                    </button>
                  </div>

                  {cartItems.length > 0 && (
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-xs text-gray-500 hover:text-red-500 underline self-end px-4 pt-2"
                    >
                      Clear Cart
                    </button>
                  )}

                  <div className="flex-1 overflow-y-auto flex flex-col divide-y divide-gray-100">
                    {cartItems.length === 0 ? (
                      <p className="p-4 text-sm text-gray-400">
                        Your cart is empty.
                      </p>
                    ) : (
                      cartItems.map((item) => (
                        <div
                          key={`${item.id}-${item.size || "nosize"}`}
                          className="flex items-center gap-3 p-3"
                        >
                          <img
                            src={getImage(item)}
                            alt={item.name}
                            className="w-14 h-14 object-cover bg-gray-100 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm truncate">{item.name}</p>
                            {item.size && (
                              <span className="text-xs text-gray-400">Size: {item.size}</span>
                            )}
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center border border-gray-300">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(item.id, item.size, item.quantity - 1)
                                  }
                                  className="px-2 text-xs"
                                >
                                  −
                                </button>
                                <span className="px-2 text-xs">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(item.id, item.size, item.quantity + 1)
                                  }
                                  className="px-2 text-xs"
                                >
                                  +
                                </button>
                              </div>
                              <span className="text-xs text-gray-500">
                                ${getPrice(item).toFixed(2)}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id, item.size)}
                            aria-label="Remove"
                            className="text-gray-400"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {cartItems.length > 0 && (
                    <div className="p-4 border-t border-gray-200 flex flex-col gap-3">
                      <div className="flex justify-between text-sm font-medium">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <Link
                        to="/cart"
                        onClick={closeMiniCart}
                        className="bg-black text-white text-center py-2 text-sm uppercase"
                      >
                        View Cart
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {!user ? (
            <Link to="/login" className="hidden sm:flex items-center gap-2">
              <User size={20} />
              <span>Login</span>
            </Link>
          ) : (
            <Link to="/dashboard" className="hidden sm:flex items-center gap-2">
              <User size={20} />
            </Link>
          )}
        </div>
      </div>

      {/* MOBILE SEARCH BAR */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 py-3 bg-white border-t border-gray-200 flex items-center gap-2">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            autoFocus
            className="flex-1 outline-none text-base"
          />
          <button type="button" onClick={runSearch} className="text-sm font-medium">
            Go
          </button>
        </div>
      )}

      {/* SECOND BAR */}
      <div className="flex items-center justify-between px-4 lg:px-6 py-5 bg-black text-white">
        <h1 className="text-2xl lg:text-3xl tracking-[0.3em] font-light">
          <Link to="/">VESTE</Link>
        </h1>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-8 text-base uppercase tracking-wider">
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
        aria-modal="true"
        role="dialog"
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 transform transition-transform duration-300 lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col gap-8 text-[#313131] font-light tracking-wider h-full overflow-y-auto">
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="self-end bg-[#313131] text-white p-3"
          >
            <X size={20} />
          </button>

          {!user ? (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-lg"
            >
              <User size={18} />
              Log in
            </Link>
          ) : (
            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-xl font-medium tracking-wider"
            >
              <User size={20} />
              My Profile
            </Link>
          )}

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
                >
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${shopOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              {shopOpen && (
                <ul className="mt-3 ml-4 flex flex-col gap-3 text-sm normal-case">
                  {shopLinks.map(({ to, label }) => (
                    <li key={to}>
                      <Link to={to} onClick={() => setMenuOpen(false)}>
                        {label}
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