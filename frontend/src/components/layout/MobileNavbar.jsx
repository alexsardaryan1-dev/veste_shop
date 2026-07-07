import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Home,
  ShoppingBag,
  Image,
  MessageCircle,
  MapPin,
  Search,
  X,
  ChevronDown,
} from 'lucide-react';

import { AuthContext } from '../../context/AuthContext';

const MobileNavbar = ({ open, onClose }) => {
  const { user } = useContext(AuthContext);
  const [shopOpen, setShopOpen] = useState(false);

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-[#313131]/50 transition-opacity ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      />

      {/* DRAWER */}
      <nav
        aria-modal='true'
        role='dialog'
        aria-label='Mobile navigation menu'
        className={`fixed top-0 right-0 h-full w-full bg-white z-50 transform transition-transform duration-500 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='px-6 py-6 flex flex-col gap-8 text-[#313131] font-light tracking-wider'>

          {/* CLOSE */}
          <button
            onClick={onClose}
            className='self-end text-2xl bg-[#313131] text-white p-3'
          >
            <X size={22} />
          </button>

          {/* AUTH */}
          {!user ? (
            <Link
              to='/login'
              onClick={onClose}
              className='flex items-center gap-2 text-lg'
            >
              <User size={18} />
              <span>Log in</span>
            </Link>
          ) : (
            <Link
              to='/dashboard'
              onClick={onClose}
              className='flex items-center gap-2 text-lg'
            >
              <User size={18} />
              <span>My Profile</span>
            </Link>
          )}

          {/* MENU */}
          <ul className='flex flex-col gap-6 text-base uppercase'>

            <li>
              <Link to='/' onClick={onClose} className='flex items-center gap-2'>
                <Home size={16} />
                Home
              </Link>
            </li>

            {/* SHOP */}
            <li>
              <div className='flex items-center justify-between'>
                <Link to='/shop' onClick={onClose} className='flex items-center gap-2'>
                  <ShoppingBag size={16} />
                  Shop
                </Link>

                <button
                  onClick={() => setShopOpen((prev) => !prev)}
                >
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      shopOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              {shopOpen && (
                <ul className='mt-3 ml-6 flex flex-col gap-3 text-base'>
                  <li><Link to='/shop/women' onClick={onClose}>WOMEN'S</Link></li>
                  <li><Link to='/shop/men' onClick={onClose}>MEN'S</Link></li>
                  <li><Link to='/shop/accessories' onClick={onClose}>ACCESSORIES</Link></li>
                  <li><Link to='/shop/sale' onClick={onClose}>SALE</Link></li>
                </ul>
              )}
            </li>

            <li>
              <Link to='/lookbook' onClick={onClose} className='flex items-center gap-2'>
                <Image size={16} />
                Lookbook
              </Link>
            </li>

            <li>
              <Link to='/customer-care' onClick={onClose} className='flex items-center gap-2'>
                <MessageCircle size={16} />
                Customer Care
              </Link>
            </li>

            <li>
              <Link to='/visit-us' onClick={onClose} className='flex items-center gap-2'>
                <MapPin size={18} />
                Visit Us
              </Link>
            </li>

          </ul>

          {/* SEARCH */}
          <div className='flex items-center gap-3 text-base font-light border-b pb-2'>
            <Search size={16} />
            <input
              type='search'
              placeholder='Search'
              className='w-full outline-none'
            />
          </div>

        </div>
      </nav>
    </>
  );
};

export default MobileNavbar;