import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const ProductCard = ({product}) => {
  const { addToCart, addToWishlist, state, removeFromCart } =
    useContext(CartContext);

  const cartItem = state.cart.find((item) => item.id === product.id);
  const isWishlisted = state.wishlist?.some((item) => item.id === product.id);

  return (
    <div className="border p-4 rounded shadow text-center relative flex flex-col h-full justify-between">
      {/* Wishlist Icon */}
      <button
        onClick={() => addToWishlist(product)}
        className={`absolute top-3 right-3 transition-colors duration-200 ease-in-out z-40
                    ${isWishlisted ? "text-red-500" : "text-gray-400"}`} // This sets the 'currentColor'
        title={isWishlisted ? "In Wishlist" : "Add to Wishlist"}
      >
        {/* Directly embed the SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-6 h-6 ${
            isWishlisted ? "text-red-600 fill-red-600" : "fill-none"
          }
              
          }`}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      </button>

      {/* Rest of your ProductCard component remains the same */}
      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gray-50 p-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="max-h-full max-w-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <h2 className="font-semibold text-lg mb-2 line-clamp-2 min-h-[3rem]">
            {product.title}
          </h2>
          <p className="text-gray-600 mb-2">${product.price}</p>
        </div>

        {cartItem ? (
          <div className="flex justify-center items-center gap-2 mt-auto">
            <button
              onClick={() => removeFromCart(product.id)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              –
            </button>
            <span>{cartItem.qty}</span>
            <button
              onClick={() => addToCart(product)}
              className="px-3 py-1 bg-gray-800 text-white rounded"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(product)}
            className="px-4 py-1 bg-black text-white rounded mt-auto"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
