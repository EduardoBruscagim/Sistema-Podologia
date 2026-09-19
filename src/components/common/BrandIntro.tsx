import React, { useRef, useState, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export const BrandIntro: React.FC = () => {
  const [isComplete, setIsComplete] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  const finishIntro = useCallback(() => {
    document.body.style.overflow = ''
    setIsComplete(true)
  }, [])

  // Suporte a acessibilidade: skip com Escape
  useEffect(() => {
    if (isComplete) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        timelineRef.current?.kill()
        finishIntro()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isComplete, finishIntro])

  useGSAP(
    () => {
      if (isComplete || !overlayRef.current || !contentRef.current) return

      // Bloqueia rolagem enquanto a intro estiver ativa
      document.body.style.overflow = 'hidden'

      const tl = gsap.timeline({
        onComplete: () => {
          finishIntro()
        },
      })

      timelineRef.current = tl

      // Sequência acordada:
      // 1. Fundo já posicionado cobrindo a tela
      // 2. Logo/nome entra com opacity 0 -> 1 e scale(0.95 -> 1)
      tl.fromTo(
        contentRef.current,
        { autoAlpha: 0, scale: 0.95, y: 6 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
      )
        // 3. Segura por 300 ms
        .to({}, { duration: 0.3 })
        // 4. Tudo faz fade-out suave
        .to(overlayRef.current, {
          autoAlpha: 0,
          duration: 0.45,
          ease: 'power2.inOut',
        })
    },
    { scope: overlayRef },
  )

  if (isComplete) {
    return null
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAF8F5] dark:bg-[#11100F] select-none cursor-default"
      aria-hidden="true"
    >
      <div ref={contentRef} className="flex flex-col items-center text-center px-4">
        {/* Monograma Editorial da Marca */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 flex items-center justify-center">
          <svg
            viewBox="0 0 64 64"
            fill="none"
            className="w-full h-full drop-shadow-xs"
            aria-hidden="true"
          >
            <rect
              width="64"
              height="64"
              rx="18"
              className="fill-black/[0.04] dark:fill-white/[0.08]"
            />
            {/* Monograma 'A' Angélica Eduarda */}
            <path
              d="M32 14L45 48H39.2L36.4 40.5H27.6L24.8 48H19L32 14ZM32 23.2L29.3 35.8H34.7L32 23.2Z"
              className="fill-[#181615] dark:fill-[#FAF8F5]"
            />
            {/* Ponto Terracota Oficial */}
            <circle cx="45.5" cy="18.5" r="3.5" fill="#9B4124" />
          </svg>
        </div>

        {/* Nome Editorial */}
        <span className="font-serif text-lg sm:text-2xl font-medium tracking-[0.16em] uppercase text-[#181615] dark:text-[#FAF8F5] leading-none mb-2">
          Angélica Eduarda
        </span>

        {/* Subtítulo Refinado */}
        <span className="font-sans text-[10px] sm:text-xs tracking-[0.24em] uppercase text-accent font-medium">
          Podologia · Mococa
        </span>
      </div>
    </div>
  )
}
