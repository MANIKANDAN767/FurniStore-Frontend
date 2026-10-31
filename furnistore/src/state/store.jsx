import { createContext, useContext, useState, useEffect } from "react";
import { fetchProducts, fetchCategories } from "../services/api";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // --- Data State ---
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Cart & Wishlist State (Persisted in localStorage) ---
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // --- Auth State (Simulated for now, we will connect to your customUserDetailsService next) ---
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // --- Fetch Real Data from Spring Boot on Initial Load ---
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Error loading data from backend:", err);
        setError(
          "Failed to load products. Is the backend running on port 8080?",
        );
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // --- Cart Actions ---
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      let updatedCart;
      if (existing) {
        updatedCart = prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        updatedCart = [...prev, { ...product, quantity }];
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const updatedCart = prev.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId);
    setCart((prev) => {
      const updatedCart = prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // --- Wishlist Actions ---
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev;
      const updated = [...prev, product];
      localStorage.setItem("wishlist", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => {
      const updated = prev.filter((item) => item.id !== productId);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      return updated;
    });
  };

  // --- Auth Actions ---
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        loading,
        error,
        cart,
        wishlist,
        user,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        addToWishlist,
        removeFromWishlist,
        login,
        logout,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
