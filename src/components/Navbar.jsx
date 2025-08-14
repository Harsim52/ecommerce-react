import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white">
      <Link to="/" className=" font-bold text-gray-800 text-lg md:text-xl pr-2">
        ShopEase
      </Link>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-black text-sm md:text-base">
          Home
        </Link>
        <Link to="/products" className="text-gray-700 hover:text-black text-sm md:text-base">
          Products
        </Link>
        <Link to="/cart" className="text-gray-700 hover:text-black text-sm md:text-base">
          Cart
        </Link>
        <Link to="/wishlist" className="text-gray-700 hover:text-black text-sm md:text-base">
          Wishlist
        </Link>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
