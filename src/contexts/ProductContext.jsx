import { createContext, useReducer } from "react";

export const ProductContext = createContext(null);

export const initialState = {
  allProducts: [],
  categories: [],
  loading: false,
  error: "",
  products: [],
  input: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "Fetch_Products": {
      return { ...state, loading: true };
    }
    case "Fetch_Successful": {
      return {
        ...state,
        loading: false,
        allProducts: action.payload,
        products: action.payload,
        categories: [
          ...new Set(action.payload.map((product) => product.category)),
        ],
      };
    }
    case "Fetch_Failed": {
      return { ...state, loading: false, error: action.payload };
    }
    case "Category_Filter": {
      return {
        ...state,
        products: state.allProducts.filter(
          (p) => p.category === action.payload
        ),
      };
    }
    case "Sort_By_Price": {
      return {
        ...state,
        products: [...state.products].sort((a, b) =>
          action.payload === "low-high" ? a.price - b.price : b.price - a.price
        ),
      };
    }
    case "Filter_By_Search": {
      return {
        ...state,
        input: action.payload,
        products: state.input
          ? state.allProducts.filter((product) =>
              product.title.toLowerCase().includes(state.input.toLowerCase())
            )
          : state.allProducts,
      };
    }
    default:
      return state;
  }
};

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
