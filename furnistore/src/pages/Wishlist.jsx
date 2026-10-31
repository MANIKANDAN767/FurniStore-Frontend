import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { products } from '../data/products.js'
import { useStore } from '../state/store.jsx'

export default function Wishlist() {
  const { wishlist } = useStore()
  const items = products.filter((p) => wishlist.includes(p.id))

  if (items.length === 0) {
    return (
      <div className="wrap empty-state">
        <span className="eyebrow">Your wishlist</span>
        <h1 className="display" style={{ fontSize: 30, margin: '14px 0' }}>Nothing saved yet</h1>
        <p className="muted" style={{ marginBottom: 24 }}>Tap the heart on any piece to save it here.</p>
        <Link to="/shop" className="btn btn-primary">Browse the collection</Link>
      </div>
    )
  }

  return (
    <div className="wrap fade-in">
      <div className="breadcrumb"><Link to="/">Home</Link> / Wishlist</div>
      <h1 className="display" style={{ fontSize: 32, margin: '18px 0 4px' }}>Your Wishlist</h1>
      <span className="muted" style={{ fontSize: 13.5 }}>{items.length} saved item{items.length !== 1 ? 's' : ''}</span>
      <div className="wishlist-grid">
        {items.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
