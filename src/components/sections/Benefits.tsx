'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

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
// Card is visible when |diff| < threshold; fully gone when |diff| >= threshold
const VISIBILITY_THRESHOLD = 0.45

// Cards 1 & 3 (index 0 & 2) → left, cards 2 & 4 (index 1 & 3) → right
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

  // diff > 0 → card is below (upcoming), diff < 0 → card is above (passed)
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

  // Passed cards fly up, upcoming cards wait below
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
          fontWeight: 600,
          fontSize: 'clamp(15px, 1.4vw, 20px)',
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
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  // Stepped keyframes — floatIndex ≈ i means card i is fully visible.
  // Pattern per card: enter from blur → hold → exit into blur → gap (both blurred) → next enters.
  // 13 equal scroll segments for 4 cards:
  //   seg 0: card 0 enters   (-0.6 → 0)
  //   seg 1: card 0 holds    (0)
  //   seg 2: card 0 exits    (0 → 0.5) ← both blurred when floatIndex 0.45–0.55
  //   seg 3: card 1 enters   (0.5 → 1)
  //   seg 4: card 1 holds    (1)
  //   seg 5: card 1 exits    (1 → 1.5)
  //   ... and so on
  const N = BENEFITS.length
  const floatIndex = useTransform(
    scrollYProgress,
    [0, 0.077, 0.154, 0.231, 0.308, 0.385, 0.462, 0.538, 0.615, 0.692, 0.769, 0.846, 1.0],
    [-0.6, 0,   0,    0.5,  1,    1,     1.5,  2,     2,    2.5,  3,    3,    N - 1 + 0.6]
  )

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${N * 150}vh`, position: 'relative' }}
    >
      <div
        className="sticky top-0 flex flex-col justify-center items-center px-5 md:px-20 lg:px-32"
        style={{ height: '100vh' }}
      >
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black text-center w-full mb-12">
          Благодаря английскому вы...
        </h2>
        <div style={{ position: 'relative', width: '100%', maxWidth: 860, marginTop: 90 }}>
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
