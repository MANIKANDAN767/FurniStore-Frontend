import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../state/store.jsx'

export default function Register() {
  const { register } = useStore()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!name || !email || !password) { setError('Fill in every field to create your account.'); return }
    if (!agree) { setError('Please accept the terms to continue.'); return }
    register(name, email)
    navigate('/account')
  }

  return (
    <div className="auth-shell fade-in">
      <div className="auth-visual">
        <img src="https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=1400&auto=format&fit=crop" alt="Bedroom interior" />
        <div className="auth-visual-copy">
          <span className="eyebrow" style={{ color: 'var(--brass-light)' }}>Join FurniStore</span>
          <p className="display" style={{ marginTop: 12 }}>Create an account for faster checkout and order tracking.</p>
        </div>
      </div>
      <div className="auth-form-wrap">
        <form className="auth-form" onSubmit={submit}>
          <h1 className="display">Create account</h1>
          <span className="muted">Already registered? <Link to="/login" style={{ color: 'var(--forest)', fontWeight: 600 }}>Sign in</Link></span>

          {error && <div style={{ background: 'rgba(164,64,42,0.1)', color: 'var(--danger)', padding: '10px 14px', borderRadius: 2, fontSize: 13, marginBottom: 16 }}>{error}</div>}

          <div className="field">
            <label>Full name</label>
            <input placeholder="Jordan Ellis" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="field">
            <label>Email address</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="At least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <label className="field-row-inline" style={{ gap: 8 }}>
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            I agree to the Terms of Service and Privacy Policy
          </label>
          <button className="btn btn-primary btn-block" type="submit">Create account</button>

          <div className="divider-or">or continue with</div>
          <div className="social-row">
            <button type="button" className="social-btn">Google</button>
            <button type="button" className="social-btn">Apple</button>
          </div>
        </form>
      </div>
    </div>
  )
}
