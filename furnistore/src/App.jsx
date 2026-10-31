import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { useStore } from './state/store.jsx'

import Home from './pages/Home.jsx'
import ProductListing from './pages/ProductListing.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import Wishlist from './pages/Wishlist.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Account from './pages/Account.jsx'
import Admin from './pages/Admin.jsx'

export default function App() {
  const { toast } = useStore()
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  if (isAdmin) {
    return (
      <>
        <Routes>
          <Route path="/admin" element={<Admin />} />
        </Routes>
        {toast && <div className="toast">{toast}</div>}
      </>
    )
  }

  return (
    <div className="page">
      <Header />
      <main className="page-body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
