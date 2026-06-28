import { useState } from "react";

export default function Navbar({ open, onClose }) {
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
        {/* CONTAINER */}
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
          <button className="flex items-center gap-2 text-xl">
            <i className="fa-solid fa-user" aria-hidden="true"></i>
            <span>Log in</span>
          </button>

          {/* MENU */}
          <ul className="flex flex-col gap-6 text-xl uppercase">
            <li>
              <a href="/">Home</a>
            </li>

            {/* SHOP DROPDOWN */}
            <li className="relative">
              <div className="flex items-center justify-between">
                <a href="/shop" className="flex items-center gap-2">
                  Shop
                </a>

                {/* TOGGLE BUTTON */}
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
                  <li>WOMEN'S</li>
                  <li>MEN'S</li>
                  <li>ACCESSORIES</li>
                  <li>SALE</li>
                </ul>
              )}
            </li>

            <li>
              <a href="/lookbook">Lookbook</a>
            </li>
            <li>
              <a href="/customer-care">Customer Care</a>
            </li>
            <li>
              <a href="/visit-us">Visit Us</a>
            </li>
          </ul>

          {/* SEARCH */}
          <div className="flex items-center gap-3 text-xl font-light border-b pb-2">
            <label htmlFor="search" className="sr-only">
              Search products
            </label>

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
}
