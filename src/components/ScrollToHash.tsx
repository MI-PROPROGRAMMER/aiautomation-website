import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const runScroll = () => {
      if (hash) {
        const id = hash.replace("#", "");
        const target = document.getElementById(id);
        if (target) {
          requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: "start" }));
        }
      } else {
        requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
      }
    };

    runScroll();
  }, [pathname, hash]);

  return null;
};


