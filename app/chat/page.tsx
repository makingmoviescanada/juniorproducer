'use client'

import { useState, useRef, useEffect } from 'react'
import { useUser, UserButton } from '@clerk/nextjs'

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
    start = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
  } else {
    start = new Date(event.date + 'T09:00:00')
  }
  const end = new Date(start.getTime() + 60 * 60 * 1000)
  const format = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const reminderMinutes = event.remind_days * 24 * 60
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Junior//juniorproducer.ca//EN',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@juniorproducer.ca`,
    `DTSTAMP:${format(now)}`, `DTSTART:${format(start)}`, `DTEND:${format(end)}`,
    `SUMMARY:${event.title}`, `DESCRIPTION:${event.description}`,
    'BEGIN:VALARM', 'TRIGGER:-PT' + reminderMinutes + 'M', 'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: ${event.title}`, 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n')
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${event.title.replace(/\s+/g, '-').toLowerCase()}.ics`
  a.click()
  URL.revokeObjectURL(url)
}

const INTENT_CARDS = [
  {
    id: 'grants',
    title: 'Grants & Funding',
    description: 'Find funding, check eligibility, navigate applications.',
    pill: 'NEW!',
    live: true,
    voteKey: null,
  },
  {
    id: 'calendar',
    title: 'Deadlines & Calendar',
    description: 'Never miss a grant deadline.',
    pill: 'VOTE FOR THIS',
    live: false,
    voteKey: 'feature:calendar',
  },
  {
    id: 'projects',
    title: 'Project Management',
    description: 'Organize your production from development to delivery.',
    pill: 'VOTE FOR THIS',
    live: false,
    voteKey: 'feature:projects',
  },
  {
    id: 'finance',
    title: 'Financial Planning',
    description: 'Budgets, tax credits, cost reports.',
    pill: 'VOTE FOR THIS',
    live: false,
    voteKey: 'feature:finance',
  },
  {
    id: 'distribution',
    title: 'Distribution Strategy',
    description: 'Festival strategy, sales agents, Canadian distribution requirements.',
    pill: 'VOTE FOR THIS',
    live: false,
    voteKey: 'feature:distribution',
  },
]

const LOCKED_PROJECTS = [
  { label: 'My Next Feature Film', voteKey: 'feature:projects' },
  { label: 'Fiction Short Film', voteKey: 'feature:projects' },
  { label: 'Documentary', voteKey: 'feature:projects' },
  { label: 'Animation', voteKey: 'feature:projects' },
]

const FUNDERS = [
  { label: 'Canada Council for the Arts', live: true, voteKey: null },
  { label: 'Provincial Arts Councils', live: false, voteKey: 'funder:provincial_arts' },
  { label: 'Telefilm Canada', live: false, voteKey: 'funder:telefilm' },
  { label: 'CMF', live: false, voteKey: 'funder:cmf' },
  { label: 'NFB', live: false, voteKey: 'funder:nfb' },
  { label: 'Provincial Funders', live: false, voteKey: 'funder:provincial' },
]

type VoteModal = {
  open: boolean
  label: string
  voteKey: string
  voted: boolean
}

export default function ChatPage() {
  const { user } = useUser()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const [limitReached, setLimitReached] = useState(false)
  const [chatStarted, setChatStarted] = useState(false)
  const [votedItems, setVotedItems] = useState<Set<string>>(new Set())
  const [voteModal, setVoteModal] = useState<VoteModal>({
    open: false, label: '', voteKey: '', voted: false,
  })
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const count = Math.ceil(messages.length / 2)
    setMessageCount(count)
    if (count >= MESSAGE_LIMIT) setLimitReached(true)
  }, [messages])

  async function castVote(voteKey: string) {
    if (!user || votedItems.has(voteKey)) return
    try {
      await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: voteKey }),
      })
      setVotedItems(prev => new Set([...prev, voteKey]))
      setVoteModal(prev => ({ ...prev, voted: true }))
    } catch (err) {
      console.error('Vote failed:', err)
    }
  }

  function openVoteModal(label: string, voteKey: string) {
    setVoteModal({
      open: true,
      label,
      voteKey,
      voted: votedItems.has(voteKey),
    })
  }

  function closeVoteModal() {
    setVoteModal({ open: false, label: '', voteKey: '', voted: false })
  }

  async function sendMessage(prefill?: string) {
    const text = prefill ?? input
    if (!text.trim() || loading || limitReached) return
    if (!chatStarted) setChatStarted(true)

    const userMessage: Message = { role: 'user', content: text }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)
    setMessages([...updatedMessages, { role: 'assistant', content: '' }])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      })
      if (response.status === 429) { setLimitReached(true); setMessages(updatedMessages); return }
      if (response.status === 401) { window.location.href = '/sign-in'; return }
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
    } catch {
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
    <main style={{ minHeight: '100vh', backgroundColor: '#F0EBE0', display: 'flex', fontFamily: 'Barlow, sans-serif' }}>

      {/* SIDEBAR */}
      <div style={{
        width: '240px', minWidth: '240px', backgroundColor: '#1A1A1A',
        display: 'flex', flexDirection: 'column', padding: '1.25rem 0',
        borderRight: '2px solid #1A1A1A', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
      }}>
        {/* Logo */}
        <div style={{ padding: '0 1.25rem 1.25rem', borderBottom: '1px solid #333' }}>
          <span style={{ fontSize: '1rem', fontWeight: 900, color: '#F0EBE0', letterSpacing: '0.08em' }}>JUNIOR</span>
        </div>

        {/* New Chat */}
        <div style={{ padding: '1rem 1rem 0' }}>
          <button
            onClick={() => { setMessages([]); setChatStarted(false); setInput('') }}
            style={{
              width: '100%', padding: '0.6rem 1rem', backgroundColor: '#E8392A',
              color: '#FFFFFF', border: '2px solid #E8392A', fontFamily: 'Barlow, sans-serif',
              fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', textAlign: 'left',
              letterSpacing: '0.05em',
            }}
          >
            + NEW CHAT
          </button>
        </div>

        {/* Projects */}
        <div style={{ padding: '1.25rem 1rem 0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Projects</span>
          </div>
          {LOCKED_PROJECTS.map((p) => (
            <button
              key={p.label}
              onClick={() => openVoteModal(p.label, p.voteKey)}
              style={{
                width: '100%', padding: '0.4rem 0.5rem', backgroundColor: 'transparent',
                border: 'none', color: '#999', fontFamily: 'Barlow, sans-serif',
                fontSize: '0.8rem', cursor: 'pointer', textAlign: 'left', display: 'block',
                opacity: 0.6,
              }}
            >
              🎬 {p.label}
            </button>
          ))}
        </div>

        {/* Funders */}
        <div style={{ padding: '1rem 1rem 0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Funders</span>
          </div>
          {FUNDERS.map((f) => (
            <button
              key={f.label}
              onClick={() => {
                if (f.live) {
                  setChatStarted(true)
                  sendMessage(`Tell me about ${f.label} funding programs.`)
                } else if (f.voteKey) {
                  openVoteModal(f.label, f.voteKey)
                }
              }}
              style={{
                width: '100%', padding: '0.4rem 0.5rem', backgroundColor: 'transparent',
                border: 'none', fontFamily: 'Barlow, sans-serif',
                fontSize: '0.8rem', cursor: 'pointer', textAlign: 'left', display: 'flex',
                alignItems: 'center', gap: '0.4rem',
                color: f.live ? '#F0EBE0' : '#999',
                opacity: f.live ? 1 : 0.6,
              }}
            >
              🏛 {f.label}
              {f.live && (
                <span style={{ fontSize: '0.55rem', padding: '0.1rem 0.4rem', backgroundColor: '#E8392A', color: '#FFFFFF', fontWeight: 700, letterSpacing: '0.05em', marginLeft: 'auto' }}>
                  NEW!
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Spacer + UserButton */}
        <div style={{ marginTop: 'auto', padding: '1rem 1.25rem', borderTop: '1px solid #333', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <UserButton afterSignOutUrl="/sign-in" />
          {user && (
            <span style={{ fontSize: '0.75rem', color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user.primaryEmailAddress?.emailAddress}
            </span>
          )}
        </div>
      </div>

      {/* MAIN AREA */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

        {/* Top bar */}
        <div style={{
          padding: '1rem 1.5rem', borderBottom: '2px solid #1A1A1A',
          backgroundColor: '#F0EBE0', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          position: 'sticky', top: 0, zIndex: 10,
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1A1A1A', opacity: 0.4, letterSpacing: '0.05em' }}>
            {chatStarted ? `${messageCount}/${MESSAGE_LIMIT} MESSAGES` : 'BETA'}
          </span>
        </div>

        {/* LANDING STATE */}
        {!chatStarted && (
          <div style={{ flex: 1, padding: '3rem 2.5rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
            <h1 style={{
              fontSize: '1.75rem', fontWeight: 900, color: '#1A1A1A',
              lineHeight: 1.2, marginBottom: '2.5rem', maxWidth: '600px',
            }}>
              Let Junior handle the bureaucracy and admin of making movies in Canada.
            </h1>

            {/* Intent cards — 2x2 + 1 full width */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: '700px' }}>
              {INTENT_CARDS.slice(0, 4).map((card) => (
                <button
                  key={card.id}
                  onClick={() => {
                    if (card.live) {
                      setChatStarted(true)
                    } else if (card.voteKey) {
                      openVoteModal(card.title, card.voteKey)
                    }
                  }}
                  style={{
                    padding: '1.25rem', backgroundColor: '#FFFFFF',
                    border: '2px solid #1A1A1A', cursor: 'pointer', textAlign: 'left',
                    boxShadow: '4px 4px 0px #1A1A1A', transition: 'all 150ms ease',
                    opacity: card.live ? 1 : 0.75,
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0px #1A1A1A' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '4px 4px 0px #1A1A1A' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#1A1A1A' }}>{card.title}</span>
                    <span style={{
                      fontSize: '0.55rem', padding: '0.2rem 0.5rem', fontWeight: 700,
                      letterSpacing: '0.06em', whiteSpace: 'nowrap', marginLeft: '0.5rem',
                      backgroundColor: card.live ? '#E8392A' : '#1A1A1A',
                      color: '#FFFFFF',
                    }}>
                      {card.pill}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#1A1A1A', opacity: 0.6, margin: 0, lineHeight: 1.4 }}>
                    {card.description}
                  </p>
                </button>
              ))}

              {/* 5th card — full width */}
              {INTENT_CARDS[4] && (
                <button
                  onClick={() => openVoteModal(INTENT_CARDS[4].title, INTENT_CARDS[4].voteKey!)}
                  style={{
                    gridColumn: '1 / -1', padding: '1.25rem', backgroundColor: '#FFFFFF',
                    border: '2px solid #1A1A1A', cursor: 'pointer', textAlign: 'left',
                    boxShadow: '4px 4px 0px #1A1A1A', transition: 'all 150ms ease', opacity: 0.75,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0px #1A1A1A' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '4px 4px 0px #1A1A1A' }}
                >
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#1A1A1A', marginBottom: '0.25rem' }}>{INTENT_CARDS[4].title}</div>
                    <div style={{ fontSize: '0.8rem', color: '#1A1A1A', opacity: 0.6 }}>{INTENT_CARDS[4].description}</div>
                  </div>
                  <span style={{ fontSize: '0.55rem', padding: '0.2rem 0.5rem', fontWeight: 700, letterSpacing: '0.06em', backgroundColor: '#1A1A1A', color: '#FFFFFF', whiteSpace: 'nowrap', marginLeft: '1rem' }}>
                    {INTENT_CARDS[4].pill}
                  </span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* CHAT STATE */}
        {chatStarted && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((msg, i) => {
              if (msg.role === 'user') {
                return (
                  <div key={i} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{
                      maxWidth: '70%', padding: '0.75rem 1rem',
                      backgroundColor: '#1A1A1A', color: '#FFFFFF',
                      border: '2px solid #1A1A1A', boxShadow: '4px 4px 0px #1A1A1A',
                      whiteSpace: 'pre-wrap', lineHeight: 1.5,
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
                    maxWidth: '70%', padding: '0.75rem 1rem',
                    backgroundColor: '#FFFFFF', color: '#1A1A1A',
                    border: '2px solid #1A1A1A', boxShadow: '4px 4px 0px #1A1A1A',
                    whiteSpace: 'pre-wrap', lineHeight: 1.5,
                  }}>
                    {text}
                  </div>
                  {event && !loading && (
                    <button
                      onClick={() => downloadICS(event)}
                      style={{
                        padding: '0.5rem 1rem', backgroundColor: '#E8392A', color: '#FFFFFF',
                        border: '2px solid #1A1A1A', fontFamily: 'Barlow, sans-serif',
                        fontWeight: 900, fontSize: '0.85rem', cursor: 'pointer',
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
              <div style={{
                textAlign: 'center', marginTop: '2rem', padding: '2rem',
                border: '2px solid #1A1A1A', backgroundColor: '#1A1A1A',
                color: '#FFFFFF', boxShadow: '4px 4px 0px #E8392A',
              }}>
                <p style={{ fontWeight: 900, fontSize: '1.25rem', marginBottom: '0.5rem' }}>YOU'VE USED YOUR 20 FREE MESSAGES.</p>
                <p style={{ opacity: 0.7, marginBottom: '1.5rem', fontSize: '0.9rem' }}>Upgrade to unlock unlimited access.</p>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}

        {/* INPUT */}
        {!limitReached && (
          <div style={{
            padding: '1rem 1.5rem', borderTop: '2px solid #1A1A1A',
            backgroundColor: '#F0EBE0', display: 'flex', gap: '0.75rem',
            position: 'sticky', bottom: 0,
          }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Junior..."
              rows={1}
              style={{
                flex: 1, padding: '0.75rem', border: '2px solid #1A1A1A',
                backgroundColor: '#F0EBE0', fontFamily: 'Barlow, sans-serif',
                fontSize: '1rem', resize: 'none', outline: 'none',
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: loading || !input.trim() ? '#999' : '#E8392A',
                color: '#FFFFFF', border: '2px solid #1A1A1A',
                fontFamily: 'Barlow, sans-serif', fontWeight: 900,
                fontSize: '1rem', cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                boxShadow: '4px 4px 0px #1A1A1A',
              }}
            >
              {loading ? '...' : 'SEND'}
            </button>
          </div>
        )}
      </div>

      {/* VOTE MODAL */}
      {voteModal.open && (
        <div
          onClick={closeVoteModal}
          style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              backgroundColor: '#F0EBE0', border: '2px solid #1A1A1A',
              boxShadow: '6px 6px 0px #1A1A1A', padding: '2rem', maxWidth: '400px', width: '90%',
            }}
          >
            {voteModal.voted ? (
              <>
                <p style={{ fontWeight: 900, fontSize: '1.1rem', marginBottom: '0.5rem' }}>VOTE CAST. ✓</p>
                <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '1.5rem' }}>
                  Your vote helps determine what Junior builds next. We'll let you know when {voteModal.label} is live.
                </p>
                <button
                  onClick={closeVoteModal}
                  style={{
                    padding: '0.6rem 1.25rem', backgroundColor: '#1A1A1A',
                    color: '#FFFFFF', border: '2px solid #1A1A1A',
                    fontFamily: 'Barlow, sans-serif', fontWeight: 700,
                    fontSize: '0.85rem', cursor: 'pointer',
                  }}
                >
                  CLOSE
                </button>
              </>
            ) : (
              <>
                <p style={{ fontWeight: 900, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  VOTE TO UNLOCK
                </p>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: '#E8392A', marginBottom: '0.75rem' }}>
                  {voteModal.label}
                </p>
                <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '1.5rem' }}>
                  Junior builds features in order of demand. Cast your vote and we'll prioritize accordingly.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => castVote(voteModal.voteKey)}
                    style={{
                      padding: '0.6rem 1.25rem', backgroundColor: '#E8392A',
                      color: '#FFFFFF', border: '2px solid #1A1A1A',
                      fontFamily: 'Barlow, sans-serif', fontWeight: 700,
                      fontSize: '0.85rem', cursor: 'pointer',
                      boxShadow: '4px 4px 0px #1A1A1A',
                    }}
                  >
                    CAST MY VOTE
                  </button>
                  <button
                    onClick={closeVoteModal}
                    style={{
                      padding: '0.6rem 1.25rem', backgroundColor: 'transparent',
                      color: '#1A1A1A', border: '2px solid #1A1A1A',
                      fontFamily: 'Barlow, sans-serif', fontWeight: 700,
                      fontSize: '0.85rem', cursor: 'pointer',
                    }}
                  >
                    NOT NOW
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
