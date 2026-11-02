import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../state/store.jsx";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useStore();

  const handleAddToCart = (e) => {
    // Prevent the click from navigating to the product details page
    e.stopPropagation();

    // ✅ FIX: Pass ONLY the product.id (string) and quantity (number)
    // Do NOT pass the whole 'product' object!
    addToCart(product.id, 1);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      style={{
        border: "1px solid #eee",
        borderRadius: "8px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        background: "#fff",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Product Image */}
      <div
        style={{ height: "200px", overflow: "hidden", background: "#f9f9f9" }}
      >
        <img
          src={
            product.images?.[0] ||
            "https://via.placeholder.com/300x200?text=No+Image"
          }
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Product Details */}
      <div style={{ padding: "15px" }}>
        <h3 style={{ margin: "0 0 10px 0", fontSize: "1.1rem", color: "#333" }}>
          {product.name}
        </h3>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <span
            style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#007bff" }}
          >
            ₹{product.price?.toFixed(2)}
          </span>
          {product.compareAt && (
            <span
              style={{
                fontSize: "0.9rem",
                color: "#999",
                textDecoration: "line-through",
              }}
            >
              ₹{product.compareAt.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          style={{
            width: "100%",
            padding: "10px",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "0.95rem",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
