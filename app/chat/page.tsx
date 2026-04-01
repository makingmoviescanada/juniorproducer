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

type Stage = 'home' | 'chat'

const MESSAGE_LIMIT = 20

const INTAKE_SEQUENCE = [
  { key: 'name', prompt: "What's your project called?", placeholder: 'e.g. The Last Frontier' },
  { key: 'format', prompt: 'What format?', placeholder: 'e.g. Feature Film, Short Film, Documentary...' },
  { key: 'stage', prompt: 'What stage?', placeholder: 'e.g. Development, Pre-production, Production...' },
  { key: 'province', prompt: 'What province?', placeholder: 'e.g. Quebec, Ontario, BC...' },
]

const CATEGORIES = [
  { id: 'grants', title: 'Grants & Funding', description: 'Find funding, check eligibility, navigate applications.', context: 'I need help finding and applying for grants and funding for my project.' },
  { id: 'deadlines', title: 'Deadlines & Calendar', description: 'Never miss a grant deadline.', context: 'I need help tracking deadlines and planning my application calendar.' },
  { id: 'projects', title: 'Project Management', description: 'Organise your production from development to delivery.', context: 'I need help organising and managing my production.' },
  { id: 'finance', title: 'Financial Planning', description: 'Budgets, tax credits, cost reports.', context: 'I need help with financial planning — budgets, tax credits, and cost reports.' },
  { id: 'distribution', title: 'Distribution Strategy', description: 'Festival strategy, sales agents, Canadian distribution requirements.', context: 'I need help planning my distribution strategy — festivals, sales agents, and Canadian requirements.' },
]

const FUNDERS = [
  { label: 'Canada Council for the Arts', live: true, voteKey: null },
  { label: 'Telefilm Canada', live: true, voteKey: null },
  { label: 'CMF', live: true, voteKey: null },
  { label: 'NFB', live: true, voteKey: null },
  { label: 'SODEC', live: true, voteKey: null },
  { label: 'CALQ', live: true, voteKey: null },
  { label: 'Ontario Creates', live: true, voteKey: null },
  { label: 'Creative BC', live: true, voteKey: null },
  { label: 'Other Provincial', live: false, voteKey: 'funder:provincial' },
]

type VoteModal = { open: boolean; label: string; voteKey: string; voted: boolean }
type IntakeAnswers = { name: string; format: string; stage: string; province: string }

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/\_\_(.+?)\_\_/g, '$1')
    .replace(/\_(.+?)\_/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/`(.+?)`/g, '$1')
}

