import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer"; // Assuming you added the Footer
import { ProductContext } from "../contexts/productContext";

const zoomIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: i * 0.1,
    },
  }),
};

const Home = () => {
  const { state, dispatch } = useContext(ProductContext);
  

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: "Fetch_Products" });

      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        dispatch({ type: "Fetch_Successful", payload: data.products });
      } catch (err) {
        dispatch({ type: "Fetch_Failed", payload: error.message });
      }
    };

    fetchProducts();
  }, []);

  

  return (
    <main>
      <HeroSection />
      {/* Product Section */}
      <section id="products" className="p-6">
        
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Our Products
        </h2>
        <p className="text-gray-500 mt-2 text-center mb-6">
          Explore our latest collection.
        </p>
        <div className="flex justify-between items-center h-12 mb-4 gap-2">
        <div className="ml-0 h-full border-blue-50 border shadow-sm rounded-lg flex p-2 m-auto mb-6 flex-1">
          <input
            type="text"
            className="w-full pl-2 focus:outline-none"
            placeholder="search products"
            value={state.input}
            onChange={(e) =>
              dispatch({ type: "Filter_By_Search", payload: e.target.value })
            }
          />
        </div>
        <div className="h-full border-blue-50 border shadow-sm rounded-lg flex p-2 m-auto mb-6">
          <select
            name="sort"
            id=""
            onChange={(e) =>
              dispatch({ type: "Sort_By_Price", payload: e.target.value })
            }
          >
            <option value="low-high" className="font-base">
              low-high
            </option>
            <option value="high-low">high-low</option>
          </select>
        </div>
        <div className="h-full border-blue-50 border shadow-sm rounded-lg flex p-2 m-auto mb-6">
          <select
            name="category"
            id=""
            onChange={(e) =>
              dispatch({ type: "Category_Filter", payload: e.target.value })
            }
            className="outline-none shadow-none border-none"
          >
            {state.categories.map((c) => (
              <option key={c} className="text-gray-500">
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {state.loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : state.products.length === 0 ? (
        <p className="text-center text-gray-500 h-80">No such products found.</p>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {state.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
      </section>
      <Footer />
    </main>
  );
};

export default Home;
