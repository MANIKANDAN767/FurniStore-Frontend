import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../state/store.jsx";

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useStore();
  const navigate = useNavigate();

  // 1. Handle Empty Cart
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div
        className="container"
        style={{ textAlign: "center", padding: "50px" }}
      >
        <h2>Your cart is empty</h2>
        <button
          onClick={() => navigate("/shop")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // 2. Calculate Total Safely
  const total = cart.items.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0,
  );

  return (
    <div
      className="container"
      style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}
    >
      <h2>Shopping Cart</h2>

      {/* 3. Map Through Cart Items */}
      {cart.items.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #eee",
            padding: "20px 0",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {/* Product Image */}
          <img
            src={item.product?.images?.[0] || "https://via.placeholder.com/100"}
            alt={item.product?.name || "Product"}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />

          {/* Product Details */}
          <div style={{ flex: 1, minWidth: "200px" }}>
            <h3 style={{ margin: "0 0 5px 0", fontSize: "1.1rem" }}>
              {item.product?.name || "Unknown Product"}
            </h3>
            <p style={{ margin: 0, color: "#666" }}>
              ₹{(item.product?.price || 0).toFixed(2)}
            </p>
          </div>

          {/* Quantity Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              style={{
                padding: "5px 12px",
                cursor: item.quantity <= 1 ? "not-allowed" : "pointer",
                background: "#f0f0f0",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              -
            </button>
            <span style={{ minWidth: "20px", textAlign: "center" }}>
              {item.quantity}
            </span>
            <button
              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
              style={{
                padding: "5px 12px",
                cursor: "pointer",
                background: "#f0f0f0",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              +
            </button>
          </div>

          {/* Item Total */}
          <div
            style={{
              fontWeight: "bold",
              minWidth: "100px",
              textAlign: "right",
            }}
          >
            ₹{((item.product?.price || 0) * item.quantity).toFixed(2)}
          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeFromCart(item.id)}
            style={{
              background: "#ff4444",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Remove
          </button>
        </div>
      ))}

      {/* 4. Cart Summary & Checkout Button */}
      <div
        style={{
          marginTop: "30px",
          textAlign: "right",
          borderTop: "2px solid #333",
          paddingTop: "20px",
        }}
      >
        <h3>Total: ₹{total.toFixed(2)}</h3>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "15px",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={clearCart}
            style={{
              padding: "10px 20px",
              background: "#666",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Clear Cart
          </button>
          <button
            onClick={() => navigate("/checkout")}
            style={{
              padding: "10px 20px",
              background: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
