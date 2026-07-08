import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-3xl font-light tracking-wider lg:text-4xl cursor-pointer">
            <Link to="/">VESTE</Link>
          </h2>
        </div>

        <div className="border-l border-white pl-6 tracking-wider">
          <h3 className="text-base lg:text-lg font-medium uppercase mb-8">
            Customer Care
          </h3>

          <ul className="space-y-2 text-base lg:text-lg font-light">
            <li className="hover:text-white cursor-pointer">
              <Link to="/customer-care">Shipping Policy &gt;</Link>
            </li>
            <li className="hover:text-white cursor-pointer">
              <Link to="/customer-care">Returns Policy &gt;</Link>
            </li>
            <li className="hover:text-white cursor-pointer">
              <Link to="/customer-care">Contact Us &gt;</Link>
            </li>
            <li className="hover:text-white cursor-pointer">
              <Link to="/visit-us">Visit Us &gt;</Link>
            </li>
          </ul>
        </div>

        <div className="border-l border-white pl-6 tracking-wider">
          <h3 className="text-base lg:text-lg font-medium uppercase mb-8">
            Visit Our Store
          </h3>

          <p className="text-base font-light lg:text-lg leading-6">
            500 Terry Francine Street <br />
            San Francisco, CA 94158
          </p>
        </div>

        <div className="border-l border-white pl-6 tracking-wider">
          <h3 className="text-base lg:text-lg font-medium uppercase mb-8">
            Stay Connected
          </h3>

          <div className="flex gap-5 text-xl text-white">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-white pt-6 text-center text-sm lg:text-lg ">
        © 2026 by VESTE. Powered and secured by AS
      </div>
    </footer>
  );
};

export default Footer;
