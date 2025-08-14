import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const Wishlist = () => {
  const {state,  removeFromWishlist}= useContext(CartContext)

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Your Wishlist
      </h2>

      {state.wishlist.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {state.wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-40 w-full object-contain mb-4"
              />
              <h3 className="text-lg font-semibold mb-1 line-clamp-2 h-[48px]">
                {item.title}
              </h3>
              <p className="text-gray-600 font-medium mb-3">${item.price}</p>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="text-red-600 hover:text-red-800 font-medium transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
