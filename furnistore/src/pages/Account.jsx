import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '../components/Icons.jsx'
import { useStore } from '../state/store.jsx'
import { products } from '../data/products.js'

const orders = [
  { id: 'FS-10482', date: 'Aug 14, 2026', status: 'Delivered', items: [products[0], products[6]], total: 4189 },
  { id: 'FS-10390', date: 'Jul 29, 2026', status: 'In Transit', items: [products[2]], total: 2140 },
  { id: 'FS-10201', date: 'Jul 02, 2026', status: 'Processing', items: [products[1], products[3]], total: 2140 },
]
const statusClass = { Delivered: 'status-delivered', 'In Transit': 'status-transit', Processing: 'status-processing' }

export default function Account() {
  const { user, logout, wishlist } = useStore()
  const navigate = useNavigate()
  const [tab, setTab] = useState('profile')
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')

  if (!user) {
    return (
      <div className="wrap empty-state">
        <span className="eyebrow">Account</span>
        <h1 className="display" style={{ fontSize: 28, margin: '14px 0' }}>Sign in to view your account</h1>
        <Link to="/login" className="btn btn-primary">Sign in</Link>
      </div>
    )
  }

  return (
    <div className="wrap fade-in account-layout">
      <aside>
        <div style={{ marginBottom: 24 }}>
          <div className="display" style={{ fontSize: 20, textTransform: 'capitalize' }}>{user.name}</div>
          <span className="muted" style={{ fontSize: 13 }}>{user.email}</span>
        </div>
        <nav className="account-nav">
          {[
            ['profile', 'Profile'],
            ['orders', 'Order history'],
            ['addresses', 'Addresses'],
            ['wishlist', 'Wishlist'],
          ].map(([key, label]) => (
            <button key={key} className={tab === key ? 'active' : ''} onClick={() => setTab(key)}>{label}</button>
          ))}
          <button onClick={() => { logout(); navigate('/') }} style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
            <Icon.Logout /> Sign out
          </button>
        </nav>
      </aside>

      <div>
        {tab === 'profile' && (
          <div className="account-card">
            <h3 className="display" style={{ fontSize: 20, marginBottom: 20 }}>Profile details</h3>
            <div className="field"><label>Full name</label><input value={name} onChange={(e) => setName(e.target.value)} /></div>
            <div className="field"><label>Email address</label><input value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <div className="field"><label>Phone</label><input placeholder="+91 98765 43210" /></div>
            <button className="btn btn-primary">Save changes</button>
          </div>
        )}

        {tab === 'orders' && (
          <div className="account-card">
            <h3 className="display" style={{ fontSize: 20, marginBottom: 10 }}>Order history</h3>
            {orders.map((o) => (
              <div key={o.id} className="order-row">
                <div>
                  <strong className="mono" style={{ fontSize: 13 }}>{o.id}</strong>
                  <div className="muted" style={{ fontSize: 12.5, marginTop: 4 }}>{o.date} · {o.items.map((i) => i.name).join(', ')}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span className={`status-pill ${statusClass[o.status]}`}>{o.status}</span>
                  <span className="mono">${o.total.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'addresses' && (
          <div className="account-card">
            <h3 className="display" style={{ fontSize: 20, marginBottom: 20 }}>Saved addresses</h3>
            <div style={{ border: '1px solid var(--line)', borderRadius: 4, padding: 18, marginBottom: 14 }}>
              <strong>Home</strong>
              <p className="muted" style={{ fontSize: 13.5, marginTop: 6 }}>14 Lakeview Avenue, Adyar, Chennai, TN 600020</p>
            </div>
            <button className="btn btn-outline btn-sm">+ Add new address</button>
          </div>
        )}

        {tab === 'wishlist' && (
          <div className="account-card">
            <h3 className="display" style={{ fontSize: 20, marginBottom: 6 }}>Wishlist</h3>
            <p className="muted" style={{ fontSize: 13.5, marginBottom: 16 }}>{wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}</p>
            <Link to="/wishlist" className="btn btn-outline btn-sm">View wishlist</Link>
          </div>
        )}
      </div>
    </div>
  )
}
