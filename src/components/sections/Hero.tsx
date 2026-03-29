import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white px-4 sm:px-10 lg:px-20">
      {/* Wave background — right half */}
      <Image
        src="/wave-bg.png"
        alt=""
        width={860}
        height={860}
        className="absolute right-0 top-0 h-full w-auto pointer-events-none select-none"
        aria-hidden="true"
        priority
      />

      {/* Same structure as header: px-20 on outer, max-w inside */}
      <div className="relative z-10 max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 pt-[110px] lg:pt-[150px] pb-16 lg:pb-20">

        {/* Left: text */}
        <div className="flex-1 max-w-[738px] flex flex-col items-center lg:items-start" style={{ marginTop: '35px' }}>
          <h1 className="text-black font-extrabold text-[30px] lg:text-[64px] leading-[100%] lg:leading-tight text-center lg:text-left">
            <span className="block">Онлайн-обучение</span>
            <span className="block">по английскому языку</span>
          </h1>
          <p className="mt-4 text-zinc-600 text-[16px] lg:text-lg leading-[100%] text-center lg:text-left">
            Освоите уникальную методику, которая поможет освоить язык в перерывах между работой и личной жизнью
          </p>
          <a
            href="#courses"
            className="mt-10 inline-flex items-center justify-center bg-[#E85623] text-white font-semibold text-base rounded-[59px] hover:bg-[#d04e1f] transition-colors duration-200 w-full max-w-[342px] lg:w-[187px]"
            style={{ height: '60px' }}
          >
            Узнать цены
          </a>
        </div>

        {/* Right: N + ice cube (horizontal), dot below-left of ice cube */}
        <div className="hidden md:flex flex-1 items-center justify-center md:max-w-[300px] lg:max-w-none" style={{ paddingLeft: '20px', marginTop: '-60px' }}>
          <div className="relative flex items-center">
            {/* N */}
            <span
              className="text-black select-none leading-none shrink-0 z-10 font-extrabold text-[128px]"
            >
              N
            </span>

            {/* Ice cube — overlapping N, 15px gap from N */}
            <div className="relative" style={{ marginLeft: '-160px' }}>
              <Image
                src="/ice-cube.png"
                alt="Ice cube"
                width={540}
                height={540}
                className="object-contain"
                priority
              />
              {/* Dot — 20px left, 30px below center */}
              <div className="absolute w-6 h-6 rounded-full bg-black" style={{ top: 'calc(50% + 30px)', right: '64px' }} />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
