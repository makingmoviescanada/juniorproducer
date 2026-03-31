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

type WizardStep = 'name' | 'category' | 'intake' | 'chat'

const MESSAGE_LIMIT = 20

const INTAKE_QUESTIONS = [
  { key: 'province', question: 'What province are you based in?', placeholder: 'e.g. Quebec, Ontario, BC...' },
  { key: 'stage', question: 'What stage is your project at?', placeholder: 'e.g. Development, Pre-production, Production, Post...' },
  { key: 'format', question: 'What format is the project?', placeholder: 'e.g. Short film, Feature, Documentary...' },
  { key: 'broadcaster', question: 'Do you have a broadcaster or distributor attached?', placeholder: 'e.g. No, or name of broadcaster...' },
  { key: 'productionCompany', question: 'Do you own or operate a registered production company?', placeholder: 'e.g. Yes — Intersectionnel Films Inc., or No...' },
]

const CATEGORIES = [
  {
    id: 'grants',
    title: 'Grants & Funding',
    description: 'Find funding, check eligibility, navigate applications.',
    context: 'I need help finding and applying for grants and funding for my project.',
  },
  {
    id: 'deadlines',
    title: 'Deadlines & Calendar',
    description: 'Never miss a grant deadline.',
    context: 'I need help tracking deadlines and planning my application calendar.',
  },
  {
    id: 'projects',
    title: 'Project Management',
    description: 'Organise your production from development to delivery.',
    context: 'I need help organising and managing my production.',
  },
  {
    id: 'finance',
    title: 'Financial Planning',
    description: 'Budgets, tax credits, cost reports.',
    context: 'I need help with financial planning — budgets, tax credits, and cost reports.',
  },
  {
    id: 'distribution',
    title: 'Distribution Strategy',
    description: 'Festival strategy, sales agents, Canadian distribution requirements.',
    context: 'I need help planning my distribution strategy — festivals, sales agents, and Canadian requirements.',
  },
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

type VoteModal = {
  open: boolean
  label: string
  voteKey: string
  voted: boolean
}

type IntakeAnswers = {
  province: string
  stage: string
  format: string
  broadcaster: string
  productionCompany: string
}

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/\_\_(.+?)\_\_/g, '$1')
    .replace(/\_(.+?)\_/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/`(.+?)`/g, '$1')
}

