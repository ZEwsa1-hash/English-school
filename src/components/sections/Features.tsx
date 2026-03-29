import Image from 'next/image'

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

export function Features() {
  return (
    <section className="px-[20px] sm:px-10 lg:px-20 py-5">

      {/* Mobile / tablet layout — single column */}
      <div className="lg:hidden bg-[#3794FE] rounded-[50px] pt-8 pb-10 px-[30px]">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-[60px] text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
          В курсах уже есть<br />всё, что вам нужно
        </h2>
        <div className="flex flex-col items-center gap-[50px]">
          {FEATURE_CARDS.map((card) => (
            <div
              key={card.title}
              className="relative bg-white w-full rounded-[40px] overflow-hidden"
              style={{ height: CARD_H }}
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                style={{ objectFit: card.mobileImageFit ?? 'cover', objectPosition: card.mobileImagePosition ?? 'center center' }}
                sizes="(max-width: 640px) calc(100vw - 100px), 400px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop layout — 4-column CSS grid */}
      <div className="hidden lg:block">
        <div className="mx-auto w-full max-w-[1280px] bg-[#3794FE] rounded-[50px] pt-14 pb-12 px-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-10 leading-snug">
            В курсах уже есть<br />всё, что вам нужно
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
