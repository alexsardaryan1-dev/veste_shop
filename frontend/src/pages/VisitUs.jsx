export default function VisitUs() {
  return (
    <section className="w-full bg-white">
      <div className="text-center py-16">
        <h1 className="text-4xl lg:text-4xl font-medium uppercase tracking-wider">
          Visit Us At Our Store
        </h1>
      </div>

      {/* MAP + INFO */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center tracking-wider">
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-light mb-3 lg:text-3xl">Address</h2>
            <p className="text-gray-500 leading-7 font-light text-xl lg:text-xl">
              500 Terry Francine Street <br />
              San Francisco, CA 94158
            </p>
          </div>

          <div>
            <h2 className="text-2xl lg:text-3xl font-light mb-3">Opening Hours</h2>
            <p className="font-light text-gray-500 leading-7 text-xl lg:text-xl">
              Mon-Thu: 10:00am - 7:00pm <br />
              Friday: 9:00am - 9:00pm <br />
              Saturday: 9:00am - 5:00pm <br />
              Sunday: Closed
            </p>
          </div>
        </div>

        <div className="w-full h-[400px]">
          <iframe
            title="store-location"
            className="w-full h-full border-0"
            loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=2.341%2C48.855%2C2.352%2C48.861&layer=mapnik"
          ></iframe>
        </div>
      </div>

      {/* ABOUT US */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center space-y-6 tracking-wider">
        <h2 className="text-4xl lg:text-4xl font-medium uppercase">
          About Us
        </h2>

        <p className="text-gray-500 leading-7 font-light text-xl lg:text-2xl">
          We are a contemporary fashion brand focused on timeless design, clean
          aesthetics, and everyday versatility. Our collections are built around
          simplicity and quality — pieces that are easy to wear, easy to
          combine, and designed to last beyond seasons. We believe fashion
          should feel effortless. That’s why we carefully select materials,
          refine every detail, and focus on silhouettes that balance comfort
          with structure. From everyday essentials to statement pieces, our goal
          is to create clothing that fits naturally into your life — not the
          other way around. We are inspired by modern urban culture, minimal
          design principles, and the idea that less is always more. VESTE is not
          just clothing. It’s a visual language of simplicity, confidence, and
          clarity.
        </p>
      </div>
    </section>
  );
}
