import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="flex flex-col">

      <div className="flex flex-col lg:hidden">

        <img
          src="/images/homePage/hero-img1.avif"
          alt=""
          className="w-full h-[300px] object-cover"
        />

        <div className="h-[250px] flex flex-col items-center justify-center gap-3 bg-[#FFE9E3]">
          <h2 className="text-3xl">SULTRY & SMART</h2>
          <p className="text-xl font-light">HOT SPRING LOOKS</p>
          <div className="w-[50px] h-[3px] bg-[#313131]" />
          <Link to="/shop/women" className="text-lg font-light">
            Shop Women
          </Link>
        </div>

        <img
          src="/images/homePage/hero-img2.avif"
          alt=""
          className="w-full h-[300px] object-cover"
        />

        <div className="h-[250px] flex flex-col items-center justify-center gap-3 bg-[#A3C7BE]">
          <h2 className="text-3xl text-white">ELEGANT & SLICK</h2>
          <p className="text-xl font-light text-white">
            GET READY FOR SUMMER
          </p>
          <div className="w-[50px] h-[3px] bg-white" />
          <Link to="/shop/men" className="text-lg font-light text-white">
            Shop Men
          </Link>
        </div>

      </div>

      <div className="hidden lg:flex lg:flex-col">

        {/* ROW 1 */}
        <div className="grid grid-cols-2 bg-[#FFE9E3]">
          <img
            src="/images/homePage/hero-img1.avif"
            alt=""
            className="w-full h-[600px] object-cover"
          />

          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-6xl">SULTRY & SMART</h2>
            <p className="text-3xl font-light">HOT SPRING LOOKS</p>
            <div className="w-[50px] h-[3px] bg-[#313131]" />
            <Link
              to="/shop/women"
              className="text-2xl font-light hover:text-green-500 transition-colors"
            >
              Shop Women
            </Link>
          </div>
        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-2 bg-[#A3C7BE]">

          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-6xl text-white">ELEGANT & SLICK</h2>
            <p className="text-3xl font-light text-white">
              GET READY FOR SUMMER
            </p>
            <div className="w-[50px] h-[3px] bg-white" />
            <Link
              to="/shop/men"
              className="text-2xl font-light text-white hover:text-red-500 transition-colors"
            >
              Shop Men
            </Link>
          </div>

          <img
            src="/images/homePage/hero-img2.avif"
            alt=""
            className="w-full h-[600px] object-cover"
          />
        </div>

      </div>

    </section>
  );
};

export default Hero;