import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

    const getImage = (item) => item.images?.[0]?.image_url || item.images?.[0];
    const getPrice = (item) => Number(item.sale_price || item.price);

    const subtotal = cartItems.reduce(
        (sum, item) => sum + getPrice(item) * item.quantity,
        0
    );

    if (cartItems.length === 0) {
        return (
            <div className='max-w-4xl mx-auto px-6 py-16 text-center flex flex-col gap-4'>
                <h1 className='text-2xl'>Your cart is empty.</h1>
                <Link to='/shop' className='underline'>
                    Continue shopping
                </Link>
            </div>
        );
    }

    return (
        <div className='max-w-5xl mx-auto px-6 py-10 flex flex-col gap-8'>
            <h1 className='text-2xl font-semibold tracking-wider'>Cart</h1>

            <div className='flex flex-col divide-y divide-gray-200'>
                {cartItems.map((item) => (
                    <div key={item.id} className='flex items-center gap-4 py-4'>
                        <img
                            src={getImage(item)}
                            alt={item.name}
                            className='w-24 h-24 object-cover bg-gray-100'
                        />

                        <div className='flex-1'>
                            <p className='text-base'>{item.name}</p>
                            <p className='text-sm text-gray-500'>
                                ${getPrice(item).toFixed(2)}
                            </p>
                        </div>

                        <div className='flex items-center border border-gray-300'>
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className='px-3 py-2'
                            >
                                <Minus size={14} />
                            </button>
                            <span className='px-3'>{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className='px-3 py-2'
                            >
                                <Plus size={14} />
                            </button>
                        </div>

                        <p className='w-20 text-right'>
                            ${(getPrice(item) * item.quantity).toFixed(2)}
                        </p>

                        <button
                            onClick={() => removeFromCart(item.id)}
                            aria-label='Remove item'
                        >
                            <X size={18} />
                        </button>
                    </div>
                ))}
            </div>

            <div className='flex justify-end'>
                <div className='w-full max-w-xs flex flex-col gap-4'>
                    <div className='flex justify-between text-lg'>
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <button className='bg-gray-900 text-white py-3 uppercase text-sm hover hover:bg-blue-500 transition-colors duration-300'>
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;