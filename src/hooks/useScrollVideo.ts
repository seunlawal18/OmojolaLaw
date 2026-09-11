import { useEffect, useRef, useCallback } from 'react'

interface UseScrollVideoOptions {
  trackRef: React.RefObject<HTMLElement | null>
  videoRef: React.RefObject<HTMLVideoElement | null>
  onProgress?: (progress: number) => void
}

/**
 * Scroll-driven video scrubber — optimised for smoothness.
 *
 * Key design decisions:
 *
 * 1. SEEK LOCK — browsers queue seeks internally and can accumulate a backlog
 *    when you set currentTime rapidly. We track `isSeeking` and only issue a
 *    new seek once the previous one fires `seeked`. This prevents the "lag"
 *    where the video is seconds behind where the user has scrolled.
 *
 * 2. SCROLL-EVENT DRIVEN, not RAF-polling — we listen to `scroll` and
 *    `resize` events instead of running a 60fps RAF loop that seeks on every
 *    tick regardless of whether anything changed. This removes unnecessary
 *    decoder pressure.
 *
 * 3. PENDING TARGET — if a seek is already in flight we store the desired
 *    target and apply it the moment `seeked` fires, so we never miss the
 *    final position.
 *
 * 4. REFRESH / MID-SCROLL INIT — on mount we immediately compute progress
 *    and seek to the correct frame, covering page-reload-mid-scroll.
 *    We also listen for `loadedmetadata` in case the video isn't ready yet.
 *
 * 5. MINIMUM DELTA — only seek if the target changes by > 1 video-frame worth
 *    of time (≈ 1/30s ≈ 0.033s) to skip redundant seeks.
 */
export function useScrollVideo({ trackRef, videoRef, onProgress }: UseScrollVideoOptions) {
  const isSeekingRef   = useRef(false)
  const pendingTimeRef = useRef<number | null>(null)
  const lastTimeRef    = useRef<number>(-1)
  const metaReadyRef   = useRef(false)

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // ── helpers ──────────────────────────────────────────────

  const getProgress = useCallback((): number => {
    const track = trackRef.current
    if (!track) return 0
    const rect       = track.getBoundingClientRect()
    const scrolled   = -rect.top                         // px scrolled into the track
    const scrollable = rect.height - window.innerHeight   // total scrollable distance
    if (scrollable <= 0) return 0
    return Math.max(0, Math.min(1, scrolled / scrollable))
  }, [trackRef])

  /** Issue a seek, respecting the seek-lock */
  const seekTo = useCallback((targetTime: number) => {
    const video = videoRef.current
    if (!video || !metaReadyRef.current) return

    const duration = video.duration
    if (!duration || !isFinite(duration)) return

    // Clamp
    const clamped = Math.max(0, Math.min(duration, targetTime))

    // Skip if already there (within one frame)
    if (Math.abs(clamped - lastTimeRef.current) < 0.033) return

    if (isSeekingRef.current) {
      // Store for when the current seek completes
      pendingTimeRef.current = clamped
      return
    }

    isSeekingRef.current = true
    lastTimeRef.current  = clamped
    pendingTimeRef.current = null
    video.currentTime    = clamped
  }, [videoRef])

  /** Recalculate progress from scroll and seek */
  const update = useCallback(() => {
    const video = videoRef.current
    if (!video || !metaReadyRef.current) return

    const progress   = getProgress()
    const targetTime = progress * video.duration

    onProgress?.(progress)
    seekTo(targetTime)
  }, [getProgress, seekTo, onProgress, videoRef])

  // ── seeked handler — drains the pending queue ────────────
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onSeeked = () => {
      isSeekingRef.current = false
      const pending = pendingTimeRef.current
      if (pending !== null) {
        pendingTimeRef.current = null
        // Only apply if meaningfully different from where we are now
        if (Math.abs(pending - (videoRef.current?.currentTime ?? 0)) > 0.033) {
          isSeekingRef.current = true
          lastTimeRef.current  = pending
          if (videoRef.current) videoRef.current.currentTime = pending
        }
      }
    }

    video.addEventListener('seeked', onSeeked)
    return () => video.removeEventListener('seeked', onSeeked)
  }, [videoRef])

  // ── metadata ready — seek to correct position immediately ─
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onMeta = () => {
      metaReadyRef.current = true
      // Seek to current scroll position right away (covers page refresh)
      update()
    }

    if (video.readyState >= 1) {
      metaReadyRef.current = true
      // Already have metadata — seek immediately on next tick so the
      // browser has rendered the element
      requestAnimationFrame(update)
    } else {
      video.addEventListener('loadedmetadata', onMeta, { once: true })
    }

    return () => video.removeEventListener('loadedmetadata', onMeta)
  }, [videoRef, update])

  // ── scroll & resize listeners ────────────────────────────
  useEffect(() => {
    if (prefersReducedMotion) {
      // Show final frame, no scrubbing
      const video = videoRef.current
      if (!video) return
      const setEnd = () => {
        if (video.duration && isFinite(video.duration)) {
          video.currentTime = video.duration
          onProgress?.(1)
        }
      }
      if (video.readyState >= 1) setEnd()
      else video.addEventListener('loadedmetadata', setEnd, { once: true })
      return
    }

    const handleScroll = () => update()
    const handleResize = () => update()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    // Run once on mount in case page was reloaded mid-scroll
    update()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [update, prefersReducedMotion, videoRef, onProgress])
}
