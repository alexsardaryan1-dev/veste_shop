import { useState, useEffect } from "react";
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

const ProductInfo = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [openInfo, setOpenInfo] = useState(true);
  const [openReturns, setOpenReturns] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const {
    id,
    name,
    price,
    sale_price,
    images = [],
    variants = [],
    sku,
    category,
  } = product;
  const sizes = [...new Set(variants.map((v) => v.size))];
  const isAccessory = category === "accessories";

  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const inWishlist = isInWishlist(id);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const res = await fetch("http://localhost:5001/api/products");
      const data = await res.json();
      setAllProducts(data.products);
    };
    fetchAllProducts();
  }, []);

  const currentIndex = allProducts.findIndex((p) => p.id === id);
  const prevProduct = currentIndex > 0 ? allProducts[currentIndex - 1] : null;
  const nextProduct =
    currentIndex >= 0 && currentIndex < allProducts.length - 1
      ? allProducts[currentIndex + 1]
      : null;

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart(product, quantity, isAccessory ? null : size);
  };

  const handleToggleWishlist = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    toggleWishlist(product);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="flex items-center justify-between text-sm lg:text-lg text-gray-500 mb-6">
        <div className="flex items-center gap-2">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:underline">
            All Products
          </Link>
          <ChevronRight size={14} />
          <span className="text-gray-900">{name}</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              prevProduct && navigate(`/product/${prevProduct.id}`)
            }
            disabled={!prevProduct}
            className={`flex items-center gap-1 ${prevProduct ? "hover:underline" : "opacity-30 cursor-not-allowed"}`}
          >
            <ChevronLeft size={16} /> Prev
          </button>
          <button
            onClick={() =>
              nextProduct && navigate(`/product/${nextProduct.id}`)
            }
            disabled={!nextProduct}
            className={`flex items-center gap-1 ${nextProduct ? "hover:underline" : "opacity-30 cursor-not-allowed"}`}
          >
            Next <ChevronRight size={16} />
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
                  i === selectedImage ? "border-gray-900" : "border-transparent"
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

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl tracking-wider">{name}</h1>
          {sku && <p className="text-sm text-gray-500">SKU: {sku}</p>}

          <div className="flex flex-col gap-1 mt-2">
            <div className="text-xl">
              {sale_price ? (
                <>
                  <span className="text-gray-400 line-through mr-2">
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
              <label className="block mb-1">Size *</label>

              <div className="relative">
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-3 pr-12 appearance-none"
                >
                  <option value="">Select</option>

                  {sizes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={22}
                  strokeWidth={1.5}
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block mb-1">Quantity *</label>
            <div className="flex items-center border border-gray-300 w-fit">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2"
              >
                <Minus size={16} />
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-white py-3 uppercase text-sm border border-black hover hover:bg-black hover:text-white transition-colors duration-300"
            >
              Add to Cart
            </button>
            <button
              onClick={handleToggleWishlist}
              className={`border px-4 transition-colors duration-300 ${
                inWishlist
                  ? "bg-red-500 border-red-500 text-white"
                  : "border-gray-300 text-red-500 hover:bg-red-500 hover:text-white"
              }`}
            >
              <Heart size={20} fill={inWishlist ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="mt-4 border-t border-gray-200">
            <button
              onClick={() => setOpenInfo((prev) => !prev)}
              className="w-full flex justify-between items-center py-4 uppercase lg:text-lg"
            >
              Product Info
              <span>{openInfo ? "−" : "+"}</span>
            </button>
            {openInfo && (
              <p className="pb-4 text-sm lg:text-lg text-gray-600">
                {product.description || "No description available."}
              </p>
            )}
          </div>

          <div className="border-t border-gray-200">
            <button
              onClick={() => setOpenReturns((prev) => !prev)}
              className="w-full flex justify-between items-center py-4 uppercase lg:text-lg"
            >
              Return and Refund Policy
              <span>{openReturns ? "−" : "+"}</span>
            </button>
            {openReturns && (
              <p className="pb-4 text-sm text-gray-600">
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
