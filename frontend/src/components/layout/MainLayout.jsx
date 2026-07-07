import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import MobileNavbar from './MobileNavbar';
import Footer from './Footer';

const MainLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className='flex flex-col min-h-screen'>
      <Header onMenuClick={() => setOpen(true)} />
      <MobileNavbar open={open} onClose={() => setOpen(false)} />
      <main className='flex-1'>
        <div className='max-w-screen-xl mx-auto px-4 lg:px-12'>
          <Outlet />
        </div>{' '}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
