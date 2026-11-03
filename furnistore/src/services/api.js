const API_BASE_URL = "http://localhost:8080/api";

// ==========================================
// ✅ HELPER FUNCTION - MUST BE FIRST!
// ==========================================
export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

// ==========================================
// 1. PRODUCTS & CATEGORIES (Includes Admin Functions)
// ==========================================
export const fetchProducts = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.category) params.append("category", filters.category);
  if (filters.minPrice) params.append("minPrice", filters.minPrice);
  if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
  if (filters.search) params.append("search", filters.search);

  const queryString = params.toString();
  const url = `${API_BASE_URL}/products${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};

// ✅ ADMIN: Add Product
export const addProduct = async (productData) => {
  const response = await fetch(`${API_BASE_URL}/admin/products`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(productData),
  });
  if (!response.ok)
    throw new Error((await response.text()) || "Failed to add product");
  return response.json();
};

// ✅ ADMIN: Update Product
export const updateProduct = async (id, productData) => {
  const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(productData),
  });
  if (!response.ok)
    throw new Error((await response.text()) || "Failed to update product");
  return response.json();
};

// ✅ ADMIN: Delete Product (This is what AdminDashboard.jsx was looking for!)
export const deleteProductApi = async (productId) => {
  const response = await fetch(`${API_BASE_URL}/admin/products/${productId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok)
    throw new Error((await response.text()) || "Failed to delete product");
  return true;
};

// ==========================================
// 2. AUTHENTICATION
// ==========================================
export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok)
    throw new Error((await response.text()) || "Registration failed");
  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok)
    throw new Error((await response.text()) || "Invalid email or password");
  return response.json();
};

// ==========================================
// 3. USER PROFILE
// ==========================================
export const fetchUserProfile = async () => {
  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const err = new Error("Failed to fetch profile");
    err.status = response.status;
    throw err;
  }
  return response.json();
};

export const updateUserProfile = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  });
  if (!response.ok)
    throw new Error((await response.text()) || "Failed to update profile");
  return response.json();
};

// ==========================================
// 4. SHOPPING CART
// ==========================================
export const fetchUserCart = async () => {
  const response = await fetch(`${API_BASE_URL}/cart`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const err = new Error("Failed to fetch cart");
    err.status = response.status;
    throw err;
  }
  return response.json();
};

export const addToCartApi = async (productId, quantity) => {
  const response = await fetch(`${API_BASE_URL}/cart/add`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ productId, quantity }),
  });
  if (!response.ok)
    throw new Error((await response.text()) || "Failed to add to cart");
  return response.json();
};

export const updateCartQuantityApi = async (cartItemId, quantity) => {
  const response = await fetch(`${API_BASE_URL}/cart/items/${cartItemId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ quantity }),
  });
  if (!response.ok)
    throw new Error((await response.text()) || "Failed to update quantity");
  return response.json();
};

export const removeFromCartApi = async (cartItemId) => {
  const response = await fetch(`${API_BASE_URL}/cart/items/${cartItemId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok)
    throw new Error((await response.text()) || "Failed to remove item");
  return response.json();
};

export const clearCartApi = async () => {
  const response = await fetch(`${API_BASE_URL}/cart/clear`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to clear cart");
  return response.text();
};

// ==========================================
// 5. WISHLIST
// ==========================================
export const fetchWishlist = async () => {
  const response = await fetch(`${API_BASE_URL}/wishlist`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch wishlist");
  return response.json();
};

export const addToWishlist = async (productId) => {
  const response = await fetch(`${API_BASE_URL}/wishlist/${productId}`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to add to wishlist");
  return response.json();
};

export const removeFromWishlist = async (productId) => {
  const response = await fetch(`${API_BASE_URL}/wishlist/${productId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to remove from wishlist");
  return response.json();
};

// ==========================================
// 6. ADDRESSES
// ==========================================
export const fetchAddresses = async () => {
  const response = await fetch(`${API_BASE_URL}/addresses`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch addresses");
  return response.json();
};

export const createAddress = async (addressData) => {
  const response = await fetch(`${API_BASE_URL}/addresses`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(addressData),
  });
  if (!response.ok) throw new Error("Failed to create address");
  return response.json();
};

export const deleteAddress = async (addressId) => {
  const response = await fetch(`${API_BASE_URL}/addresses/${addressId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete address");
  return response.json();
};

// ==========================================
// 7. ORDERS
// ==========================================
export const placeOrder = async (orderData) => {
  const response = await fetch(`${API_BASE_URL}/orders/checkout`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(orderData),
  });
  if (!response.ok)
    throw new Error((await response.text()) || "Failed to place order");
  return response.json();
};

export const fetchUserOrders = async () => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch orders");
  return response.json();
};

// Alias for backwards compatibility
export const fetchOrderHistory = fetchUserOrders;
