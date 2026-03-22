import Image from 'next/image'

interface FeatureCard {
  image: string
  title: string
  left: number
  bottom: number
}

const CARD_W = 280
const CARD_H = 327
const CARD_RADIUS = 40

const FEATURE_CARDS: FeatureCard[] = [
  { image: '/frame-5.png',  title: 'Онлайн-учебник',       left: 50,  bottom: 154 },
  { image: '/frame-12.png', title: 'Разговорные клубы',    left: 350, bottom: 83  },
  { image: '/frame-11.png', title: 'Личный преподаватель', left: 650, bottom: 246 },
  { image: '/frame-10.png', title: 'Уроки с иностранцами', left: 950, bottom: 154 },
]

export function Features() {
  return (
    <section className="px-4 sm:px-10 lg:px-20 py-5">

      {/* Mobile / tablet layout — 2-column grid */}
      <div className="lg:hidden bg-[#3794FE] rounded-[50px] p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
          В курсах уже есть<br />всё, что вам нужно
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {FEATURE_CARDS.map((card) => (
            <div key={card.title} className="bg-white rounded-[40px] overflow-hidden">
              <div className="relative h-[200px]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover object-bottom"
                  sizes="(max-width: 1024px) 50vw"
                />
              </div>
              <p className="text-sm font-medium text-gray-800 p-3 text-center">{card.title}</p>
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
                <p className="absolute bottom-3 left-0 right-0 text-center text-sm font-medium text-gray-800 px-2">
                  {card.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
