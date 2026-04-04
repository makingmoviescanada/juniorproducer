'use client'

import { useState, useRef, useEffect } from 'react'
import { useUser, UserButton } from '@clerk/nextjs'

// ── Types ────────────────────────────────────────────────────────────────────

type Message = { role: 'user' | 'assistant'; content: string }
type CalendarEvent = { title: string; description: string; date: string; remind_days: number }
type Stage = 'home' | 'chat'
type VoteModalState = { open: boolean; label: string; voteKey: string; voted: boolean }
type IntakeAnswers = { name: string; format: string; stage: string; province: string }

// ── Constants ─────────────────────────────────────────────────────────────────

const MESSAGE_LIMIT = 20

const INTAKE_SEQUENCE = [
  { key: 'name',     prompt: "What's your project called?", placeholder: 'e.g. The Last Frontier' },
  { key: 'format',   prompt: 'What format?',                placeholder: 'e.g. Feature Film, Short Film, Documentary...' },
  { key: 'stage',    prompt: 'What stage?',                 placeholder: 'e.g. Development, Pre-production, Production...' },
  { key: 'province', prompt: 'What province?',              placeholder: 'e.g. Quebec, Ontario, BC...' },
]

const CATEGORIES = [
  { id: 'grants',        title: 'Grants & Funding',      description: 'finding the right funders and navigating my application.',                  context: 'I need help finding and applying for grants and funding for my project.' },
  { id: 'deadlines',     title: 'Deadline Reminders',    description: 'tracking every deadline so I never miss a round.',                          context: 'I need help tracking deadlines and planning my application calendar.' },
  { id: 'projects',      title: 'Project Management',    description: 'organising my production from development to delivery.',                    context: 'I need help organising and managing my production.' },
  { id: 'finance',       title: 'Financial Planning',    description: 'my budget, tax credits, and cost reports.',                                 context: 'I need help with financial planning — budgets, tax credits, and cost reports.' },
  { id: 'distribution',  title: 'Distribution Strategy', description: 'building my festival strategy and distribution plan.',                      context: 'I need help planning my distribution strategy — festivals, sales agents, and Canadian requirements.' },
  { id: 'consolidate',   title: 'Version Compare',       description: 'comparing my drafts and strengthening them for each funder.',               context: "I want to compare versions of my supporting materials. I have multiple drafts and need help deciding what to keep, cut, or strengthen for a specific funder's mandate. Please ask me which funder I'm targeting and I'll share the drafts." },
]

