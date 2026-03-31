'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface FeatureCard {
  image: string
  title: string
  mobileImageFit?: 'cover' | 'contain'
  mobileImagePosition?: string
}

const CARD_H = 327

const FEATURE_CARDS: FeatureCard[] = [
  { image: '/frame-5.png',  title: 'Онлайн-учебник',       mobileImageFit: 'contain', mobileImagePosition: 'right center' },
  { image: '/frame-12.png', title: 'Разговорные клубы',    mobileImagePosition: 'center bottom' },
  { image: '/frame-11.png', title: 'Личный преподаватель', mobileImagePosition: 'center bottom' },
  { image: '/frame-10.png', title: 'Уроки с иностранцами', mobileImagePosition: 'center bottom' },
]

const LINE1 = 'В курсах уже есть'
const LINE2 = 'всё, что вам нужно'
const CHAR_DELAY_MS = 55

function useTypingAnimation() {
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [doneTyping, setDoneTyping] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          let i = 0
          const t1 = setInterval(() => {
            i++
            setLine1(LINE1.slice(0, i))
            if (i >= LINE1.length) {
              clearInterval(t1)
              let j = 0
              const t2 = setInterval(() => {
                j++
                setLine2(LINE2.slice(0, j))
                if (j >= LINE2.length) {
                  clearInterval(t2)
                  setDoneTyping(true)
                }
              }, CHAR_DELAY_MS)
            }
          }, CHAR_DELAY_MS)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, line1, line2, doneTyping }
}

export function Features() {
  const { ref, line1, line2, doneTyping } = useTypingAnimation()

  const isTypingLine2 = line1.length >= LINE1.length && !doneTyping

  const cursor = (active: boolean) =>
    active ? (
      <motion.span
        animate={doneTyping ? { opacity: 0 } : { opacity: [1, 0] }}
        transition={doneTyping ? { duration: 0.4, delay: 0.8 } : { duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        aria-hidden="true"
      >|</motion.span>
    ) : null

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="px-[20px] sm:px-10 lg:px-20 py-5">

      {/* Mobile / tablet layout — single column */}
      <div className="lg:hidden bg-[#3794FE] rounded-[50px] pt-8 pb-10 px-[30px]">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-[60px] text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
          <span className="block">
            {line1}{cursor(!isTypingLine2 && !doneTyping)}
          </span>
          <span className="block">
            {line2}{cursor(isTypingLine2 || doneTyping)}
          </span>
        </h2>
        <div className="flex flex-col items-center gap-3">
          {FEATURE_CARDS.map((card) => (
            <div
              key={card.title}
              className="relative bg-white"
              style={{ width: 280, height: 327, borderRadius: 40, overflow: 'hidden' }}
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                style={{ objectFit: 'contain', objectPosition: card.mobileImagePosition ?? 'center center' }}
                sizes="280px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop layout — 4-column CSS grid */}
      <div className="hidden lg:block">
        <div className="mx-auto w-full max-w-[1280px] bg-[#3794FE] rounded-[50px] pt-14 pb-12 px-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-10 leading-snug">
            {line1}{!isTypingLine2 && !doneTyping ? cursor(true) : ' '}
            {line2}{cursor(isTypingLine2 || doneTyping)}
          </h2>
          <div className="grid grid-cols-4 gap-5 justify-items-center">
            {FEATURE_CARDS.map((card) => (
              <div
                key={card.title}
                className="relative bg-white overflow-hidden w-full rounded-[40px]"
                style={{ height: CARD_H }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'bottom' }}
                  sizes="(min-width: 1024px) 280px, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
