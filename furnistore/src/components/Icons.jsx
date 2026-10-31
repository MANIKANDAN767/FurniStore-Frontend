import React from 'react'

const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const Icon = {
  Search: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
  ),
  Heart: ({ filled, ...p }) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} fill={filled ? 'currentColor' : 'none'} {...p}>
      <path d="M12 21s-7.5-4.6-10-9.3C.6 8.4 2.3 5 5.8 5c2 0 3.4 1 6.2 4 2.8-3 4.2-4 6.2-4 3.5 0 5.2 3.4 3.8 6.7C19.5 16.4 12 21 12 21z" />
    </svg>
  ),
  Bag: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
      <path d="M6 8h12l-1 12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  ),
  User: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
      <circle cx="12" cy="8" r="3.6" /><path d="M4.5 20.2c1.6-3.5 4.3-5.3 7.5-5.3s5.9 1.8 7.5 5.3" />
    </svg>
  ),
  Menu: (p) => <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>,
  X: (p) => <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>,
  Chevron: (p) => <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}><path d="M9 6l6 6-6 6" /></svg>,
  Trash: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}>
      <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0-1 13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 7" />
    </svg>
  ),
  Plus: (p) => <svg viewBox="0 0 24 24" width="14" height="14" {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>,
  Minus: (p) => <svg viewBox="0 0 24 24" width="14" height="14" {...base} {...p}><path d="M5 12h14" /></svg>,
  Star: ({ filled, ...p }) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.2" {...p}>
      <path d="M12 2.5l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.7l-6.1 3.3 1.5-6.8-5.2-4.7 6.9-.7L12 2.5z" />
    </svg>
  ),
  Truck: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
      <path d="M2 7h11v9H2z" /><path d="M13 10h4l4 3v3h-8z" /><circle cx="6.5" cy="18" r="1.6" /><circle cx="16.5" cy="18" r="1.6" />
    </svg>
  ),
  Shield: (p) => <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}><path d="M12 2l8 3.5v6c0 5-3.4 8.7-8 10.5-4.6-1.8-8-5.5-8-10.5v-6L12 2z" /></svg>,
  Grid: (p) => <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>,
  Package: (p) => <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}><path d="M21 8l-9-5-9 5 9 5 9-5z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" /></svg>,
  Chart: (p) => <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}><path d="M4 20V10M12 20V4M20 20v-7" /></svg>,
  Logout: (p) => <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5M21 12H9" /></svg>,
  Edit: (p) => <svg viewBox="0 0 24 24" width="15" height="15" {...base} {...p}><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>,
}
