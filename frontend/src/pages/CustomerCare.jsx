import { useState } from "react";

const faqs = [
  {
    q: "How do I track my order?",
    a: "You can track your order using the tracking link sent to your email after shipping.",
  },
  {
    q: "What are your delivery options?",
    a: "We offer standard and express delivery depending on your location.",
  },
  {
    q: "How do I return an item?",
    a: "You can return items within 14 days through our returns portal or by contacting support.",
  },
  {
    q: "How can I contact your couriers?",
    a: "Courier contact details are shared in your shipping confirmation email.",
  },
  {
    q: "Do you provide International delivery?",
    a: "Yes, we ship worldwide with selected carriers.",
  },
  {
    q: "What is your returns policy?",
    a: "Items must be unused and returned within the return window stated on our policy page.",
  },
];

export default function CustomerCare() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        {/* FORM*/}

        <div>
          <h2 className="text-3xl lg:text-4xl font-medium uppercase tracking-wider mb-6">
            Customer Care
          </h2>

          <p className="text-gray-500 mb-6 leading-relaxed text-lg lg:text-xl font-light tracking-wider">
            Have any questions or concerns? We’re always ready to help! <br />
            Call us at <span className="font-medium">123-456-7890</span> or send
            us an email at <span className="font-medium">info@mysite.com</span>
          </p>

          <form className="space-y-4 tracking-wider">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name*"
                className="
        border
        text-xl
        p-3
        w-full
        outline-none
        transition
        focus:ring-2
        focus:ring-black
        focus:border-black
      "
              />

              <input
                type="text"
                placeholder="Last Name*"
                className="
        border
        text-xl
        p-3
        w-full
        outline-none
        transition
        focus:ring-2
        focus:ring-black
        focus:border-black
      "
              />
            </div>

            <input
              type="email"
              placeholder="Email*"
              className="
      border
      text-xl
      p-3
      w-full
      outline-none
      transition
      focus:ring-2
      focus:ring-black
      focus:border-black
    "
            />

            <input
              type="text"
              placeholder="Subject"
              className="
      border
      text-xl
      p-3
      w-full
      outline-none
      transition
      focus:ring-2
      focus:ring-black
      focus:border-black
    "
            />

            <textarea
              placeholder="Message"
              rows="5"
              className="
      border
      text-xl
      p-3
      w-full
      outline-none
      transition
      focus:ring-2
      focus:ring-black
      focus:border-black
    "
            />

            <button
              type="submit"
              className="
      bg-black
      text-white
      px-6
      py-3
      text-xl
      border
      border-black
      uppercase
      transition
      duration-300
      hover:bg-white
      hover:text-black
      focus:outline-none
      focus:ring-2
      focus:ring-black
    "
            >
              Send
            </button>
          </form>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-3xl lg:text-4xl font-medium uppercase tracking-wider mb-6">
            FAQ
          </h2>

          <div className="space-y-4">
            {faqs.map((item, index) => (
              <div key={index} className="border-b pb-4">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left flex justify-between items-center py-3 text-xl lg:text-xl font-light tracking-wider"
                >
                  {item.q}
                  <span>{openIndex === index ? "-" : "+"}</span>
                </button>

                {openIndex === index && (
                  <p className="text-gray-500 text-base lg:text-xl mt-2 font-light tracking-wider">
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
