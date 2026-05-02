import { type ReactNode, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc?: string;
  posterSrc?: string;
  bgImageSrc?: string;
  /**
   * Replace the foreground media with arbitrary React content. May be either a
   * ReactNode or a render function that receives the current scroll progress
   * (0 → 1) so the inner content can animate in sync with the expansion.
   */
  mediaContent?: ReactNode | ((progress: number) => ReactNode);
  /** Replace the background image with arbitrary React content (covers the section). */
  bgContent?: ReactNode;
  /**
   * Screen-filling overlay that sits ABOVE the media. When provided, replaces
   * the default split-title h2s. May be a function receiving scroll progress
   * (0 → 1). Useful for cover/curtain effects that reveal the media beneath.
   */
  overlayContent?: ReactNode | ((progress: number) => ReactNode);
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  mediaContent,
  bgContent,
  overlayContent,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobileState, setIsMobileState] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  useEffect(() => {
    const resetState = () => {
      setScrollProgress(0);
      setShowContent(false);
      setMediaFullyExpanded(false);
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    // Release the scroll-jacking lock so navigation/hash links can scroll past
    // the hero (e.g. clicking "Work" should jump to #case-studies).
    const releaseLock = () => {
      setScrollProgress(1);
      setMediaFullyExpanded(true);
      setShowContent(true);
    };

    window.addEventListener("resetSection", resetState as EventListener);
    window.addEventListener("releaseScrollLock", releaseLock as EventListener);

    // If page loads with a hash already present (e.g. /#case-studies), release
    // immediately so the browser can jump to the target.
    if (window.location.hash) {
      releaseLock();
    }

    return () => {
      window.removeEventListener("resetSection", resetState as EventListener);
      window.removeEventListener("releaseScrollLock", releaseLock as EventListener);
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e: globalThis.WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
        return;
      }

      if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: globalThis.TouchEvent) => {
      setTouchStartY(e.touches[0]?.clientY ?? 0);
    };

    const handleTouchMove = (e: globalThis.TouchEvent) => {
      if (!touchStartY) return;

      const touchY = e.touches[0]?.clientY ?? touchStartY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
        return;
      }

      if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => {
      setTouchStartY(0);
    };

    const handleScroll = () => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const checkIfMobile = () => setIsMobileState(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const baseMediaWidth = isMobileState ? 280 : 460;
  const expandedMediaWidth = isMobileState ? 960 : 1450;
  const mediaWidth = baseMediaWidth + scrollProgress * (expandedMediaWidth - baseMediaWidth);
  const mediaHeight = mediaWidth * (isMobileState ? 0.72 : 0.58);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);
  const mediaRevealProgress = Math.min(scrollProgress / 0.2, 1);

  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";

  return (
    <div ref={sectionRef} className="overflow-x-hidden transition-colors duration-700 ease-in-out">
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-start">
        <div className="relative flex min-h-[100dvh] w-full flex-col items-center">
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            {bgContent ? (
              <div className="absolute inset-0">{bgContent}</div>
            ) : (
              <>
                <img
                  src={bgImageSrc}
                  alt="Background visual"
                  className="h-screen w-screen object-cover object-center"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-black/20" />
              </>
            )}
          </motion.div>

          <div className="container relative z-10 mx-auto flex flex-col items-center justify-start px-4">
            <div className="relative h-[100dvh] w-full">
              <motion.div
                className="absolute inset-0 z-0 flex items-center justify-center transition-none"
                animate={{
                  opacity: mediaRevealProgress,
                  scale: 0.9 + mediaRevealProgress * 0.1,
                }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
              <div
                className="rounded-2xl"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: "95vw",
                  maxHeight: "85vh",
                  boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.3)",
                }}
              >
                {mediaContent ? (
                  <div className="h-full w-full overflow-hidden rounded-2xl">
                    {typeof mediaContent === "function" ? mediaContent(scrollProgress) : mediaContent}
                  </div>
                ) : mediaType === "video" ? (
                  mediaSrc.includes("youtube.com") ? (
                    <div className="relative h-full w-full pointer-events-none">
                      <iframe
                        width="100%"
                        height="100%"
                        src={
                          mediaSrc.includes("embed")
                            ? `${mediaSrc}${mediaSrc.includes("?") ? "&" : "?"}autoplay=1&mute=1&loop=1&controls=0&rel=0&disablekb=1&modestbranding=1`
                            : `${mediaSrc.replace("watch?v=", "embed/")}?autoplay=1&mute=1&loop=1&controls=0&rel=0&disablekb=1&modestbranding=1&playlist=${mediaSrc.split("v=")[1] ?? ""}`
                        }
                        className="h-full w-full rounded-xl"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-black/30"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  ) : (
                    <div className="relative h-full w-full pointer-events-none">
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="h-full w-full rounded-xl object-cover"
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-black/30"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  )
                ) : (
                  <div className="relative h-full w-full">
                    <img src={mediaSrc} alt={title || "Media content"} className="h-full w-full rounded-xl object-cover" />
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-black/50"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}
              </div>
              </motion.div>

              {overlayContent ? (
                <div className="absolute inset-0 z-10">
                  {typeof overlayContent === "function" ? overlayContent(scrollProgress) : overlayContent}
                </div>
              ) : (
                <div
                  className={`pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 text-center transition-none ${textBlend ? "mix-blend-difference" : "mix-blend-normal"}`}
                >
                  <motion.h2
                    className="text-4xl font-bold text-blue-200 transition-none md:text-5xl lg:text-6xl"
                    style={{ transform: `translateX(-${textTranslateX}vw)` }}
                  >
                    {firstWord}
                  </motion.h2>
                  <motion.h2
                    className="text-center text-4xl font-bold text-blue-200 transition-none md:text-5xl lg:text-6xl"
                    style={{ transform: `translateX(${textTranslateX}vw)` }}
                  >
                    {restOfTitle}
                  </motion.h2>
                </div>
              )}

              {(date || scrollToExpand) && (
                <div className="pointer-events-none absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center text-center">
                  {date && (
                    <p className="text-2xl text-blue-200" style={{ transform: `translateX(-${textTranslateX}vw)` }}>
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p className="text-center font-medium text-blue-200" style={{ transform: `translateX(${textTranslateX}vw)` }}>
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              )}
            </div>

            <motion.section
              className="flex w-full flex-col px-4 py-10 md:px-8 lg:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
