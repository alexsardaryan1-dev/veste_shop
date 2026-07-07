export default function VisitUs() {
  return (
    <section className="w-full bg-white">
      <div className="text-center py-16">
        <h1 className="text-3xl lg:text-4xl font-normal uppercase tracking-widest">
          Visit Us At Our Store
        </h1>
      </div>

      {/* MAP + INFO */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-10">
          <div>
            <h2 className="text-xl font-medium mb-3 lg:text-3xl">Address</h2>
            <p className="text-gray-600 leading-7 font-light lg:text-xl tracking-wider">
              500 Terry Francine Street <br />
              San Francisco, CA 94158
            </p>
          </div>

          <div>
            <h2 className="lg:text-3xl font-medium mb-3 tracking-wider">Opening Hours</h2>
            <p className="font-light text-gray-600 leading-7 lg:text-xl tracking-wider">
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
      <div className="max-w-4xl mx-auto px-6 py-20 text-center space-y-6">
        <h2 className="text-3xl lg:text-4xl font-normal uppercase tracking-widest">
          About Us
        </h2>

        <p className="text-gray-600 leading-7 font-light lg:text-2xl">
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
