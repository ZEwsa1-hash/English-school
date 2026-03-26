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
    <header className="md:fixed md:top-0 md:left-0 md:right-0 md:z-50 pt-[45px] md:pt-10 px-5 sm:px-8 lg:px-20">
      {/* Pill — max 1280px, height 60px, radius 59px, bg #E3E3E3 */}
      <div className="max-w-[1280px] mx-auto">
        <div className="relative bg-transparent md:bg-[#E3E3E3] md:rounded-[59px] h-[60px] flex items-center justify-between pr-1">

          {/* Logo — flush to left edge of pill, 60×60 */}
          <a href="#" className="shrink-0">
            <Image
              src="/logo.png"
              alt="English School"
              width={44}
              height={44}
              className="rounded-full"
            />
          </a>

          {/* Desktop nav — absolutely centered in pill */}
          <nav
            className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2"
            aria-label="Основная навигация"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
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
            style={{ width: '180px', height: '54px' }}
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
