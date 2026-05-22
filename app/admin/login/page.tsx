'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ border: '1px solid #00ff8840', borderRadius: 16, padding: 32, width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔐</div>
          <h1 style={{ fontSize: 24, fontWeight: 'bold', color: '#00ff88' }}>Admin Login</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ padding: 12, borderRadius: 8, background: '#111', border: '1px solid #00ff8820', color: 'white' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ padding: 12, borderRadius: 8, background: '#111', border: '1px solid #00ff8820', color: 'white' }}
          />
          <Link href="/admin/dashboard" style={{ background: '#00ff88', color: '#000', padding: 12, borderRadius: 8, textAlign: 'center', textDecoration: 'none', fontWeight: 'bold' }}>
            লগইন করুন
          </Link>
        </div>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Link href="/" style={{ color: '#00ff88', textDecoration: 'none', fontSize: 14 }}>← হোমপেজে ফিরে যান</Link>
        </div>
      </div>
    </div>
  )
                    }
