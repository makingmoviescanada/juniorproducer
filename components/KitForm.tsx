"use client"

import { useState } from 'react'

interface KitFormProps {
  className?: string
}

export function KitForm({ className = "" }: KitFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('https://app.kit.com/forms/a6c4e0fc0e/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email_address: email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={`flex ${className}`}>
        <p className="font-display text-junior-red uppercase tracking-wider text-lg">
          You&apos;re on the list. We&apos;ll be in touch.
        </p>
      </div>
    )
  }

  return (
    <div className={`flex ${className}`}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 px-4 py-3 border-2 border-junior-black bg-transparent font-sans text-junior-black placeholder:text-junior-black/40 focus:outline-none focus:border-junior-red"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-3 bg-junior-red border-2 border-junior-black text-junior-white font-bold uppercase tracking-wider shadow-hard-red-sm btn-hover font-sans text-sm disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === 'loading' ? 'Submitting...' : 'Get Early Access'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-junior-red font-sans text-sm mt-2">Something went wrong. Please try again.</p>
      )}
    </div>
  )
}
