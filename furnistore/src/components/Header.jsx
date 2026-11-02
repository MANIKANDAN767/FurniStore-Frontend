import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useStore } from "../state/store.jsx";

export default function Header() {
  const { cart, user, logout } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ SAFE CART COUNT: Prevents "Cannot read properties of null" error
  const cartItemCount =
    cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      style={{
        background: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        padding: "15px 0",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#333",
            textDecoration: "none",
          }}
        >
          FurniStore
        </Link>

        {/* Navigation Links */}
        <nav style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Link
            to="/shop"
            style={{
              textDecoration: "none",
              color: location.pathname === "/shop" ? "#007bff" : "#333",
            }}
          >
            Shop
          </Link>

          {/* Cart Icon with Safe Badge */}
          <Link
            to="/cart"
            style={{
              textDecoration: "none",
              color: "#333",
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            🛒 Cart
            {cartItemCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-12px",
                  background: "#ff4444",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                }}
              >
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* User Authentication State */}
          {user ? (
            <>
              <Link
                to="/account"
                style={{ textDecoration: "none", color: "#333" }}
              >
                👤 {user.name || user.email}
              </Link>

              {/* Admin Button (Only shows if user has ADMIN role) */}
              {user.role === "ADMIN" && (
                <Link
                  to="/admin"
                  style={{
                    textDecoration: "none",
                    color: "#d9534f",
                    fontWeight: "bold",
                  }}
                >
                  🛡️ Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "1px solid #ccc",
                  padding: "5px 15px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  color: "#333",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "#333" }}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "#007bff" }}
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
