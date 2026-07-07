import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Minus, Plus, Heart } from 'lucide-react';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProductInfo = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState('info');
  const { name, price, sale_price, images = [], variants = [], sku } = product;
  const sizes = [...new Set(variants.map((v) => v.size))];
  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart(product, quantity);
  };

  return (
    <div className='max-w-7xl mx-auto px-6 py-6'>
      <div className='flex items-center justify-between text-sm lg:text-lg text-gray-500 mb-6'>
        <div className='flex items-center gap-2'>
          <Link to='/' className='hover:underline'>
            Home
          </Link>
          <ChevronRight size={14} />
          <Link to='/shop' className='hover:underline'>
            All Products
          </Link>
          <ChevronRight size={14} />
          <span className='text-gray-900'>{name}</span>
        </div>
        <div className='flex items-center gap-4'>
          <button className='flex items-center gap-1 hover:underline'>
            <ChevronLeft size={16} /> Prev
          </button>
          <button className='flex items-center gap-1 hover:underline'>
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className='grid md:grid-cols-2 gap-10'>
        <div>
          <div className='bg-gray-100 aspect-square overflow-hidden'>
            <img
              src={images[selectedImage]?.image_url}
              alt={name}
              className='w-full h-full object-contain'
            />
          </div>
          <div className='flex gap-2 mt-3'>
            {images.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(i)}
                className={`w-16 h-16 bg-gray-100 border ${
                  i === selectedImage ? 'border-gray-900' : 'border-transparent'
                }`}
              >
                <img
                  src={img.image_url}
                  alt=''
                  className='w-full h-full object-contain'
                />
              </button>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <h1 className='text-3xl tracking-wider'>{name}</h1>
          {sku && <p className='text-sm text-gray-500'>SKU: {sku}</p>}

          <div className='text-xl mt-2'>
            {sale_price ? (
              <>
                <span className='text-gray-400 line-through mr-2'>
                  ${price}
                </span>
                <span>${sale_price}</span>
              </>
            ) : (
              <span>${price}</span>
            )}
          </div>

          {sizes.length > 0 && (
            <div>
              <label className='block mb-1'>Size *</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className='w-full border border-gray-300 px-4 py-3'
              >
                <option value=''>Select</option>
                {sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className='block mb-1'>Quantity *</label>
            <div className='flex items-center border border-gray-300 w-fit'>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className='px-4 py-2'
              >
                <Minus size={16} />
              </button>
              <span className='px-4'>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className='px-4 py-2'
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className='flex gap-3 mt-2'>
            <button
              onClick={handleAddToCart}
              className='flex-1 bg-white py-3 uppercase text-sm border border-black hover hover:bg-black hover:text-white transition-colors duration-300'
            >
              Add to Cart
            </button>
            <button className='border border-gray-300 px-4 text-red-500 hover hover:bg-red-500 hover:text-white'>
              <Heart size={20} />
            </button>
          </div>

          <button className='bg-blue-500 hover hover:bg-white hover:text-black border border-blue-500 text-white py-3 uppercase text-sm'>
            Buy Now
          </button>

          <div className='mt-4 border-t border-gray-200'>
            <button
              onClick={() => toggleSection('info')}
              className='w-full flex justify-between items-center py-4 uppercase lg:text-lg'
            >
              Product Info
              <span>{openSection === 'info' ? '−' : '+'}</span>
            </button>
            {openSection === 'info' && (
              <p className='pb-4 text-sm lg:text-lg text-gray-600'>
                {product.description || 'No description available.'}
              </p>
            )}
          </div>

          <div className='border-t border-gray-200'>
            <button
              onClick={() => toggleSection('returns')}
              className='w-full flex justify-between items-center py-4 uppercase lg:text-lg'
            >
              Return and Refund Policy
              <span>{openSection === 'returns' ? '−' : '+'}</span>
            </button>
            {openSection === 'returns' && (
              <p className='pb-4 text-sm text-gray-600'>
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