function linkifyUrls(text: string): React.ReactNode[] {
  const urlRegex = /(https?:\/\/[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/g
  const parts = text.split(urlRegex)
  return parts.map((part, i) => {
    if (urlRegex.test(part)) {
      const href = part.startsWith('http') ? part : `https://${part}`
      return <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#E8392A', textDecoration: 'underline', wordBreak: 'break-all' }}>{part}</a>
    }
    return part
  })
}

function parseTags(content: string): { text: string; event: CalendarEvent | null; suggestions: string[] } {
  let text = content
  let event: CalendarEvent | null = null
  let suggestions: string[] = []
  const calRegex = /\[CALENDAR:\s*title="([^"]+)"\s*description="([^"]+)"\s*date="([^"]+)"\s*remind_days=(\d+)\]/
  const calMatch = text.match(calRegex)
  if (calMatch) {
    text = text.replace(calRegex, '').trim()
    event = { title: calMatch[1], description: calMatch[2], date: calMatch[3], remind_days: parseInt(calMatch[4]) }
  }
  const sugRegex = /\[SUGGESTIONS:\s*"([^"]+)"\s*\|\s*"([^"]+)"\]/
  const sugMatch = text.match(sugRegex)
  if (sugMatch) {
    text = text.replace(sugRegex, '').trim()
    suggestions = [sugMatch[1], sugMatch[2]]
  }
  return { text: stripMarkdown(text), event, suggestions }
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
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const reminderMinutes = event.remind_days * 24 * 60
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Junior//juniorproducer.ca//EN',
    'BEGIN:VEVENT', `UID:${Date.now()}@juniorproducer.ca`,
    `DTSTAMP:${fmt(now)}`, `DTSTART:${fmt(start)}`, `DTEND:${fmt(end)}`,
    `SUMMARY:${event.title}`, `DESCRIPTION:${event.description}`,
    'BEGIN:VALARM', 'TRIGGER:-PT' + reminderMinutes + 'M', 'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: ${event.title}`, 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR',
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
  const { user } = useUser()
  const [stage, setStage] = useState<Stage>('home')
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[0] | null>(null)
  const [intakeStep, setIntakeStep] = useState(0)
  const [intakeAnswers, setIntakeAnswers] = useState<IntakeAnswers>({ name: '', format: '', stage: '', province: '' })
  const [inputValue, setInputValue] = useState('')
  const [inputPlaceholder, setInputPlaceholder] = useState("What's your project called?")
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [interactionCount, setInteractionCount] = useState(0)
  const [limitReached, setLimitReached] = useState(false)
  const [votedItems, setVotedItems] = useState<Set<string>>(new Set())
  const [voteModal, setVoteModal] = useState<VoteModal>({ open: false, label: '', voteKey: '', voted: false })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [intakeStep])

  useEffect(() => {
    const count = Math.ceil(messages.length / 2)
    if (count >= MESSAGE_LIMIT) setLimitReached(true)
  }, [messages])

  function resetToHome() {
    setStage('home')
    setSelectedCategory(null)
    setIntakeStep(0)
    setIntakeAnswers({ name: '', format: '', stage: '', province: '' })
    setInputValue('')
    setInputPlaceholder("What's your project called?")
    setMessages([])
    setLimitReached(false)
    setInteractionCount(0)
    if (isMobile) setSidebarOpen(false)
  }

  function handleCategorySelect(cat: typeof CATEGORIES[0]) {
    setSelectedCategory(cat)
    inputRef.current?.focus()
  }

  function handleInputSubmit() {
    if (!inputValue.trim()) return
    const value = inputValue.trim()
    setInputValue('')

    if (stage === 'chat') {
      sendChatMessage(value)
      return
    }

    const key = INTAKE_SEQUENCE[intakeStep].key as keyof IntakeAnswers
    const updated = { ...intakeAnswers, [key]: value }
    setIntakeAnswers(updated)

    if (intakeStep < INTAKE_SEQUENCE.length - 1) {
      const next = intakeStep + 1
      setIntakeStep(next)
      setInputPlaceholder(INTAKE_SEQUENCE[next].placeholder)
    } else {
      beginChat(updated)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleInputSubmit() }
  }

  function beginChat(answers: IntakeAnswers) {
    const cat = selectedCategory || CATEGORIES[0]
    const contextMessage = `My project is called "${answers.name}". ${cat.context} Format: ${answers.format}. Stage: ${answers.stage}. Province: ${answers.province}.`
    const welcome: Message = {
      role: 'assistant',
      content: `Got it — let's work on ${answers.name}.\n\nI have your context. What would you like to tackle first?`,
    }
    setMessages([welcome])
    setStage('chat')
    setInputPlaceholder('Ask Junior...')
    sendFirstMessage(contextMessage, [welcome])
    if (isMobile) setSidebarOpen(false)
  }

  async function sendFirstMessage(contextMessage: string, currentMessages: Message[]) {
    const userMessage: Message = { role: 'user', content: contextMessage }
    const updatedMessages = [...currentMessages, userMessage]
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

  async function sendChatMessage(text: string) {
    if (!text.trim() || loading || limitReached) return
    const userMessage: Message = { role: 'user', content: text }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setLoading(true)
    setInteractionCount(c => c + 1)
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
      let responseText = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        responseText += decoder.decode(value, { stream: true })
        setMessages([...updatedMessages, { role: 'assistant', content: responseText }])
      }
    } catch {
      setMessages([...updatedMessages, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  function handleDragOver(e: React.DragEvent) { e.preventDefault(); setIsDragging(true) }
  function handleDragLeave(e: React.DragEvent) { e.preventDefault(); setIsDragging(false) }
  async function handleDrop(e: React.DragEvent) {
    e.preventDefault(); setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    for (const file of files) {
      if (file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
        const text = await file.text()
        setInputValue(prev => prev ? `${prev}\n\n[From ${file.name}]:\n${text}` : `[From ${file.name}]:\n${text}`)
      } else {
        setInputValue(prev => prev ? `${prev}\n\n[Attached: ${file.name}]` : `[Attached: ${file.name}]`)
      }
    }
  }

  function toggleDictation() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Dictation is not supported in this browser. Try Chrome.')
      return
    }
    if (isListening) { recognitionRef.current?.stop(); setIsListening(false); return }
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SR()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'en-CA'
    recognition.onresult = (e: any) => {
      const transcript = Array.from(e.results).map((r: any) => r[0].transcript).join('')
      setInputValue(transcript)
    }
    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => setIsListening(false)
    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
  }

  async function castVote(voteKey: string) {
    if (!user || votedItems.has(voteKey)) return
    try {
      await fetch('/api/vote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ item: voteKey }) })
      setVotedItems(prev => new Set([...prev, voteKey]))
      setVoteModal(prev => ({ ...prev, voted: true }))
    } catch (err) { console.error('Vote failed:', err) }
  }

  function openVoteModal(label: string, voteKey: string) {
    setVoteModal({ open: true, label, voteKey, voted: votedItems.has(voteKey) })
    if (isMobile) setSidebarOpen(false)
  }

  function closeVoteModal() { setVoteModal({ open: false, label: '', voteKey: '', voted: false }) }

  const sidebar = (
    <div style={{ width: isMobile ? '100%' : '220px', minWidth: isMobile ? 'unset' : '220px', backgroundColor: '#1A1A1A', display: 'flex', flexDirection: 'column', padding: '1.25rem 0', borderRight: isMobile ? 'none' : '2px solid #1A1A1A', position: isMobile ? 'fixed' : 'sticky', top: 0, left: 0, height: '100vh', overflowY: 'auto', zIndex: isMobile ? 50 : 'auto' as any, transform: isMobile && !sidebarOpen ? 'translateX(-100%)' : 'translateX(0)', transition: 'transform 250ms ease' }}>
      <div style={{ padding: '0 1.25rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '1rem', fontWeight: 900, color: '#F0EBE0', letterSpacing: '0.08em' }}>JUNIOR</span>
        {isMobile && <button onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', color: '#999', fontSize: '1.25rem', cursor: 'pointer' }}>✕</button>}
      </div>
      <div style={{ padding: '1rem 1rem 0' }}>
        <button onClick={resetToHome} style={{ width: '100%', padding: '0.6rem 1rem', backgroundColor: '#E8392A', color: '#FFFFFF', border: '2px solid #E8392A', fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', textAlign: 'left', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          START HERE
        </button>
      </div>
      <div style={{ padding: '1.25rem 1rem 0.5rem' }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Projects</span>
        <div style={{ padding: '0.4rem 0.5rem', color: intakeAnswers.name ? '#F0EBE0' : '#666', fontFamily: 'Barlow, sans-serif', fontSize: '0.8rem' }}>
          🎬 {intakeAnswers.name || 'No active project'}
        </div>
      </div>
      <div style={{ padding: '1rem 1rem 0.5rem' }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Funders</span>
        {FUNDERS.map((f) => (
          <button key={f.label} onClick={() => { if (f.live) resetToHome(); else if (f.voteKey) openVoteModal(f.label, f.voteKey) }}
            style={{ width: '100%', padding: '0.4rem 0.5rem', backgroundColor: 'transparent', border: 'none', fontFamily: 'Barlow, sans-serif', fontSize: '0.8rem', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.4rem', color: f.live ? '#F0EBE0' : '#999', opacity: f.live ? 1 : 0.6 }}>
            🏛 {f.label}
            {!f.live && <span style={{ fontSize: '0.55rem', padding: '0.1rem 0.4rem', backgroundColor: '#333', color: '#999', fontWeight: 700, letterSpacing: '0.05em', marginLeft: 'auto' }}>SOON</span>}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 'auto', padding: '1rem 1.25rem', borderTop: '1px solid #333', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <UserButton afterSignOutUrl="/sign-in" />
        {user && <span style={{ fontSize: '0.75rem', color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.primaryEmailAddress?.emailAddress}</span>}
      </div>
    </div>
  )

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#F0EBE0', display: 'flex', fontFamily: 'Barlow, sans-serif' }}>
      {isMobile && sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40 }} />}
      {sidebar}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', minWidth: 0 }}
        onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>

        {isDragging && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(232,57,42,0.08)', border: '3px dashed #E8392A', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <div style={{ backgroundColor: '#F0EBE0', border: '2px solid #E8392A', padding: '1rem 2rem', boxShadow: '4px 4px 0px #1A1A1A' }}>
              <span style={{ fontWeight: 900, fontSize: '1rem', color: '#E8392A', letterSpacing: '0.04em' }}>DROP FILE TO ATTACH</span>
            </div>
          </div>
        )}

        {isMobile && (
          <div style={{ padding: '0.875rem 1.25rem', borderBottom: '2px solid #1A1A1A', backgroundColor: '#F0EBE0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
            <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ width: '20px', height: '2px', backgroundColor: '#1A1A1A' }} />
              <div style={{ width: '20px', height: '2px', backgroundColor: '#1A1A1A' }} />
              <div style={{ width: '20px', height: '2px', backgroundColor: '#1A1A1A' }} />
            </button>
            <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#1A1A1A', letterSpacing: '0.08em' }}>JUNIOR</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1A1A1A', opacity: 0.4 }}>{stage === 'chat' ? `${interactionCount} MSG` : 'BETA'}</span>
          </div>
        )}

        {/* HOME */}
        {stage === 'home' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: isMobile ? '2rem 1.25rem' : '0 3rem', overflowY: 'auto', paddingTop: isMobile ? '2rem' : '8vh' }}>
            <div style={{ width: '100%', maxWidth: '680px' }}>

              {/* Headline */}
              <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: isMobile ? 'clamp(1.6rem, 6vw, 2rem)' : 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#1A1A1A', lineHeight: 1.1, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                  {intakeStep === 0 ? 'What can Junior take off your plate today?' : INTAKE_SEQUENCE[intakeStep].prompt}
                </h1>
                {intakeStep === 0 && (
                  <p style={{ fontSize: '0.9rem', color: '#1A1A1A', opacity: 0.45 }}>
                    Pick a focus below, then tell us about your project.
                  </p>
                )}
              </div>

              {/* Input — hero element */}
              <div style={{ position: 'relative', marginBottom: '1rem' }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={inputPlaceholder}
                  style={{ width: '100%', padding: '1.1rem 6rem 1.1rem 1.25rem', border: '2px solid #1A1A1A', backgroundColor: '#FFFFFF', fontFamily: 'Barlow, sans-serif', fontSize: '1.05rem', outline: 'none', boxShadow: '4px 4px 0px #1A1A1A', boxSizing: 'border-box' }}
                />
                {/* Icons inside input — right side */}
                <div style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span title="Drop a file to attach" style={{ fontSize: '0.85rem', opacity: 0.3, cursor: 'default' }}>📎</span>
                  <button onClick={toggleDictation} title={isListening ? 'Stop dictation' : 'Dictate'}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center', color: isListening ? '#E8392A' : '#1A1A1A', opacity: isListening ? 1 : 0.4, transition: 'all 150ms ease' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill={isListening ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                      <line x1="12" y1="19" x2="12" y2="23"/>
                      <line x1="8" y1="23" x2="16" y2="23"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Submit — only visible when there's input */}
              {inputValue.trim() && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                  <button onClick={handleInputSubmit}
                    style={{ padding: '0.6rem 1.5rem', backgroundColor: '#E8392A', color: '#FFFFFF', border: '2px solid #1A1A1A', fontFamily: 'Barlow, sans-serif', fontWeight: 900, fontSize: '0.85rem', cursor: 'pointer', boxShadow: '4px 4px 0px #1A1A1A', letterSpacing: '0.05em' }}>
                    {intakeStep < INTAKE_SEQUENCE.length - 1 ? 'NEXT →' : 'START →'}
                  </button>
                </div>
              )}

              {/* Progress — only show from step 2 onward */}
              {intakeStep > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Step {intakeStep + 1} of {INTAKE_SEQUENCE.length}</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {INTAKE_SEQUENCE.map((_, i) => (
                      <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: i < intakeStep ? '#E8392A' : i === intakeStep ? '#1A1A1A' : '#DDD6C8', transition: 'background-color 300ms ease' }} />
                    ))}
                  </div>
                </div>
              )}

              {/* Focus cards — subordinate, smaller */}
              <div>
                <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#AAA', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '0.6rem' }}>Focus</span>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  {CATEGORIES.map((cat) => (
                    <button key={cat.id} onClick={() => handleCategorySelect(cat)}
                      style={{ padding: '0.65rem 0.85rem', backgroundColor: selectedCategory?.id === cat.id ? '#1A1A1A' : '#FFFFFF', border: `1.5px solid ${selectedCategory?.id === cat.id ? '#1A1A1A' : '#D0C9BE'}`, cursor: 'pointer', textAlign: 'left', boxShadow: selectedCategory?.id === cat.id ? '3px 3px 0px #E8392A' : 'none', transition: 'all 150ms ease' }}
                      onMouseEnter={e => { if (selectedCategory?.id !== cat.id) { (e.currentTarget as HTMLElement).style.borderColor = '#1A1A1A'; (e.currentTarget as HTMLElement).style.boxShadow = '3px 3px 0px #1A1A1A' } }}
                      onMouseLeave={e => { if (selectedCategory?.id !== cat.id) { (e.currentTarget as HTMLElement).style.borderColor = '#D0C9BE'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' } }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 900, color: selectedCategory?.id === cat.id ? '#F0EBE0' : '#1A1A1A', marginBottom: '0.15rem' }}>{cat.title}</div>
                      <p style={{ fontSize: '0.7rem', color: selectedCategory?.id === cat.id ? '#F0EBE0' : '#1A1A1A', opacity: selectedCategory?.id === cat.id ? 0.6 : 0.45, margin: 0, lineHeight: 1.35 }}>{cat.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {isListening && (
                <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#E8392A', display: 'inline-block', animation: 'dot-bounce 1.2s infinite' }} />
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#E8392A', letterSpacing: '0.06em' }}>LISTENING...</span>
                </div>
              )}

            </div>
          </div>
        )}

        {/* CHAT */}
        {stage === 'chat' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>

            {!isMobile && (
              <div style={{ padding: '0.5rem 3rem', display: 'flex', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#1A1A1A', opacity: 0.35, letterSpacing: '0.06em' }}>
                  {interactionCount} {interactionCount === 1 ? 'MESSAGE' : 'MESSAGES'}
                </span>
              </div>
            )}

            <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '1.5rem 1rem' : '2rem 3rem' }}>
              <div style={{ maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {messages.map((msg, i) => {
                  if (msg.role === 'user') return null
                  const { text, event, suggestions } = parseTags(msg.content)
                  const isLoadingMsg = loading && i === messages.length - 1 && msg.content === ''
                  return (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ padding: '1.25rem 1.5rem', backgroundColor: '#FFFFFF', color: '#1A1A1A', border: '2px solid #1A1A1A', boxShadow: '4px 4px 0px #1A1A1A', whiteSpace: 'pre-wrap', lineHeight: 1.7, fontSize: '0.95rem' }}>
                        {isLoadingMsg ? (
                          <span style={{ display: 'inline-flex', gap: '4px', alignItems: 'center' }}>
                            <span style={{ animation: 'dot-bounce 1.2s infinite', animationDelay: '0s', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#1A1A1A', display: 'inline-block' }} />
                            <span style={{ animation: 'dot-bounce 1.2s infinite', animationDelay: '0.2s', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#1A1A1A', display: 'inline-block' }} />
                            <span style={{ animation: 'dot-bounce 1.2s infinite', animationDelay: '0.4s', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#1A1A1A', display: 'inline-block' }} />
                          </span>
                        ) : linkifyUrls(text)}
                      </div>
                      {event && !loading && (
                        <button onClick={() => downloadICS(event)} style={{ alignSelf: 'flex-start', padding: '0.5rem 1rem', backgroundColor: '#E8392A', color: '#FFFFFF', border: '2px solid #1A1A1A', fontFamily: 'Barlow, sans-serif', fontWeight: 900, fontSize: '0.8rem', cursor: 'pointer', boxShadow: '4px 4px 0px #1A1A1A' }}>
                          + ADD DEADLINE TO CALENDAR
                        </button>
                      )}
                      {suggestions.length > 0 && !loading && (
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {suggestions.map((s, si) => (
                            <button key={si} onClick={() => sendChatMessage(s)}
                              style={{ padding: '0.45rem 0.9rem', backgroundColor: 'transparent', color: '#1A1A1A', border: '2px solid #1A1A1A', fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', transition: 'all 150ms ease' }}
                              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#1A1A1A'; (e.currentTarget as HTMLElement).style.color = '#F0EBE0' }}
                              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#1A1A1A' }}>
                              {s} →
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
                {limitReached && (
                  <div style={{ padding: '2rem', border: '2px solid #1A1A1A', backgroundColor: '#1A1A1A', color: '#FFFFFF', boxShadow: '4px 4px 0px #E8392A' }}>
                    <p style={{ fontWeight: 900, fontSize: '1rem', marginBottom: '0.5rem' }}>YOU'VE USED YOUR 20 FREE MESSAGES.</p>
                    <p style={{ opacity: 0.7, fontSize: '0.85rem' }}>Upgrade to unlock unlimited access.</p>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </div>

            {!limitReached && (
              <div style={{ borderTop: '2px solid #1A1A1A', backgroundColor: '#F0EBE0', padding: isMobile ? '0.75rem 1rem' : '1rem 3rem' }}>
                <div style={{ maxWidth: '640px', display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={inputPlaceholder}
                    style={{ flex: 1, padding: '0.875rem 1rem', border: '2px solid #1A1A1A', backgroundColor: '#FFFFFF', fontFamily: 'Barlow, sans-serif', fontSize: '1rem', outline: 'none', boxShadow: '4px 4px 0px #1A1A1A' }}
                  />
                  <button onClick={toggleDictation} title={isListening ? 'Stop' : 'Dictate'}
                    style={{ padding: '0.875rem 0.875rem', backgroundColor: isListening ? '#E8392A' : '#FFFFFF', color: isListening ? '#FFFFFF' : '#1A1A1A', border: '2px solid #1A1A1A', cursor: 'pointer', boxShadow: '4px 4px 0px #1A1A1A', flexShrink: 0, transition: 'all 150ms ease' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={isListening ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                      <line x1="12" y1="19" x2="12" y2="23"/>
                      <line x1="8" y1="23" x2="16" y2="23"/>
                    </svg>
                  </button>
                  <button onClick={() => sendChatMessage(inputValue)} disabled={loading || !inputValue.trim()}
                    style={{ padding: '0.875rem 1.5rem', backgroundColor: loading || !inputValue.trim() ? '#999' : '#E8392A', color: '#FFFFFF', border: '2px solid #1A1A1A', fontFamily: 'Barlow, sans-serif', fontWeight: 900, fontSize: '0.9rem', cursor: loading || !inputValue.trim() ? 'not-allowed' : 'pointer', boxShadow: '4px 4px 0px #1A1A1A', whiteSpace: 'nowrap' }}>
                    SEND
                  </button>
                </div>
                {isListening && (
                  <div style={{ maxWidth: '640px', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#E8392A', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#E8392A', display: 'inline-block', animation: 'dot-bounce 1.2s infinite' }} />
                      LISTENING...
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {voteModal.open && (
        <div onClick={closeVoteModal} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div onClick={e => e.stopPropagation()} style={{ backgroundColor: '#F0EBE0', border: '2px solid #1A1A1A', boxShadow: '6px 6px 0px #1A1A1A', padding: '1.75rem', maxWidth: '400px', width: '100%' }}>
            {voteModal.voted ? (
              <>
                <p style={{ fontWeight: 900, fontSize: '1.1rem', marginBottom: '0.5rem' }}>✓ VOTE CAST</p>
                <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '1.5rem' }}>Your vote helps determine what Junior builds next. We'll let you know when {voteModal.label} is live.</p>
                <button onClick={closeVoteModal} style={{ padding: '0.6rem 1.25rem', backgroundColor: '#1A1A1A', color: '#FFFFFF', border: '2px solid #1A1A1A', fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>CLOSE</button>
              </>
            ) : (
              <>
                <p style={{ fontWeight: 900, fontSize: '1.1rem', marginBottom: '0.5rem' }}>VOTE TO UNLOCK</p>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: '#E8392A', marginBottom: '0.75rem' }}>{voteModal.label}</p>
                <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '1.5rem' }}>Junior builds features in order of demand. Cast your vote and we'll prioritize accordingly.</p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button onClick={() => castVote(voteModal.voteKey)} style={{ padding: '0.6rem 1.25rem', backgroundColor: '#E8392A', color: '#FFFFFF', border: '2px solid #1A1A1A', fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', boxShadow: '4px 4px 0px #1A1A1A' }}>CAST MY VOTE</button>
                  <button onClick={closeVoteModal} style={{ padding: '0.6rem 1.25rem', backgroundColor: 'transparent', color: '#1A1A1A', border: '2px solid #1A1A1A', fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>NOT NOW</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </main>
  )
}
