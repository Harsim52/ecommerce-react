import { useContext, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../contexts/productContext";

const Products = () => {
  const { state, dispatch } = useContext(ProductContext);

  useEffect(() => {
    dispatch({ type: "Fetch_Products" });

    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "Fetch_Successful", payload: data.products });
      })
      .catch((error) => {
        dispatch({ type: "Fetch_Failed", payload: error.message });
      });
  }, []);

  return (
    <main className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        All Products
      </h2>
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
    </main>
  );
};

export default Products;
