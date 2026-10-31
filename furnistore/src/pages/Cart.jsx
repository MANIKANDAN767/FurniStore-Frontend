import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icons.jsx'
import { useStore } from '../state/store.jsx'

export default function Cart() {
  const { cartLines, subtotal, removeFromCart, setQty } = useStore()
  const [promo, setPromo] = useState('')
  const shipping = subtotal > 1500 || subtotal === 0 ? 0 : 79
  const tax = Math.round(subtotal * 0.08)

  if (cartLines.length === 0) {
    return (
      <div className="wrap empty-state">
        <span className="eyebrow">Your cart</span>
        <h1 className="display" style={{ fontSize: 30, margin: '14px 0' }}>It's empty in here</h1>
        <p className="muted" style={{ marginBottom: 24 }}>Pieces you add will show up here.</p>
        <Link to="/shop" className="btn btn-primary">Browse the collection</Link>
      </div>
    )
  }

  return (
    <div className="wrap fade-in">
      <div className="breadcrumb"><Link to="/">Home</Link> / Cart</div>
      <h1 className="display" style={{ fontSize: 32, margin: '18px 0 4px' }}>Your Cart</h1>
      <span className="muted" style={{ fontSize: 13.5 }}>{cartLines.length} item{cartLines.length !== 1 ? 's' : ''}</span>

      <div className="cart-layout">
        <div>
          {cartLines.map(({ product, qty }) => (
            <div key={product.id} className="cart-item">
              <img src={product.images[0]} alt={product.name} />
              <div>
                <div className="cart-item-name">{product.name}</div>
                <span className="muted" style={{ fontSize: 12.5 }}>{product.material} · {product.color}</span>
                <div className="qty-row" style={{ marginTop: 12 }}>
                  <button onClick={() => setQty(product.id, qty - 1)}><Icon.Minus /></button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(product.id, qty + 1)}><Icon.Plus /></button>
                </div>
              </div>
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 14 }}>
                <span className="mono">${(product.price * qty).toLocaleString()}</span>
                <button className="icon-mini-btn" onClick={() => removeFromCart(product.id)} aria-label="Remove">
                  <Icon.Trash />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="summary-card">
          <h3 className="display" style={{ fontSize: 19, marginBottom: 6 }}>Order Summary</h3>
          <div className="promo-row">
            <input placeholder="Promo code" value={promo} onChange={(e) => setPromo(e.target.value)} />
            <button className="btn btn-outline btn-sm">Apply</button>
          </div>
          <div className="summary-row"><span className="muted">Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
          <div className="summary-row"><span className="muted">Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping}`}</span></div>
          <div className="summary-row"><span className="muted">Estimated tax</span><span>${tax.toLocaleString()}</span></div>
          <div className="summary-row total"><span>Total</span><span>${(subtotal + shipping + tax).toLocaleString()}</span></div>
          <button className="btn btn-primary btn-block" style={{ marginTop: 10 }}>Checkout</button>
          <Link to="/shop" className="btn btn-ghost btn-block" style={{ marginTop: 6 }}>Continue shopping</Link>
        </div>
      </div>
    </div>
  )
}
