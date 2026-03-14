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

    console.log('[v0] Subscribing email:', email)
    console.log('[v0] Using form ID:', formId)

    // ConvertKit v3 API - subscribe email to form
    // Correct endpoint: /forms/{form_id}/subscribe
    const url = `https://api.convertkit.com/v3/forms/${formId}/subscribe`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email_address: email,
        api_key: apiKey,
      }),
    })

    const responseText = await response.text()
    console.log('[v0] Kit API status:', response.status)
    console.log('[v0] Kit API response:', responseText)

    if (response.ok) {
      return NextResponse.json({ success: true })
    } else {
      try {
        const data = JSON.parse(responseText)
        console.error('[v0] Kit API error:', data)
      } catch {
        console.error('[v0] Kit API error (non-JSON):', responseText)
      }
      return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })
    }
  } catch (error) {
    console.error('[v0] Subscribe error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
