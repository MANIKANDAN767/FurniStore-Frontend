import React, { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { products, categories } from '../data/products.js'

const materials = [...new Set(products.map((p) => p.material))]
const colorSwatch = { Oat: '#d9cdb5', Cognac: '#8a4a28', Espresso: '#4a3225', Natural: '#c9a877', Stone: '#c7c2b6', Moss: '#6b7a5e', Ivory: '#efe9de', 'Dark Walnut': '#3b2a1f' }

export default function ProductListing() {
  const [params, setParams] = useSearchParams()
  const activeCategory = params.get('category') || ''
  const query = params.get('q') || ''

  const [selectedMaterials, setSelectedMaterials] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [maxPrice, setMaxPrice] = useState(3200)
  const [sort, setSort] = useState('featured')
  const [view, setView] = useState('grid')

  const toggle = (arr, setArr, val) => setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val])

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price <= maxPrice)
    if (activeCategory) list = list.filter((p) => p.category === activeCategory)
    if (query) list = list.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    if (selectedMaterials.length) list = list.filter((p) => selectedMaterials.includes(p.material))
    if (selectedColors.length) list = list.filter((p) => selectedColors.includes(p.color))
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [activeCategory, query, selectedMaterials, selectedColors, maxPrice, sort])

  const catName = categories.find((c) => c.id === activeCategory)?.name

  return (
    <div className="wrap fade-in">
      <div className="breadcrumb"><a href="/">Home</a> / Shop {catName ? `/ ${catName}` : ''}</div>

      <div className="listing-head">
        <div>
          <span className="eyebrow">{query ? `Results for "${query}"` : 'Full collection'}</span>
          <h1 className="display" style={{ fontSize: 34, marginTop: 8 }}>{catName || 'All Furniture'}</h1>
        </div>
      </div>

      <div className="listing-layout">
        <aside>
          <div className="filter-block">
            <h4>Category</h4>
            {categories.map((c) => (
              <label key={c.id} className="filter-row">
                <input
                  type="radio"
                  name="category"
                  checked={activeCategory === c.id}
                  onChange={() => setParams(activeCategory === c.id ? {} : { category: c.id })}
                />
                {c.name}
              </label>
            ))}
            {activeCategory && (
              <button className="btn-ghost btn-sm" style={{ marginTop: 6, padding: '6px 0' }} onClick={() => setParams({})}>
                Clear category
              </button>
            )}
          </div>

          <div className="filter-block">
            <h4>Material</h4>
            {materials.map((m) => (
              <label key={m} className="filter-row">
                <input type="checkbox" checked={selectedMaterials.includes(m)} onChange={() => toggle(selectedMaterials, setSelectedMaterials, m)} />
                {m}
              </label>
            ))}
          </div>

          <div className="filter-block">
            <h4>Color</h4>
            <div className="swatch-row">
              {Object.entries(colorSwatch).map(([name, hex]) => (
                <button
                  key={name}
                  className={`swatch${selectedColors.includes(name) ? ' selected' : ''}`}
                  style={{ background: hex }}
                  title={name}
                  onClick={() => toggle(selectedColors, setSelectedColors, name)}
                  aria-label={name}
                />
              ))}
            </div>
          </div>

          <div className="filter-block" style={{ borderBottom: 'none' }}>
            <h4>Max price — ${maxPrice.toLocaleString()}</h4>
            <input type="range" min="500" max="3200" step="50" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--forest)' }} />
          </div>
        </aside>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <span className="result-count">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <button className="icon-mini-btn" onClick={() => setView('grid')} style={{ borderColor: view === 'grid' ? 'var(--forest)' : 'var(--line)' }} aria-label="Grid view">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
              </button>
              <button className="icon-mini-btn" onClick={() => setView('list')} style={{ borderColor: view === 'list' ? 'var(--forest)' : 'var(--line)' }} aria-label="List view">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
              <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <span className="eyebrow">No matches</span>
              <h3 className="display" style={{ fontSize: 24 }}>Nothing fits those filters yet</h3>
              <p className="muted" style={{ marginTop: 10 }}>Try widening your price range or clearing a filter.</p>
            </div>
          ) : (
            <div className={view === 'grid' ? 'product-grid' : 'product-grid'} style={view === 'list' ? { gridTemplateColumns: '1fr' } : undefined}>
              {filtered.map((p) => (
                view === 'list'
                  ? (
                    <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 20, paddingBottom: 20, borderBottom: '1px solid var(--line-soft)' }}>
                      <div className="p-media" style={{ margin: 0 }}><img src={p.images[0]} alt={p.name} /></div>
                      <div>
                        <span className="eyebrow">{p.material} · {p.color}</span>
                        <div className="p-name" style={{ fontSize: 20, margin: '6px 0' }}>{p.name}</div>
                        <p className="muted" style={{ fontSize: 13.5, marginBottom: 12, maxWidth: 520 }}>{p.description}</p>
                        <div className="p-price">${p.price.toLocaleString()}</div>
                      </div>
                    </div>
                  )
                  : <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
