import { useState, useEffect } from "react";
import { useStore } from "../state/store";
import { deleteProductApi } from "../services/api";

export default function AdminDashboard() {
  const { products, loading, fetchProducts } = useStore();
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    // Ensure products are loaded
    if (!products || products.length === 0) {
      fetchProducts();
    }
  }, [products, fetchProducts]);

  const handleDelete = async (productId, productName) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${productName}"? This cannot be undone.`,
      )
    ) {
      return;
    }

    setDeletingId(productId);
    try {
      await deleteProductApi(productId);
      alert("Product deleted successfully!");
      // Refresh the product list
      fetchProducts();
    } catch (err) {
      alert(err.message || "Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading && !products) {
    return (
      <div className="wrap empty-state">
        <h3 className="display">Loading dashboard...</h3>
      </div>
    );
  }

  return (
    <div className="wrap fade-in">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <h1 className="display">Admin Dashboard</h1>
        <button className="btn btn-primary" style={{ background: "#28a745" }}>
          + Add New Product (Coming Soon)
        </button>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          border: "1px solid var(--line, #ddd)",
          overflow: "hidden",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead
            style={{
              background: "#f8f9fa",
              borderBottom: "2px solid var(--line, #ddd)",
            }}
          >
            <tr>
              <th style={{ padding: 16, fontWeight: 700 }}>Product</th>
              <th style={{ padding: 16, fontWeight: 700 }}>Category</th>
              <th style={{ padding: 16, fontWeight: 700 }}>Price</th>
              <th style={{ padding: 16, fontWeight: 700 }}>Stock</th>
              <th style={{ padding: 16, fontWeight: 700, textAlign: "right" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr
                  key={product.id}
                  style={{ borderBottom: "1px solid var(--line-soft, #eee)" }}
                >
                  <td style={{ padding: 16 }}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <img
                        src={
                          product.images?.[0] ||
                          "https://via.placeholder.com/50"
                        }
                        alt={product.name}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 4,
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 600 }}>{product.name}</div>
                        <div className="muted" style={{ fontSize: 12 }}>
                          {product.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: 16 }}>
                    {typeof product.category === "string"
                      ? product.category
                      : product.category?.name || "N/A"}
                  </td>
                  <td style={{ padding: 16, fontWeight: 600 }}>
                    ₹{Number(product.price).toFixed(2)}
                  </td>
                  <td style={{ padding: 16 }}>
                    <span
                      style={{
                        background: product.stock > 10 ? "#e6f4ea" : "#fce8e6",
                        color: product.stock > 10 ? "#137333" : "#c5221f",
                        padding: "4px 8px",
                        borderRadius: 4,
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td style={{ padding: 16, textAlign: "right" }}>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      disabled={deletingId === product.id}
                      className="btn"
                      style={{
                        background:
                          deletingId === product.id ? "#ccc" : "#dc3545",
                        color: "#fff",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: 4,
                        cursor:
                          deletingId === product.id ? "not-allowed" : "pointer",
                        fontSize: 13,
                      }}
                    >
                      {deletingId === product.id ? "Deleting..." : "🗑️ Delete"}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {products && products.length === 0 && (
          <div style={{ padding: 40, textAlign: "center", color: "#666" }}>
            No products found in the database.
          </div>
        )}
      </div>
    </div>
  );
}
