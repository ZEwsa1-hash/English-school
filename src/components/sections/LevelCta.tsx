'use client'

import { useEffect, useRef } from 'react'

export function LevelCta() {
  const clipRectRef = useRef<SVGRectElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!clipRectRef.current) return
        if (entry.isIntersecting) {
          clipRectRef.current.style.animation = 'none'
          // force reflow to restart animation
          void clipRectRef.current.getBoundingClientRect()
          clipRectRef.current.style.animation = 'chalkDraw 2s cubic-bezier(0.25,0.1,0.25,1) forwards'
        } else {
          clipRectRef.current.style.animation = 'none'
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white px-4 py-16 sm:py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
        <h2 className="text-[30px] sm:text-5xl lg:text-6xl font-black text-gray-900" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, lineHeight: '92%', letterSpacing: 0, textAlign: 'center' }}>
          Не знаете какой у вас
          <br />
          уровень{' '}
          <span className="relative inline-block">
            английского?
            {/* viewBox height=18 gives room for chalk displacement */}
            <svg
              className="absolute -bottom-5 left-0 w-full"
              viewBox="0 0 260 18"
              fill="none"
              aria-hidden="true"
              overflow="visible"
            >
              <defs>
                {/* Strong chalk / pastel texture */}
                <filter id="lc-chalk" x="-5%" y="-80%" width="115%" height="260%">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.75 0.55"
                    numOctaves="5"
                    seed="12"
                    result="noise"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="3.5"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>

                {/* Clip rect starts at width=0, animated to 260 */}
                <clipPath id="lc-reveal">
                  <rect ref={clipRectRef} x="0" y="-10" height="40" width="0" />
                </clipPath>

                {/* Taper mask: full opacity left → thin opacity right */}
                <linearGradient id="lc-taper" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="white" stopOpacity="1" />
                  <stop offset="70%"  stopColor="white" stopOpacity="1" />
                  <stop offset="100%" stopColor="white" stopOpacity="0.15" />
                </linearGradient>
                <mask id="lc-taper-mask">
                  <rect x="0" y="0" width="260" height="18" fill="url(#lc-taper)" />
                </mask>
              </defs>

              {/* Chalk group — clipped by animated rect */}
              <g clipPath="url(#lc-reveal)" mask="url(#lc-taper-mask)">
                {/* Layer 1: wide rough halo */}
                <path
                  d="M2,10 C70,4 170,5 258,10"
                  stroke="#E85623"
                  strokeWidth="7"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.18"
                  filter="url(#lc-chalk)"
                />
                {/* Layer 2: main chalk body */}
                <path
                  d="M2,10 C70,4 170,5 258,10"
                  stroke="#E85623"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.80"
                  filter="url(#lc-chalk)"
                />
                {/* Layer 3: bright highlight — thinner, offset up */}
                <path
                  d="M2,9 C70,3 170,4 258,9"
                  stroke="#F07050"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.45"
                  filter="url(#lc-chalk)"
                />
              </g>
            </svg>
          </span>
        </h2>

        <p className="text-[16px] leading-[100%] text-gray-500 text-center" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
          Мы с радостью вам поможем, пройдите бесплатный тест и узнайте!
        </p>

        <svg width="16" height="38" viewBox="0 0 16 38" fill="none" aria-hidden="true">
          <line x1="8" y1="0" x2="8" y2="30" stroke="black" strokeWidth="2" strokeLinecap="round" />
          <polyline
            points="2,23 8,32 14,23"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        <a
          href="#contacts"
          className="flex items-center justify-center w-[261px] h-[54px] rounded-[59px] bg-[#3794FE] font-semibold text-white transition-colors hover:bg-[#2563EB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3794FE]"
        >
          Узнай свой уровень
        </a>
      </div>
    </section>
  )
}
