import { NextRequest, NextResponse } from 'next/server'

const MAX_REQUESTS = 3
const WINDOW_MS = 60 * 60 * 1000 // 1 hour

const ALLOWED_METHODS = ['telegram', 'call', 'viber'] as const
type ContactMethod = typeof ALLOWED_METHODS[number]

// WARNING: In-memory store resets on every cold start in serverless deployments (Vercel).
// For production, replace with Upstash Redis or another persistent store.
const ipStore = new Map<string, { count: number; resetAt: number }>()

// Priority: cf-connecting-ip (Cloudflare) → x-real-ip → x-forwarded-for (first entry).
// NOTE: x-forwarded-for can be spoofed on non-proxied deployments — do not rely on it alone.
function getRealIp(req: NextRequest): string {
  return (
    req.headers.get('cf-connecting-ip') ??
    req.headers.get('x-real-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    'unknown'
  )
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = ipStore.get(ip)

  if (!entry || now > entry.resetAt) {
    ipStore.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, remaining: MAX_REQUESTS - 1 }
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 }
  }

  entry.count += 1
  return { allowed: true, remaining: MAX_REQUESTS - entry.count }
}

function isValidMethod(value: unknown): value is ContactMethod {
  return ALLOWED_METHODS.includes(value as ContactMethod)
}

export async function POST(req: NextRequest) {
  const ip = getRealIp(req)
  const { allowed } = checkRateLimit(ip)

  if (!allowed) {
    return NextResponse.json(
      { error: 'Слишком много заявок. Попробуйте через час.' },
      { status: 429 }
    )
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Неверный формат данных' }, { status: 400 })
  }

  const { contact, method, question } = body

  if (!contact || !method || !question) {
    return NextResponse.json({ error: 'Неверные данные' }, { status: 400 })
  }

  if (typeof contact !== 'string' || contact.length > 200) {
    return NextResponse.json({ error: 'Неверные данные: contact' }, { status: 400 })
  }

  if (typeof question !== 'string' || question.length > 1000) {
    return NextResponse.json({ error: 'Неверные данные: question' }, { status: 400 })
  }

  if (!isValidMethod(method)) {
    return NextResponse.json({ error: 'Неверные данные: method' }, { status: 400 })
  }

  // TODO: send to Telegram / email

  return NextResponse.json({ ok: true })
}
