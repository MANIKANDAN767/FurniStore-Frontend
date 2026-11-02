import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Icon } from "../components/Icons.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { useStore } from "../state/store.jsx";
import { fetchProductById, fetchProducts } from "../services/api.js";

const colorOptions = ["Oat", "Stone", "Moss"];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, wishlist, addToWishlist, removeFromWishlist } = useStore();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState("");
  const [tab, setTab] = useState("description");

  // Fetch product from backend
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
        setColor(data.color || "Oat");

        // Fetch related products
        const allProducts = await fetchProducts({ category: data.category });
        const relatedProducts = allProducts
          .filter((p) => p.id !== data.id)
          .slice(0, 4);
        setRelated(relatedProducts);
      } catch (err) {
        console.error("Failed to load product:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="wrap empty-state">
        <h3 className="display">Loading product...</h3>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="wrap empty-state">
        <h3 className="display">Product not found</h3>
        <button
          className="btn btn-primary"
          style={{ marginTop: 20 }}
          onClick={() => navigate("/shop")}
        >
          Back to shop
        </button>
      </div>
    );
  }

  const saved = wishlist.includes(product.id);

  const handleWishlistToggle = () => {
    if (saved) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    // Pass the product ID and quantity
    addToCart(product.id, qty);
  };

  return (
    <div className="wrap fade-in">
      <div className="breadcrumb">
        <Link to="/">Home</Link> /{" "}
        <Link to={`/shop?category=${product.category}`}>
          {product.category}
        </Link>{" "}
        / {product.name}
      </div>

      <div className="pd-layout">
        <div>
          <div className="pd-gallery-main">
            <img
              src={
                product.images?.[activeImg] || "https://via.placeholder.com/500"
              }
              alt={product.name}
            />
          </div>
          <div className="pd-thumbs">
            {product.images?.map((src, i) => (
              <button
                key={i}
                className={`pd-thumb${i === activeImg ? " active" : ""}`}
                onClick={() => setActiveImg(i)}
              >
                <img
                  src={src}
                  alt={`${product.name} view ${i + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="eyebrow">
            {product.sku} · {product.material}
          </span>
          <h1 className="pd-title display">{product.name}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="stars">
              {"★".repeat(Math.round(product.rating || 0))}
              {"☆".repeat(5 - Math.round(product.rating || 0))}
            </span>
            <span className="muted" style={{ fontSize: 13 }}>
              {product.rating} ({product.reviews || 0} reviews)
            </span>
          </div>
          <div className="pd-price">
            ₹{Number(product.price).toLocaleString()}
            {product.compareAt && (
              <span className="was" style={{ marginLeft: 10, fontSize: 15 }}>
                ₹{Number(product.compareAt).toLocaleString()}
              </span>
            )}
          </div>
          <p className="pd-desc">{product.description}</p>

          <span className="opt-label">Color — {color}</span>
          <div className="opt-row">
            {colorOptions.map((c) => (
              <button
                key={c}
                className={`opt-pill${color === c ? " selected" : ""}`}
                onClick={() => setColor(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <span className="opt-label">Quantity</span>
          <div className="qty-row">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Decrease"
            >
              <Icon.Minus />
            </button>
            <span>{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} aria-label="Increase">
              <Icon.Plus />
            </button>
          </div>

          <div className="pd-cta-row">
            <button
              className="btn btn-primary"
              style={{ flex: 1 }}
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
            <button
              className="icon-btn"
              style={{
                border: "1px solid var(--line)",
                borderRadius: 2,
                width: 48,
                height: 48,
              }}
              onClick={handleWishlistToggle}
            >
              <Icon.Heart filled={saved} />
            </button>
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              fontSize: 12.5,
            }}
            className="muted"
          >
            <Icon.Truck /> Ships in 2–4 weeks · Free white-glove delivery
          </div>

          <div className="pd-meta-list">
            {product.specs &&
              Object.entries(product.specs).map(([k, v]) => (
                <div key={k}>
                  <span className="muted">{k}</span>
                  <span>{v}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="tabs">
        {["description", "specifications", "reviews"].map((t) => (
          <button
            key={t}
            className={`tab-btn${tab === t ? " active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "description" && (
        <p className="muted" style={{ maxWidth: 720, lineHeight: 1.8 }}>
          {product.description} Every piece is inspected twice before it leaves
          the workshop — once for structure, once for finish.
        </p>
      )}
      {tab === "specifications" && (
        <div style={{ maxWidth: 520 }}>
          {product.specs &&
            Object.entries(product.specs).map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: "1px solid var(--line-soft)",
                  fontSize: 13.5,
                }}
              >
                <span className="muted">{k}</span>
                <span>{v}</span>
              </div>
            ))}
        </div>
      )}
      {tab === "reviews" && (
        <div style={{ maxWidth: 640 }}>
          {[
            {
              name: "Priya M.",
              rating: 5,
              text: "Exactly as pictured — the fabric feels heavier and better made than anything else we looked at.",
            },
            {
              name: "Daniel K.",
              rating: 4,
              text: "Beautiful piece, delivery took a little longer than the estimate but worth the wait.",
            },
            {
              name: "Sana R.",
              rating: 5,
              text: "This is the first sofa I have not wanted to replace after two years.",
            },
          ].map((r, i) => (
            <div key={i} className="review-row">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <strong>{r.name}</strong>
                <span className="stars">
                  {"★".repeat(r.rating)}
                  {"☆".repeat(5 - r.rating)}
                </span>
              </div>
              <p className="muted" style={{ fontSize: 13.5 }}>
                {r.text}
              </p>
            </div>
          ))}
        </div>
      )}

      {related.length > 0 && (
        <div className="section" style={{ paddingTop: 40 }}>
          <div className="section-head">
            <h2 className="display" style={{ fontSize: 26 }}>
              You may also like
            </h2>
          </div>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
