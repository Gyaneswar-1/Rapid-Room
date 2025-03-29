

import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useState } from "react"

export default function ImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showFullScreen, setShowFullScreen] = useState(false)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const toggleFullScreen = () => {
    setShowFullScreen(!showFullScreen)
  }

  // Ensure we have images to display
  if (!images || images.length === 0) {
    return (
      <div className="relative rounded-xl overflow-hidden bg-gray-200 h-[300px] md:h-[450px] flex items-center justify-center">
        <p>No images available</p>
      </div>
    )
  }

  return (
    <>
      {/* Regular view */}
      <div className="relative rounded-xl overflow-hidden">
        {/* Main image display */}
        <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden bg-gray-100">
          <img
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`Property image ${currentIndex + 1}`}
            className=" object-cover w-full h-full "
          />

          {/* Image carousel controls */}
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button onClick={prevSlide} className="rounded-full bg-white/70 hover:bg-white/90 p-2 shadow-md">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous image</span>
            </button>
            <button onClick={nextSlide} className="rounded-full bg-white/70 hover:bg-white/90 p-2 shadow-md">
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next image</span>
            </button>
          </div>

          {/* Show all photos button */}
          {/* <button
            className="absolute bottom-4 right-4 bg-white hover:bg-gray-100 text-gray-900 px-4 py-2 rounded-md text-sm font-medium shadow-md"
            onClick={toggleFullScreen}
          >
            Show all photos
          </button> */}
        </div>

        {/* Thumbnails */}
        <div className="flex justify-center mt-4 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex ? "bg-gray-900 w-6" : "bg-gray-300"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen gallery */}
      {showFullScreen && (
        <div className="fixed inset-0 bg-white z-50 overflow-hidden">
          <div className="relative h-full w-full flex flex-col">
            {/* Header */}
            <div className="p-4 flex justify-between items-center border-b">
              <span className="text-sm font-medium">
                {currentIndex + 1} / {images.length}
              </span>
              <button onClick={toggleFullScreen} className="rounded-full p-2 hover:bg-gray-100">
                <X className="h-5 w-5" />
                <span className="sr-only">Close gallery</span>
              </button>
            </div>

            {/* Full-size image */}
            <div className="flex-1 flex items-center justify-center relative">
              <div className="relative h-full w-full">
                <img
                  src={images[currentIndex] || "/placeholder.svg"}
                  alt={`Property image ${currentIndex + 1}`}
                  className="object-contain"
                />
              </div>

              {/* Navigation buttons */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
                <button onClick={prevSlide} className="rounded-full bg-white/70 hover:bg-white/90 p-2 shadow-md">
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">Previous image</span>
                </button>
                <button onClick={nextSlide} className="rounded-full bg-white/70 hover:bg-white/90 p-2 shadow-md">
                  <ChevronRight className="h-5 w-5" />
                  <span className="sr-only">Next image</span>
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="p-4 border-t overflow-x-auto">
              <div className="flex gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative flex-shrink-0 h-16 w-16 rounded-md overflow-hidden border-2 ${
                      index === currentIndex ? "border-gray-900" : "border-transparent"
                    }`}
                    onClick={() => goToSlide(index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

