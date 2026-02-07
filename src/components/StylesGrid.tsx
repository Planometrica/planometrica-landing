import { useState } from 'react'
import { architecturalStyles } from '../data/architectural-styles'
import type { StyleData } from '../data/architectural-styles'
import StyleModal from './StyleModal'

export default function StylesGrid() {
  const [selectedStyle, setSelectedStyle] = useState<StyleData | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6">
        {architecturalStyles.map((style) => (
          <button
            key={style.id}
            onClick={() => setSelectedStyle(style)}
            className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer text-left"
            aria-label={`Открыть: ${style.name}`}
          >
            {/* Background gradient (fallback) */}
            <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient}`} />

            {/* Background image */}
            <img
              src={style.images[0]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Bottom gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 p-4 lg:p-6 flex flex-col justify-end text-center">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-lg lg:text-xl font-bold text-white mb-1">{style.name}</h3>
                <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                  {style.tagline}
                </p>
              </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        ))}
      </div>

      {/* Modal */}
      <StyleModal style={selectedStyle} onClose={() => setSelectedStyle(null)} />
    </>
  )
}
