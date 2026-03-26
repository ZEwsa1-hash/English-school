export function VideoSection() {
  return (
    <section className="w-full bg-white py-20 px-4 sm:px-10 lg:px-20">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-black text-center">
          Как проходят занятия
        </h2>

        <div className="relative mx-auto bg-gray-800 overflow-hidden" style={{ width: 347, height: 216, borderRadius: 18 }}>
          {/* Fake Zoom UI */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-900">
            <div className="flex gap-1 p-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-16 h-10 bg-gray-600 rounded" />
              ))}
            </div>
            <div className="flex items-center justify-center h-3/4">
              <div className="w-32 h-32 bg-blue-200 rounded-full" />
            </div>
          </div>

          {/* Play button — video not yet configured */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              disabled
              aria-label="Воспроизвести видео"
              title="Видео скоро появится"
              className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 text-blue-600 ml-1"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
