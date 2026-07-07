import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart, X } from 'lucide-react';
import { WishlistContext } from '../../context/WishlistContext';
import { CartContext } from '../../context/CartContext';

const MyFavorites = () => {
    const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
    const { addToCart } = useContext(CartContext);

    const getImage = (item) => item.images?.[0]?.image_url || item.images?.[0];

    return (
        <div className='space-y-6'>
            <h1 className='text-2xl font-semibold'>My Favorites</h1>

            {wishlistItems.length === 0 ? (
                <div className='rounded-xl border border-gray-200 p-10 flex flex-col items-center gap-3 text-gray-400'>
                    <Heart size={32} />
                    <p>You haven't added any favorites yet.</p>
                    <Link to='/shop' className='text-sm text-black underline'>
                        Browse products
                    </Link>
                </div>
            ) : (
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                    {wishlistItems.map((item) => (
                        <div
                            key={item.id}
                            className='rounded-xl border border-gray-200 overflow-hidden flex flex-col'
                        >
                            <div className='relative aspect-square bg-gray-100'>
                                <img
                                    src={getImage(item)}
                                    alt={item.name}
                                    className='w-full h-full object-cover'
                                />
                                <button
                                    onClick={() => removeFromWishlist(item.id)}
                                    aria-label='Remove from favorites'
                                    className='absolute top-2 right-2 bg-white rounded-full p-1.5 shadow'
                                >
                                    <X size={14} />
                                </button>
                            </div>

                            <div className='p-3 flex flex-col gap-2'>
                                <Link to={`/product/${item.id}`} className='text-sm font-medium truncate'>
                                    {item.name}
                                </Link>
                                <p className='text-sm text-gray-500'>
                                    ${item.sale_price || item.price}
                                </p>
                                <button
                                    onClick={() => addToCart(item)}
                                    className='bg-black text-white text-xs py-2 uppercase'
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyFavorites;