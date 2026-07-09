const Newsletter = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center tracking-wider">
        <h2 className="text-4xl font-light uppercase tracking-wider text-black">
          Get on the list
        </h2>

        <p className="mt-4 text-2xl text-gray-500 text-center font-light">
          and be the first to shop new arrivals and exclusive promotions.
        </p>

        <form
          className="mt-16 w-full max-w-3xl flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-black text-xl font-light tracking-wider"
            >
              Enter your email here *
            </label>

            <input
              id="email"
              type="email"
              required
              aria-required="true"
              autoComplete="email"
              className="w-full text-lg border border-gray-500 h-12 px-4 outline-none focus:border-black transition duration-300"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <label className="flex items-center gap-4 cursor-pointer">
              <input
                type="checkbox"
                required
                aria-required="true"
                className="mt-1 h-4 w-4 lg:h-6 lg:w-6 accent-black"
              />
              <span className="text-lg lg:text-xl text-gray-500 leading-relaxed tracking-wider">
                Yes, subscribe me to your newsletter. *
              </span>
            </label>

            <button
              type="submit"
              className="bg-pink-200 hover:bg-blue-200 transition duration-300 text-2xl font-light text-black px-8 py-5 font-light tracking-wider"
            >
              Subscribe Now
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
