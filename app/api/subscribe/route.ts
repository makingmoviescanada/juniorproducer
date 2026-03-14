import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const apiKey = process.env.CONVERTKIT_API_KEY
    const formId = process.env.CONVERTKIT_FORM_ID

    if (!apiKey || !formId) {
      console.error('[v0] Missing CONVERTKIT_API_KEY or CONVERTKIT_FORM_ID environment variables')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    // ConvertKit v3 API - subscribe to form
    const response = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        api_key: apiKey,
        email: email,
      }),
    })

    if (response.ok) {
      return NextResponse.json({ success: true })
    } else {
      const data = await response.json()
      console.error('[v0] Kit API error:', data)
      return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })
    }
  } catch (error) {
    console.error('[v0] Subscribe error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
