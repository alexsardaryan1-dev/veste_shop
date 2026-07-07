import { useContext, useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { CartContext } from '../../../context/CartContext';

const MobileHeader = ({ onMenuClick }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const { cartItems, cartCount } = useContext(CartContext);

  return (
    <header className='w-full'>
      {/* TOP HEADER */}
      <div className='bg-[#242323] p-5 flex justify-between items-center'>
        <h1 className='text-white text-3xl tracking-[.25em] font-light'>
          VESTE
        </h1>

        <button
          aria-label='Open menu'
          onClick={onMenuClick}
          className='text-white border border-white p-1 bg-[#313131]'
        >
          <Menu size={28} />
        </button>
      </div>

      {/* CART BAR */}
      <div className='bg-[#E4E4E4] flex items-center gap-7 p-4 text-sm uppercase'>
        <button
          onClick={() => setCartOpen(true)}
          aria-label='Open cart'
          className='relative'
        >
          <ShoppingBag size={28} color='#313131' />
          {cartCount > 0 && (
            <span className='absolute -top-2 -right-2 bg-[#242323] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
              {cartCount}
            </span>
          )}
        </button>

        <div className='w-px h-8 bg-[#C8C8C8]' />

        <span className='text-xl font-light tracking-wider m-auto'>
          Free Shipping
        </span>
      </div>

      {/* CART MODAL */}
      {cartOpen && (
        <div className='fixed inset-0 bg-white z-50 flex flex-col p-5 tracking-wider'>
          <div className='flex justify-between'>
            <span className='font-normal text-2xl'>
              Cart <span className='font-thin'>({cartCount} items)</span>
            </span>

            <button
              onClick={() => setCartOpen(false)}
              aria-label='Close cart'
            >
              <X size={28} />
            </button>
          </div>

          <div className='w-full h-px bg-[#313131] my-4' />

          {cartItems.length === 0 ? (
            <div className='flex-1 flex items-center justify-center font-thin text-2xl'>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <div className='flex-1 flex flex-col gap-4 overflow-y-auto'>
              {cartItems.map((item) => (
                <div key={item.id} className='flex gap-4 items-center'>
                  <img
                    src={item.images?.[0]?.image_url || item.images?.[0]}
                    alt={item.name}
                    className='w-20 h-20 object-cover bg-gray-100'
                  />
                  <div className='flex-1'>
                    <p className='text-base'>{item.name}</p>
                    <p className='text-sm text-gray-500'>
                      Qty: {item.quantity} · ${item.sale_price || item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default MobileHeader;