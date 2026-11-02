import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/Icons.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { categories, products } from "../data/products.js.bak";

export default function Home() {
  const bestsellers = products
    .filter((p) => p.tag === "Bestseller" || p.rating >= 4.7)
    .slice(0, 4);
  const newArrivals = products.filter((p) => p.tag === "New").slice(0, 4);

  return (
    <div className="fade-in">
      <section className="hero">
        <img
          src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1800&auto=format&fit=crop"
          alt="Sunlit living room with sculptural furniture"
        />
        <div className="hero-content">
          <span className="eyebrow">Fall Collection · No. 04</span>
          <h1 className="hero-title display">
            Furniture built
            <br />
            for the long haul
          </h1>
          <p className="hero-sub">
            Solid woods, honest joinery, and textiles chosen to soften with age
            — not wear out. Pieces made to outlast a lease.
          </p>
          <div style={{ display: "flex", gap: 14 }}>
            <Link to="/shop" className="btn btn-brass">
              Shop the collection
            </Link>
            <Link
              to="/shop?category=sofas"
              className="btn btn-outline"
              style={{ borderColor: "rgba(250,248,244,0.5)", color: "#faf8f4" }}
            >
              Browse sofas
            </Link>
          </div>
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">Shop by room</span>
            <h2 className="display" style={{ marginTop: 8 }}>
              Find your category
            </h2>
          </div>
        </div>
        <div className="cat-grid">
          {categories.map((c) => (
            <Link key={c.id} to={`/shop?category=${c.id}`} className="cat-card">
              <img src={c.image} alt={c.name} loading="lazy" />
              <span className="display">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <div>
            <span className="eyebrow">Loved by the room</span>
            <h2 className="display" style={{ marginTop: 8 }}>
              Bestsellers
            </h2>
          </div>
          <Link to="/shop" className="btn btn-ghost">
            View all <Icon.Chevron />
          </Link>
        </div>
        <div className="product-grid">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div
          className="wrap section-tight"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 30,
          }}
        >
          <div style={{ display: "flex", gap: 14 }}>
            <Icon.Truck />
            <div>
              <strong style={{ display: "block", marginBottom: 4 }}>
                Free white-glove delivery
              </strong>
              <span className="muted" style={{ fontSize: 13 }}>
                On every order over $1,500
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            <Icon.Shield />
            <div>
              <strong style={{ display: "block", marginBottom: 4 }}>
                10-year frame warranty
              </strong>
              <span className="muted" style={{ fontSize: 13 }}>
                On all solid-wood pieces
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            <Icon.Package />
            <div>
              <strong style={{ display: "block", marginBottom: 4 }}>
                100-night trial
              </strong>
              <span className="muted" style={{ fontSize: 13 }}>
                Return it if it's not right
              </span>
            </div>
          </div>
        </div>
      </section>

      {newArrivals.length > 0 && (
        <section className="section wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">Just landed</span>
              <h2 className="display" style={{ marginTop: 8 }}>
                New arrivals
              </h2>
            </div>
            <Link to="/shop" className="btn btn-ghost">
              View all <Icon.Chevron />
            </Link>
          </div>
          <div className="product-grid">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div
          style={{
            background: "var(--forest-deep)",
            color: "var(--surface)",
            borderRadius: 4,
            padding: "70px 50px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <span className="eyebrow" style={{ color: "var(--brass-light)" }}>
              Studio notes
            </span>
            <h2
              className="display"
              style={{ marginTop: 10, fontSize: 32, maxWidth: 420 }}
            >
              Get first look at new pieces
            </h2>
          </div>
          <form
            style={{ display: "flex", gap: 10, minWidth: 320 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              placeholder="Email address"
              style={{
                flex: 1,
                background: "rgba(250,248,244,0.08)",
                border: "1px solid rgba(250,248,244,0.25)",
                borderRadius: 2,
                padding: "13px 16px",
                color: "inherit",
              }}
            />
            <button className="btn btn-brass">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
