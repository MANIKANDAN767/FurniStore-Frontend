import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <h4>FurniStore</h4>
            <p style={{ maxWidth: 280 }}>Considered furniture in solid wood, stone, and honest textiles — built for rooms you'll live in for years.</p>
          </div>
          <div>
            <h4>Shop</h4>
            <Link to="/shop?category=sofas">Sofas</Link>
            <Link to="/shop?category=chairs">Chairs</Link>
            <Link to="/shop?category=tables">Tables</Link>
            <Link to="/shop?category=storage">Storage</Link>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#">Our Craft</a>
            <a href="#">Showrooms</a>
            <a href="#">Trade Program</a>
            <a href="#">Careers</a>
          </div>
          <div>
            <h4>Stay in touch</h4>
            <p>New arrivals and studio notes, twice a month.</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <input
                placeholder="Email address"
                style={{ flex: 1, background: 'transparent', border: '1px solid rgba(231,226,214,0.3)', borderRadius: 2, padding: '10px 12px', color: 'inherit' }}
              />
              <button className="btn btn-brass btn-sm">Join</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} FurniStore. All rights reserved.</span>
          <span>Prototype build — no backend connected</span>
        </div>
      </div>
    </footer>
  )
}
