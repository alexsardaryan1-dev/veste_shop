import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";

const MobileHeader = ({ onMenuClick }) => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <header className="w-full">
      {/* TOP HEADER */}
      <div className="bg-[#242323] p-5 flex justify-between items-center">
        <h1 className="text-white text-3xl tracking-[.25em] font-light">
          VESTE
        </h1>

        <button
          aria-label="Open menu"
          onClick={onMenuClick}
          className="text-white border border-white p-1 bg-[#313131]"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* CART BAR */}
      <div className="bg-[#E4E4E4] flex items-center gap-7 p-4 text-sm uppercase">
        <button
          onClick={() => setCartOpen(true)}
          aria-label="Open cart"
        >
          <ShoppingBag size={28} color="#313131" />
        </button>

        <div className="w-px h-8 bg-[#C8C8C8]" />

        <span className="text-xl font-light tracking-wider m-auto">
          Free Shipping
        </span>
      </div>

      {/* CART MODAL */}
      {cartOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col p-5 tracking-wider">
          <div className="flex justify-between">
            <span className="font-normal text-2xl">
              Cart <span className="font-thin">(0 items)</span>
            </span>

            <button
              onClick={() => setCartOpen(false)}
              aria-label="Close cart"
            >
              <X size={28} />
            </button>
          </div>

          <div className="w-full h-px bg-[#313131] my-4" />

          <div className="flex-1 flex items-center justify-center font-thin text-2xl">
            <p>Your cart is empty.</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default MobileHeader;