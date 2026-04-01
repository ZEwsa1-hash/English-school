'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const LINE1 = 'Онлайн-обучение'
const LINE2 = 'по английскому языку'
const CHAR_DELAY_MS = 55

export function Hero() {
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [doneTyping, setDoneTyping] = useState(false)

  useEffect(() => {
    // On mobile (< 1024px) show text immediately without animation
    if (window.innerWidth < 1024) {
      setLine1(LINE1)
      setLine2(LINE2)
      setDoneTyping(true)
      return
    }

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
    return () => clearInterval(t1)
  }, [])

  const isTypingLine2 = line1.length >= LINE1.length && !doneTyping

  return (
    <section className="relative w-full overflow-hidden bg-white px-4 sm:px-10 lg:px-20">
      {/* Wave background — right half */}
      <Image
        src="/wave-bg.png"
        alt=""
        width={860}
        height={860}
        className="absolute -right-[50px] top-0 lg:right-0 lg:top-0 h-[50%] lg:h-full w-auto pointer-events-none select-none"
        aria-hidden="true"
        priority
      />

      <div className="relative z-10 max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8 pt-[100px] lg:pt-[150px] pb-8 lg:pb-20">

        {/* Left: heading + description (+ button on desktop) */}
        <div className="order-1 flex-1 max-w-[738px] flex flex-col items-center lg:items-start mt-[60px] lg:-mt-5">
          <h1 className="text-black font-extrabold text-[26px] lg:text-[62px] leading-[110%] lg:leading-tight text-center lg:text-left translate-y-[15px] lg:translate-y-0">
            <span className="block">
              {line1}
              {!isTypingLine2 && !doneTyping && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                  aria-hidden="true"
                >|</motion.span>
              )}
            </span>
            <span className="block lg:whitespace-nowrap">
              {line2}
              {(isTypingLine2 || doneTyping) && (
                <motion.span
                  animate={doneTyping ? { opacity: 0 } : { opacity: [1, 0] }}
                  transition={doneTyping ? { duration: 0.4, delay: 0.8 } : { duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                  aria-hidden="true"
                >|</motion.span>
              )}
            </span>
          </h1>
          <p className="mt-[41px] lg:mt-4 translate-y-[25px] lg:translate-y-0 text-zinc-600 text-[16px] lg:text-lg leading-[100%] text-center lg:text-left">
            Освоите уникальную методику, которая поможет освоить язык в перерывах между работой и личной жизнью
          </p>
          {/* Button visible only on desktop */}
          <a
            href="#courses"
            className="hidden lg:inline-flex mt-10 items-center justify-center bg-[#E85623] text-white font-semibold text-base rounded-[59px] hover:bg-[#d04e1f] transition-colors duration-200 w-[187px]"
            style={{ height: '60px' }}
          >
            Узнать цены
          </a>
        </div>

        {/* Right: N + ice cube — order 2 on mobile */}
        <div className="order-2 flex w-full items-center justify-center lg:flex-1 lg:max-w-none" style={{ marginTop: '-10px' }}>
          <div className="relative flex items-center">
            {/* N */}
            <span
              className="text-black select-none leading-none shrink-0 z-10 font-extrabold text-[72px] lg:text-[128px] lg:ml-[35px]"
            >
              N
            </span>

            {/* Ice cube — overlapping N */}
            <div className="relative -ml-[80px] lg:-ml-[170px]">
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Image
                  src="/ice-cube.png"
                  alt="Ice cube"
                  width={540}
                  height={540}
                  className="w-[260px] h-[260px] lg:w-[540px] lg:h-[540px] object-contain"
                  priority
                />
              </motion.div>
              {/* Dot — stays fixed, does not animate */}
              <div className="absolute w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-black top-[calc(50%+12px)] right-8 lg:top-[calc(50%+30px)] lg:right-16" />
            </div>
          </div>
        </div>

        {/* Button visible only on mobile — order 3 (below N+ice) */}
        <a
          href="#courses"
          className="order-3 lg:hidden inline-flex items-center justify-center bg-[#E85623] text-white font-semibold text-base rounded-[59px] hover:bg-[#d04e1f] transition-colors duration-200 w-full max-w-[342px] -mt-[15px]"
          style={{ height: '60px' }}
        >
          Узнать цены
        </a>

      </div>
    </section>
  )
}
