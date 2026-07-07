import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';

const Header = ({ onMenuClick }) => {
  return (
    <>
      <div className='lg:hidden'>
        <MobileHeader onMenuClick={onMenuClick} />
      </div>

      <div className='hidden lg:block'>
        <DesktopHeader />
      </div>
    </>
  );
};

export default Header;