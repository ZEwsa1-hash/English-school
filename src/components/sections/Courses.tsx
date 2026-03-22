import Image from 'next/image'

interface SmallCourse {
  title: string
  price: string
  description: string
  bg: string
}

const SMALL_COURSES: SmallCourse[] = [
  {
    title: 'Подготовка к экзаменам и тестам (IELTS, TOEFL)',
    price: '5$ занятие',
    description: 'Структура экзаменов, практика заданий и стратегии для получения высокого балла',
    bg: 'bg-[#FAAACD]',
  },
  {
    title: 'Английский для детей (7–15 лет)',
    price: '5$ занятие',
    description: 'Интерактивное обучение через игры и задания, развитие разговорных навыков и интереса к языку',
    bg: 'bg-[#FF865C]',
  },
  {
    title: 'Английский для работы',
    price: '5$ занятие',
    description: 'Деловая лексика, переписка, звонки и переговоры — всё, что нужно для уверенного общения в профессиональной среде',
    bg: 'bg-[#FAAACD]',
  },
  {
    title: 'Английский для путешествий',
    price: '5$ занятие',
    description: 'Фразы и ситуации для комфортных поездок: аэропорт, отель, рестораны и общение с местными жителями',
    bg: 'bg-[#6EB2FF]',
  },
]

export function Courses() {
  return (
    <section id="courses" className="px-4 sm:px-10 lg:px-20 py-12 mt-[60px]">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
          Курсы
        </h2>

        {/* Mobile: single column stack */}
        <div className="flex flex-col gap-4 md:hidden">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src="/frame-7.png"
              alt="Курсы общего английского"
              width={600}
              height={220}
              className="w-full"
            />
          </div>
          <div className="overflow-hidden rounded-2xl">
            <Image
              src="/frame-8.png"
              alt="Английский для переезда за границу"
              width={300}
              height={500}
              className="w-full"
            />
          </div>
          {SMALL_COURSES.map((course) => (
            <div key={course.title} className={`${course.bg} min-h-[160px] rounded-2xl p-6`}>
              <div className="mb-2 flex items-start justify-between gap-2">
                <h3 className="text-base font-bold text-white">{course.title}</h3>
                <span className="shrink-0 text-sm text-white/80">{course.price}</span>
              </div>
              <p className="text-sm leading-relaxed text-white/90">{course.description}</p>
            </div>
          ))}
        </div>

        {/* Desktop: 4-col bento grid, 2 rows */}
        {/* Col1+2 row1: blue landscape | Col3 row1+2: orange portrait | Col4 row1: pink */}
        {/* Col1 row2: children | Col2 row2: work | Col4 row2: travel */}
        <div className="hidden md:grid md:grid-cols-4 md:grid-rows-2 md:gap-4" style={{ gridTemplateRows: '260px 260px' }}>

          {/* Blue wide card — col 1-2, row 1 */}
          <div className="relative col-span-2 row-start-1 overflow-hidden rounded-2xl">
            <Image
              src="/frame-7.png"
              alt="Курсы общего английского"
              fill
              className="object-fill"
              quality={100}
              sizes="(min-width: 768px) 50vw"
            />
          </div>

          {/* Orange tall card — col 3, rows 1-2 */}
          <div className="relative col-start-3 row-span-2 row-start-1 overflow-hidden rounded-2xl">
            <Image
              src="/frame-8.png"
              alt="Английский для переезда за границу"
              fill
              className="object-fill"
              quality={100}
              sizes="(min-width: 768px) 25vw"
            />
          </div>

          {/* Pink — col 4, row 1 */}
          <div className={`${SMALL_COURSES[0].bg} col-start-4 row-start-1 flex flex-col justify-between rounded-2xl p-5`}>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-[14px] font-medium leading-none text-white">{SMALL_COURSES[0].title}</h3>
              <span className="shrink-0 text-[14px] font-medium leading-none text-white">{SMALL_COURSES[0].price}</span>
            </div>
            <p className="text-[16px] font-medium leading-none text-white">{SMALL_COURSES[0].description}</p>
          </div>

          {/* Children — col 1, row 2 */}
          <div className={`${SMALL_COURSES[1].bg} col-start-1 row-start-2 flex flex-col justify-between rounded-2xl p-5`}>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-[14px] font-medium leading-none text-white">{SMALL_COURSES[1].title}</h3>
              <span className="shrink-0 text-[14px] font-medium leading-none text-white">{SMALL_COURSES[1].price}</span>
            </div>
            <p className="text-[16px] font-medium leading-none text-white">{SMALL_COURSES[1].description}</p>
          </div>

          {/* Work — col 2, row 2 */}
          <div className={`${SMALL_COURSES[2].bg} col-start-2 row-start-2 flex flex-col justify-between rounded-2xl p-5`}>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-[14px] font-medium leading-none text-white">{SMALL_COURSES[2].title}</h3>
              <span className="shrink-0 text-[14px] font-medium leading-none text-white">{SMALL_COURSES[2].price}</span>
            </div>
            <p className="text-[16px] font-medium leading-none text-white">{SMALL_COURSES[2].description}</p>
          </div>

          {/* Travel — col 4, row 2 */}
          <div className={`${SMALL_COURSES[3].bg} col-start-4 row-start-2 flex flex-col justify-between rounded-2xl p-5`}>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-[14px] font-medium leading-none text-white">{SMALL_COURSES[3].title}</h3>
              <span className="shrink-0 text-[14px] font-medium leading-none text-white">{SMALL_COURSES[3].price}</span>
            </div>
            <p className="text-[16px] font-medium leading-none text-white">{SMALL_COURSES[3].description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
