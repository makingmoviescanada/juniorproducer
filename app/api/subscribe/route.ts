import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Kit public form submission endpoint (no API key required)
    // Using the Kit landing page form submission format
    const response = await fetch('https://letsbuildanewcanadianfilmindustry.kit.com/a6c4e0fc0e/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email_address: email }),
    })

    if (response.ok || response.status === 302 || response.status === 200) {
      return NextResponse.json({ success: true })
    } else {
      const text = await response.text()
      console.error('[v0] Kit API error:', text)
      return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })
    }
  } catch (error) {
    console.error('[v0] Subscribe error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
