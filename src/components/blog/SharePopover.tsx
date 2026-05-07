import { Button } from "@/components/ui/button";
import { Check, Copy, Linkedin, Mail, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type SharePopoverProps = {
  url: string;
  title: string;
  excerpt?: string;
};

export const SharePopover = ({ url, title, excerpt }: SharePopoverProps) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent | TouchEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
    url,
  )}&title=${encodeURIComponent(title)}`;

  const emailBody = excerpt ? `${excerpt}\n\n${url}` : url;
  const mailtoUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(emailBody)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard");
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Couldn't copy — please copy the URL from the address bar");
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <Button
        type="button"
        variant="ghost"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="text-primary-foreground/85 hover:bg-white/5 hover:text-accent"
      >
        <Share2 size={14} className="mr-2" />
        Share
      </Button>

      {open && (
        <div
          role="menu"
          aria-label="Share this article"
          className="absolute left-0 top-full z-30 mt-2 w-64 overflow-hidden rounded-xl border border-white/15 bg-primary/95 shadow-2xl backdrop-blur-md"
        >
          <button
            type="button"
            role="menuitem"
            onClick={handleCopy}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-primary-foreground/90 transition-colors hover:bg-white/5 hover:text-accent cursor-pointer"
          >
            {copied ? (
              <Check size={16} className="text-accent" />
            ) : (
              <Copy size={16} className="text-primary-foreground/70" />
            )}
            <span>{copied ? "Copied!" : "Copy link"}</span>
          </button>

          <a
            role="menuitem"
            href={mailtoUrl}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 border-t border-white/10 px-4 py-3 text-sm text-primary-foreground/90 transition-colors hover:bg-white/5 hover:text-accent"
          >
            <Mail size={16} className="text-primary-foreground/70" />
            <span>Send via email</span>
          </a>

          <a
            role="menuitem"
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 border-t border-white/10 px-4 py-3 text-sm text-primary-foreground/90 transition-colors hover:bg-white/5 hover:text-accent"
          >
            <Linkedin size={16} className="text-primary-foreground/70" />
            <span>Share on LinkedIn</span>
          </a>
        </div>
      )}
    </div>
  );
};
