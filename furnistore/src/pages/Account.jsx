import { useState, useEffect } from "react";
import { useStore } from "../state/store";
import { updateUserProfile, fetchOrderHistory } from "../services/api";

export default function Account() {
  const { user, logout, wishlist } = useStore();
  const [activeTab, setActiveTab] = useState("profile");

  // Profile State
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Order History State
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  // Fetch orders when the "orders" tab is clicked
  useEffect(() => {
    if (activeTab === "orders" && user) {
      const loadOrders = async () => {
        setOrdersLoading(true);
        try {
          const data = await fetchOrderHistory();
          console.log("📦 ORDERS DATA FROM BACKEND:", data);
          if (data && data.length > 0) {
            console.log("🔍 FIRST ORDER STRUCTURE:", data[0]);
          }
          setOrders(data);
        } catch (err) {
          console.error("Failed to load orders:", err);
        } finally {
          setOrdersLoading(false);
        }
      };
      loadOrders();
    }
  }, [activeTab, user]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setMessage("");
      const updatedUser = await updateUserProfile(formData);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setFormData({
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone || "",
      });
      setMessage("Profile updated successfully!");
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  if (!user) {
    return (
      <div className="wrap empty-state">
        <h3 className="display">Please log in</h3>
        <a href="/login" className="btn btn-primary" style={{ marginTop: 20 }}>
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div className="wrap fade-in">
      <h1 className="display" style={{ marginBottom: 30 }}>
        My Account
      </h1>

      {/* Tabs */}
      <div
        className="tabs"
        style={{
          marginBottom: 30,
          display: "flex",
          gap: 10,
          borderBottom: "1px solid var(--line, #ddd)",
          paddingBottom: 10,
        }}
      >
        {["profile", "orders", "addresses", "wishlist"].map((t) => (
          <button
            key={t}
            className={`tab-btn${activeTab === t ? " active" : ""}`}
            onClick={() => setActiveTab(t)}
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              border: "none",
              background:
                activeTab === t ? "var(--primary, #007bff)" : "transparent",
              color: activeTab === t ? "#fff" : "var(--text, #333)",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
        <button
          className="tab-btn"
          onClick={handleLogout}
          style={{
            color: "red",
            marginLeft: "auto",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Sign out
        </button>
      </div>

      {/* --- PROFILE TAB --- */}
      {activeTab === "profile" && (
        <div style={{ maxWidth: 500 }}>
          <h2 className="display" style={{ fontSize: 24, marginBottom: 20 }}>
            Profile details
          </h2>
          {message && (
            <div
              style={{
                background: "#e6f4ea",
                color: "#137333",
                padding: 12,
                borderRadius: 4,
                marginBottom: 20,
              }}
            >
              {message}
            </div>
          )}
          {error && (
            <div
              style={{
                background: "#fce8e6",
                color: "#c5221f",
                padding: 12,
                borderRadius: 4,
                marginBottom: 20,
              }}
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleProfileSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <div>
              <label className="opt-label">Full name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                style={{
                  width: "100%",
                  padding: 10,
                  border: "1px solid var(--line, #ddd)",
                  borderRadius: 4,
                }}
                required
              />
            </div>
            <div>
              <label className="opt-label">Email address</label>
              <input
                type="email"
                value={formData.email}
                readOnly
                style={{
                  width: "100%",
                  padding: 10,
                  border: "1px solid var(--line, #ddd)",
                  borderRadius: 4,
                  background: "#f5f5f5",
                  color: "#888",
                }}
              />
            </div>
            <div>
              <label className="opt-label">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-field"
                placeholder="+91 98765 43210"
                style={{
                  width: "100%",
                  padding: 10,
                  border: "1px solid var(--line, #ddd)",
                  borderRadius: 4,
                }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ alignSelf: "flex-start", padding: "10px 20px" }}
            >
              {loading ? "Saving..." : "Save changes"}
            </button>
          </form>
        </div>
      )}

      {/* --- ORDERS TAB --- */}
      {activeTab === "orders" && (
        <div>
          <h2 className="display" style={{ fontSize: 24, marginBottom: 20 }}>
            Order history
          </h2>

          {ordersLoading ? (
            <p className="muted">Loading your orders...</p>
          ) : orders.length === 0 ? (
            <div
              className="empty-state"
              style={{ padding: "40px 0", textAlign: "center" }}
            >
              <h3 className="display" style={{ fontSize: 22 }}>
                No orders yet
              </h3>
              <p className="muted">
                When you place an order, it will appear here.
              </p>
              <a
                href="/shop"
                className="btn btn-primary"
                style={{ marginTop: 10, display: "inline-block" }}
              >
                Start Shopping
              </a>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {orders.map((order) => (
                <div
                  key={order.orderId || order.id}
                  style={{
                    border: "1px solid var(--line, #ddd)",
                    borderRadius: 8,
                    padding: 20,
                    background: "#fff",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 16,
                      paddingBottom: 12,
                      borderBottom: "1px solid var(--line-soft, #eee)",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16 }}>
                        Order #ORD-
                        {String(
                          order.id || order.orderId || order.orderNumber || "0",
                        ).padStart(4, "0")}
                      </div>
                      <div className="muted" style={{ fontSize: 13 }}>
                        Placed on{" "}
                        {new Date(order.orderDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontWeight: 700, fontSize: 18 }}>
                        ₹{Number(order.totalAmount).toFixed(2)}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color:
                            order.status === "DELIVERED" ? "green" : "orange",
                          fontWeight: 600,
                        }}
                      >
                        {order.status || "PROCESSING"}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    {order.items &&
                      order.items.map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 12,
                            }}
                          >
                            <div
                              style={{
                                width: 50,
                                height: 50,
                                background: "#f5f5f5",
                                borderRadius: 4,
                                overflow: "hidden",
                              }}
                            >
                              <img
                                src={
                                  item.productImage ||
                                  "https://via.placeholder.com/50"
                                }
                                alt={item.productName}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                            <div>
                              <div style={{ fontSize: 14, fontWeight: 600 }}>
                                {item.productName}
                              </div>
                              <div className="muted" style={{ fontSize: 12 }}>
                                Qty: {item.quantity}
                              </div>
                            </div>
                          </div>
                          <div style={{ fontWeight: 600, fontSize: 14 }}>
                            ₹{Number(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* --- ADDRESSES TAB --- */}
      {activeTab === "addresses" && (
        <div
          className="empty-state"
          style={{ padding: "40px 0", textAlign: "center" }}
        >
          <h3 className="display" style={{ fontSize: 22 }}>
            No saved addresses
          </h3>
          <p className="muted">Add a shipping address during checkout.</p>
        </div>
      )}

      {/* --- WISHLIST TAB --- */}
      {activeTab === "wishlist" && (
        <div>
          {wishlist.length === 0 ? (
            <div
              className="empty-state"
              style={{ padding: "40px 0", textAlign: "center" }}
            >
              <h3 className="display" style={{ fontSize: 22 }}>
                Your wishlist is empty
              </h3>
              <p className="muted">Save your favorite items here.</p>
            </div>
          ) : (
            <div
              className="product-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 24,
              }}
            >
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="product-card"
                  style={{
                    border: "1px solid var(--line-soft, #eee)",
                    borderRadius: 8,
                    overflow: "hidden",
                  }}
                >
                  <div style={{ aspectRatio: "1/1", background: "#f5f5f5" }}>
                    <img
                      src={
                        item.images?.[0] || "https://via.placeholder.com/300"
                      }
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div style={{ padding: 12 }}>
                    <h4
                      style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}
                    >
                      {item.name}
                    </h4>
                    <p className="muted" style={{ fontSize: 14 }}>
                      ₹{Number(item.price).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
