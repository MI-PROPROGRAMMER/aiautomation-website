import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
      return;
    }

    // Tell any scroll-jacking section (e.g. the Hero) to release its lock
    // BEFORE we try to scroll, otherwise the wheel/scroll handlers will
    // snap us back to 0.
    window.dispatchEvent(new CustomEvent("releaseScrollLock"));

    const id = hash.replace("#", "");
    let cancelled = false;
    let attempts = 0;
    const MAX_ATTEMPTS = 60; // ~1s at 60fps — covers lazy-loaded chunks

    const tryScroll = () => {
      if (cancelled) return;
      const target = document.getElementById(id);
      if (!target) {
        if (attempts++ < MAX_ATTEMPTS) requestAnimationFrame(tryScroll);
        return;
      }
      // Two rAFs after lock release so the Hero's wheel/scroll handlers
      // re-register with `mediaFullyExpanded=true`. Otherwise the stale
      // `handleScroll` snaps us back to (0, 0) the moment scrollIntoView
      // fires its scroll event.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (cancelled) return;
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    };

    tryScroll();

    return () => {
      cancelled = true;
    };
  }, [pathname, hash]);

  return null;
};
