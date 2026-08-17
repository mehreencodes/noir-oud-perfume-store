import { createContext, useContext, useReducer, useEffect } from 'react';

const WishlistContext = createContext(null);

const STORAGE_KEY = 'noir-oud-wishlist';

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE': {
      const exists = state.some((p) => p.id === action.product.id);
      return exists
        ? state.filter((p) => p.id !== action.product.id)
        : [...state, action.product];
    }
    case 'REMOVE':
      return state.filter((p) => p.id !== action.id);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function WishlistProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, loadInitial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function toggleWishlist(product) {
    dispatch({ type: 'TOGGLE', product });
  }

  function removeFromWishlist(id) {
    dispatch({ type: 'REMOVE', id });
  }

  function clearWishlist() {
    dispatch({ type: 'CLEAR' });
  }

  function isWishlisted(id) {
    return items.some((p) => p.id === id);
  }

  return (
    <WishlistContext.Provider
      value={{
        items,
        count: items.length,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider');
  return ctx;
}