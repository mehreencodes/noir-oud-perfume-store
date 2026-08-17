import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'noir-oud-cart';

function parsePrice(priceStr) {
  // "Rs 8,500" -> 8500
  return Number(String(priceStr).replace(/[^0-9]/g, '')) || 0;
}

// Every way the cart can change, in one place. Each case takes the
// current state + an action, and returns a brand new state — it never
// mutates `state` directly. This is what makes reducers predictable:
// given the same state and action, you always get the same result.
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const product = action.payload;
      const existing = state.items.find((i) => i.id === product.id);
      const items = existing
        ? state.items.map((i) =>
            i.id === product.id ? { ...i, qty: i.qty + 1 } : i
          )
        : [...state.items, { ...product, qty: 1 }];
      return { ...state, items };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };

    case 'UPDATE_QTY': {
      const { id, qty } = action.payload;
      if (qty < 1) {
        return { ...state, items: state.items.filter((i) => i.id !== id) };
      }
      return {
        ...state,
        items: state.items.map((i) => (i.id === id ? { ...i, qty } : i)),
      };
    }

    case 'CHECKOUT':
      if (state.items.length === 0) return state;
      return { ...state, items: [], orderPlaced: true };

    case 'RESET_ORDER_PLACED':
      return { ...state, orderPlaced: false };

    default:
      // Unknown action types are a programmer error, not a silent
      // no-op — this is the standard reducer convention.
      return state;
  }
}

// Lazy initializer: useReducer's third argument runs once, on first
// render, to build the starting state. Same idea as the old
// useState(() => {...}) pattern — just wired into useReducer instead.
function loadInitialState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return { items: saved ? JSON.parse(saved) : [], orderPlaced: false };
  } catch {
    return { items: [], orderPlaced: false };
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // storage unavailable, fail silently
    }
  }, [state.items]);

  // These stay as plain functions so every other component keeps
  // calling addToCart(product) / removeFromCart(id) exactly as before
  // — dispatch + action types are an internal implementation detail.
  function addToCart(product) {
    dispatch({ type: 'ADD_ITEM', payload: product });
  }

  function removeFromCart(id) {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }

  function updateQty(id, qty) {
    dispatch({ type: 'UPDATE_QTY', payload: { id, qty } });
  }

  function checkout() {
    if (state.items.length === 0) return;
    dispatch({ type: 'CHECKOUT' });
    setTimeout(() => dispatch({ type: 'RESET_ORDER_PLACED' }), 4000);
  }

  const count = state.items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = state.items.reduce(
    (sum, i) => sum + i.qty * parsePrice(i.price),
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        updateQty,
        count,
        subtotal,
        checkout,
        orderPlaced: state.orderPlaced,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used inside <CartProvider>');
  }
  return ctx;
}