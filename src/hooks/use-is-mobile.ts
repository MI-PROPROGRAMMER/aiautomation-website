import { useEffect, useState } from "react";

/**
 * useIsMobile — returns true when viewport width is below `breakpoint`.
 * Default breakpoint matches Tailwind's `md` (768px).
 *
 * SSR-safe: returns `false` on the server (matches the desktop default we
 * prerender) and updates after mount.
 */
export const useIsMobile = (breakpoint: number = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();

    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = () => check();
    mq.addEventListener("change", onChange);
    window.addEventListener("resize", check);

    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("resize", check);
    };
  }, [breakpoint]);

  return isMobile;
};
