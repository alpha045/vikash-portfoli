import { useState, useEffect, useRef } from 'react'

export function useIntersectionObserver(options = {}) {
  const { threshold = 0, rootMargin = '150px', freezeOnceVisible = true } = options
  // Default to true so content is ALWAYS visible on initial load and never hidden
  const [isIntersecting, setIsIntersecting] = useState(true)
  const targetRef = useRef(null)

  useEffect(() => {
    const element = targetRef.current
    if (!element) return

    if (!('IntersectionObserver' in window)) {
      setIsIntersecting(true)
      return
    }

    // Set initial state based on current bounding rect
    const rect = element.getBoundingClientRect()
    if (rect.top < window.innerHeight + 150) {
      setIsIntersecting(true)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          if (freezeOnceVisible) {
            observer.unobserve(element)
          }
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [threshold, rootMargin, freezeOnceVisible])

  return [targetRef, isIntersecting]
}
