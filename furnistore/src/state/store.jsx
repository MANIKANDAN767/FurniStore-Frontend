import { create } from "zustand";
  import {
    fetchProducts as fetchProductsApi, // ✅ FIX: Rename the import to avoid collision
    fetchProductById as fetchProductByIdApi,
    fetchCategories as fetchCategoriesApi,
    fetchUserCart,
    addToCartApi,
    updateCartQuantityApi,
    removeFromCartApi,
    clearCartApi,
    fetchWishlist,
    addToWishlist as addToWishlistApi,
    removeFromWishlist as removeFromWishlistApi,
    fetchUserOrders,
    placeOrder as placeOrderApi,
    fetchAddresses,
    createAddress as createAddressApi,
    fetchUserProfile,
    updateUserProfile as updateUserProfileApi,
  } from "../services/api";

export const useStore = create((set, get) => ({
  // State
  products: [],
  categories: [],
  cart: null,
  wishlist: [],
  orders: [],
  addresses: [],
  user: null,
  toast: null,
  loading: false,

  // Actions
  setToast: (message) => {
    set({ toast: message });
    setTimeout(() => set({ toast: null }), 3000);
  },

  setLoading: (loading) => set({ loading }),

  // ✅ FIX: Use the renamed import here!
  fetchProducts: async () => {
    try {
      const products = await fetchProductsApi(); // Calls the API, not itself!
      set({ products });
    } catch (error) {
      get().setToast(error.message);
    }
  },

  // ... (keep the rest of your store.jsx exactly as it was) ...

  // Fetch Product by ID
  fetchProductById: async (id) => {
    try {
      return await fetchProductByIdApi(id);
    } catch (error) {
      get().setToast(error.message);
      return null;
    }
  },

  // Fetch Categories
  fetchCategories: async () => {
    try {
      const categories = await fetchCategoriesApi();
      set({ categories });
    } catch (error) {
      get().setToast(error.message);
    }
  },

  // ✅ Fetch Cart (Updated to properly save cart state)
   loadCart: async () => {
     try {
       const cart = await fetchUserCart();
       set({ cart });
     } catch (error) {
       console.error("Failed to load cart:", error);
       if (error.status === 401 || error.status === 403) {
         localStorage.removeItem("token");
         window.location.href = "/login";
       }
       set({ cart: { items: [] } });
     }
   },

  // ✅ Add to Cart (Updated to save the returned cart)
  addToCart: async (productId, quantity) => {
    try {
      const updatedCart = await addToCartApi(productId, quantity);
      set({ cart: updatedCart }); // ✅ This saves the updated cart!
      get().setToast("Added to cart!");
      get().loadCart(); // Refresh cart to be safe
    } catch (error) {
      get().setToast(error.message);
    }
  },

  // ✅ Update Cart Quantity (Updated to save the returned cart)
  updateCartQuantity: async (cartItemId, quantity) => {
    if (quantity < 1) return;
    try {
      const updatedCart = await updateCartQuantityApi(cartItemId, quantity);
      set({ cart: updatedCart }); // ✅ This saves the updated cart!
      get().setToast("Cart updated!");
    } catch (error) {
      get().setToast(error.message);
    }
  },

  // ✅ Remove from Cart (Updated to save the returned cart)
  removeFromCart: async (cartItemId) => {
    try {
      const updatedCart = await removeFromCartApi(cartItemId);
      set({ cart: updatedCart }); // ✅ This saves the updated cart!
      get().setToast("Item removed from cart");
    } catch (error) {
      get().setToast(error.message);
    }
  },

  // Clear Cart
  clearCart: async () => {
    try {
      await clearCartApi();
      set({ cart: { items: [] } });
      get().setToast("Cart cleared!");
    } catch (error) {
      get().setToast(error.message);
    }
  },

  // Fetch Wishlist
  loadWishlist: async () => {
    try {
      const wishlist = await fetchWishlist();
      set({ wishlist });
    } catch (error) {
      get().setToast(error.message);
    }
  },

  // Add to Wishlist
  addToWishlist: async (productId) => {
    try {
      await addToWishlistApi(productId);
      get().loadWishlist();
      get().setToast("Added to wishlist!");
    } catch (error) {
      get().setToast(error.message);
    }
  },

  // Remove from Wishlist
  removeFromWishlist: async (productId) => {
    try {
      await removeFromWishlistApi(productId);
      set((state) => ({
        wishlist: state.wishlist.filter((item) => item.id !== productId),
      }));
      get().setToast("Removed from wishlist");
    } catch (error) {
      get().setToast(error.message);
    }
  },

  // Fetch Orders
  loadOrders: async () => {
    try {
      const orders = await fetchUserOrders();
      set({ orders });
    } catch (error) {
      get().setToast(error.message);
    }
  },

  // Place Order
  placeOrder: async (orderData) => {
    try {
      const order = await placeOrderApi(orderData);
      get().loadOrders();
      get().clearCart();
      get().setToast("Order placed successfully!");
      return order;
    } catch (error) {
      get().setToast(error.message);
      throw error;
    }
  },

  // Fetch Addresses
  loadAddresses: async () => {
    try {
      const addresses = await fetchAddresses();
      set({ addresses });
    } catch (error) {
      get().setToast(error.message);
    }
  },

  // Create Address
  createAddress: async (addressData) => {
    try {
      await createAddressApi(addressData);
      get().loadAddresses();
      get().setToast("Address added successfully!");
    } catch (error) {
      get().setToast(error.message);
    }
  },

  // Fetch User Profile
   loadUserProfile: async () => {
     try {
       const user = await fetchUserProfile();
       set({ user });
     } catch (error) {
       get().setToast(error.message);
       if (error.status === 401 || error.status === 403) {
         localStorage.removeItem("token");
         window.location.href = "/login";
       }
     }
   },

  // Update User Profile
  updateUserProfile: async (userData) => {
    try {
      const updatedUser = await updateUserProfileApi(userData);
      set({ user: updatedUser });
      get().setToast("Profile updated successfully!");
    } catch (error) {
      get().setToast(error.message);
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, cart: { items: [] }, wishlist: [], orders: [] });
    get().setToast("Logged out successfully!");
  },
}));
