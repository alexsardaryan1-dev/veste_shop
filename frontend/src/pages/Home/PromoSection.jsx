import { Link } from "react-router-dom";

const PromoSection = () => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Card */}
        <div className="relative overflow-hidden group">
          <img
            src="/homePage/PromoSection-img1.avif"
            alt="Accessories"
            className="w-full h-[600px] object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center text-white text-center tracking-wider">
            <p className="text-2xl font-light uppercase">Swoon-worthy</p>

            <h2 className="mt-4 text-5xl font-light uppercase">
              <Link
                to="/shop?category=accessories"
                className="underline md:no-underline md:hover:underline"
              >
                Accessories
              </Link>{" "}
            </h2>
          </div>
        </div>

        {/* Right Card */}
        <div className="relative overflow-hidden group tracking-wider">
          <img
            src="/homePage/PromoSection-img2.avif"
            alt="Sale"
            className="w-full h-[600px] object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center text-white text-center">
            <p className="text-2xl font-light uppercase">Winter Sale</p>

            <h2 className="mt-4 text-5xl font-light uppercase">
              <Link
                to="/shop?category=sale"
                className="underline md:no-underline md:hover:underline"
              >
                Now 30% off
              </Link>{" "}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
