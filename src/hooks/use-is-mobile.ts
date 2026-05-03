import { useEffect, useState } from "react";

/**
 * useIsMobile — returns true when viewport width is below `breakpoint`.
 * Default breakpoint matches Tailwind's `md` (768px).
 *
 * SSR-safe: returns `false` on the server (matches the desktop default we
 * prerender). On the client, the initial value is computed synchronously so
 * mobile users never briefly mount the desktop variant of a component (the
 * app uses createRoot, not hydrateRoot, so this won't cause a hydration
 * mismatch).
 */
export const useIsMobile = (breakpoint: number = 768) => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < breakpoint;
  });

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
