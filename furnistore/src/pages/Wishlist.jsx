import { useStore } from "../state/store";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { wishlist } = useStore();

  if (!wishlist || wishlist.length === 0) {
    return (
      <div
        className="wrap empty-state"
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3 className="display">Your wishlist is empty</h3>
        <p className="muted" style={{ marginTop: 10 }}>
          Save your favorite items here to buy them later.
        </p>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: 20 }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="wrap fade-in">
      <h1 className="display" style={{ marginBottom: 30 }}>
        My Wishlist
      </h1>
      <div
        className="product-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 24,
        }}
      >
        {wishlist.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