function parseCalendarTag(content: string): { text: string; event: CalendarEvent | null } {
  const regex = /\[CALENDAR:\s*title="([^"]+)"\s*description="([^"]+)"\s*date="([^"]+)"\s*remind_days=(\d+)\]/
  const match = content.match(regex)
  if (!match) return { text: stripMarkdown(content), event: null }
  const text = content.replace(regex, '').trim()
  return {
    text: stripMarkdown(text),
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

export default function ChatPage() {
  const { user } = useUser()
  const [wizardStep, setWizardStep] = useState<WizardStep>('name')
  const [projectName, setProjectName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[0] | null>(null)
  const [intakeStep, setIntakeStep] = useState(0)
  const [intakeAnswers, setIntakeAnswers] = useState<IntakeAnswers>({ province: '', stage: '', format: '', broadcaster: '', productionCompany: '' })
  const [intakeInput, setIntakeInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const [limitReached, setLimitReached] = useState(false)
  const [votedItems, setVotedItems] = useState<Set<string>>(new Set())
  const [voteModal, setVoteModal] = useState<VoteModal>({ open: false, label: '', voteKey: '', voted: false })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const intakeInputRef = useRef<HTMLInputElement>(null)

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
    const count = Math.ceil(messages.length / 2)
    setMessageCount(count)
    if (count >= MESSAGE_LIMIT) setLimitReached(true)
  }, [messages])

  useEffect(() => {
    if (wizardStep === 'name') nameInputRef.current?.focus()
    if (wizardStep === 'intake') intakeInputRef.current?.focus()
  }, [wizardStep])

  function resetWizard() {
    setWizardStep('name')
    setProjectName('')
    setSelectedCategory(null)
    setIntakeStep(0)
    setIntakeAnswers({ province: '', stage: '', format: '', broadcaster: '', productionCompany: '' })
    setIntakeInput('')
    setMessages([])
    setLimitReached(false)
    if (isMobile) setSidebarOpen(false)
  }

  function handleNameSubmit() {
    if (!projectName.trim()) return
    setWizardStep('category')
  }

  function handleCategorySelect(cat: typeof CATEGORIES[0]) {
    setSelectedCategory(cat)
    setWizardStep('intake')
  }

  function handleIntakeAnswer() {
    if (!intakeInput.trim()) return
    const key = INTAKE_QUESTIONS[intakeStep].key as keyof IntakeAnswers
    const updated = { ...intakeAnswers, [key]: intakeInput }
    setIntakeAnswers(updated)
    setIntakeInput('')
    if (intakeStep < INTAKE_QUESTIONS.length - 1) {
      setIntakeStep(intakeStep + 1)
    } else {
      startChat(updated)
    }
  }

  function startChat(answers: IntakeAnswers) {
    const cat = selectedCategory!
    const contextMessage = `My project is called "${projectName}". ${cat.context} Here's my context: Province: ${answers.province}. Stage: ${answers.stage}. Format: ${answers.format}. Broadcaster/distributor attached: ${answers.broadcaster}. Production company: ${answers.productionCompany}.`
    const welcome: Message = {
      role: 'assistant',
      content: `Got it — let's work on ${projectName}.\n\nI have your project context. What would you like to tackle first?`,
    }
    setMessages([welcome])
    setWizardStep('chat')
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

  async function sendMessage() {
    if (!input.trim() || loading || limitReached) return
    const userMessage: Message = { role: 'user', content: input }
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
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  function handleIntakeKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') { e.preventDefault(); handleIntakeAnswer() }
  }

  function handleNameKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') { e.preventDefault(); handleNameSubmit() }
  }

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
    setVoteModal({ open: true, label, voteKey, voted: votedItems.has(voteKey) })
    if (isMobile) setSidebarOpen(false)
  }

  function closeVoteModal() {
    setVoteModal({ open: false, label: '', voteKey: '', voted: false })
  }

  const sidebar = (
    <div style={{
      width: isMobile ? '100%' : '240px',
      minWidth: isMobile ? 'unset' : '240px',
      backgroundColor: '#1A1A1A',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.25rem 0',
      borderRight: isMobile ? 'none' : '2px solid #1A1A1A',
      position: isMobile ? 'fixed' : 'sticky',
      top: 0,
      left: 0,
      height: '100vh',
      overflowY: 'auto',
      zIndex: isMobile ? 50 : 'auto' as any,
      transform: isMobile && !sidebarOpen ? 'translateX(-100%)' : 'translateX(0)',
      transition: 'transform 250ms ease',
    }}>
      <div style={{ padding: '0 1.25rem 1.25rem', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '1rem', fontWeight: 900, color: '#F0EBE0', letterSpacing: '0.08em' }}>JUNIOR</span>
        {isMobile && (
          <button onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', color: '#999', fontSize: '1.25rem', cursor: 'pointer' }}>✕</button>
        )}
      </div>

      <div style={{ padding: '1rem 1rem 0' }}>
        <button
          onClick={resetWizard}
          style={{
            width: '100%', padding: '0.6rem 1rem', backgroundColor: '#E8392A',
            color: '#FFFFFF', border: '2px solid #E8392A', fontFamily: 'Barlow, sans-serif',
            fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', textAlign: 'left',
            letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          START HERE
        </button>
      </div>

      <div style={{ padding: '1.25rem 1rem 0.5rem' }}>
        <div style={{ marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Projects</span>
        </div>
        <div style={{ width: '100%', padding: '0.4rem 0.5rem', color: projectName ? '#F0EBE0' : '#666', fontFamily: 'Barlow, sans-serif', fontSize: '0.8rem', textAlign: 'left' }}>
          🎬 {projectName || 'No active project'}
        </div>
      </div>

      <div style={{ padding: '1rem 1rem 0.5rem' }}>
        <div style={{ marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Funders</span>
        </div>
        {FUNDERS.map((f) => (
          <button
            key={f.label}
            onClick={() => {
              if (f.live) resetWizard()
              else if (f.voteKey) openVoteModal(f.label, f.voteKey)
            }}
            style={{
              width: '100%', padding: '0.4rem 0.5rem', backgroundColor: 'transparent',
              border: 'none', fontFamily: 'Barlow, sans-serif', fontSize: '0.8rem',
              cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.4rem',
              color: f.live ? '#F0EBE0' : '#999',
              opacity: f.live ? 1 : 0.6,
            }}
          >
            🏛 {f.label}
            {!f.live && (
              <span style={{ fontSize: '0.55rem', padding: '0.1rem 0.4rem', backgroundColor: '#333', color: '#999', fontWeight: 700, letterSpacing: '0.05em', marginLeft: 'auto' }}>
                SOON
              </span>
            )}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 'auto', padding: '1rem 1.25rem', borderTop: '1px solid #333', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <UserButton afterSignOutUrl="/sign-in" />
        {user && (
          <span style={{ fontSize: '0.75rem', color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user.primaryEmailAddress?.emailAddress}
          </span>
        )}
      </div>
    </div>
  )

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#F0EBE0', display: 'flex', fontFamily: 'Barlow, sans-serif' }}>

      {isMobile && sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40 }} />
      )}

      {sidebar}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', minWidth: 0 }}>

        <div style={{
          padding: '0.875rem 1.25rem', borderBottom: '2px solid #1A1A1A',
          backgroundColor: '#F0EBE0', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          position: 'sticky', top: 0, zIndex: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {isMobile && (
              <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ width: '20px', height: '2px', backgroundColor: '#1A1A1A' }} />
                <div style={{ width: '20px', height: '2px', backgroundColor: '#1A1A1A' }} />
                <div style={{ width: '20px', height: '2px', backgroundColor: '#1A1A1A' }} />
              </button>
            )}
            {isMobile && <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#1A1A1A', letterSpacing: '0.08em' }}>JUNIOR</span>}
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1A1A1A', opacity: 0.4, letterSpacing: '0.05em' }}>
            {wizardStep === 'chat' ? `${messageCount}/${MESSAGE_LIMIT} MESSAGES` : 'BETA'}
          </span>
        </div>

        {/* WIZARD: NAME */}
        {wizardStep === 'name' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: isMobile ? '2rem 1.25rem' : '4rem 2.5rem' }}>
            <div style={{ maxWidth: '480px', width: '100%' }}>
              <h1 style={{ fontSize: isMobile ? '1.4rem' : '2rem', fontWeight: 900, color: '#1A1A1A', marginBottom: '0.5rem', lineHeight: 1.2 }}>
                What's your project called?
              </h1>
              <p style={{ fontSize: '0.9rem', color: '#1A1A1A', opacity: 0.5, marginBottom: '1.5rem' }}>
                Junior will use this to keep your session organised.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  ref={nameInputRef}
                  type="text"
                  value={projectName}
                  onChange={e => setProjectName(e.target.value)}
                  onKeyDown={handleNameKeyDown}
                  placeholder="e.g. The Last Frontier"
                  style={{ flex: 1, padding: '0.75rem 1rem', border: '2px solid #1A1A1A', backgroundColor: '#FFFFFF', fontFamily: 'Barlow, sans-serif', fontSize: '1rem', outline: 'none' }}
                />
                <button
                  onClick={handleNameSubmit}
                  disabled={!projectName.trim()}
                  style={{ padding: '0.75rem 1.25rem', backgroundColor: projectName.trim() ? '#E8392A' : '#999', color: '#FFFFFF', border: '2px solid #1A1A1A', fontFamily: 'Barlow, sans-serif', fontWeight: 900, fontSize: '0.9rem', cursor: projectName.trim() ? 'pointer' : 'not-allowed', boxShadow: '4px 4px 0px #1A1A1A', whiteSpace: 'nowrap' }}
                >
                  NEXT →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* WIZARD: CATEGORY */}
        {wizardStep === 'category' && (
          <div style={{ flex: 1, padding: isMobile ? '1.25rem 1rem' : '3rem 2.5rem', overflowY: 'auto' }}>
            <h1 style={{ fontSize: isMobile ? '1.2rem' : '1.75rem', fontWeight: 900, color: '#1A1A1A', marginBottom: '0.4rem', lineHeight: 1.2 }}>
              What would you like help with?
            </h1>
            <p style={{ fontSize: '0.85rem', color: '#1A1A1A', opacity: 0.5, marginBottom: '1.25rem' }}>
              For <strong style={{ opacity: 1 }}>{projectName}</strong>
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '0.65rem', maxWidth: '700px' }}>
              {CATEGORIES.slice(0, 4).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat)}
                  style={{ padding: '0.875rem', backgroundColor: '#FFFFFF', border: '2px solid #1A1A1A', cursor: 'pointer', textAlign: 'left', boxShadow: '4px 4px 0px #1A1A1A', transition: 'all 150ms ease' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0px #1A1A1A' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '4px 4px 0px #1A1A1A' }}
                >
                  <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#1A1A1A', marginBottom: '0.3rem' }}>{cat.title}</div>
                  <p style={{ fontSize: '0.8rem', color: '#1A1A1A', opacity: 0.6, margin: 0, lineHeight: 1.4 }}>{cat.description}</p>
                </button>
              ))}
              {CATEGORIES[4] && (
                <button
                  onClick={() => handleCategorySelect(CATEGORIES[4])}
                  style={{ gridColumn: isMobile ? '1' : '1 / -1', padding: '0.875rem', backgroundColor: '#FFFFFF', border: '2px solid #1A1A1A', cursor: 'pointer', textAlign: 'left', boxShadow: '4px 4px 0px #1A1A1A', transition: 'all 150ms ease', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0px #1A1A1A' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '4px 4px 0px #1A1A1A' }}
                >
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#1A1A1A', marginBottom: '0.25rem' }}>{CATEGORIES[4].title}</div>
                    <div style={{ fontSize: '0.8rem', color: '#1A1A1A', opacity: 0.6 }}>{CATEGORIES[4].description}</div>
                  </div>
                </button>
              )}
            </div>
          </div>
        )}

        {/* WIZARD: INTAKE */}
        {wizardStep === 'intake' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: isMobile ? '2rem 1.25rem' : '4rem 2.5rem' }}>
            <div style={{ maxWidth: '480px', width: '100%' }}>
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#E8392A', letterSpacing: '0.1em' }}>
                  {intakeStep + 1} OF {INTAKE_QUESTIONS.length}
                </span>
              </div>
              <h2 style={{ fontSize: isMobile ? '1.2rem' : '1.5rem', fontWeight: 900, color: '#1A1A1A', marginBottom: '1.5rem', lineHeight: 1.3 }}>
                {INTAKE_QUESTIONS[intakeStep].question}
              </h2>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  ref={intakeInputRef}
                  type="text"
                  value={intakeInput}
                  onChange={e => setIntakeInput(e.target.value)}
                  onKeyDown={handleIntakeKeyDown}
                  placeholder={INTAKE_QUESTIONS[intakeStep].placeholder}
                  style={{ flex: 1, padding: '0.75rem 1rem', border: '2px solid #1A1A1A', backgroundColor: '#FFFFFF', fontFamily: 'Barlow, sans-serif', fontSize: '1rem', outline: 'none' }}
                />
                <button
                  onClick={handleIntakeAnswer}
                  disabled={!intakeInput.trim()}
                  style={{ padding: '0.75rem 1.25rem', backgroundColor: intakeInput.trim() ? '#E8392A' : '#999', color: '#FFFFFF', border: '2px solid #1A1A1A', fontFamily: 'Barlow, sans-serif', fontWeight: 900, fontSize: '0.9rem', cursor: intakeInput.trim() ? 'pointer' : 'not-allowed', boxShadow: '4px 4px 0px #1A1A1A', whiteSpace: 'nowrap' }}
                >
                  {intakeStep < INTAKE_QUESTIONS.length - 1 ? 'NEXT →' : 'START →'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CHAT */}
        {wizardStep === 'chat' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '1rem' : '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((msg, i) => {
              if (msg.role === 'user') return null
              const { text, event } = parseCalendarTag(msg.content)
              const isLoading = loading && i === messages.length - 1 && msg.content === ''
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <div style={{ maxWidth: isMobile ? '90%' : '75%', padding: '0.75rem 1rem', backgroundColor: '#FFFFFF', color: '#1A1A1A', border: '2px solid #1A1A1A', boxShadow: '4px 4px 0px #1A1A1A', whiteSpace: 'pre-wrap', lineHeight: 1.6, fontSize: isMobile ? '0.9rem' : '1rem', minWidth: isLoading ? '60px' : undefined }}>
                    {isLoading ? (
                      <span style={{ display: 'inline-flex', gap: '4px', alignItems: 'center' }}>
                        <span style={{ animation: 'dot-bounce 1.2s infinite', animationDelay: '0s', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#1A1A1A', display: 'inline-block' }} />
                        <span style={{ animation: 'dot-bounce 1.2s infinite', animationDelay: '0.2s', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#1A1A1A', display: 'inline-block' }} />
                        <span style={{ animation: 'dot-bounce 1.2s infinite', animationDelay: '0.4s', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#1A1A1A', display: 'inline-block' }} />
                      </span>
                    ) : text}
                  </div>
                  {event && !loading && (
                    <button
                      onClick={() => downloadICS(event)}
                      style={{ padding: '0.5rem 1rem', backgroundColor: '#E8392A', color: '#FFFFFF', border: '2px solid #1A1A1A', fontFamily: 'Barlow, sans-serif', fontWeight: 900, fontSize: '0.85rem', cursor: 'pointer', boxShadow: '4px 4px 0px #1A1A1A' }}
                    >
                      + ADD DEADLINE TO CALENDAR
                    </button>
                  )}
                </div>
              )
            })}
            {limitReached && (
              <div style={{ textAlign: 'center', marginTop: '2rem', padding: '2rem', border: '2px solid #1A1A1A', backgroundColor: '#1A1A1A', color: '#FFFFFF', boxShadow: '4px 4px 0px #E8392A' }}>
                <p style={{ fontWeight: 900, fontSize: '1.1rem', marginBottom: '0.5rem' }}>YOU'VE USED YOUR 20 FREE MESSAGES.</p>
                <p style={{ opacity: 0.7, marginBottom: '1.5rem', fontSize: '0.85rem' }}>Upgrade to unlock unlimited access.</p>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}

        {wizardStep === 'chat' && !limitReached && (
          <div style={{ padding: isMobile ? '0.75rem' : '1rem 1.5rem', borderTop: '2px solid #1A1A1A', backgroundColor: '#F0EBE0', display: 'flex', gap: '0.5rem', position: 'sticky', bottom: 0 }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Junior..."
              rows={1}
              style={{ flex: 1, padding: '0.75rem', border: '2px solid #1A1A1A', backgroundColor: '#F0EBE0', fontFamily: 'Barlow, sans-serif', fontSize: isMobile ? '0.95rem' : '1rem', resize: 'none', outline: 'none' }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{ padding: isMobile ? '0.75rem 1rem' : '0.75rem 1.5rem', backgroundColor: loading || !input.trim() ? '#999' : '#E8392A', color: '#FFFFFF', border: '2px solid #1A1A1A', fontFamily: 'Barlow, sans-serif', fontWeight: 900, fontSize: '0.9rem', cursor: loading || !input.trim() ? 'not-allowed' : 'pointer', boxShadow: '4px 4px 0px #1A1A1A', whiteSpace: 'nowrap' }}
            >
              SEND
            </button>
          </div>
        )}
      </div>

      {voteModal.open && (
        <div onClick={closeVoteModal} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div onClick={e => e.stopPropagation()} style={{ backgroundColor: '#F0EBE0', border: '2px solid #1A1A1A', boxShadow: '6px 6px 0px #1A1A1A', padding: '1.75rem', maxWidth: '400px', width: '100%' }}>
            {voteModal.voted ? (
              <>
                <p style={{ fontWeight: 900, fontSize: '1.1rem', marginBottom: '0.5rem' }}>✓ VOTE CAST</p>
                <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '1.5rem' }}>
                  Your vote helps determine what Junior builds next. We'll let you know when {voteModal.label} is live.
                </p>
                <button onClick={closeVoteModal} style={{ padding: '0.6rem 1.25rem', backgroundColor: '#1A1A1A', color: '#FFFFFF', border: '2px solid #1A1A1A', fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
                  CLOSE
                </button>
              </>
            ) : (
              <>
                <p style={{ fontWeight: 900, fontSize: '1.1rem', marginBottom: '0.5rem' }}>VOTE TO UNLOCK</p>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: '#E8392A', marginBottom: '0.75rem' }}>{voteModal.label}</p>
                <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '1.5rem' }}>Junior builds features in order of demand. Cast your vote and we'll prioritize accordingly.</p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button onClick={() => castVote(voteModal.voteKey)} style={{ padding: '0.6rem 1.25rem', backgroundColor: '#E8392A', color: '#FFFFFF', border: '2px solid #1A1A1A', fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', boxShadow: '4px 4px 0px #1A1A1A' }}>
                    CAST MY VOTE
                  </button>
                  <button onClick={closeVoteModal} style={{ padding: '0.6rem 1.25rem', backgroundColor: 'transparent', color: '#1A1A1A', border: '2px solid #1A1A1A', fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
                    NOT NOW
                  </button>
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
```

Also need to update `app/api/chat/route.ts` system prompt to handle the non-grants categories. Add this section after the PRODUCTION COMPANY LOGIC block:
```
CATEGORY CONTEXT:
The filmmaker's intake will tell you what category of help they're looking for. Use this to frame your initial response:
- Grants & Funding: lead with relevant funding options based on their profile
- Deadlines & Calendar: lead with upcoming deadlines and application timing for relevant funders
- Project Management: help them think through production organisation, timelines, and key milestones
- Financial Planning: help with budget structure, tax credit eligibility (CPTC/PSTC), and cost planning
- Distribution Strategy: help with festival strategy, sales agent relationships, and Canadian distribution requirements
Always use the full project context (province, stage, format, broadcaster, production company) to make your response specific to their situation.
