import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // ✅ Added this
import { useStore } from "../state/store";
import ProductCard from "../components/ProductCard";

export default function ProductListing() {
  const { products, loading, error, fetchProducts } = useStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  const [searchParams, setSearchParams] = useSearchParams(); // ✅ Hook to read URL

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Initialize state from the URL (e.g., ?category=Sofas)
  const urlCategory = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);

  const [searchTermInput, setSearchTermInput] = useState("");

  // ✅ Update state if the URL changes (when clicking header links)
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategory(cat);
    } else {
      setSelectedCategory("all");
    }
  }, [searchParams]);

  // Filter products
  useEffect(() => {
    let result = products || [];

    // 1. Filter by Category (Smart matching)
    if (selectedCategory && selectedCategory !== "all") {
      result = result.filter((p) => {
        const pCat =
          typeof p.category === "string" ? p.category : p.category?.name || "";
        // ✅ Use .includes() so "Sofas" matches "Sofas & Sectionals"
        return pCat.toLowerCase().includes(selectedCategory.toLowerCase());
      });
    }

    // 2. Filter by Search Term
    if (searchTerm) {
      result = result.filter(
        (p) =>
          p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory]);

  // Handle manual search input
  const handleSearchChange = (e) => {
    setSearchTermInput(e.target.value);
    setSearchTerm(e.target.value);
  };

  // Handle manual dropdown change
  const handleCategoryChange = (e) => {
    const newCat = e.target.value;
    setSelectedCategory(newCat);
    if (newCat === "all") {
      setSearchParams({}); // Remove ?category from URL
    } else {
      setSearchParams({ category: newCat }); // Add ?category to URL
    }
  };

  if (loading) {
    return (
      <div className="wrap empty-state">
        <h3 className="display">Loading products from database...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="wrap empty-state">
        <h3 className="display" style={{ color: "red" }}>
          {error}
        </h3>
        <p>Make sure your Spring Boot backend is running on port 8080.</p>
      </div>
    );
  }

  // Extract unique categories
  const rawCategories = products
    .map((p) => {
      if (typeof p.category === "string") return p.category;
      if (p.category && typeof p.category === "object") return p.category.name;
      return "Uncategorized";
    })
    .filter(Boolean);

  const categories = ["all", ...new Set(rawCategories)];

  return (
    <div className="wrap fade-in">
      <h1 className="display" style={{ marginBottom: 20 }}>
        Shop All Furniture
      </h1>

      <div
        style={{ display: "flex", gap: 16, marginBottom: 30, flexWrap: "wrap" }}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={searchTermInput}
          onChange={handleSearchChange}
          className="input-field"
          style={{
            padding: 10,
            border: "1px solid var(--line, #ddd)",
            borderRadius: 4,
            flex: 1,
            minWidth: 200,
          }}
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="input-field"
          style={{
            padding: 10,
            border: "1px solid var(--line, #ddd)",
            borderRadius: 4,
            minWidth: 150,
          }}
        >
          {categories.map((cat, index) => {
            const catStr = String(cat || "Uncategorized");
            return (
              <option key={index} value={catStr}>
                {catStr.charAt(0).toUpperCase() + catStr.slice(1)}
              </option>
            );
          })}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <h3 className="display">No products found</h3>
          <p className="muted">Try adjusting your search or category filter.</p>
        </div>
      ) : (
        <div
          className="product-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 24,
          }}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
