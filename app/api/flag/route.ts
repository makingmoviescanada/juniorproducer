import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const ASANA_TOKEN = process.env.ASANA_TOKEN
const ASANA_PROJECT_ID = '1213362596852836'
const ASANA_SECTION_ID = '1213362125623149' // 🛠 Product & Platform Roadmap

export async function POST(request: Request) {
  const { userId } = await auth()
  if (!userId) return new NextResponse('Unauthorized', { status: 401 })

  const { topic, funder, message, conversationContext } = await request.json()

  if (!topic || !funder) {
    return NextResponse.json({ error: 'Missing topic or funder' }, { status: 400 })
  }

  const taskName = `⚠ Intel gap flagged: ${funder} — ${topic}`
  const taskNotes = `A user triggered a STALE_INTEL flag during a Junior session.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Funder: ${funder}
Topic: ${topic}
User ID: ${userId}
Flagged at: ${new Date().toISOString()}

CONVERSATION CONTEXT
${conversationContext || message || 'Not provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ACTION REQUIRED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Verify current information with ${funder} directly
2. Update RAG knowledge base with accurate data
3. Mark this task complete once RAG is updated
4. User ID above can be notified when update is live`

  try {
    const res = await fetch('https://app.asana.com/api/1.0/tasks', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ASANA_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          name: taskName,
          notes: taskNotes,
          projects: [ASANA_PROJECT_ID],
          memberships: [{ project: ASANA_PROJECT_ID, section: ASANA_SECTION_ID }],
        }
      })
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Asana task creation failed:', err)
      return NextResponse.json({ error: 'Asana creation failed' }, { status: 500 })
    }

    const data = await res.json()
    return NextResponse.json({ success: true, taskId: data.data?.gid })

  } catch (err) {
    console.error('Flag route error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
