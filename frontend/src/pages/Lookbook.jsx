import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const imagesRow1 = [
  "/products/black-sunglasses-1.avif",
  "/products/orange-bag.png",
  "/products/blue-velvet-jacket.avif",
  "/products/green-bracelet.avif",
  "/products/black-slim-jeans.avif",
  "/products/everyday-dress.avif",
];

const imagesRow2 = [
  "/products/green-bag.avif",
  "/products/black-sunglasses2.avif",
  "/products/white-jacket.avif",
  "/products/striped-skirt.avif",
  "/products/black-zip-sweater.avif",
  "/products/blue-slim-jeans.avif",
  "/products/decorated-dress.avif",
];

const Carousel = ({ images }) => {
  const trackRef = useRef(null);
  const posRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    const speed = 0.5;

    const animate = () => {
      posRef.current -= speed;

      const halfWidth = track.scrollWidth / 2;

      if (Math.abs(posRef.current) >= halfWidth) {
        posRef.current = 0;
      }

      track.style.transform = `translateX(${posRef.current}px)`;

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div ref={trackRef} className="flex w-max">
        {[...images, ...images].map((img, i) => (
          <div key={i} className="min-w-[280px] h-[380px] flex-shrink-0">
            <img src={img} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function LookbookSection() {
  return (
    <section className="w-full overflow-hidden bg-white">

      <div className="text-center pt-16 pb-10 space-y-4">
        <p className="text-sm lg:text-lg tracking-[0.3em] text-gray-500">
          LOOKBOOK
        </p>

        <h1 className="text-5xl font-light uppercase tracking-widest">
          Spring / Summer 2026
        </h1>
      </div>

      <Carousel images={imagesRow1} />

      <div className="flex justify-center gap-6 py-14 lg:text-xl">
        <Link
          to="/shop?category=men"
          className="px-6 py-3 border border-black hover:bg-black hover:text-white transition"
        >
          Shop Men
        </Link>

        <Link
          to="/shop?category=women"
          className="px-6 py-3 border border-black hover:bg-black hover:text-white transition"
        >
          Shop Women
        </Link>
      </div>

      <Carousel images={imagesRow2} />

    </section>
  );
}