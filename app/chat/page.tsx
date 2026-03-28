'use client'

import { useState, useRef, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import UpgradeWall from '@/components/UpgradeWall'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type CalendarEvent = {
  title: string
  description: string
  date: string
  remind_days: number
}

const MESSAGE_LIMIT = 20

function parseCalendarTag(content: string): { text: string; event: CalendarEvent | null } {
  const regex = /\[CALENDAR:\s*title="([^"]+)"\s*description="([^"]+)"\s*date="([^"]+)"\s*remind_days=(\d+)\]/
  const match = content.match(regex)
  if (!match) return { text: content, event: null }
  const text = content.replace(regex, '').trim()
  return {
    text,
    event: {
      title: match[1],
      description: match[2],
      date: match[3],
      remind_days: parseInt(match[4]),
    },
  }
}

function downloadICS(event: CalendarEvent) {
  const now = new Date()

  let start: Date
  if (event.date === 'ask' || !event.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    // Default to 30 days from today
    start = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
  } else {
    start = new Date(event.date + 'T09:00:00')
  }

  const end = new Date(start.getTime() + 60 * 60 * 1000)

  const format = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  const reminderMinutes = event.remind_days * 24 * 60

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Junior//juniorproducer.ca//EN',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@juniorproducer.ca`,
    `DTSTAMP:${format(now)}`,
    `DTSTART:${format(start)}`,
    `DTEND:${format(end)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT' + reminderMinutes + 'M',
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: ${event.title}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${event.title.replace(/\s+/g, '-').toLowerCase()}.ics`
  a.click()
  URL.revokeObjectURL(url)
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const [limitReached, setLimitReached] = useState(false)
  const [user, setUser] = useState<any>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setUser(user)
    }
    fetchUser()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    // Update message count based on local messages array
    const userMessageCount = Math.ceil(messages.length / 2)
    setMessageCount(userMessageCount)
    if (userMessageCount >= MESSAGE_LIMIT) {
      setLimitReached(true)
    }
  }, [messages])

  async function sendMessage() {
    if (!input.trim() || loading || limitReached) return

    // Stripe diagnostics
    console.log('=== STRIPE DIAGNOSTICS ===')
    console.log('typeof Stripe:', typeof (window as any).Stripe)
    console.log('window.Stripe:', (window as any).Stripe)
    console.log('=========================')

    const userMessage: Message = { role: 'user', content: input }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    const assistantMessage: Message = { role: 'assistant', content: '' }
    setMessages([...updatedMessages, assistantMessage])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      })

      if (response.status === 429) {
        setLimitReached(true)
        setMessages(updatedMessages)
        return
      }

      if (response.status === 401) {
        window.location.href = '/login'
        return
      }

      if (!response.body) return

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let text = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        text += decoder.decode(value, { stream: true })
        setMessages([...updatedMessages, { role: 'assistant', content: text }])
      }
    } catch (err) {
      setMessages([...updatedMessages, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#F0EBE0', display: 'flex', flexDirection: 'column', fontFamily: 'Barlow, sans-serif' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 10, padding: '1rem 1.5rem', borderBottom: '2px solid #1A1A1A', backgroundColor: '#F0EBE0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#1A1A1A', margin: 0 }}>JUNIOR</h1>
        <span style={{ fontSize: '0.8rem', color: '#1A1A1A', opacity: 0.5 }}>
          {messageCount}/{MESSAGE_LIMIT} messages
        </span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.length === 0 && !limitReached && (
          <div style={{ textAlign: 'center', marginTop: '4rem', color: '#1A1A1A' }}>
            <p style={{ fontWeight: 900, fontSize: '1.25rem' }}>What are you working on?</p>
            <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>Ask about Canada Council grants, eligibility, or deadlines.</p>
          </div>
        )}
        {messages.map((msg, i) => {
          if (msg.role === 'user') {
            return (
              <div key={i} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{
                  maxWidth: '70%',
                  padding: '0.75rem 1rem',
                  backgroundColor: '#1A1A1A',
                  color: '#FFFFFF',
                  border: '2px solid #1A1A1A',
                  boxShadow: '4px 4px 0px #1A1A1A',
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.5,
                }}>
                  {msg.content}
                </div>
              </div>
            )
          }

          const { text, event } = parseCalendarTag(msg.content)
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
              <div style={{
                maxWidth: '70%',
                padding: '0.75rem 1rem',
                backgroundColor: '#FFFFFF',
                color: '#1A1A1A',
                border: '2px solid #1A1A1A',
                boxShadow: '4px 4px 0px #1A1A1A',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.5,
              }}>
                {text}
              </div>
              {event && !loading && (
                <button
                  onClick={() => downloadICS(event)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#E8392A',
                    color: '#FFFFFF',
                    border: '2px solid #1A1A1A',
                    fontFamily: 'Barlow, sans-serif',
                    fontWeight: 900,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    boxShadow: '4px 4px 0px #1A1A1A',
                  }}
                >
                  + ADD TO CALENDAR
                </button>
              )}
            </div>
          )
        })}
        {limitReached && (
          <div style={{ textAlign: 'center', marginTop: '2rem', padding: '2rem', border: '2px solid #1A1A1A', backgroundColor: '#1A1A1A', color: '#FFFFFF', boxShadow: '4px 4px 0px #E8392A' }}>
            <p style={{ fontWeight: 900, fontSize: '1.25rem', marginBottom: '0.5rem' }}>YOU'VE USED YOUR 20 FREE MESSAGES.</p>
            <p style={{ opacity: 0.7, marginBottom: '1.5rem', fontSize: '0.9rem' }}>Upgrade to Filmmaker tier to unlock unlimited access.</p>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {!limitReached && (
        <div style={{ padding: '1rem 1.5rem', borderTop: '2px solid #1A1A1A', backgroundColor: '#F0EBE0', display: 'flex', gap: '0.75rem' }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Junior..."
            rows={1}
            style={{
              flex: 1,
              padding: '0.75rem',
              border: '2px solid #1A1A1A',
              backgroundColor: '#F0EBE0',
              fontFamily: 'Barlow, sans-serif',
              fontSize: '1rem',
              resize: 'none',
              outline: 'none',
            }}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: loading || !input.trim() ? '#999' : '#E8392A',
              color: '#FFFFFF',
              border: '2px solid #1A1A1A',
              fontFamily: 'Barlow, sans-serif',
              fontWeight: 900,
              fontSize: '1rem',
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              boxShadow: '4px 4px 0px #1A1A1A',
            }}
          >
            {loading ? '...' : 'SEND'}
          </button>
        </div>
      )}

      {user && messageCount !== undefined && (
        <UpgradeWall 
          userId={user.id} 
          messageCount={messageCount} 
          messageLimit={20} 
        />
      )}
    </main>
  )
}
