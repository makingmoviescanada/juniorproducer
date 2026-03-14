import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const response = await fetch('https://app.kit.com/forms/a6c4e0fc0e/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ email_address: email }),
    })

    if (response.ok) {
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
