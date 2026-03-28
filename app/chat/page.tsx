'use client'

import { useState, useRef, useEffect } from 'react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage() {
    if (!input.trim() || loading) return

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
      <div style={{ padding: '1rem 1.5rem', borderBottom: '2px solid #1A1A1A', backgroundColor: '#F0EBE0' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#1A1A1A', margin: 0 }}>JUNIOR</h1>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.length === 0 && (
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
              {msg.role === 'assistant' && loading && i === messages.length - 1 && msg.content === '' && (
                <span style={{ opacity: 0.5 }}>...</span>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
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
          SEND
        </button>
      </div>
    </main>
  )
}
