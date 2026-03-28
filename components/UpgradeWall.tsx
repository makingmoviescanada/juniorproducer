'use client'

import { useState } from 'react'

interface UpgradeWallProps {
  userId: string
  messageCount: number
  messageLimit: number
}

export default function UpgradeWall({
  userId,
  messageCount,
  messageLimit,
}: UpgradeWallProps) {
  const [loading, setLoading] = useState(false)
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual' | null>(
    null
  )

  const handleCheckout = async () => {
    if (!billingPeriod) {
      alert('Please select a billing period')
      return
    }

    setLoading(true)
    try {
      const priceId =
        billingPeriod === 'annual'
          ? 'price_1TFpZtRwIeAXbMNlyXvqXME9'
          : 'price_1TFpWNRwIeAXbMNlc8W0Z8Fp'
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          billingPeriod,
          userId,
        }),
      })

      const data = await response.json()
      if (data.sessionId) {
        window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`
      } else {
        alert('Failed to create checkout session')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Error initiating checkout')
    } finally {
      setLoading(false)
    }
  }

  if (messageCount < messageLimit) {
    return null
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: 50,
      fontFamily: 'Barlow, sans-serif',
    }}>
      <div style={{
        backgroundColor: '#F0EBE0',
        border: '2px solid #E8392A',
        boxShadow: '4px 4px 0px #E8392A',
        maxWidth: '500px',
        width: '100%',
        padding: '2rem',
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 900,
            color: '#1A1A1A',
            margin: 0,
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}>
            You've unlocked filmmaker tier.
          </h2>
          <p style={{
            fontSize: '0.95rem',
            color: '#1A1A1A',
            opacity: 0.75,
            margin: 0,
            lineHeight: 1.5,
          }}>
            Get unlimited access to Junior for expert guidance on Canada Council grants, deadlines, and applications.
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '0.75rem',
          marginBottom: '1.5rem',
        }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <button
              onClick={() => setBillingPeriod('annual')}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: billingPeriod === 'annual' ? '#E8392A' : 'transparent',
                color: billingPeriod === 'annual' ? '#FFFFFF' : '#1A1A1A',
                border: `2px solid #1A1A1A`,
                fontFamily: 'Barlow, sans-serif',
                fontWeight: 900,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 150ms ease',
                boxShadow: billingPeriod === 'annual' ? '2px 2px 0px #1A1A1A' : 'none',
                textTransform: 'uppercase',
              }}
              onMouseEnter={(e) => {
                if (billingPeriod !== 'annual') {
                  e.currentTarget.style.backgroundColor = '#E8392A'
                  e.currentTarget.style.color = '#FFFFFF'
                  e.currentTarget.style.boxShadow = '2px 2px 0px #1A1A1A'
                }
              }}
              onMouseLeave={(e) => {
                if (billingPeriod !== 'annual') {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#1A1A1A'
                  e.currentTarget.style.boxShadow = 'none'
                }
              }}
            >
              ANNUAL
              <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.25rem' }}>
                CA$390/yr
              </div>
            </button>
          </div>

          <div style={{ flex: 1, position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '-0.5rem',
              right: '0.5rem',
              backgroundColor: '#E8392A',
              color: '#FFFFFF',
              fontSize: '0.65rem',
              fontWeight: 900,
              padding: '0.25rem 0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
            }}>
              RECOMMENDED
            </div>
            <button
              onClick={() => setBillingPeriod('monthly')}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: billingPeriod === 'monthly' ? '#E8392A' : 'transparent',
                color: billingPeriod === 'monthly' ? '#FFFFFF' : '#1A1A1A',
                border: `2px solid #1A1A1A`,
                fontFamily: 'Barlow, sans-serif',
                fontWeight: 900,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 150ms ease',
                boxShadow: billingPeriod === 'monthly' ? '2px 2px 0px #1A1A1A' : 'none',
                textTransform: 'uppercase',
              }}
              onMouseEnter={(e) => {
                if (billingPeriod !== 'monthly') {
                  e.currentTarget.style.backgroundColor = '#E8392A'
                  e.currentTarget.style.color = '#FFFFFF'
                  e.currentTarget.style.boxShadow = '2px 2px 0px #1A1A1A'
                }
              }}
              onMouseLeave={(e) => {
                if (billingPeriod !== 'monthly') {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#1A1A1A'
                  e.currentTarget.style.boxShadow = 'none'
                }
              }}
            >
              MONTHLY
              <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.25rem' }}>
                CA$39/mo
              </div>
            </button>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading || !billingPeriod}
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: loading || !billingPeriod ? '#999' : '#E8392A',
            color: '#FFFFFF',
            border: '2px solid #1A1A1A',
            fontFamily: 'Barlow, sans-serif',
            fontWeight: 900,
            fontSize: '1rem',
            cursor: loading || !billingPeriod ? 'not-allowed' : 'pointer',
            boxShadow: '4px 4px 0px #1A1A1A',
            transition: 'all 150ms ease',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
          onMouseEnter={(e) => {
            if (!loading && billingPeriod) {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '6px 6px 0px #1A1A1A'
            }
          }}
          onMouseLeave={(e) => {
            if (!loading && billingPeriod) {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '4px 4px 0px #1A1A1A'
            }
          }}
        >
          {loading ? 'PROCESSING...' : 'JOIN AS FILMMAKER'}
        </button>

        <p style={{
          fontSize: '0.75rem',
          color: '#1A1A1A',
          opacity: 0.5,
          textAlign: 'center',
          marginTop: '1rem',
          margin: 0,
          marginTop: '1rem',
        }}>
          Secure checkout powered by Stripe
        </p>
      </div>
    </div>
  )
}
