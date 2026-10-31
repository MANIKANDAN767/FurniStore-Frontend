import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../state/store.jsx'

export default function Login() {
  const { login } = useStore()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!email || !password) { setError('Enter your email and password to continue.'); return }
    login(email)
    navigate('/account')
  }

  return (
    <div className="auth-shell fade-in">
      <div className="auth-visual">
        <img src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1400&auto=format&fit=crop" alt="Living room interior" />
        <div className="auth-visual-copy">
          <span className="eyebrow" style={{ color: 'var(--brass-light)' }}>Welcome back</span>
          <p className="display" style={{ marginTop: 12 }}>Your orders, saved pieces, and delivery windows — all in one place.</p>
        </div>
      </div>
      <div className="auth-form-wrap">
        <form className="auth-form" onSubmit={submit}>
          <h1 className="display">Sign in</h1>
          <span className="muted">New here? <Link to="/register" style={{ color: 'var(--forest)', fontWeight: 600 }}>Create an account</Link></span>

          {error && <div style={{ background: 'rgba(164,64,42,0.1)', color: 'var(--danger)', padding: '10px 14px', borderRadius: 2, fontSize: 13, marginBottom: 16 }}>{error}</div>}

          <div className="field">
            <label>Email address</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="field-row-inline">
            <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}><input type="checkbox" /> Remember me</label>
            <a href="#">Forgot password?</a>
          </div>
          <button className="btn btn-primary btn-block" type="submit">Sign in</button>

          <div className="divider-or">or continue with</div>
          <div className="social-row">
            <button type="button" className="social-btn">Google</button>
            <button type="button" className="social-btn">Apple</button>
          </div>
          <p className="auth-switch muted">Don't have an account? <Link to="/register" style={{ color: 'var(--forest)', fontWeight: 600 }}>Register</Link></p>
        </form>
      </div>
    </div>
  )
}
