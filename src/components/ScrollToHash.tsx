import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const HEADER_OFFSET = 96;

    const scrollToTargetWithOffset = (target: HTMLElement) => {
      const targetTop = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top: targetTop, behavior: "smooth" });
    };

    const runScroll = () => {
      if (hash) {
        const id = hash.replace("#", "");
        let attempts = 0;
        const maxAttempts = 20;
        const intervalMs = 100;

        const intervalId = window.setInterval(() => {
          const target = document.getElementById(id);
          if (target) {
            window.clearInterval(intervalId);
            requestAnimationFrame(() => scrollToTargetWithOffset(target));
            return;
          }

          attempts += 1;
          if (attempts >= maxAttempts) {
            window.clearInterval(intervalId);
          }
        }, intervalMs);
      } else {
        requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
      }
    };

    runScroll();
  }, [pathname, hash]);

  return null;
};


