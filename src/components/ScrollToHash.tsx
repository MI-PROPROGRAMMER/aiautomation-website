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

    // Force every `.cv-auto` section to fully render so its real height is
    // in the layout. Without this, scrollIntoView computes the target y
    // against the 800px contain-intrinsic-size placeholder and lands several
    // sections short of the actual target.
    const root = document.documentElement;
    root.classList.add("scrolling-to-hash");

    const id = hash.replace("#", "");
    let cancelled = false;
    let attempts = 0;
    const MAX_ATTEMPTS = 60; // ~1s at 60fps — covers lazy-loaded chunks

    const release = () => root.classList.remove("scrolling-to-hash");

    const tryScroll = () => {
      if (cancelled) return;
      const target = document.getElementById(id);
      if (!target) {
        if (attempts++ < MAX_ATTEMPTS) {
          requestAnimationFrame(tryScroll);
        } else {
          release();
        }
        return;
      }

      // Two rAFs after lock release + cv-auto override so the Hero's
      // wheel/scroll handlers re-register with `mediaFullyExpanded=true`
      // AND the browser has had a chance to lay out the now-visible
      // sections at their real heights.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (cancelled) {
            release();
            return;
          }
          // `behavior: "instant"` is required because `html` has
          // `scroll-behavior: smooth` set globally, which would otherwise
          // make `behavior: "auto"` smooth-scroll across many sections —
          // racy when layout is settling.
          target.scrollIntoView({ behavior: "instant", block: "start" });
          // One more rAF to let any final layout shift (e.g. images/fonts
          // settling inside the target's section) be absorbed before we
          // release the cv-auto override.
          requestAnimationFrame(() => {
            if (cancelled) {
              release();
              return;
            }
            target.scrollIntoView({ behavior: "instant", block: "start" });
            release();
          });
        });
      });
    };

    tryScroll();

    return () => {
      cancelled = true;
      release();
    };
  }, [pathname, hash]);

  return null;
};
