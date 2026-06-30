import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ open, onClose }) => {
  const [shopOpen, setShopOpen] = useState(false);

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-[#313131]/50 transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* DRAWER */}
      <nav
        aria-modal="true"
        role="dialog"
        aria-label="Mobile navigation menu"
        className={`fixed top-0 right-0 h-full w-full bg-white z-50 transform transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-8 text-[#313131] font-light tracking-wider">
          {/* CLOSE BUTTON */}
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="self-end text-2xl bg-[#313131] text-white p-3"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>

          {/* LOGIN */}
          <Link
            to="/login"
            className="flex items-center gap-2 text-xl"
            onClick={onClose}
          >
            <i className="fa-solid fa-user" aria-hidden="true"></i>
            <span>Log in</span>
          </Link>

          {/* MENU */}
          <ul className="flex flex-col gap-6 text-xl uppercase">
            <li>
              <Link to="/" onClick={onClose}>
                Home
              </Link>
            </li>

            {/* SHOP DROPDOWN */}
            <li className="relative">
              <div className="flex items-center justify-between">
                <Link to="/shop" onClick={onClose}>
                  Shop
                </Link>

                <button
                  onClick={() => setShopOpen((prev) => !prev)}
                  aria-label="Toggle shop submenu"
                >
                  <i
                    className={`fa-solid fa-angle-down transition-transform ${
                      shopOpen ? "rotate-180" : "rotate-0"
                    }`}
                    aria-hidden="true"
                  ></i>
                </button>
              </div>

              {/* DROPDOWN */}
              {shopOpen && (
                <ul className="mt-3 ml-4 flex flex-col gap-3 text-base">
                  <li>
                    <Link to="/shop/women" onClick={onClose}>
                      WOMEN'S
                    </Link>
                  </li>

                  <li>
                    <Link to="/shop/men" onClick={onClose}>
                      MEN'S
                    </Link>
                  </li>

                  <li>
                    <Link to="/shop/accessories" onClick={onClose}>
                      ACCESSORIES
                    </Link>
                  </li>

                  <li>
                    <Link to="/shop/sale" onClick={onClose}>
                      SALE
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link to="/lookbook" onClick={onClose}>
                Lookbook
              </Link>
            </li>

            <li>
              <Link to="/customer-care" onClick={onClose}>
                Customer Care
              </Link>
            </li>

            <li>
              <Link to="/visit-us" onClick={onClose}>
                Visit Us
              </Link>
            </li>
          </ul>

          {/* SEARCH */}
          <div className="flex items-center gap-3 text-xl font-light border-b pb-2">
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>

            <input
              id="search"
              type="search"
              placeholder="Search"
              className="w-full outline-none"
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
