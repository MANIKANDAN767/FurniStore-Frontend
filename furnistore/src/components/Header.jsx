import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Icon } from './Icons.jsx'
import { useStore } from '../state/store.jsx'

const links = [
  { to: '/shop', label: 'Shop' },
  { to: '/shop?category=sofas', label: 'Sofas' },
  { to: '/shop?category=chairs', label: 'Chairs' },
  { to: '/shop?category=tables', label: 'Tables' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const { cartCount, wishlist, user } = useStore()

  const submitSearch = (e) => {
    e.preventDefault()
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop')
  }

  return (
    <header className="site-header">
      <div className="wrap header-row">
        <button className="hamburger icon-btn" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <Icon.X /> : <Icon.Menu />}
        </button>

        <Link to="/" className="logo">Furni<span>Store</span></Link>

        <nav className="main-nav">
          {links.map((l) => (
            <NavLink key={l.label} to={l.to} className={({ isActive }) => (isActive ? 'active' : '')}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <form className="search-box" onSubmit={submitSearch}>
          <Icon.Search />
          <input placeholder="Search furniture…" value={q} onChange={(e) => setQ(e.target.value)} />
        </form>

        <div className="header-actions">
          <Link className="icon-btn" to="/wishlist" aria-label="Wishlist">
            <Icon.Heart />
            {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
          </Link>
          <Link className="icon-btn" to="/cart" aria-label="Cart">
            <Icon.Bag />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>
          <Link className="icon-btn" to={user ? '/account' : '/login'} aria-label="Account">
            <Icon.User />
          </Link>
        </div>
      </div>

      {open && (
        <div className="wrap mobile-nav">
          <form onSubmit={submitSearch} style={{ marginBottom: 10 }}>
            <div className="search-box" style={{ maxWidth: 'none' }}>
              <Icon.Search />
              <input placeholder="Search furniture…" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
          </form>
          {links.map((l) => (
            <Link key={l.label} to={l.to} onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
          <Link to="/wishlist" onClick={() => setOpen(false)}>Wishlist</Link>
          <Link to="/cart" onClick={() => setOpen(false)}>Cart</Link>
          <Link to={user ? '/account' : '/login'} onClick={() => setOpen(false)}>{user ? 'Account' : 'Sign in'}</Link>
        </div>
      )}
    </header>
  )
}
