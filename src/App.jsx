import { lazy, Suspense, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { ProductContext } from "./contexts/productContext";
const Products = lazy(() => import("./pages/Products"));
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const NotFound = lazy(() => import("./pages/NotFound"));

const SearchListener = () => {
  const { dispatch } = useContext(ProductContext);

  const location = useLocation();

  useEffect(() => {
    dispatch({ type: "Filter_By_Search", payload: "" });
  }, [location.pathname, dispatch]);
  return null;
};

const App = () => {
  return (
    <Router basename={import.meta.env.BASE_URL || "/"}>
      <Navbar />
      <SearchListener />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
