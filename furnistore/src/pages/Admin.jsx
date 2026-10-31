import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icons.jsx'
import { products } from '../data/products.js'

const salesByMonth = [
  { m: 'Mar', v: 42 }, { m: 'Apr', v: 55 }, { m: 'May', v: 48 }, { m: 'Jun', v: 63 },
  { m: 'Jul', v: 71 }, { m: 'Aug', v: 88 },
]
const orders = [
  { id: 'FS-10482', customer: 'Meera Nair', date: 'Aug 14, 2026', status: 'Delivered', total: 4189 },
  { id: 'FS-10481', customer: 'Arvind Rao', date: 'Aug 13, 2026', status: 'Processing', total: 960 },
  { id: 'FS-10480', customer: 'Priya Menon', date: 'Aug 12, 2026', status: 'In Transit', total: 2140 },
  { id: 'FS-10479', customer: 'Karan Shah', date: 'Aug 11, 2026', status: 'Delivered', total: 1180 },
  { id: 'FS-10478', customer: 'Divya Suresh', date: 'Aug 10, 2026', status: 'Cancelled', total: 720 },
]
const statusColor = { Delivered: 'status-delivered', 'In Transit': 'status-transit', Processing: 'status-processing', Cancelled: 'status-processing' }

const navItems = [
  ['dashboard', 'Dashboard', Icon.Chart],
  ['products', 'Products', Icon.Package],
  ['orders', 'Orders', Icon.Bag],
  ['customers', 'Customers', Icon.User],
]

export default function Admin() {
  const [tab, setTab] = useState('dashboard')
  const max = Math.max(...salesByMonth.map((s) => s.v))

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link to="/" className="logo">Furni<span>Store</span></Link>
        <div className="eyebrow" style={{ color: 'rgba(231,226,214,0.4)', margin: '4px 0 20px' }}>Admin</div>
        <nav>
          {navItems.map(([key, label, IconC]) => (
            <button key={key} className={`admin-nav-item${tab === key ? ' active' : ''}`} onClick={() => setTab(key)}>
              <IconC /> {label}
            </button>
          ))}
        </nav>
        <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid rgba(231,226,214,0.12)' }}>
          <Link to="/" className="admin-nav-item" style={{ display: 'flex' }}><Icon.Logout /> Exit to storefront</Link>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-top">
          <div>
            <span className="eyebrow">Overview</span>
            <h1 className="display" style={{ fontSize: 28, marginTop: 6, textTransform: 'capitalize' }}>{tab}</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--forest)', color: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 13 }}>A</div>
            <span style={{ fontSize: 13.5 }}>Admin User</span>
          </div>
        </div>

        {tab === 'dashboard' && (
          <>
            <div className="stat-grid">
              <div className="stat-card"><span className="eyebrow">Revenue (30d)</span><div className="stat-value">$142,860</div><div className="stat-delta up">↑ 12.4% vs last month</div></div>
              <div className="stat-card"><span className="eyebrow">Orders</span><div className="stat-value">318</div><div className="stat-delta up">↑ 6.1% vs last month</div></div>
              <div className="stat-card"><span className="eyebrow">Avg. order value</span><div className="stat-value">$449</div><div className="stat-delta down">↓ 1.8% vs last month</div></div>
              <div className="stat-card"><span className="eyebrow">Active customers</span><div className="stat-value">2,046</div><div className="stat-delta up">↑ 3.2% vs last month</div></div>
            </div>

            <div className="panel">
              <div className="panel-head"><h3>Sales, last 6 months</h3><span className="muted mono" style={{ fontSize: 11.5 }}>in $000s</span></div>
              <div className="bar-chart">
                {salesByMonth.map((s) => (
                  <div key={s.m} className="bar-col">
                    <div className="bar" style={{ height: `${(s.v / max) * 130}px` }} title={`$${s.v}k`} />
                    <span className="bar-label">{s.m}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="panel-head"><h3>Recent orders</h3><button className="btn btn-ghost btn-sm" onClick={() => setTab('orders')}>View all</button></div>
              <table className="admin-table">
                <thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Status</th><th>Total</th></tr></thead>
                <tbody>
                  {orders.slice(0, 4).map((o) => (
                    <tr key={o.id}>
                      <td className="mono">{o.id}</td><td>{o.customer}</td><td>{o.date}</td>
                      <td><span className={`status-pill ${statusColor[o.status]}`}>{o.status}</span></td>
                      <td className="mono">${o.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 'products' && (
          <div className="panel">
            <div className="panel-head">
              <h3>Products ({products.length})</h3>
              <button className="btn btn-primary btn-sm">+ Add product</button>
            </div>
            <table className="admin-table">
              <thead><tr><th></th><th>Name</th><th>SKU</th><th>Category</th><th>Price</th><th>Stock</th><th></th></tr></thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id}>
                    <td><img className="table-thumb" src={p.images[0]} alt={p.name} /></td>
                    <td>{p.name}</td>
                    <td className="mono">{p.sku}</td>
                    <td style={{ textTransform: 'capitalize' }}>{p.category}</td>
                    <td className="mono">${p.price.toLocaleString()}</td>
                    <td>{(i * 7 + 12) % 40 === 0 ? <span className="status-pill status-processing">Low stock</span> : `${(i * 7 + 12) % 40 + 4} in stock`}</td>
                    <td>
                      <div className="row-actions">
                        <button className="icon-mini-btn" aria-label="Edit"><Icon.Edit /></button>
                        <button className="icon-mini-btn" aria-label="Delete"><Icon.Trash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'orders' && (
          <div className="panel">
            <div className="panel-head"><h3>All orders</h3></div>
            <table className="admin-table">
              <thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Status</th><th>Total</th><th></th></tr></thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td className="mono">{o.id}</td><td>{o.customer}</td><td>{o.date}</td>
                    <td><span className={`status-pill ${statusColor[o.status]}`}>{o.status}</span></td>
                    <td className="mono">${o.total.toLocaleString()}</td>
                    <td><button className="btn btn-ghost btn-sm">Details</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'customers' && (
          <div className="panel">
            <div className="panel-head"><h3>Customers</h3></div>
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Email</th><th>Orders</th><th>Lifetime value</th></tr></thead>
              <tbody>
                {orders.map((o, i) => (
                  <tr key={o.id}>
                    <td>{o.customer}</td>
                    <td className="mono" style={{ fontSize: 12 }}>{o.customer.toLowerCase().replace(' ', '.')}@email.com</td>
                    <td>{i + 1}</td>
                    <td className="mono">${(o.total * (i + 1)).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
