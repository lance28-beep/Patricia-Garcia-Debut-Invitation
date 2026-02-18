"use client"

import { useState, useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Section } from "@/components/section"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const galleryItems = [
  { image: "/desktop-background/debut (1).webp", text: "Sapphire Reverie" },
  { image: "/desktop-background/debut (2).webp", text: "Champagne Light" },
  { image: "/desktop-background/debut (3).webp", text: "Velvet Steps" },
  { image: "/desktop-background/debut (4).webp", text: "Twilight Whispers" },
  { image: "/desktop-background/debut (5).webp", text: "Navy Glow" },
  { image: "/desktop-background/debut (6).webp", text: "Evening Poise" },
  { image: "/desktop-background/debut (7).webp", text: "Radiant Silhouette" },
  { image: "/desktop-background/debut (8).webp", text: "Deep Twilight" },
  { image: "/desktop-background/debut (9).webp", text: "Deep Twilight" },
]

const tileLayouts = [
  "md:col-span-3 md:row-span-3 md:col-start-1 md:row-start-1",
  "md:col-span-2 md:row-span-3 md:col-start-4 md:row-start-1",
  "md:col-span-1 md:row-span-3 md:col-start-6 md:row-start-1",
  "md:col-span-3 md:row-span-2 md:col-start-1 md:row-start-4",
  "md:col-span-3 md:row-span-2 md:col-start-4 md:row-start-4",
  "md:col-span-2 md:row-span-1 md:col-start-1 md:row-start-6",
  "md:col-span-2 md:row-span-1 md:col-start-3 md:row-start-6",
  "md:col-span-2 md:row-span-1 md:col-start-5 md:row-start-6",
]

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchDeltaX, setTouchDeltaX] = useState(0)
  const [zoomScale, setZoomScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [pinchStartDist, setPinchStartDist] = useState<number | null>(null)
  const [pinchStartScale, setPinchStartScale] = useState(1)
  const [lastTap, setLastTap] = useState(0)
  const [panStart, setPanStart] = useState<{ x: number; y: number; panX: number; panY: number } | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const navigateImage = useCallback((direction: "prev" | "next") => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex
      if (direction === "next") {
        newIndex = (prevIndex + 1) % galleryItems.length
      } else {
        newIndex = (prevIndex - 1 + galleryItems.length) % galleryItems.length
      }
      setSelectedImage(galleryItems[newIndex])
      return newIndex
    })
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return

      if (e.key === "ArrowLeft") navigateImage("prev")
      if (e.key === "ArrowRight") navigateImage("next")
      if (e.key === "Escape") setSelectedImage(null)
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [selectedImage, currentIndex, navigateImage])

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [selectedImage])

  useEffect(() => {
    if (selectedImage) {
      const next = new Image()
      next.src = galleryItems[(currentIndex + 1) % galleryItems.length].image
      const prev = new Image()
      prev.src = galleryItems[(currentIndex - 1 + galleryItems.length) % galleryItems.length].image
    }
  }, [selectedImage, currentIndex])

  const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val))
  const resetZoom = () => {
    setZoomScale(1)
    setPan({ x: 0, y: 0 })
    setPanStart(null)
  }

  return (
    <Section
      id="gallery"
      className="relative py-14 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "#0a1929" }}
    >
      {/* Refined debutant background: deep navy base with soft gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#001a2e] via-[#0a1929] to-[#001F3F]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(229,201,183,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_100%,rgba(0,85,143,0.12),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_10%_70%,rgba(1,54,98,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs sm:text-sm tracking-[0.45em] uppercase text-white mb-3 font-medium">Sapphire keepsakes</p>
          <h2
            className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl text-white drop-shadow-sm`}
          >
            Gallery of Elegant Evenings
          </h2>
          <p className={`${inter.className} text-sm sm:text-base md:text-lg text-white/95 mt-4 leading-relaxed max-w-2xl mx-auto`}>
            Moments draped in sapphire blue, champagne, and cream—Ena Gerangaya's debut glow, framed for you to relive.
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-12 sm:mt-14 lg:mt-16 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-64 sm:h-80 md:h-96">
              <div className="w-14 h-14 border-[3px] border-[#003153]/30 border-t-[#E5C9B7] rounded-full animate-spin" />
            </div>
          ) : (
            <div className="mx-auto max-w-6xl w-full px-3 sm:px-4 md:px-6">
              {/* Mobile: 2-col equal cards; Tablet: 3-col; Desktop: 4-col uniform masonry */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3 md:gap-2.5 lg:gap-3 w-full">
                {galleryItems.map((item, index) => (
                  <button
                    key={item.image + index}
                    type="button"
                    className="group relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-xl lg:rounded-2xl border border-white/10 bg-[#003153]/30 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-[#001F3F]/40 transition-all duration-300 hover:border-[#E5C9B7]/40 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E5C9B7]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1929] min-h-[140px] sm:min-h-[160px] md:min-h-[200px] lg:min-h-[220px] aspect-[3/4]"
                    onClick={() => {
                      setSelectedImage(item)
                      setCurrentIndex(index)
                    }}
                    aria-label={`Open image ${index + 1}: ${item.text}`}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[1] pointer-events-none">
                      <div className="absolute -inset-3 bg-gradient-to-br from-[#E5C9B7]/15 via-transparent to-[#001F3F]/30 blur-xl" />
                    </div>

                    <div className="relative h-full w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.text || `Gallery image ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-2.5 md:p-3 flex items-center justify-between text-white z-10">
                      <span className={`${playfair.className} text-[9px] sm:text-[10px] md:text-xs tracking-[0.15em] uppercase truncate max-w-[72%] drop-shadow-md`}>{item.text}</span>
                      <span className="text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-white/80 flex-shrink-0">{index + 1}/{galleryItems.length}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-[#001F3F]/97 backdrop-blur-md flex items-center justify-center p-2 sm:p-4"
          onClick={() => {
            setSelectedImage(null)
            resetZoom()
          }}
        >
          <div
            className="relative max-w-6xl w-full h-full sm:h-auto flex flex-col items-center justify-center"
            onTouchStart={(e) => {
              if (e.touches.length === 1) {
                const now = Date.now()
                if (now - lastTap < 300) {
                  setZoomScale((s) => (s > 1 ? 1 : 2))
                  setPan({ x: 0, y: 0 })
                }
                setLastTap(now)
                const t = e.touches[0]
                setTouchStartX(t.clientX)
                setTouchDeltaX(0)
                if (zoomScale > 1) {
                  setPanStart({ x: t.clientX, y: t.clientY, panX: pan.x, panY: pan.y })
                }
              }
              if (e.touches.length === 2) {
                const dx = e.touches[0].clientX - e.touches[1].clientX
                const dy = e.touches[0].clientY - e.touches[1].clientY
                const dist = Math.hypot(dx, dy)
                setPinchStartDist(dist)
                setPinchStartScale(zoomScale)
              }
            }}
            onTouchMove={(e) => {
              if (e.touches.length === 2 && pinchStartDist) {
                const dx = e.touches[0].clientX - e.touches[1].clientX
                const dy = e.touches[0].clientY - e.touches[1].clientY
                const dist = Math.hypot(dx, dy)
                const scale = clamp((dist / pinchStartDist) * pinchStartScale, 1, 3)
                setZoomScale(scale)
              } else if (e.touches.length === 1) {
                const t = e.touches[0]
                if (zoomScale > 1 && panStart) {
                  const dx = t.clientX - panStart.x
                  const dy = t.clientY - panStart.y
                  setPan({ x: panStart.panX + dx, y: panStart.panY + dy })
                } else if (touchStartX !== null) {
                  setTouchDeltaX(t.clientX - touchStartX)
                }
              }
            }}
            onTouchEnd={() => {
              setPinchStartDist(null)
              setPanStart(null)
              if (zoomScale === 1 && Math.abs(touchDeltaX) > 50) {
                navigateImage(touchDeltaX > 0 ? "prev" : "next")
              }
              setTouchStartX(null)
              setTouchDeltaX(0)
            }}
          >
            <div className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-3 sm:px-6 pt-3 sm:pt-6">
              <div className="bg-[#003153]/90 backdrop-blur-md rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-[#E5C9B7]/30 shadow-[0_12px_24px_rgba(0,31,63,0.5)]">
                <span className="text-xs sm:text-sm font-medium text-[#FBF1E7] tracking-[0.18em]">
                  {currentIndex + 1} / {galleryItems.length}
                </span>
              </div>
            </div>

            {galleryItems.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage("prev")
                    resetZoom()
                  }}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-[#003153]/80 hover:bg-[#003153]/95 backdrop-blur-md rounded-full p-3 sm:p-4 transition-all duration-200 border border-[#E5C9B7]/30 hover:border-[#E5C9B7]/60"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} className="sm:w-7 sm:h-7 text-[#FBF1E7]" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage("next")
                    resetZoom()
                  }}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-[#003153]/80 hover:bg-[#003153]/95 backdrop-blur-md rounded-full p-3 sm:p-4 transition-all duration-200 border border-[#E5C9B7]/30 hover:border-[#E5C9B7]/60"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} className="sm:w-7 sm:h-7 text-[#FBF1E7]" />
                </button>
              </>
            )}

            <div className="relative w-full h-full flex items-center justify-center pt-16 sm:pt-20 pb-4 sm:pb-6 overflow-hidden">
              <div
                className="relative inline-block max-w-full max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage(null)
                    resetZoom()
                  }}
                  className="absolute top-3 right-3 z-40 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-[#E5C9B7]/40 bg-[#003153]/90 backdrop-blur-md shadow-[0_14px_28px_rgba(0,31,63,0.6)] transition-all duration-200 hover:scale-105"
                  aria-label="Close lightbox"
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#E5C9B7]/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  <X size={18} className="sm:w-6 sm:h-6 text-[#FBF1E7] drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]" />
                </button>
                <img
                  src={selectedImage.image || "/placeholder.svg"}
                  alt={selectedImage.text || "Gallery image"}
                  style={{
                    transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoomScale})`,
                    transition: pinchStartDist ? "none" : "transform 200ms ease-out",
                  }}
                  className="max-w-full max-h-[75vh] sm:max-h-[85vh] object-contain rounded-2xl shadow-[0_32px_64px_rgba(0,31,63,0.6)] ring-2 ring-[#E5C9B7]/20"
                />

                {zoomScale > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      resetZoom()
                    }}
                    className="absolute bottom-2 right-2 bg-[#003153]/80 hover:bg-[#003153]/95 backdrop-blur-md text-[#FBF1E7] rounded-full px-3 py-1.5 text-xs font-medium border border-[#E5C9B7]/30 transition-all duration-200"
                  >
                    Reset Zoom
                  </button>
                )}
              </div>
            </div>

            {galleryItems.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 sm:hidden z-20">
                <p className="text-xs text-[#E5C9B7]/90 bg-[#003153]/80 backdrop-blur-sm rounded-full px-3 py-1.5 border border-[#E5C9B7]/25">
                  Swipe to navigate
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="relative z-10 mt-12 sm:mt-14 md:mt-16 flex justify-center px-4">
        <a
          href="/gallery"
          className="group relative inline-flex h-full min-h-[3.5rem] sm:min-h-[3.75rem] items-center justify-center overflow-hidden rounded-full border-2 border-[#E5C9B7]/50 bg-[#E5C9B7] px-10 sm:px-12 md:px-14 text-[9px] sm:text-[10px] md:text-xs tracking-[0.48em] uppercase text-[#001F3F] font-semibold shadow-[0_20px_48px_rgba(0,31,63,0.35)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_56px_rgba(0,49,83,0.45)] hover:border-[#E5C9B7]"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative z-10 inline-flex items-center justify-center">
            View Full Gallery
          </span>
        </a>
      </div>
    </Section>
  )
}