'use client'

import { useState, useRef, useEffect } from 'react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const MESSAGE_LIMIT = 20

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const [limitReached, setLimitReached] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage() {
    if (!input.trim() || loading || limitReached) return

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

      const newCount = parseInt(response.headers.get('X-Message-Count') ?? '0')
      setMessageCount(newCount)
      if (newCount >= MESSAGE_LIMIT) setLimitReached(true)

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
      {/* Header */}
      <div style={{ padding: '1rem 1.5rem', borderBottom: '2px solid #1A1A1A', backgroundColor: '#F0EBE0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#1A1A1A', margin: 0 }}>JUNIOR</h1>
        <span style={{ fontSize: '0.8rem', color: '#1A1A1A', opacity: 0.5 }}>
          {messageCount}/{MESSAGE_LIMIT} messages
        </span>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.length === 0 && !limitReached && (
          <div style={{ textAlign: 'center', marginTop: '4rem', color: '#1A1A1A' }}>
            <p style={{ fontWeight: 900, fontSize: '1.25rem' }}>What are you working on?</p>
            <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>Ask about Canada Council grants, eligibility, or deadlines.</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '70%',
              padding: '0.75rem 1rem',
              backgroundColor: msg.role === 'user' ? '#E8392A' : '#1A1A1A',
              color: '#FFFFFF',
              border: '2px solid #1A1A1A',
              boxShadow: '4px 4px 0px #1A1A1A',
              whiteSpace: 'pre-wrap',
              lineHeight: 1.5,
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {limitReached && (
          <div style={{ textAlign: 'center', marginTop: '2rem', padding: '2rem', border: '2px solid #1A1A1A', backgroundColor: '#1A1A1A', color: '#FFFFFF', boxShadow: '4px 4px 0px #E8392A' }}>
            <p style={{ fontWeight: 900, fontSize: '1.25rem', marginBottom: '0.5rem' }}>YOU'VE USED YOUR 20 FREE MESSAGES.</p>
            <p style={{ opacity: 0.7, marginBottom: '1.5rem', fontSize: '0.9rem' }}>Junior is in early access. Join the waitlist to be notified when paid plans open.</p>
            <a href="https://www.juniorproducer.ca" style={{ backgroundColor: '#E8392A', color: '#FFFFFF', padding: '0.75rem 1.5rem', border: '2px solid #FFFFFF', fontWeight: 900, textDecoration: 'none', boxShadow: '4px 4px 0px #FFFFFF' }}>
              JOIN THE WAITLIST
            </a>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
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
    </main>
  )
}
