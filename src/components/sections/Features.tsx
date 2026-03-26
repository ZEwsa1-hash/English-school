import Image from 'next/image'

interface FeatureCard {
  image: string
  title: string
  left: number
  bottom: number
  mobileImageFit?: 'cover' | 'contain'
  mobileImagePosition?: string
}

const CARD_W = 280
const CARD_H = 327
const CARD_RADIUS = 40

const FEATURE_CARDS: FeatureCard[] = [
  { image: '/frame-5.png',  title: 'Онлайн-учебник',       left: 50,  bottom: 80,  mobileImageFit: 'contain', mobileImagePosition: 'right center' },
  { image: '/frame-12.png', title: 'Разговорные клубы',    left: 350, bottom: 10  },
  { image: '/frame-11.png', title: 'Личный преподаватель', left: 650, bottom: 170 },
  { image: '/frame-10.png', title: 'Уроки с иностранцами', left: 950, bottom: 80  },
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
            <div key={card.title} className="bg-white overflow-hidden w-full" style={{ height: CARD_H, borderRadius: CARD_RADIUS }}>
              <div className="relative w-full h-full">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  style={{
                    objectFit: card.mobileImageFit ?? 'cover',
                    objectPosition: card.mobileImagePosition ?? 'bottom',
                  }}
                  sizes="(max-width: 640px) calc(100vw - 100px), 400px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop layout — absolute positioned bento */}
      <div className="hidden lg:block">
        <div
          className="relative mx-auto overflow-hidden"
          style={{
            maxWidth: 1280,
            height: 716,
            borderRadius: 50,
            background: '#3794FE',
          }}
        >
          {/* Title */}
          <h2
            className="absolute text-3xl font-bold text-white lg:text-4xl"
            style={{ top: 60, left: 60, lineHeight: 1.25 }}
          >
            В курсах уже есть
            <br />
            всё, что вам нужно
          </h2>

          {/* Cards with exact positions */}
          {FEATURE_CARDS.map((card) => (
            <div key={card.title}>
              {/* White card */}
              <div
                className="absolute overflow-hidden bg-white"
                style={{
                  left: card.left,
                  bottom: card.bottom,
                  width: CARD_W,
                  height: CARD_H,
                  borderRadius: CARD_RADIUS,
                }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'bottom' }}
                  sizes="280px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
