'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/chat`,
      },
    })
    if (error) {
      setError(error.message)
    } else {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#F0EBE0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Barlow, sans-serif' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#1A1A1A', marginBottom: '1rem' }}>CHECK YOUR EMAIL</h1>
          <p style={{ color: '#1A1A1A' }}>We sent a magic link to <strong>{email}</strong></p>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#F0EBE0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Barlow, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#1A1A1A', marginBottom: '0.5rem' }}>JUNIOR</h1>
        <p style={{ color: '#1A1A1A', marginBottom: '2rem' }}>Enter your email to sign in.</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '2px solid #1A1A1A', backgroundColor: '#F0EBE0', fontFamily: 'Barlow, sans-serif', fontSize: '1rem', boxSizing: 'border-box' }}
          />
          {error && <p style={{ color: '#E8392A', marginBottom: '1rem' }}>{error}</p>}
          <button
            type="submit"
            style={{ width: '100%', padding: '0.75rem', backgroundColor: '#E8392A', color: '#FFFFFF', border: '2px solid #1A1A1A', fontFamily: 'Barlow, sans-serif', fontWeight: 900, fontSize: '1rem', cursor: 'pointer', boxShadow: '4px 4px 0px #1A1A1A' }}
          >
            SEND MAGIC LINK
          </button>
        </form>
      </div>
    </main>
  )
}