const SIDEBAR_FEATURES = [
  { id: 'grants', label: 'Grants & Funding', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { id: 'deadlines', label: 'Deadline Reminders', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
  { id: 'projects', label: 'Project Management', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
  { id: 'finance', label: 'Financial Planning', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M2 8h20M2 16h20M12 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
  { id: 'distribution', label: 'Distribution Strategy', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" stroke="currentColor" strokeWidth="2"/></svg> },
  { id: 'consolidate', label: 'Version Compare', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 10h10M4 14h12M4 18h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
]

// ── Design tokens ─────────────────────────────────────────────────────────────

const C = {
  indigo:        '#4B3BC4',
  indigoDark:    '#3D2C8D',
  indigoDeep:    '#2E1F6B',
  ink:           '#1A1230',
  base:          '#FAFAFE',
  white:         '#FFFFFF',
  muted:         'rgba(26,18,48,0.55)',
  border:        'rgba(75,59,196,0.18)',
  borderLight:   'rgba(75,59,196,0.12)',
  sidebarBg:     '#0F0B24',
  sidebarText:   'rgba(240,235,255,0.85)',
  sidebarMuted:  'rgba(240,235,255,0.35)',
  sidebarBorder: 'rgba(255,255,255,0.08)',
}

const pageGradient = [
  'radial-gradient(ellipse 85% 50% at 50% 0%,  rgba(99,82,220,0.20) 0%, transparent 65%)',
  'radial-gradient(ellipse 55% 40% at 8%  25%, rgba(139,92,246,0.14) 0%, transparent 55%)',
  'radial-gradient(ellipse 45% 35% at 92% 20%, rgba(79,60,220,0.12)  0%, transparent 52%)',
  'radial-gradient(ellipse 60% 40% at 70% 60%, rgba(99,82,220,0.10)  0%, transparent 56%)',
  'radial-gradient(ellipse 50% 35% at 20% 80%, rgba(139,92,246,0.09) 0%, transparent 55%)',
  '#FAFAFE',
].join(',')

// ── Helpers ───────────────────────────────────────────────────────────────────

function stripMarkdown(t: string) {
  return t
    .replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1')
    .replace(/\_\_(.+?)\_\_/g, '$1').replace(/\_(.+?)\_/g, '$1')
    .replace(/#{1,6}\s+/g, '').replace(/`(.+?)`/g, '$1')
}

function linkifyUrls(text: string): React.ReactNode[] {
  const re = /(https?:\/\/[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/g
  return text.split(re).map((part, i) =>
    re.test(part)
      ? <a key={i} href={part.startsWith('http') ? part : `https://${part}`} target="_blank" rel="noopener noreferrer" style={{ color: C.indigo, textDecoration: 'underline', wordBreak: 'break-all' }}>{part}</a>
      : part
  )
}

type Source = { funder: string; topic: string; confidence: 'high' | 'medium' | 'low'; last_verified: string }
type StaleIntel = { funder: string; topic: string }

function parseTags(content: string) {
  let text = content
  let event: CalendarEvent | null = null
  let suggestions: string[] = []
  let source: Source | null = null
  let staleIntel: StaleIntel | null = null

  const calRe = /\[CALENDAR:\s*title="([^"]+)"\s*description="([^"]+)"\s*date="([^"]+)"\s*remind_days=(\d+)\]/
  const cm = text.match(calRe)
  if (cm) { text = text.replace(calRe, '').trim(); event = { title: cm[1], description: cm[2], date: cm[3], remind_days: +cm[4] } }

  const sugRe = /\[SUGGESTIONS:\s*"([^"]+)"\s*\|\s*"([^"]+)"\]/
  const sm = text.match(sugRe)
  if (sm) { text = text.replace(sugRe, '').trim(); suggestions = [sm[1], sm[2]] }

  const srcRe = /\[SOURCE:\s*funder="([^"]+)"\s*topic="([^"]+)"\s*confidence="([^"]+)"\s*last_verified="([^"]+)"\]/
  const srcM = text.match(srcRe)
  if (srcM) {
    text = text.replace(srcRe, '').trim()
    source = { funder: srcM[1], topic: srcM[2], confidence: srcM[3] as Source['confidence'], last_verified: srcM[4] }
  }

  const staleRe = /\[STALE_INTEL:\s*funder="([^"]+)"\s*topic="([^"]+)"\]/
  const staleM = text.match(staleRe)
  if (staleM) {
    text = text.replace(staleRe, '').trim()
    staleIntel = { funder: staleM[1], topic: staleM[2] }
  }

  return { text: stripMarkdown(text), event, suggestions, source, staleIntel }
}

function downloadICS(ev: CalendarEvent) {
  const now = new Date()
  const start = ev.date === 'ask' || !ev.date.match(/^\d{4}-\d{2}-\d{2}$/)
    ? new Date(now.getTime() + 30 * 86400000)
    : new Date(ev.date + 'T09:00:00')
  const end = new Date(start.getTime() + 3600000)
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const ics = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Junior//juniorproducer.ca//EN','BEGIN:VEVENT',`UID:${Date.now()}@juniorproducer.ca`,`DTSTAMP:${fmt(now)}`,`DTSTART:${fmt(start)}`,`DTEND:${fmt(end)}`,`SUMMARY:${ev.title}`,`DESCRIPTION:${ev.description}`,'BEGIN:VALARM',`TRIGGER:-PT${ev.remind_days * 1440}M`,'ACTION:DISPLAY',`DESCRIPTION:Reminder: ${ev.title}`,'END:VALARM','END:VEVENT','END:VCALENDAR'].join('\r\n')
  const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' })), download: `${ev.title.replace(/\s+/g,'-').toLowerCase()}.ics` })
  a.click()
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ChatPage() {
  const { user } = useUser()
  const [stage, setStage] = useState<Stage>('home')
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[0] | null>(null)
  const [activeSidebarFeature, setActiveSidebarFeature] = useState<string | null>(null)
  const [intakeStep, setIntakeStep] = useState(0)
  const [intakeAnswers, setIntakeAnswers] = useState<IntakeAnswers>({ name: '', format: '', stage: '', province: '' })
  const [inputValue, setInputValue] = useState('')
  const [inputPlaceholder, setInputPlaceholder] = useState("What's your project called?")
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [interactionCount, setInteractionCount] = useState(0)
  const [limitReached, setLimitReached] = useState(false)
  const [votedItems, setVotedItems] = useState<Set<string>>(new Set())
  const [voteModal, setVoteModal] = useState<VoteModalState>({ open: false, label: '', voteKey: '', voted: false })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [flaggedMessages, setFlaggedMessages] = useState<Set<number>>(new Set())
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState('')
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<any>(null)

  const ANIMATED_PROMPTS = [
    'What Canada Council grants suit my short film?',
    'Does my feature qualify for Telefilm development?',
    'When does the SODEC deadline close?',
    'I got rejected — how do I reapply stronger?',
    'What\'s the difference between CMF and Telefilm?',
    'Do I need a production company for CALQ?',
    'How do I start a Canada Council portal profile?',
  ]

  useEffect(() => {
    if (stage !== 'home' || intakeStep !== 0) return
    let charIndex = 0
    let currentPrompt = ANIMATED_PROMPTS[placeholderIndex]
    let typing = true
    let timeout: ReturnType<typeof setTimeout>

    function tick() {
      if (typing) {
        charIndex++
        setAnimatedPlaceholder(currentPrompt.slice(0, charIndex))
        if (charIndex < currentPrompt.length) {
          timeout = setTimeout(tick, 38)
        } else {
          timeout = setTimeout(() => { typing = false; tick() }, 2200)
        }
      } else {
        charIndex--
        setAnimatedPlaceholder(currentPrompt.slice(0, charIndex))
        if (charIndex > 0) {
          timeout = setTimeout(tick, 18)
        } else {
          setPlaceholderIndex(i => (i + 1) % ANIMATED_PROMPTS.length)
        }
      }
    }

    timeout = setTimeout(tick, 600)
    return () => clearTimeout(timeout)
  }, [stage, intakeStep, placeholderIndex])

  useEffect(() => { const c = () => setIsMobile(window.innerWidth < 768); c(); window.addEventListener('resize', c); return () => window.removeEventListener('resize', c) }, [])
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])
  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 50) }, [intakeStep])
  useEffect(() => { if (Math.ceil(messages.length / 2) >= MESSAGE_LIMIT) setLimitReached(true) }, [messages])

  function resetToHome() {
    setStage('home'); setSelectedCategory(null); setActiveSidebarFeature(null)
    setIntakeStep(0); setIntakeAnswers({ name: '', format: '', stage: '', province: '' })
    setInputValue(''); setInputPlaceholder("What's your project called?")
    setMessages([]); setLimitReached(false); setInteractionCount(0)
    if (isMobile) setSidebarOpen(false)
  }

  function handleSidebarFeature(id: string) {
    const cat = CATEGORIES.find(c => c.id === id)
    if (!cat) return
    resetToHome()
    setTimeout(() => { setSelectedCategory(cat); setActiveSidebarFeature(id); inputRef.current?.focus() }, 50)
    if (isMobile) setSidebarOpen(false)
  }

  function handleCategorySelect(cat: typeof CATEGORIES[0]) {
    setSelectedCategory(cat); setActiveSidebarFeature(cat.id); inputRef.current?.focus()
  }

  function handleInputSubmit() {
    if (!inputValue.trim()) return
    const value = inputValue.trim(); setInputValue('')
    if (stage === 'chat') { sendChatMessage(value); return }
    const key = INTAKE_SEQUENCE[intakeStep].key as keyof IntakeAnswers
    const updated = { ...intakeAnswers, [key]: value }
    setIntakeAnswers(updated)
    if (intakeStep < INTAKE_SEQUENCE.length - 1) {
      const next = intakeStep + 1; setIntakeStep(next); setInputPlaceholder(INTAKE_SEQUENCE[next].placeholder)
    } else { beginChat(updated) }
  }

  function handleKeyDown(e: React.KeyboardEvent) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleInputSubmit() } }

  function beginChat(answers: IntakeAnswers) {
    const cat = selectedCategory || CATEGORIES[0]
    const ctx = `My project is called "${answers.name}". ${cat.context} Format: ${answers.format}. Stage: ${answers.stage}. Province: ${answers.province}.`
    const welcome: Message = { role: 'assistant', content: `Got it — let's work on ${answers.name}.\n\nI have your context. What would you like to tackle first?` }
    setMessages([welcome]); setStage('chat'); setInputPlaceholder('Ask Junior...')
    sendFirstMessage(ctx, [welcome])
    if (isMobile) setSidebarOpen(false)
  }

  async function streamChat(msgs: Message[], onChunk: (t: string) => void): Promise<void> {
    const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: msgs }) })
    if (response.status === 429) { setLimitReached(true); return }
    if (response.status === 401) { window.location.href = '/sign-in'; return }
    if (!response.body) return
    const reader = response.body.getReader(); const decoder = new TextDecoder(); let text = ''
    while (true) { const { done, value } = await reader.read(); if (done) break; text += decoder.decode(value, { stream: true }); onChunk(text) }
  }

  async function sendFirstMessage(ctx: string, current: Message[]) {
    const msgs = [...current, { role: 'user' as const, content: ctx }]
    setLoading(true); setMessages([...msgs, { role: 'assistant', content: '' }])
    try { await streamChat(msgs, t => setMessages([...msgs, { role: 'assistant', content: t }])) }
    catch { setMessages([...msgs, { role: 'assistant', content: 'Something went wrong. Please try again.' }]) }
    finally { setLoading(false) }
  }

  async function sendChatMessage(text: string) {
    if (!text.trim() || loading || limitReached) return
    const msgs = [...messages, { role: 'user' as const, content: text }]
    setMessages(msgs); setLoading(true); setInteractionCount(c => c + 1)
    setMessages([...msgs, { role: 'assistant', content: '' }])
    try { await streamChat(msgs, t => setMessages([...msgs, { role: 'assistant', content: t }])) }
    catch { setMessages([...msgs, { role: 'assistant', content: 'Something went wrong. Please try again.' }]) }
    finally { setLoading(false) }
  }

  function handleDragOver(e: React.DragEvent) { e.preventDefault(); setIsDragging(true) }
  function handleDragLeave(e: React.DragEvent) { e.preventDefault(); setIsDragging(false) }
  async function handleDrop(e: React.DragEvent) {
    e.preventDefault(); setIsDragging(false)
    for (const file of Array.from(e.dataTransfer.files)) {
      const txt = file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.md') ? await file.text() : null
      setInputValue(p => p ? `${p}\n\n${txt ? `[From ${file.name}]:\n${txt}` : `[Attached: ${file.name}]`}` : txt ? `[From ${file.name}]:\n${txt}` : `[Attached: ${file.name}]`)
    }
  }

  function toggleDictation() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) { alert('Dictation not supported. Try Chrome.'); return }
    if (isListening) { recognitionRef.current?.stop(); setIsListening(false); return }
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const r = new SR(); r.continuous = false; r.interimResults = true; r.lang = 'en-CA'
    r.onresult = (e: any) => setInputValue(Array.from(e.results).map((x: any) => x[0].transcript).join(''))
    r.onend = () => setIsListening(false); r.onerror = () => setIsListening(false)
    recognitionRef.current = r; r.start(); setIsListening(true)
  }

  async function castVote(voteKey: string) {
    if (!user || votedItems.has(voteKey)) return
    try { await fetch('/api/vote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ item: voteKey }) }); setVotedItems(p => new Set([...p, voteKey])); setVoteModal(p => ({ ...p, voted: true })) }
    catch (err) { console.error('Vote failed:', err) }
  }

  function openVoteModal(label: string, voteKey: string) { setVoteModal({ open: true, label, voteKey, voted: votedItems.has(voteKey) }); if (isMobile) setSidebarOpen(false) }
  function closeVoteModal() { setVoteModal({ open: false, label: '', voteKey: '', voted: false }) }

  // ── Input field shared style helper ──────────────────────────────────────

  const inputStyle = (extra: React.CSSProperties = {}): React.CSSProperties => ({
    fontFamily: 'Barlow, sans-serif', fontSize: '1rem', color: C.ink,
    border: `1.5px solid ${C.border}`, backgroundColor: 'rgba(255,255,255,0.88)',
    backdropFilter: 'blur(6px)', outline: 'none',
    boxShadow: `0 2px 12px rgba(75,59,196,0.08)`,
    transition: 'border-color 150ms, box-shadow 150ms',
    boxSizing: 'border-box' as const,
    ...extra,
  })

  const btnPrimary = (disabled = false): React.CSSProperties => ({
    fontFamily: 'Barlow, sans-serif', fontWeight: 900, fontSize: '0.9rem',
    letterSpacing: '0.04em', color: C.white, border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
    backgroundColor: disabled ? 'rgba(75,59,196,0.2)' : C.indigo,
    boxShadow: disabled ? 'none' : `0 4px 16px rgba(75,59,196,0.28)`,
    transition: 'all 150ms',
  })

  const iconBtn: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', transition: 'opacity 150ms ease' }

  // ── Sidebar ───────────────────────────────────────────────────────────────

  const sidebar = (
    <div style={{ width: isMobile ? '100%' : '220px', minWidth: isMobile ? 'unset' : '220px', backgroundColor: C.sidebarBg, display: 'flex', flexDirection: 'column', padding: '1.25rem 0', borderRight: `1px solid ${C.sidebarBorder}`, position: isMobile ? 'fixed' : 'sticky', top: 0, left: 0, height: '100vh', overflowY: 'auto', zIndex: isMobile ? 50 : 'auto' as any, transform: isMobile && !sidebarOpen ? 'translateX(-100%)' : 'translateX(0)', transition: 'transform 250ms ease' }}>

      {/* Wordmark */}
      <div style={{ padding: '0 1.25rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '1rem', fontWeight: 900, color: C.sidebarText, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Junior</span>
        {isMobile && <button onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', color: C.sidebarMuted, fontSize: '1.25rem', cursor: 'pointer' }}>✕</button>}
      </div>

      {/* New Chat */}
      <div style={{ padding: '0 0.875rem 1rem' }}>
        <button onClick={resetToHome} style={{ width: '100%', padding: '0.65rem 0.875rem', backgroundColor: C.indigo, color: C.white, border: 'none', fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', textAlign: 'left', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'background 150ms' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = C.indigoDark}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = C.indigo}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          New Chat
        </button>
      </div>

      {/* Projects */}
      <div style={{ padding: '0.75rem 1.25rem 0.5rem' }}>
        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: C.sidebarMuted, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Projects</span>
        <div style={{ padding: '0.5rem 0.625rem', color: intakeAnswers.name ? C.sidebarText : C.sidebarMuted, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
          {intakeAnswers.name || 'No active project'}
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: '0.75rem 1.25rem 0.5rem', marginTop: '0.25rem' }}>
        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: C.sidebarMuted, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>I need help with...</span>
        {SIDEBAR_FEATURES.map(f => {
          const active = activeSidebarFeature === f.id
          return (
            <button key={f.id} onClick={() => handleSidebarFeature(f.id)}
              style={{ width: '100%', padding: '0.55rem 0.625rem', backgroundColor: active ? 'rgba(75,59,196,0.25)' : 'transparent', border: active ? '1px solid rgba(75,59,196,0.4)' : '1px solid transparent', fontFamily: 'Barlow, sans-serif', fontSize: '0.875rem', fontWeight: active ? 700 : 500, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem', color: active ? C.white : C.sidebarText, transition: 'all 120ms' }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.05)' }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}>
              <span style={{ color: active ? C.white : C.sidebarMuted, display: 'flex' }}>{f.icon}</span>
              {f.label}
            </button>
          )
        })}
      </div>

      {/* Upgrade + User */}
      <div style={{ marginTop: 'auto', borderTop: `1px solid ${C.sidebarBorder}` }}>
        <div style={{ padding: '1rem 0.875rem 0.75rem' }}>
          <button onClick={async () => { const res = await fetch('/api/stripe/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ priceId: 'price_1TFrW4RzmBTZm8w5ZRTltdfM', billingPeriod: 'monthly', userId: user?.id }) }); const { url } = await res.json(); if (url) window.location.href = url }}
            style={{ width: '100%', padding: '0.6rem 0.875rem', backgroundColor: 'rgba(75,59,196,0.3)', color: C.white, border: '1px solid rgba(75,59,196,0.5)', fontFamily: 'Barlow, sans-serif', fontWeight: 900, fontSize: '0.75rem', cursor: 'pointer', letterSpacing: '0.06em', transition: 'all 150ms' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = C.indigo}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(75,59,196,0.3)'}>
            Upgrade →
          </button>
        </div>
        <div style={{ padding: '0 1.25rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <UserButton afterSignOutUrl="/sign-in" />
          {user && <span style={{ fontSize: '0.75rem', color: C.sidebarMuted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.primaryEmailAddress?.emailAddress}</span>}
        </div>
      </div>
    </div>
  )

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <main style={{ height: '100vh', background: pageGradient, display: 'flex', fontFamily: 'Barlow, sans-serif', fontSize: '16px', overflow: 'hidden', color: C.ink }}>

      {isMobile && sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 40 }} />}
      {sidebar}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', minWidth: 0, overflow: 'hidden' }} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>

        {isDragging && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(75,59,196,0.06)', border: `3px dashed ${C.indigo}`, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <div style={{ backgroundColor: C.white, border: `1.5px solid ${C.border}`, padding: '1rem 2rem', boxShadow: `0 8px 32px rgba(75,59,196,0.2)` }}>
              <span style={{ fontWeight: 900, fontSize: '1rem', color: C.indigo, letterSpacing: '0.04em' }}>Drop file to attach</span>
            </div>
          </div>
        )}

        {isMobile && (
          <div style={{ padding: '0.875rem 1.25rem', borderBottom: `1px solid ${C.borderLight}`, backgroundColor: 'rgba(250,250,254,0.85)', backdropFilter: 'blur(12px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
            <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[0,1,2].map(i => <div key={i} style={{ width: '20px', height: '2px', backgroundColor: C.ink }} />)}
            </button>
            <span style={{ fontSize: '0.9rem', fontWeight: 900, color: C.indigoDeep, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Junior</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: C.ink, opacity: 0.35 }}>{stage === 'chat' ? `${interactionCount} msg` : 'Beta'}</span>
          </div>
        )}

        {/* ── HOME ── */}
        {stage === 'home' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '2rem 1.25rem' : '0 3rem', overflowY: 'auto' }}>
            <div style={{ width: '100%', maxWidth: '680px' }}>
              <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: isMobile ? 'clamp(1.6rem,5vw,2rem)' : 'clamp(1.6rem,2.4vw,2.4rem)', fontWeight: 900, color: C.ink, lineHeight: 1.1, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.03em', whiteSpace: isMobile ? 'normal' : 'nowrap' }}>
                  {intakeStep === 0 ? 'What do you need help with today?' : INTAKE_SEQUENCE[intakeStep].prompt}
                </h1>
                {intakeStep === 0 && <p style={{ fontSize: '1.05rem', color: C.ink, opacity: 0.5 }}>Type, dictate, add files, or pick a topic card to get started.</p>}
              </div>

              <div style={{ position: 'relative', marginBottom: '1rem' }}>
                <input ref={inputRef} type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder={intakeStep === 0 ? (animatedPlaceholder || "What's your project called?") : inputPlaceholder}
                  style={inputStyle({ width: '100%', padding: '1.1rem 6rem 1.1rem 1.25rem' })}
                  onFocus={e => { e.currentTarget.style.borderColor = C.indigo; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(75,59,196,0.12)` }}
                  onBlur={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = `0 2px 12px rgba(75,59,196,0.08)` }} />
                <div style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button onClick={() => {}} title="Attach file" style={{ ...iconBtn, color: C.ink, opacity: 0.3 }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.7'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '0.3'}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                  </button>
                  <button onClick={toggleDictation} style={{ ...iconBtn, color: isListening ? C.indigo : C.ink, opacity: isListening ? 1 : 0.35 }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.8'} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = isListening ? '1' : '0.35' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill={isListening ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                <button onClick={handleInputSubmit} disabled={!inputValue.trim()}
                  style={{ ...btnPrimary(!inputValue.trim()), padding: '0.65rem 1.5rem' }}
                  onMouseEnter={e => { if (inputValue.trim()) (e.currentTarget as HTMLElement).style.backgroundColor = C.indigoDark }}
                  onMouseLeave={e => { if (inputValue.trim()) (e.currentTarget as HTMLElement).style.backgroundColor = C.indigo }}>
                  {intakeStep < INTAKE_SEQUENCE.length - 1 ? 'Next →' : 'Start →'}
                </button>
              </div>

              {intakeStep > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: C.muted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Step {intakeStep + 1} of {INTAKE_SEQUENCE.length}</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {INTAKE_SEQUENCE.map((_, i) => <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: i < intakeStep ? C.indigo : i === intakeStep ? C.ink : C.borderLight, transition: 'background-color 300ms' }} />)}
                  </div>
                </div>
              )}

              <div>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: C.muted, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '0.6rem' }}>I need help with...</span>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '0.5rem', alignItems: 'stretch' }}>
                  {CATEGORIES.map(cat => {
                    const sel = selectedCategory?.id === cat.id
                    return (
                      <button key={cat.id} onClick={() => handleCategorySelect(cat)}
                        style={{ padding: '0.875rem 1rem', height: '100%', backgroundColor: sel ? C.indigo : 'rgba(255,255,255,0.72)', border: `1.5px solid ${sel ? C.indigo : C.border}`, cursor: 'pointer', textAlign: 'left', backdropFilter: 'blur(6px)', boxShadow: sel ? `0 8px 24px rgba(75,59,196,0.25)` : `0 2px 8px rgba(75,59,196,0.06)`, transition: 'all 150ms', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}
                        onMouseEnter={e => { if (!sel) { (e.currentTarget as HTMLElement).style.borderColor = C.indigo; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px rgba(75,59,196,0.14)` } }}
                        onMouseLeave={e => { if (!sel) { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.boxShadow = `0 2px 8px rgba(75,59,196,0.06)` } }}>
                        <div style={{ fontSize: '0.95rem', fontWeight: 900, color: sel ? C.white : C.ink, marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{cat.title}</div>
                        <p style={{ fontSize: '0.85rem', color: sel ? 'rgba(255,255,255,0.72)' : C.muted, margin: 0, lineHeight: 1.45 }}>{cat.description}</p>
                      </button>
                    )
                  })}
                </div>
              </div>

              {isListening && (
                <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: C.indigo, display: 'inline-block', animation: 'dot-bounce 1.2s infinite' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: C.indigo, letterSpacing: '0.06em' }}>Listening...</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── CHAT ── */}
        {stage === 'chat' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
            {!isMobile && (
              <div style={{ padding: '0.5rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${C.borderLight}` }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: C.indigo, opacity: 0.7, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {intakeAnswers.name || 'Junior'}
                  {selectedCategory && <span style={{ fontWeight: 400, color: C.muted, marginLeft: '0.5rem' }}>— {selectedCategory.title}</span>}
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: C.muted, letterSpacing: '0.06em' }}>{interactionCount} {interactionCount === 1 ? 'message' : 'messages'}</span>
              </div>
            )}

            <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '1.5rem 1rem' : '2rem 3rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '100%', maxWidth: '680px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {messages.map((msg, i) => {
                  if (msg.role === 'user') return null
                  const { text, event, suggestions, source, staleIntel } = parseTags(msg.content)
                  const isLoading = loading && i === messages.length - 1 && msg.content === ''

                  if (staleIntel && !isLoading && !flaggedMessages.has(i)) {
                    setFlaggedMessages(prev => new Set([...prev, i]))
                    fetch('/api/flag', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        funder: staleIntel.funder,
                        topic: staleIntel.topic,
                        conversationContext: messages.slice(Math.max(0, i - 4), i + 1).map(m => `${m.role}: ${m.content}`).join('\n\n')
                      })
                    }).catch(() => {})
                  }

                  const confidenceColour = source?.confidence === 'high'
                    ? 'rgba(16,185,129,0.8)'
                    : source?.confidence === 'medium'
                    ? 'rgba(245,158,11,0.8)'
                    : 'rgba(239,68,68,0.8)'

                  return (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ padding: '1.25rem 1.5rem', backgroundColor: 'rgba(255,255,255,0.82)', color: C.ink, border: `1.5px solid ${C.border}`, backdropFilter: 'blur(8px)', boxShadow: `0 4px 20px rgba(75,59,196,0.08)`, whiteSpace: 'pre-wrap', lineHeight: 1.75, fontSize: '1rem' }}>
                        {isLoading
                          ? <span style={{ display: 'inline-flex', gap: '4px', alignItems: 'center' }}>{[0,0.2,0.4].map((d,di) => <span key={di} style={{ animation: 'dot-bounce 1.2s infinite', animationDelay: `${d}s`, width: '6px', height: '6px', borderRadius: '50%', backgroundColor: C.indigo, display: 'inline-block' }} />)}</span>
                          : linkifyUrls(text)}
                      </div>

                      {source && !isLoading && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingLeft: '2px' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: confidenceColour, flexShrink: 0 }} />
                          <span style={{ fontSize: '0.72rem', color: C.muted, letterSpacing: '0.02em' }}>
                            {source.funder}
                            {source.last_verified !== 'unknown' && ` · verified ${source.last_verified}`}
                            {source.confidence === 'low' && ' · may be outdated'}
                          </span>
                        </div>
                      )}

                      {staleIntel && !isLoading && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '10px 12px', backgroundColor: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '2px' }}>
                          <span style={{ fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>⚠</span>
                          <div>
                            <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'rgba(180,120,0,0.9)', margin: '0 0 2px' }}>
                              We're verifying this with {staleIntel.funder}
                            </p>
                            <p style={{ fontSize: '0.74rem', color: C.muted, margin: 0, lineHeight: 1.5 }}>
                              Our team has been notified to confirm the latest information on {staleIntel.topic}. Always verify critical deadlines directly with the funder before submitting.
                            </p>
                          </div>
                        </div>
                      )}

                      {event && !loading && (
                        <button onClick={() => downloadICS(event)}
                          style={{ alignSelf: 'flex-start', padding: '0.55rem 1.1rem', backgroundColor: C.indigo, color: C.white, border: 'none', fontFamily: 'Barlow, sans-serif', fontWeight: 900, fontSize: '0.875rem', cursor: 'pointer', boxShadow: `0 4px 14px rgba(75,59,196,0.3)`, transition: 'all 150ms' }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = C.indigoDark}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = C.indigo}>
                          + Add Deadline to Calendar
                        </button>
                      )}
                      {suggestions.length > 0 && !loading && (
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {suggestions.map((s, si) => (
                            <button key={si} onClick={() => sendChatMessage(s)}
                              style={{ padding: '0.5rem 1rem', backgroundColor: 'rgba(255,255,255,0.7)', color: C.ink, border: `1.5px solid ${C.border}`, fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', backdropFilter: 'blur(4px)', transition: 'all 150ms' }}
                              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = C.indigo; (e.currentTarget as HTMLElement).style.color = C.white; (e.currentTarget as HTMLElement).style.borderColor = C.indigo }}
                              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.7)'; (e.currentTarget as HTMLElement).style.color = C.ink; (e.currentTarget as HTMLElement).style.borderColor = C.border }}>
                              {s} →
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}

                {limitReached && (
                  <div style={{ padding: '1.75rem', border: `1.5px solid ${C.border}`, backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', boxShadow: `0 8px 32px rgba(75,59,196,0.12)` }}>
                    <p style={{ fontWeight: 900, fontSize: '1.05rem', marginBottom: '0.5rem', color: C.ink }}>You've used your 20 free messages.</p>
                    <p style={{ color: C.muted, fontSize: '0.95rem', marginBottom: '1.5rem' }}>Upgrade to unlock unlimited access to Junior.</p>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      {[
                        { label: '7 Days — CA$19', price: 'price_1TFrW2RzmBTZm8w5R94Bx3w9', period: 'one_time', featured: false },
                        { label: 'Monthly — CA$39/mo ★', price: 'price_1TFrW4RzmBTZm8w5ZRTltdfM', period: 'monthly', featured: true },
                        { label: 'Annual — CA$390/yr', price: 'price_1TFrW3RzmBTZm8w5FafvtRoL', period: 'annual', featured: false },
                      ].map(({ label, price, period, featured }) => (
                        <button key={price}
                          onClick={async () => { const res = await fetch('/api/stripe/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ priceId: price, billingPeriod: period, userId: user?.id }) }); const { url } = await res.json(); if (url) window.location.href = url }}
                          style={{ padding: '0.7rem 1.25rem', backgroundColor: featured ? C.indigo : 'transparent', color: featured ? C.white : C.ink, border: featured ? 'none' : `1.5px solid ${C.border}`, fontFamily: 'Barlow, sans-serif', fontWeight: 900, fontSize: '0.85rem', cursor: 'pointer', letterSpacing: '0.03em', boxShadow: featured ? `0 4px 16px rgba(75,59,196,0.3)` : 'none' }}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </div>

            {!limitReached && (
              <div style={{ borderTop: `1px solid ${C.borderLight}`, backgroundColor: 'rgba(250,250,254,0.85)', backdropFilter: 'blur(12px)', padding: isMobile ? '0.75rem 1rem' : '1rem 3rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '100%', maxWidth: '680px', display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <input ref={inputRef} type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder={inputPlaceholder}
                      style={inputStyle({ width: '100%', padding: '0.95rem 5.5rem 0.95rem 1.1rem' })}
                      onFocus={e => { e.currentTarget.style.borderColor = C.indigo; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(75,59,196,0.12)` }}
                      onBlur={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = `0 2px 12px rgba(75,59,196,0.08)` }} />
                    <div style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button onClick={() => {}} title="Attach file" style={{ ...iconBtn, color: C.ink, opacity: 0.3 }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.7'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '0.3'}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                      </button>
                      <button onClick={toggleDictation} style={{ ...iconBtn, color: isListening ? C.indigo : C.ink, opacity: isListening ? 1 : 0.3 }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.7'} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = isListening ? '1' : '0.3' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill={isListening ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                      </button>
                    </div>
                  </div>
                  <button onClick={() => sendChatMessage(inputValue)} disabled={loading || !inputValue.trim()}
                    style={{ ...btnPrimary(loading || !inputValue.trim()), padding: '0.95rem 1.5rem', whiteSpace: 'nowrap' }}
                    onMouseEnter={e => { if (!loading && inputValue.trim()) (e.currentTarget as HTMLElement).style.backgroundColor = C.indigoDark }}
                    onMouseLeave={e => { if (!loading && inputValue.trim()) (e.currentTarget as HTMLElement).style.backgroundColor = C.indigo }}>
                    Send
                  </button>
                </div>
                {isListening && (
                  <div style={{ maxWidth: '680px', width: '100%', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: C.indigo, letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: C.indigo, display: 'inline-block', animation: 'dot-bounce 1.2s infinite' }} />
                      Listening...
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Vote modal */}
      {voteModal.open && (
        <div onClick={closeVoteModal} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(10,5,30,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div onClick={e => e.stopPropagation()} style={{ backgroundColor: C.white, border: `1.5px solid ${C.border}`, boxShadow: `0 24px 80px rgba(75,59,196,0.25)`, padding: '1.75rem', maxWidth: '400px', width: '100%' }}>
            {voteModal.voted ? (
              <>
                <p style={{ fontWeight: 900, fontSize: '1.1rem', marginBottom: '0.5rem', color: C.ink }}>✓ Vote cast</p>
                <p style={{ fontSize: '0.9rem', color: C.muted, marginBottom: '1.5rem' }}>Your vote helps determine what Junior builds next. We'll let you know when {voteModal.label} is live.</p>
                <button onClick={closeVoteModal} style={{ padding: '0.6rem 1.25rem', backgroundColor: C.indigo, color: C.white, border: 'none', fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>Close</button>
              </>
            ) : (
              <>
                <p style={{ fontWeight: 900, fontSize: '1.1rem', marginBottom: '0.5rem', color: C.ink }}>Vote to Unlock</p>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: C.indigo, marginBottom: '0.75rem' }}>{voteModal.label}</p>
                <p style={{ fontSize: '0.9rem', color: C.muted, marginBottom: '1.5rem' }}>Junior builds features in order of demand. Cast your vote and we'll prioritize accordingly.</p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button onClick={() => castVote(voteModal.voteKey)} style={{ padding: '0.6rem 1.25rem', backgroundColor: C.indigo, color: C.white, border: 'none', fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', boxShadow: `0 4px 14px rgba(75,59,196,0.3)` }}>Cast my vote</button>
                  <button onClick={closeVoteModal} style={{ padding: '0.6rem 1.25rem', backgroundColor: 'transparent', color: C.ink, border: `1.5px solid ${C.border}`, fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>Not now</button>
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
