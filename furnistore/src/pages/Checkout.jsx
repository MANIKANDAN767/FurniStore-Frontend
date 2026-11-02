import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../state/store";
import { placeOrder, fetchAddresses, createAddress } from "../services/api";

export default function Checkout() {
  const navigate = useNavigate();
  // ✅ 1. Destructure clearCart from your store
  const { cart, user, clearCart } = useStore();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  const [newAddress, setNewAddress] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    street: "",
    city: "",
    state: "",
    country: "India",
    postalCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const data = await fetchAddresses();
        setAddresses(data);
        if (data && data.length > 0) {
          setSelectedAddressId(data[0].id);
        }
      } catch (err) {
        console.error("Failed to load addresses:", err);
      }
    };
    loadAddresses();
  }, []);

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="wrap empty-state">
        <h3 className="display">Your cart is empty</h3>
        <button
          onClick={() => navigate("/shop")}
          className="btn btn-primary"
          style={{ marginTop: 20 }}
        >
          Go to Shop
        </button>
      </div>
    );
  }

  const cartItems = cart.items || [];

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) =>
        total + Number(item.product?.price || item.price || 0) * Number(item.quantity || 1),
      0,
    );
  };

  const handleAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const createdAddress = await createAddress(newAddress);
      setAddresses((prev) => [...prev, createdAddress]);
      setSelectedAddressId(createdAddress.id);
      setShowNewAddressForm(false);
    } catch (err) {
      setError(err.message || "Failed to add address");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!selectedAddressId && !showNewAddressForm) {
      setError("Please select an address or add a new one.");
      return;
    }

    if (showNewAddressForm && !selectedAddressId) {
      await handleAddAddress(e);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const orderData = {
        addressId: Number(selectedAddressId),
        shippingAddressId: Number(selectedAddressId),
        couponCode: null,
      };

      console.log('Checkout Payload:', orderData);
      // 1. Place the order
      await placeOrder(orderData);

      // ✅ 2. CLEAR THE CART IMMEDIATELY!
      if (clearCart) {
        clearCart(); // Calls the function in your Zustand/Context store
      }

      alert("Order placed successfully! 🎉");
      navigate("/account");
    } catch (err) {
      console.error("Checkout error:", err);
      setError(
        err.message || "Failed to place order. Please check your details.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrap fade-in">
      <h1 className="display" style={{ marginBottom: 30 }}>
        Checkout
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
        {/* Left Side: Address Selection / Form */}
        <div>
          <h2 className="display" style={{ fontSize: 24, marginBottom: 20 }}>
            Shipping Address
          </h2>
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

          {!showNewAddressForm ? (
            <div>
              {addresses.length === 0 ? (
                <p className="muted">You have no saved addresses.</p>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    marginBottom: 20,
                  }}
                >
                  {addresses.map((addr) => (
                    <label
                      key={addr.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: 12,
                        border: "1px solid var(--line, #ddd)",
                        borderRadius: 4,
                        cursor: "pointer",
                        background:
                          selectedAddressId === addr.id
                            ? "#f0f7ff"
                            : "transparent",
                      }}
                    >
                      <input
                        type="radio"
                        name="address"
                        value={addr.id}
                        checked={selectedAddressId === addr.id}
                        onChange={(e) =>
                          setSelectedAddressId(Number(e.target.value))
                        }
                      />
                      <div>
                        <div style={{ fontWeight: 600 }}>
                          {addr.fullName}, {addr.street}, {addr.city}{" "}
                          {addr.postalCode}
                        </div>
                        <div className="muted" style={{ fontSize: 13 }}>
                          {addr.phone}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              <button
                type="button"
                className="btn"
                style={{ border: "1px solid var(--line, #ddd)", width: "100%" }}
                onClick={() => setShowNewAddressForm(true)}
              >
                + Add New Address
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleAddAddress}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                background: "#f9f9f9",
                padding: 20,
                borderRadius: 8,
              }}
            >
              <h3 style={{ margin: 0, fontSize: 18 }}>Add New Address</h3>

              <div>
                <label className="opt-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={newAddress.fullName}
                  onChange={handleAddressChange}
                  required
                  className="input-field"
                  style={{
                    width: "100%",
                    padding: 10,
                    border: "1px solid var(--line, #ddd)",
                    borderRadius: 4,
                  }}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="opt-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={newAddress.phone}
                  onChange={handleAddressChange}
                  required
                  className="input-field"
                  style={{
                    width: "100%",
                    padding: 10,
                    border: "1px solid var(--line, #ddd)",
                    borderRadius: 4,
                  }}
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="opt-label">Street Address</label>
                <input
                  type="text"
                  name="street"
                  value={newAddress.street}
                  onChange={handleAddressChange}
                  required
                  className="input-field"
                  style={{
                    width: "100%",
                    padding: 10,
                    border: "1px solid var(--line, #ddd)",
                    borderRadius: 4,
                  }}
                  placeholder="123 Main St, Apt 4B"
                />
              </div>

              <div>
                <label className="opt-label">City</label>
                <input
                  type="text"
                  name="city"
                  value={newAddress.city}
                  onChange={handleAddressChange}
                  required
                  className="input-field"
                  style={{
                    width: "100%",
                    padding: 10,
                    border: "1px solid var(--line, #ddd)",
                    borderRadius: 4,
                  }}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                <div>
                  <label className="opt-label">State</label>
                  <input
                    type="text"
                    name="state"
                    value={newAddress.state}
                    onChange={handleAddressChange}
                    required
                    className="input-field"
                    style={{
                      width: "100%",
                      padding: 10,
                      border: "1px solid var(--line, #ddd)",
                      borderRadius: 4,
                    }}
                  />
                </div>
                <div>
                  <label className="opt-label">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={newAddress.postalCode}
                    onChange={handleAddressChange}
                    required
                    className="input-field"
                    style={{
                      width: "100%",
                      padding: 10,
                      border: "1px solid var(--line, #ddd)",
                      borderRadius: 4,
                    }}
                    placeholder="600001"
                  />
                </div>
              </div>

              <div>
                <label className="opt-label">Country</label>
                <input
                  type="text"
                  name="country"
                  value={newAddress.country}
                  onChange={handleAddressChange}
                  required
                  className="input-field"
                  style={{
                    width: "100%",
                    padding: 10,
                    border: "1px solid var(--line, #ddd)",
                    borderRadius: 4,
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  {loading ? "Saving..." : "Save Address"}
                </button>
                <button
                  type="button"
                  className="btn"
                  style={{ border: "1px solid var(--line, #ddd)" }}
                  onClick={() => setShowNewAddressForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {!showNewAddressForm && (
            <button
              type="button"
              onClick={handleSubmitOrder}
              disabled={loading || !selectedAddressId}
              className="btn btn-primary"
              style={{
                marginTop: 20,
                width: "100%",
                padding: "14px 0",
                fontSize: 16,
              }}
            >
              {loading ? "Processing Order..." : "Place Order"}
            </button>
          )}
        </div>

        {/* Right Side: Order Summary */}
        <div
          className="cart-summary"
          style={{
            background: "var(--bg-soft, #f9f9f9)",
            padding: 24,
            borderRadius: 8,
            height: "fit-content",
          }}
        >
          <h2 className="display" style={{ fontSize: 24, marginBottom: 20 }}>
            Order Summary
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              marginBottom: 24,
            }}
          >
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: 12,
                  borderBottom: "1px solid var(--line-soft, #eee)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      background: "#fff",
                      borderRadius: 4,
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={
                        item.product?.images?.[0] || item.productImage || "https://via.placeholder.com/60"
                      }
                      alt={item.product?.name || item.productName}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>
                      {item.product?.name || item.productName}
                    </p>
                    <p style={{ margin: 0, fontSize: 12, color: "#666" }}>
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p style={{ margin: 0, fontWeight: 600 }}>
                  ₹{((item.product?.price || item.price || 0) * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 20,
              fontWeight: 700,
              borderTop: "2px solid var(--line, #ddd)",
              paddingTop: 16,
            }}
          >
            <span>Total</span>
            <span>₹{calculateTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
