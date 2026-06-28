import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 items-center">
      <div>
        <img
          className="w-full h-full object-cover object-bottom md:h-[600px]"
          src="/images/homePage/hero-img1.avif"
          alt="Picture of a man wearing the store's clothes"
        />
      </div>
      <div className="w-full h-[300px] flex flex-col gap-2 items-center tracking-wider bg-[#FFE9E3] justify-center">
        <h2 className="font-normal text-2xl">SULTRY & SMART</h2>
        <p className="font-light text-lg ">HOT SPRING LOOKS</p>
        <p className="w-[50px] bg-[#313131] h-[3px]"></p>
        <Link to="/shop/women" className="text-[#313131] text-lg font-light">
          Shop Women
        </Link>{" "}
      </div>
      <div>
        <img
          className="w-full h-full object-cover object-bottom mt-5 md:h-[600px]"
          src="/images/homePage/hero-img2.avif"
          alt="Picture of a woman wearing the store's clothes"
        />
      </div>
      <div className="w-full h-[300px] flex flex-col gap-2 items-center tracking-wider bg-[#A3C7BE] justify-center">
        <h2 className="font-normal text-2xl text-[#FDFDFD]">ELEGANT & SLICK</h2>
        <p className="font-light text-lg text-[#FDFDFD]">GET READY FOR SUMMER</p>
        <p className="w-[50px] bg-[#FDFDFD] h-[3px]"></p>
        <Link to="/shop/men" className=" text-[#FDFDFD] text-lg font-light">
          Shop Men
        </Link>{" "}
      </div>
    </section>
  );
}
