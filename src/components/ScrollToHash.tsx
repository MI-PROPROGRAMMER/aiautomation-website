import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Tell any scroll-jacking section (e.g. the Hero) to release its lock
      // BEFORE we try to scroll, otherwise the wheel/scroll handlers will
      // snap us back to 0.
      window.dispatchEvent(new CustomEvent("releaseScrollLock"));

      const id = hash.replace("#", "");
      const target = document.getElementById(id);
      if (target) {
        // Wait a tick for the lock-release state update to commit.
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      }
    } else {
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    }
  }, [pathname, hash]);

  return null;
};
