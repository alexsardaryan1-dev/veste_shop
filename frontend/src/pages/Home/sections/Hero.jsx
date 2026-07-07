import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className='flex flex-col'>
      {/* FOR MOBILE */}

      {/* ROW 1 */}
      <div className='flex flex-col lg:hidden'>
        <img
          src='/images/homePage/hero-img1.avif'
          alt=''
          className='w-full h-[300px] object-cover'
        />

        <div className='h-[250px] flex flex-col items-center justify-center gap-3 bg-pink-200'>
          <h2 className='text-3xl'>SULTRY & SMART</h2>
          <p className='text-xl font-light'>HOT SPRING LOOKS</p>
          <div className='w-[50px] h-[3px] bg-black' />
          <Link
            to='/shop?category=women'
            className='text-lg font-light border border-black p-2'
          >
            Shop Women
          </Link>
        </div>

        {/* ROW 2 */}

        <img
          src='/images/homePage/hero-img2.avif'
          alt=''
          className='w-full h-[300px] object-cover'
        />

        <div className='h-[250px] flex flex-col items-center justify-center gap-3 bg-blue-200 text-black'>
          <h2 className='text-3xl'>ELEGANT & SLICK</h2>
          <p className='text-xl font-light'>GET READY FOR SUMMER</p>
          <div className='w-[50px] h-[3px] bg-black' />
          <Link
            to='/shop?category=men'
            className='text-lg font-light border border-black p-2'
          >
            Shop Men
          </Link>
        </div>
      </div>

      {/* FOR LARGER SCREENS */}

      <div className='hidden lg:flex lg:flex-col'>
        {/* ROW 1 */}
        <div className='grid grid-cols-2 bg-pink-200'>
          <img
            src='/images/homePage/hero-img1.avif'
            alt=''
            className='w-full h-[600px] object-cover'
          />

          <div className='flex flex-col items-center justify-center gap-4'>
            <h2 className='text-6xl'>SULTRY & SMART</h2>
            <p className='text-3xl font-light'>HOT SPRING LOOKS</p>
            <div className='w-[50px] h-[3px] bg-black' />
            <Link
              to='/shop?category=women'
              className='text-2xl font-light hover:text-white transition-colors border border-black hover:border-white p-2 transition-colors duraiton-300'
            >
              Shop Women
            </Link>
          </div>
        </div>

        {/* ROW 2 */}
        <div className='grid grid-cols-2 bg-blue-200'>
          <div className='flex flex-col items-center justify-center gap-4'>
            <h2 className='text-6xl text-white'>ELEGANT & SLICK</h2>
            <p className='text-3xl font-light text-white'>
              GET READY FOR SUMMER
            </p>
            <div className='w-[50px] h-[3px] bg-white' />
            <Link
              to='/shop?category=men'
              className='text-2xl font-light text-white hover:text-black transition-colors border border-white hover:border-black p-2 transition-colors duration-300'
            >
              Shop Men
            </Link>
          </div>

          <img
            src='/images/homePage/hero-img2.avif'
            alt=''
            className='w-full h-[600px] object-cover'
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
