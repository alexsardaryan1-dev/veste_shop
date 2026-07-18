import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Minus,
  Plus,
  Heart,
} from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { AuthContext } from "../../context/AuthContext";
import { useProducts } from "../../hooks/useProducts";

const ProductInfo = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [size, setSize] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [openInfo, setOpenInfo] = useState(true);
  const [openReturns, setOpenReturns] = useState(false);
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);
  const sizeDropdownRef = useRef(null);

  const {
    id,
    name,
    price,
    sale_price,
    images = [],
    variants = [],
    category,
  } = product;
  const sizes = [...new Set(variants.map((v) => v.size))];
  const isAccessory = category === "accessories";

  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const { products: allProducts } = useProducts();
  const navigate = useNavigate();

  const inWishlist = isInWishlist(id);

  const currentIndex = allProducts.findIndex((p) => p.id === id);
  const prevProduct = currentIndex > 0 ? allProducts[currentIndex - 1] : null;
  const nextProduct =
    currentIndex >= 0 && currentIndex < allProducts.length - 1
      ? allProducts[currentIndex + 1]
      : null;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sizeDropdownRef.current &&
        !sizeDropdownRef.current.contains(e.target)
      ) {
        setSizeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!isAccessory && sizes.length > 0 && !size) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(product, quantity, isAccessory ? null : size);
  };

  const handleToggleWishlist = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    toggleWishlist(product);
  };

  const handleSelectSize = (s) => {
    setSize(s);
    setSizeError(false);
    setSizeDropdownOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="flex items-center justify-between text-sm lg:text-xl text-gray-500 mb-6">
        <div className="flex items-center gap-2">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <ChevronRight size={20} />
          <Link
            to={`/shop?category=${category}`}
            className="hover:underline capitalize"
          >
            {category}
          </Link>
          <ChevronRight size={20} />
          <span className="text-gray-500">{name}</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              prevProduct && navigate(`/product/${prevProduct.id}`)
            }
            disabled={!prevProduct}
            className={`flex items-center gap-1 ${prevProduct ? "hover:underline" : "opacity-30 cursor-not-allowed"}`}
          >
            <ChevronLeft size={20} /> Prev
          </button>
          <button
            onClick={() =>
              nextProduct && navigate(`/product/${nextProduct.id}`)
            }
            disabled={!nextProduct}
            className={`flex items-center gap-1 ${nextProduct ? "hover:underline" : "opacity-30 cursor-not-allowed"}`}
          >
            Next <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="bg-gray-100 aspect-square overflow-hidden">
            <img
              src={images[selectedImage]?.image_url}
              alt={name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex gap-2 mt-3">
            {images.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(i)}
                className={`w-16 h-16 bg-gray-100 border ${
                  i === selectedImage ? "border-black" : "border-transparent"
                }`}
              >
                <img
                  src={img.image_url}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 tracking-wider">
          <h1 className="text-3xl font-medium">{name}</h1>

          <div className="flex flex-col gap-1 mt-2">
            <div className="text-xl font-normal">
              {sale_price ? (
                <>
                  <span className="text-gray-500 line-through mr-2">
                    ${price}
                  </span>
                  <span>${sale_price}</span>
                </>
              ) : (
                <span>${price}</span>
              )}
            </div>
            {quantity > 1 && (
              <p className="text-sm text-gray-500">
                Total: ${(Number(sale_price || price) * quantity).toFixed(2)}
              </p>
            )}
          </div>

          {!isAccessory && sizes.length > 0 && (
            <div>
              <label className="block mb-4 text-lg font-light tracking-wider">
                Size *
              </label>

              <div className="relative" ref={sizeDropdownRef}>
                <button
                  type="button"
                  onClick={() => setSizeDropdownOpen((prev) => !prev)}
                  className={`w-full flex items-center justify-between border px-4 py-3 text-left bg-white ${
                    sizeError ? "border-red-500" : "border-black"
                  }`}
                >
                  <span className={size ? "text-black" : "text-gray-400"}>
                    {size || "Select"}
                  </span>
                  <ChevronDown
                    size={20}
                    strokeWidth={1.5}
                    className={`transition-transform duration-200 ${
                      sizeDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {sizeDropdownOpen && (
                  <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-black z-20 max-h-60 overflow-y-auto">
                    {sizes.map((s) => (
                      <li key={s}>
                        <button
                          type="button"
                          onClick={() => handleSelectSize(s)}
                          className={`w-full text-left px-4 py-3 hover:bg-black hover:text-white transition duration-200 ${
                            s === size ? "bg-black text-white" : "text-black"
                          }`}
                        >
                          {s}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {sizeError && (
                <p className="text-sm text-red-500 mt-1">
                  Please select a size
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block mb-4 text-lg lg:text-xl font-light tracking-wider">
              Quantity *
            </label>
            <div className="flex items-center border border-black w-fit">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="p-2"
              >
                <Minus size={20} />
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="p-2"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-white py-3 uppercase text-base border border-black hover hover:bg-black hover:text-white transition duration-300"
            >
              Add to Cart
            </button>
            <button
              onClick={handleToggleWishlist}
              className={`border px-4 transition duration-300 ${
                inWishlist
                  ? "bg-red-500 border-red-500 text-white"
                  : "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              }`}
            >
              <Heart size={20} fill={inWishlist ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="mt-4 border-t border-black">
            <button
              onClick={() => setOpenInfo((prev) => !prev)}
              className="w-full flex justify-between items-center py-4 uppercase text-base lg:text-xl"
            >
              Product Info
              <span>{openInfo ? "−" : "+"}</span>
            </button>
            {openInfo && (
              <p className="pb-4 text-base lg:text-xl text-gray-500">
                {product.description || "No description available."}
              </p>
            )}
          </div>

          <div className="border-t border-black">
            <button
              onClick={() => setOpenReturns((prev) => !prev)}
              className="w-full flex justify-between items-center py-4 uppercase text-base lg:text-xl"
            >
              Return and Refund Policy
              <span>{openReturns ? "−" : "+"}</span>
            </button>
            {openReturns && (
              <p className="pb-4 text-base lg:text-xl text-gray-500">
                Standard return policy applies. Contact customer care for
                details.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
