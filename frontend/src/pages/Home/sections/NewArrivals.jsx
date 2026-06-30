import { products } from "../../../data/products";

const NewArrivals = () => {
  return (
    <section className="mt-5 px-5">
      <h2 className="text-2xl font-medium tracking-wider text-center mb-5">
        NEW ARRIVALS
      </h2>

      <div className="grid grid-cols-1 gap-5">
        {products.map((product) => (
          <article
            key={product.id}
            className="border border-[#313131] overflow-hidden"
          >
            <div className="w-full overflow-hidden">
              <img
                className="w-full h-full object- object-top block"
                src={product.image}
                alt={product.title}
              />
            </div>

            <div className="p-3 text-center tracking-wider font-light">
              <h3 className="text-xl">{product.title}</h3>
              <p className="text-lg">${product.price}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
