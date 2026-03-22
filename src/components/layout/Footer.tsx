import Image from 'next/image'

const CURRENT_YEAR = new Date().getFullYear()

function InstagramIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="44" height="44" rx="12" fill="#111827" />
      <rect x="13" y="13" width="18" height="18" rx="5" stroke="white" strokeWidth="2" />
      <circle cx="22" cy="22" r="4" stroke="white" strokeWidth="2" />
      <circle cx="28" cy="16" r="1.2" fill="white" />
    </svg>
  )
}

function TelegramIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="22" cy="22" r="22" fill="#111827" />
      <path
        d="M31.5 13.5L10 21.5L18 23.5L20.5 31L24.5 26L29.5 30L31.5 13.5Z"
        fill="white"
        stroke="white"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
      <path d="M18 23.5L20.5 31L24.5 26" stroke="#111827" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 px-4 md:px-10 pt-8 pb-6">
      <div className="max-w-[1280px] mx-auto">

        {/* Top row: logo + social icons */}
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <Image src="/frame-6.png" alt="Nice logo" width={44} height={44} />
            <span className="text-black font-bold text-xl">Nice</span>
          </a>

          <div className="flex items-center gap-2">
            <a href="#" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="#" aria-label="Telegram">
              <TelegramIcon />
            </a>
          </div>
        </div>

        {/* Bottom row: phone + legal */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-3xl md:text-4xl font-black text-black tracking-tight mt-4">
            +375 29 999 99 99
          </p>

          <div className="flex flex-col gap-2 text-gray-700 text-xs font-normal leading-none">
            <div className="flex flex-row gap-10">
              <a href="#" className="underline hover:text-black transition-colors">
                Пользовательское соглашение
              </a>
              <a href="#" className="underline hover:text-black transition-colors">
                Политика конфиденциальности
              </a>
            </div>
            <p>
              Образовательные услуги оказываются тут должна быть ваша инфа на основании{' '}
              <a href="#" className="underline">ваша инфа</a>
            </p>
            <p>
              Документ о прохождении обучения по программе дополнительного образования также выдаётся{' '}
              <a href="#" className="underline">ваша инфа</a>
            </p>
            <p className="text-gray-500 mt-1">© {CURRENT_YEAR} Проект Nice</p>
          </div>
        </div>

      </div>
    </footer>
  )
}
