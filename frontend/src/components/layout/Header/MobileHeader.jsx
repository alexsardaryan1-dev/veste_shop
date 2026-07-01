import { useState } from 'react';

const MobileHeader = ({ onMenuClick }) => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <header className='w-full '>
      {/* TOP HEADER */}
      <div className='bg-[#242323] p-5 flex justify-between items-center'>
        <h1 className='text-white text-3xl tracking-[.25em] font-light'>
          VESTE
        </h1>

        <button
          aria-label='Open menu'
          onClick={onMenuClick}
          className='text-white border border-white p-1 bg-[#313131] text-3xl'
        >
          <i className='fa-solid fa-bars' aria-hidden='true'></i>
        </button>
      </div>

      {/* CART BAR */}
      <div className='bg-[#E4E4E4] flex items-center gap-7 p-4 text-sm uppercase'>
        <button onClick={() => setCartOpen(true)} aria-label='Open cart'>
          <i className='fa-solid fa-bag-shopping text-3xl text-[#313131]'></i>
        </button>

        <div className='w-px h-8 bg-[#C8C8C8]'></div>

        <span className='text-xl font-light tracking-wider m-auto'>
          Free Shipping
        </span>
      </div>

      {/* CART MODAL */}
      {cartOpen && (
        <div className='fixed inset-0 bg-white z-50 flex flex-col p-5 tracking-wider'>
          <div className='flex justify-between'>
            <span className='font-normal text-2xl'>
              Cart <span className='font-thin'>(0 items)</span>
            </span>

            <i
              onClick={() => setCartOpen(false)}
              className='fa-solid fa-xmark cursor-pointer text-2xl'
              aria-label='Close cart'
            />
          </div>

          <div className='w-full h-px bg-[#313131] my-4' />

          <div className='flex-1 flex items-center justify-center font-thin text-2xl'>
            <p>Your cart is empty.</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default MobileHeader;