import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <main className='flex-1'>
                <div className='max-w-screen-xl mx-auto px-4 lg:px-12'>
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;