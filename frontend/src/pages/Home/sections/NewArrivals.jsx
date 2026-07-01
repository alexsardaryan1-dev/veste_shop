import { products } from "../../../data/products";

const NewArrivals = () => {
  return (
    <section className="mt-10 px-5">
      <h2 className="text-4xl font-light tracking-wider text-center mb-5">
        NEW ARRIVALS
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {products.map((product) => (
          <article
            key={product.id}
            className="border border-[#313131]/40 overflow-hidden"
          >
            {/* IMAGE */}
            <div className="w-full aspect-[3/4] overflow-hidden">
              <img
                className="w-full h-full object-cover object-top"
                src={product.image}
                alt={product.title}
              />
            </div>

            {/* TEXT */}
            <div className="p-2 text-center tracking-wider font-light">
              <h3 className="text-base lg:text-lg">{product.title}</h3>
              <p className="text-sm lg:text-base">${product.price}</p>
            </div>
          </article>
        ))}

      </div>
    </section>
  );
};

export default NewArrivals;