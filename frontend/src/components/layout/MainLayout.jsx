import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className='flex flex-col min-h-screen'>
      <Header onMenuClick={() => setOpen(true)} />
      <Navbar open={open} onClose={() => setOpen(false)} />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;