import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const Cart = () => {
  const { state, removeFromCart } = useContext(CartContext);

  const cartTotal = state.cart.reduce((total, item) => total + item.price * item.qty, 0);

  if (state.cart.length === 0) {
    return (
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-4">Your Shopping Cart</h2>
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Your Shopping Cart</h2>

      {/* Mobile view (Cards) */}
      <div className="block md: space-y-4">
        {state.cart.map(item => (
          <div key={item.id} className="border rounded-lg p-4 flex flex-col gap-2 shadow-sm">
            <div className="flex gap-4 items-center">
              <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded" />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span>Qty: {item.qty}</span>
              <span>Total: ${(item.price * item.qty).toFixed(2)}</span>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 text-sm self-end hover:underline"
            >
              Remove
            </button>
          </div>
        ))}

        <div className="text-right font-semibold text-lg">
          Total: ${cartTotal.toFixed(2)}
        </div>
      </div>

      {/* Desktop view (Table)
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[600px] text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-4 font-medium">Product</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Qty</th>
              <th className="p-4 font-medium">Total</th>
              <th className="p-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {state.cart.map(item => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-4 flex items-center gap-4">
                  <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded" />
                  <span>{item.name}</span>
                </td>
                <td className="p-4">${item.price.toFixed(2)}</td>
                <td className="p-4">{item.qty}</td>
                <td className="p-4">${(item.price * item.qty).toFixed(2)}</td>
                <td className="p-4">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 font-semibold">
              <td className="p-4 text-right" colSpan="3">Total:</td>
              <td className="p-4">${cartTotal.toFixed(2)}</td>
              <td className="p-4"></td>
            </tr>
          </tfoot>
        </table>
      </div> */}
    </div>
  );
};

export default Cart;
