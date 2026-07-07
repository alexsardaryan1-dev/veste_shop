import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, User } from 'lucide-react';
import { AuthContext } from '../../../context/AuthContext';
import { CartContext } from '../../../context/CartContext';

const DesktopHeader = () => {
  const { user } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);

  const navLinkClass =
    "relative inline-block text-white after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-full after:bg-white after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100";

  return (
    <header className='w-full'>
      {/* TOP BAR */}
      <div className='flex items-center justify-between px-6 py-3 bg-white text-black'>
        <div className='flex items-center gap-2 border-b border-black pb-1'>
          <Search size={20} />
          <input
            type='text'
            placeholder='Search'
            className='bg-transparent outline-none text-xl placeholder-black/70'
          />
        </div>

        <span className='text-xl tracking-widest font-light uppercase'>
          Free Shipping
        </span>

        <div className='flex items-center gap-6 text-xl'>
          <Link to='/cart' className='flex items-center gap-2'>
            <ShoppingBag size={20} />
            <span>Cart ({cartCount})</span>
          </Link>

          {!user ? (
            <Link to='/login' className='flex items-center gap-2'>
              <User size={20} />
              <span>Login</span>
            </Link>
          ) : (
            <Link to='/dashboard' className='flex items-center gap-2'>
              <User size={20} />
              <span>My Profile</span>
            </Link>
          )}
        </div>
      </div>

      {/* SECOND BAR */}
      <div className='flex items-center justify-between px-6 py-5 bg-black'>
        <h1 className='text-3xl tracking-[0.3em] font-light text-white'>
          VESTE
        </h1>

        <nav className='flex items-center gap-8 text-base uppercase tracking-wider text-white'>
          <Link to='/' className={navLinkClass}>
            Home
          </Link>

          <div className='relative group'>
            <Link to='/shop' className={navLinkClass}>
              Shop
            </Link>

            <div className='absolute top-full left-0 pt-4 hidden group-hover:block'>
              <div className='bg-white text-black flex flex-col min-w-[160px] shadow-lg py-2'>
                <Link
                  to='/shop?category=men'
                  className='px-4 py-2 hover:bg-gray-100 normal-case tracking-normal'
                >
                  Men
                </Link>
                <Link
                  to='/shop?category=women'
                  className='px-4 py-2 hover:bg-gray-100 normal-case tracking-normal'
                >
                  Women
                </Link>
                <Link
                  to='/shop?category=accessories'
                  className='px-4 py-2 hover:bg-gray-100 normal-case tracking-normal'
                >
                  Accessories
                </Link>
                <Link
                  to='/shop?category=sale'
                  className='px-4 py-2 hover:bg-gray-100 normal-case tracking-normal'
                >
                  Sale
                </Link>
              </div>
            </div>
          </div>

          <Link to='/lookbook' className={navLinkClass}>
            Lookbook
          </Link>
          <Link to='/customer-care' className={navLinkClass}>
            Customer Care
          </Link>
          <Link to='/visit-us' className={navLinkClass}>
            Visit Us
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default DesktopHeader;
