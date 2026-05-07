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
      // `handleScroll` snaps us back to (0, 0) the moment we scroll.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (cancelled) return;

          // Sections below the fold use `content-visibility: auto` with a
          // placeholder `contain-intrinsic-size`. Smooth-scroll computes the
          // target y from those placeholders, but as the scroll passes each
          // section it renders and the real size replaces the placeholder —
          // the smooth-scroll keeps tracking the (now stale) y and lands
          // short of the target. Instant-scroll, then re-correct after a
          // few frames so any final layout shift is absorbed.
          target.scrollIntoView({ behavior: "auto", block: "start" });

          let recorrects = 0;
          const recorrect = () => {
            if (cancelled || recorrects++ >= 3) return;
            target.scrollIntoView({ behavior: "auto", block: "start" });
            requestAnimationFrame(recorrect);
          };
          requestAnimationFrame(recorrect);
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
