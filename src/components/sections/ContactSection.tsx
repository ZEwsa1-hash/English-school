'use client'

import { useState } from 'react'

type ContactMethod = 'telegram' | 'call' | 'viber'
type Step = 'contact' | 'question' | 'done'

const CONTACT_METHODS: { id: ContactMethod; label: string }[] = [
  { id: 'telegram', label: 'Телеграм' },
  { id: 'call', label: 'Позвоните мне' },
  { id: 'viber', label: 'Вайбер' },
]

const PHONE_DIGITS_REQUIRED = 12

function getPlaceholder(method: ContactMethod): string {
  if (method === 'telegram') return 'Введите номер телефона или никнейм'
  return 'Введите номер телефона'
}

function getDigits(value: string): string {
  return value.replace(/\D/g, '')
}

function looksLikePhone(value: string): boolean {
  return /\d/.test(value)
}

function isValidPhone(value: string): boolean {
  return getDigits(value).length === PHONE_DIGITS_REQUIRED
}

function isValidTelegram(value: string): boolean {
  const trimmed = value.trim()
  if (trimmed.startsWith('@') && trimmed.length >= 2) return true
  return isValidPhone(trimmed)
}

function isValid(value: string, method: ContactMethod): boolean {
  const trimmed = value.trim()
  if (!trimmed) return false
  if (method === 'telegram') return isValidTelegram(trimmed)
  return isValidPhone(trimmed)
}

function getPhoneError(value: string, method: ContactMethod): string | null {
  const trimmed = value.trim()
  if (!trimmed) return null
  if (method === 'telegram' && trimmed.startsWith('@')) return null
  if (!looksLikePhone(trimmed)) return null
  if (!isValidPhone(trimmed)) {
    return 'Номер должен быть в формате +375 хх ххх хх хх'
  }
  return null
}

export function ContactSection() {
  const [selected, setSelected] = useState<ContactMethod>('telegram')
  const [contact, setContact] = useState('')
  const [question, setQuestion] = useState('')
  const [showError, setShowError] = useState(false)
  const [step, setStep] = useState<Step>('contact')
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleMethodChange = (method: ContactMethod) => {
    setSelected(method)
    setContact('')
    setShowError(false)
  }

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (selected !== 'telegram') {
      setContact(value.replace(/[^\d+\-\s()]/g, ''))
    } else {
      setContact(value)
    }
    setShowError(false)
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid(contact, selected)) {
      setShowError(true)
      return
    }
    setShowError(false)
    setStep('question')
  }

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contact, method: selected, question }),
    })

    if (res.status === 429) {
      setSubmitError('Слишком много заявок. Попробуйте через час.')
      return
    }

    if (!res.ok) {
      setSubmitError('Что-то пошло не так. Попробуйте ещё раз.')
      return
    }

    setStep('done')
  }

  const canSubmitContact = isValid(contact, selected)
  const canSubmitQuestion = question.trim().length > 0
  const errorMessage = showError ? getPhoneError(contact, selected) : null

  return (
    <section id="contacts" className="bg-white py-20 px-4">
      <div className="max-w-[800px] mx-auto flex flex-col items-center gap-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-black text-black leading-tight">
            Остались вопросы?
          </h2>
          <p className="mt-3 text-base text-gray-500">
            {step === 'question' ? 'Напиши свой вопрос' : 'Укажите как с вами связаться'}
          </p>
        </div>

        {/* Contact method selector — hidden after step 1 */}
        {step === 'contact' && (
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {CONTACT_METHODS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleMethodChange(id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium border transition-colors duration-150 ${
                  selected === id
                    ? 'bg-[#2563EB] border-[#2563EB] text-white'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Step 1 — contact */}
        {step === 'contact' && (
          <form onSubmit={handleContactSubmit} className="w-full flex flex-col gap-2">
            <div
              className="flex items-center w-full bg-white rounded-[40px] px-5 py-3"
              style={{ boxShadow: 'inset 0 4px 11.9px 0 rgba(0,0,0,0.25)' }}
            >
              <input
                type="text"
                value={contact}
                onChange={handleContactChange}
                placeholder={getPlaceholder(selected)}
                className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400 py-1"
              />
              <button
                type="submit"
                className={`ml-4 shrink-0 text-white text-sm font-semibold rounded-full px-7 py-3 transition-colors duration-150 ${
                  canSubmitContact ? 'bg-[#2563EB] hover:bg-blue-700' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              >
                Отправить
              </button>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm pl-5">
                {errorMessage}
              </p>
            )}
          </form>
        )}

        {/* Step 2 — question */}
        {step === 'question' && (
          <form onSubmit={handleQuestionSubmit} className="w-full flex flex-col gap-2">
            <div
              className="flex items-center w-full bg-white rounded-[40px] px-5 py-3"
              style={{ boxShadow: 'inset 0 4px 11.9px 0 rgba(0,0,0,0.25)' }}
            >
              <input
                type="text"
                value={question}
                onChange={(e) => { setQuestion(e.target.value); setSubmitError(null) }}
                placeholder="Напишите свой вопрос..."
                autoFocus
                className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400 py-1"
              />
              <button
                type="submit"
                className={`ml-4 shrink-0 text-white text-sm font-semibold rounded-full px-7 py-3 transition-colors duration-150 ${
                  canSubmitQuestion ? 'bg-[#2563EB] hover:bg-blue-700' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              >
                Отправить
              </button>
            </div>

            {submitError && (
              <p className="text-red-500 text-sm pl-5">{submitError}</p>
            )}
          </form>
        )}

        {/* Step 3 — done */}
        {step === 'done' && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#2563EB] flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M7 16.5L13 22.5L25 10"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-lg font-semibold text-gray-800">Отправлено</p>
          </div>
        )}
      </div>
    </section>
  )
}
