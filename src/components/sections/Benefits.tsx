'use client'

import { useRef, useEffect } from 'react'
import { motion, useTransform, useMotionValue } from 'framer-motion'

interface Benefit {
  id: number
  text: string
}

const BENEFITS: Benefit[] = [
  { id: 1, text: 'Сможете путешествовать, не спотыкаясь о языковой барьер' },
  { id: 2, text: 'Добавите в резюме строчку про английский, чтобы возможности росли и зарплата вместе с ними' },
  { id: 3, text: 'Сможете понимать речь на слух и поддерживать разговор в реальных ситуациях' },
  { id: 4, text: 'Найдёте время на английский даже при плотном графике' },
]

const BLUR_MAX_PX = 20
const VISIBILITY_THRESHOLD = 0.45

function BenefitBlurSlide({
  index,
  floatIndex,
  benefit,
}: {
  index: number
  floatIndex: ReturnType<typeof useTransform<number, number>>
  benefit: Benefit
}) {
  const FLY_UP_PX = 180
  const isLeft = index % 2 === 0

  const diff = useTransform(floatIndex, (latest: number) => index - latest)

  const blur = useTransform(diff, (d: number) => {
    const abs = Math.abs(d)
    if (abs >= VISIBILITY_THRESHOLD) return BLUR_MAX_PX
    return (abs / VISIBILITY_THRESHOLD) * BLUR_MAX_PX
  })

  const opacity = useTransform(diff, (d: number) => {
    const abs = Math.abs(d)
    if (abs >= VISIBILITY_THRESHOLD) return 0
    return 1 - abs / VISIBILITY_THRESHOLD
  })

  const scale = useTransform(diff, (d: number) => {
    const abs = Math.abs(d)
    if (abs >= VISIBILITY_THRESHOLD) return 0.88
    return 1 - (abs / VISIBILITY_THRESHOLD) * 0.12
  })

  const y = useTransform(diff, (d: number) => {
    if (d <= -VISIBILITY_THRESHOLD) return -FLY_UP_PX
    if (d >= VISIBILITY_THRESHOLD) return FLY_UP_PX * 0.5
    if (d < 0) return (d / VISIBILITY_THRESHOLD) * FLY_UP_PX
    return (d / VISIBILITY_THRESHOLD) * FLY_UP_PX * 0.5
  })

  const filterBlur = useTransform(blur, (v: number) => `blur(${v}px)`)

  return (
    <motion.div
      style={{
        filter: filterBlur,
        opacity,
        scale,
        y,
        position: index === 0 ? 'relative' : 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: isLeft ? 'flex-start' : 'flex-end',
        willChange: 'filter, opacity, transform',
        pointerEvents: 'none',
      }}
    >
      <div
        className="bg-[#F04E23] text-white px-5 md:px-8 text-center w-full"
        style={{
          height: 90,
          borderRadius: 59,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(15px, 1.3vw, 18px)',
          lineHeight: '120%',
          letterSpacing: 0,
        }}
      >
        {benefit.text}
      </div>
    </motion.div>
  )
}

function BenefitsMobileCarousel() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Use a plain MotionValue updated by a native scroll listener.
  // Framer Motion's useScroll({ target }) is unreliable on iOS Safari —
  // native scroll events with { passive: true } work everywhere.
  const scrollProgress = useMotionValue(0)

  useEffect(() => {
    const handleScroll = () => {
      const el = wrapperRef.current
      if (!el) return
      const scrolled = -el.getBoundingClientRect().top
      const scrollable = el.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      scrollProgress.set(Math.min(1, Math.max(0, scrolled / scrollable)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollProgress])

  const N = BENEFITS.length
  const floatIndex = useTransform(
    scrollProgress,
    [0, 0.077, 0.154, 0.231, 0.308, 0.385, 0.462, 0.538, 0.615, 0.692, 0.769, 0.846, 1.0],
    [-0.6, 0,   0,    0.5,  1,    1,     1.5,  2,     2,    2.5,  3,    3,    N - 1 + 0.6]
  )

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${N * 150}vh`, position: 'relative' }}
    >
      <div
        className="sticky top-0 flex flex-col justify-start pt-20 md:justify-center md:pt-0 items-center px-5 md:px-20 lg:px-32"
        style={{ height: '100vh' }}
      >
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black text-center w-full mb-12">
          Благодаря английскому вы...
        </h2>
        <div style={{ position: 'relative', width: '100%', maxWidth: 694 }} className="mt-16 md:mt-[90px]">
          {BENEFITS.map((benefit, i) => (
            <BenefitBlurSlide
              key={benefit.id}
              index={i}
              floatIndex={floatIndex}
              benefit={benefit}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function Benefits() {
  return (
    <section id="benefits" className="w-full bg-white">
      <BenefitsMobileCarousel />
    </section>
  )
}
