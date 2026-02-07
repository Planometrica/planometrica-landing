import { useState, useEffect, useCallback, useRef } from 'react'
import type { StyleData } from '../data/architectural-styles'

interface StyleModalProps {
  style: StyleData | null
  onClose: () => void
}

export default function StyleModal({ style, onClose }: StyleModalProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())
  const overlayRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (!style) return
      if (e.key === 'ArrowLeft') setActiveImage((prev) => (prev > 0 ? prev - 1 : style.images.length - 1))
      if (e.key === 'ArrowRight') setActiveImage((prev) => (prev < style.images.length - 1 ? prev + 1 : 0))
    },
    [onClose, style],
  )

  useEffect(() => {
    if (!style) return
    setActiveImage(0)
    setImageErrors(new Set())
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [style, handleKeyDown])

  if (!style) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
  }

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index))
  }

  const hasImage = (index: number) => !imageErrors.has(index)

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Архитектурный стиль: ${style.name}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{ animation: 'scale-in 0.25s ease-out' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 shadow-lg transition-colors cursor-pointer"
          aria-label="Закрыть"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content — scrollable */}
        <div className="overflow-y-auto">
          {/* Gallery */}
          <div className="relative">
            {/* Main image / gradient fallback */}
            <div className="relative aspect-[16/9] overflow-hidden">
              {hasImage(activeImage) ? (
                <img
                  src={style.images[activeImage]}
                  alt={`${style.name} — пример ${activeImage + 1}`}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(activeImage)}
                />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${style.gradient}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white/80">
                      <svg
                        className="w-16 h-16 mx-auto mb-3 opacity-60"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                        />
                      </svg>
                      <p className="text-sm font-medium">Фото скоро появится</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation arrows */}
              <button
                onClick={() => setActiveImage((prev) => (prev > 0 ? prev - 1 : style.images.length - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-lg transition-colors cursor-pointer"
                aria-label="Предыдущее фото"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setActiveImage((prev) => (prev < style.images.length - 1 ? prev + 1 : 0))}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-lg transition-colors cursor-pointer"
                aria-label="Следующее фото"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Style badge */}
              <div className="absolute top-4 left-4">
                <span
                  className={`inline-block px-4 py-1.5 text-sm font-semibold text-white rounded-full bg-gradient-to-r ${style.gradient} shadow-lg`}
                >
                  {style.name}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 p-3 bg-gray-50">
              {style.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative flex-1 aspect-[16/9] rounded-lg overflow-hidden cursor-pointer transition-all ${
                    activeImage === i
                      ? 'ring-2 ring-[#0A4C76] ring-offset-2 opacity-100'
                      : 'opacity-60 hover:opacity-90'
                  }`}
                  aria-label={`Фото ${i + 1}`}
                >
                  {hasImage(i) ? (
                    <img
                      src={img}
                      alt={`${style.name} ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(i)}
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${style.gradient} opacity-80`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{style.name}</h2>
              <p className="text-lg text-[#1A7BB3] font-medium">{style.tagline}</p>
            </div>

            {/* Description text */}
            <p className="text-gray-600 leading-relaxed mb-8">{style.description}</p>

            {/* Parameters */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Этажность</div>
                <div className="text-sm md:text-base font-semibold text-gray-900">{style.params.floors}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Площадь</div>
                <div className="text-sm md:text-base font-semibold text-gray-900">{style.params.area}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Стоимость</div>
                <div className="text-sm md:text-base font-semibold text-gray-900">{style.params.cost}</div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Архитектурные особенности</h3>
              <ul className="space-y-3">
                {style.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-[#92CF93] mt-0.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <a
              href="https://studio.planometrica.ru"
              className="inline-flex items-center justify-center w-full px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#0A4C76] to-[#1A7BB3] rounded-xl hover:from-[#093d5f] hover:to-[#156999] transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Создать проект в стиле «{style.name}»
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
