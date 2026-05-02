import { useEffect, useState } from "react";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

interface MediaAbout {
  overview: string;
  conclusion: string;
}

interface MediaContent {
  src: string;
  poster?: string;
  background: string;
  title: string;
  date: string;
  scrollToExpand: string;
  about: MediaAbout;
}

type MediaType = "video" | "image";

const sampleMediaContent: Record<MediaType, MediaContent> = {
  video: {
    src: "https://cdn.coverr.co/videos/coverr-earth-rotation-1579/1080p.mp4",
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1400&auto=format&fit=crop",
    background: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1920&auto=format&fit=crop",
    title: "Immersive Video Experience",
    date: "Cosmic Journey",
    scrollToExpand: "Scroll to Expand Demo",
    about: {
      overview:
        "This demonstrates ScrollExpandMedia using video. As you scroll, the media expands to create an immersive reveal.",
      conclusion:
        "You can switch between video and image while preserving the same luxury interaction model and narrative pacing.",
    },
  },
  image: {
    src: "https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=1280&auto=format&fit=crop",
    background: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop",
    title: "Dynamic Image Showcase",
    date: "Underwater Adventure",
    scrollToExpand: "Scroll to Expand Demo",
    about: {
      overview:
        "This demonstrates ScrollExpandMedia with a static image. The same expansion effect creates a premium visual journey.",
      conclusion:
        "The component works equally well for both media modes, making it flexible for different storytelling needs.",
    },
  },
};

const MediaContentBlock = ({ mediaType }: { mediaType: MediaType }) => {
  const currentMedia = sampleMediaContent[mediaType];

  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="mb-6 text-3xl font-bold text-primary-foreground">About This Component</h2>
      <p className="mb-8 text-lg text-primary-foreground/90">{currentMedia.about.overview}</p>
      <p className="text-lg text-primary-foreground/90">{currentMedia.about.conclusion}</p>
    </div>
  );
};

const ScrollExpansionHeroDemo = () => {
  const [mediaType, setMediaType] = useState<MediaType>("video");
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event("resetSection"));
  }, [mediaType]);

  return (
    <div className="min-h-screen">
      <div className="fixed right-4 top-4 z-50 flex gap-2">
        <button
          onClick={() => setMediaType("video")}
          className={`cursor-pointer rounded-lg px-4 py-2 ${
            mediaType === "video" ? "bg-white text-black" : "border border-white/30 bg-black/50 text-white"
          }`}
        >
          Video
        </button>
        <button
          onClick={() => setMediaType("image")}
          className={`cursor-pointer rounded-lg px-4 py-2 ${
            mediaType === "image" ? "bg-white text-black" : "border border-white/30 bg-black/50 text-white"
          }`}
        >
          Image
        </button>
      </div>

      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={mediaType === "video" ? currentMedia.poster : undefined}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContentBlock mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export default ScrollExpansionHeroDemo;
