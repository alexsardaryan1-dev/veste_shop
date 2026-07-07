const Newsletter = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center">

        <h2 className="text-4xl font-normal uppercase tracking-wider text-gray-800">
          Get on the list
        </h2>

        <p className="mt-4 text-2xl text-gray-700 text-center font-light">
          and be the first to shop new arrivals and exclusive promotions.
        </p>

        <form className="mt-16 w-full max-w-3xl flex flex-col gap-6">

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-gray-600 text-xl"
            >
              Enter your email here *
            </label>

            <input
              id="email"
              type="email"
              className="w-full text-xl border border-gray-400 h-12 px-4 outline-none focus:border-black transition"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <label className="flex items-center gap-4 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 h-6 w-6 accent-black"
              />
              <span className="text-xl text-gray-600 leading-relaxed">
                Yes, subscribe me to
                <br />
                your newsletter. *
              </span>
            </label>

            <button
              type="submit"
              className="bg-green-200 hover:bg-green-600 hover:text-white transition-colors duration-300 text-2xl font-light text-black px-8 py-5 font-normal"
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