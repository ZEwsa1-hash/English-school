import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white px-4 sm:px-10 lg:px-20">
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
      <div className="relative z-10 max-w-[1280px] mx-auto min-h-screen flex flex-col lg:flex-row items-center justify-between gap-12 pt-[140px] pb-20">

        {/* Left: text */}
        <div className="flex-1 max-w-[738px]" style={{ marginTop: '35px' }}>
          <h1 className="text-black font-extrabold text-4xl sm:text-5xl lg:text-[64px] leading-tight">
            <span className="block">Онлайн-обучение</span>
            <span className="block">по английскому языку</span>
          </h1>
          <p className="mt-6 text-zinc-600 leading-relaxed text-base sm:text-lg">
            Освоите уникальную методику, которая поможет<br />
            освоить язык в перерывах между работой и личной жизнью
          </p>
          <a
            href="#courses"
            className="mt-16 inline-flex items-center justify-center bg-[#E85623] text-white font-semibold text-base rounded-[59px] hover:bg-[#d04e1f] transition-colors duration-200"
            style={{ width: '187px', height: '60px' }}
          >
            Узнать цены
          </a>
        </div>

        {/* Right: N + ice cube (horizontal), dot below-left of ice cube */}
        <div className="flex-1 flex items-center justify-center" style={{ paddingLeft: '50px', marginTop: '-100px' }}>
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
