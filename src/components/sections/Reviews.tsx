'use client'

import { useState } from 'react'

interface Review {
  id: number
  text: string
}

const REVIEWS: Review[] = [
  {
    id: 1,
    text: 'Пришёл с целью подтянуть английский для работы. Понравилось, что много практики и реально полезная лексика. Уже через месяц начал уверенно участвовать в созвонах с коллегами',
  },
  {
    id: 2,
    text: 'Записали ребёнка на курс, и я не ожидала, что ему так понравится. Занятия проходят в лёгкой форме, через игры, но при этом есть результат — стал лучше понимать и говорить. Ходит с удовольствием, для меня это главное',
  },
  {
    id: 3,
    text: 'Долго боялась начать говорить на английском. После нескольких недель занятий стало намного легче — всё понятно и без перегрузок. Использую в поездках и это огромный плюс',
  },
]

interface ReviewCardProps {
  review: Review
}

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div
      className="bg-white p-6 flex flex-col gap-4"
      style={{
        height: '271px',
        borderRadius: '20px',
        boxShadow: '0px 4px 17px 0px #00000040',
      }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 text-gray-400"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </div>
        <div className="flex gap-0.5" aria-label="5 звёзд">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-yellow-400 text-lg leading-none">
              ★
            </span>
          ))}
        </div>
      </div>
      <p className="text-gray-700 text-base leading-[140%]">{review.text}</p>
    </div>
  )
}

export function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0)

  // On desktop show all 3 at once (single "page"), on mobile paginate one by one
  const totalMobilePages = REVIEWS.length

  return (
    <section id="reviews" className="w-full bg-gray-50 py-20 px-4 sm:px-10 lg:px-20">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-black mb-12">
          Что о нас говорят...
        </h2>

        {/* Desktop: 3 cards in a row */}
        <div className="hidden lg:grid grid-cols-3 gap-5">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Mobile / tablet: single card carousel */}
        <div className="lg:hidden">
          <ReviewCard review={REVIEWS[activeIndex]} />

          {/* Pagination dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[...Array(totalMobilePages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Отзыв ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                  i === activeIndex ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Prev / Next arrows */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + totalMobilePages) % totalMobilePages)}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
              aria-label="Предыдущий отзыв"
            >
              ‹
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % totalMobilePages)}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
              aria-label="Следующий отзыв"
            >
              ›
            </button>
          </div>
        </div>

        {/* Desktop pagination dots (decorative) */}
        <div className="hidden lg:flex items-center justify-center gap-2 mt-8">
          <div className="w-12 h-1.5 rounded-md bg-gray-400" />
          <div className="w-4 h-1.5 rounded-md bg-gray-300" />
          <div className="w-4 h-1.5 rounded-md bg-gray-300" />
          <div className="w-4 h-1.5 rounded-md bg-gray-300" />
        </div>
      </div>
    </section>
  )
}
