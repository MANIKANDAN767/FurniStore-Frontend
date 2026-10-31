const API_BASE_URL = "http://localhost:8080/api";

// Fetch all products (with optional filters: category, minPrice, maxPrice, search)
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

// Fetch a single product by ID
export const fetchProductById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
};

// Fetch all categories
export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};
