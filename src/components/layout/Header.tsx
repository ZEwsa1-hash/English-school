'use client'

import Image from 'next/image'
import { useState } from 'react'

const NAV_LINKS = [
  { label: 'Курсы', href: '#courses' },
  { label: 'Цены', href: '#courses' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contacts' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-[28px] md:pt-[22px] px-5 sm:px-8 lg:px-20">
      {/* Pill — max 1280px, height 48px, radius 59px, bg #E3E3E3 */}
      <div className="max-w-[1280px] mx-auto">
        <div className="relative bg-white/95 md:bg-[#E3E3E3] rounded-[59px] md:rounded-[59px] h-[48px] flex items-center justify-between pr-1 shadow-sm md:shadow-none">

          {/* Logo — full height of pill on desktop */}
          <a href="#" className="shrink-0 self-stretch hidden md:flex items-center">
            <Image
              src="/logo.png"
              alt="English School"
              width={60}
              height={60}
              className="rounded-full h-full w-auto object-cover"
            />
          </a>
          <a href="#" className="shrink-0 md:hidden">
            <Image
              src="/logo.png"
              alt="English School"
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
          </a>

          {/* Desktop nav — absolutely centered in pill */}
          <nav
            className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2"
            aria-label="Основная навигация"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-gray-700 hover:text-[#2563EB] text-sm font-medium transition-colors duration-150"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* CTA button — 180×54, radius 59px */}
          <a
            href="#contacts"
            className="hidden md:inline-flex items-center justify-center rounded-[59px] bg-[#2563EB] text-sm font-semibold text-white hover:bg-blue-700 transition-colors duration-150 shrink-0"
            style={{ width: '180px', height: '42px' }}
          >
            Записаться
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-md hover:bg-gray-200 transition-colors mr-2"
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isMenuOpen}
          >
            <span className={`block w-5 h-0.5 bg-gray-700 transition-transform duration-200 ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block w-5 h-0.5 bg-gray-700 transition-opacity duration-200 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-gray-700 transition-transform duration-200 ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 bg-[#E3E3E3] rounded-[24px] px-4 pb-4 pt-3">
            <nav className="flex flex-col gap-1" aria-label="Мобильная навигация">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={handleNavClick}
                  className="block py-2.5 px-3 text-gray-700 hover:text-[#2563EB] text-sm font-medium rounded-xl hover:bg-white/50 transition-colors duration-150"
                >
                  {label}
                </a>
              ))}
              <a
                href="#contacts"
                onClick={handleNavClick}
                className="mt-2 inline-flex justify-center rounded-[59px] bg-[#2563EB] px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors duration-150"
              >
                Записаться
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
