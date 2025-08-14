import { createContext, useCallback, useReducer } from "react";

export const CartContext = createContext();
const initialState = {
  cart: [],
  wishlist: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const inCart = state.cart.find((item) => item.id === action.payload.id);
      return inCart
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, qty: item.qty + 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: [...state.cart, { ...action.payload, qty: 1 }],
          };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload && item.qty > 0
              ? { ...item, qty: item.qty - 1 }
              : item
          )
          .filter((item) => item.id !== action.payload || item.qty > 0),
      };

    case "TOGGLE_WISHLIST":
      const inWishlist = state.wishlist.find(
        (item) => item.id === action.payload.id
      );
      return inWishlist
        ? {
            ...state,
            wishlist: state.wishlist.filter(
              (item) => item.id !== action.payload.id
            ),
          }
        : {
            ...state,
            wishlist: [...state.wishlist, action.payload],
          };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = useCallback(
    (product) => dispatch({ type: "ADD_TO_CART", payload: product }),
    [dispatch]
  );
  const removeFromCart = useCallback(
    (id) => dispatch({ type: "REMOVE_FROM_CART", payload: id }),
    [dispatch]
  );
  const addToWishlist = useCallback(
    (product) => dispatch({ type: "TOGGLE_WISHLIST", payload: product }),
    [dispatch]
  );
  const removeFromWishlist = useCallback(
    (id) => dispatch({ type: "TOGGLE_WISHLIST", payload: { id } }),
    [dispatch]
  );

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
