import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from './Icons.jsx'
import { useStore } from '../state/store.jsx'

export default function ProductCard({ product }) {
  const { wishlist, toggleWishlist, addToCart } = useStore()
  const saved = wishlist.includes(product.id)

  return (
    <div className="p-card">
      <div className="p-media">
        <Link to={`/product/${product.id}`}>
          <img src={product.images[0]} alt={product.name} loading="lazy" />
        </Link>
        {product.tag && <span className="p-tag">{product.tag}</span>}
        <button
          className={`p-wish${saved ? ' active' : ''}`}
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id) }}
          aria-label="Toggle wishlist"
        >
          <Icon.Heart filled={saved} />
        </button>
        <div className="p-quick">
          <button className="btn btn-primary btn-sm btn-block" onClick={() => addToCart(product.id)}>
            Add to cart
          </button>
        </div>
      </div>
      <Link to={`/product/${product.id}`} className="p-info">
        <span className="eyebrow">{product.material} · {product.color}</span>
        <div className="p-name">{product.name}</div>
        <div className="p-price">
          <span>${product.price.toLocaleString()}</span>
          {product.compareAt && <span className="was">${product.compareAt.toLocaleString()}</span>}
        </div>
      </Link>
    </div>
  )
}
