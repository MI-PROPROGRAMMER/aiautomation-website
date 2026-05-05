import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Quote, Star } from "lucide-react";
import { ChapterMarker, BentoTile } from "@/components/ui/editorial";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  photo?: string;
  linkedIn?: string;
  rating?: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "ApexifyLabs listened to what I had to say, asked lots of questions to make sure they built what I wanted exactly how I wanted. The team never said, 'Isn't this good enough?' — they kept working with me until it was perfect. I love the work they did and am already using them for another project!",
    name: "Sierra Utych",
    role: "Verified Client Review",
    rating: 5,
  },
  {
    quote:
      "I had the pleasure of working with ApexifyLabs on building AI agents, and I couldn't be happier with the experience. From the very start, the team showed incredible professionalism, deep technical expertise, and a real passion for delivering quality work. They not only helped me bring my ideas to life but also went above and beyond to refine and improve them. Their communication was clear and timely, and they were always patient in explaining complex details in a way that made sense. What stood out most was their dedication — ApexifyLabs genuinely cares about the success of the project and puts in the effort to make sure everything runs smoothly. If you're looking for a partner that's reliable, skilled, and easy to work with, I highly recommend ApexifyLabs. They're one of those rare teams that genuinely care, and I will definitely be working with them again in the future.",
    name: "Noah Merriby",
    role: "Verified Client Review",
    rating: 5,
  },
  {
    quote:
      "Another amazing experience working with ApexifyLabs. This project was different from the previous one, yet the team handled it with the same high level of skill, focus, and professionalism. They quickly understood what I needed, implemented the solution smoothly, and made sure every detail was tested and working perfectly. What really stands out about ApexifyLabs is their consistency. No matter how complex the task is, they stay calm, communicative, and solution-oriented. They deliver fast, they deliver clean, and they deliver exactly what you ask for. I'm extremely satisfied with the results and will absolutely continue working with them on future projects.",
    name: "Abdulrahman Khuthalia",
    role: "Verified Client Review",
    rating: 5,
  },
];

const PREVIEW_THRESHOLD = 320;

const StarRow = ({ count }: { count: number }) => (
  <div role="img" aria-label={`${count} out of 5 stars`} className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < count ? "fill-accent text-accent" : "text-primary-foreground/20"}`}
        aria-hidden="true"
      />
    ))}
  </div>
);

export const TestimonialsSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const activeTestimonial = openIndex !== null ? TESTIMONIALS[openIndex] : null;

  return (
    <section className="py-20 md:py-32 bg-[hsl(var(--section-alt))]">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          {/* Editorial header */}
          <div className="mb-16 grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-6">
              <ChapterMarker label="In Their Words" />
              <h2 className="mt-6 text-4xl font-bold leading-[1.05] text-primary-foreground md:text-6xl">
                What our clients
                <span className="block font-normal text-gradient">actually say.</span>
              </h2>
            </div>
            <div className="md:col-span-6 md:pt-16">
              <p className="text-lg leading-relaxed text-primary-foreground/75 md:text-xl">
                Three clients, three different problems, three honest reviews — not anonymised, not edited.
              </p>
            </div>
          </div>

          {/* Three columns */}
          <div className="grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => {
              const isLong = t.quote.length > PREVIEW_THRESHOLD;
              return (
                <motion.figure
                  key={t.name}
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                >
                  <BentoTile
                    tone={i === 1 ? "feature" : "flat"}
                    rounded="lg"
                    className="flex h-full flex-col p-6 md:p-10"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <Quote className="h-8 w-8 text-accent/55" aria-hidden="true" />
                      {t.rating && <StarRow count={t.rating} />}
                    </div>

                    <blockquote
                      className={`mt-6 flex-1 text-lg leading-relaxed text-primary-foreground/90 md:text-xl ${
                        isLong ? "line-clamp-6" : ""
                      }`}
                    >
                      "{t.quote}"
                    </blockquote>

                    {isLong && (
                      <button
                        type="button"
                        onClick={() => setOpenIndex(i)}
                        className="mt-4 cursor-pointer self-start border-b border-primary-foreground/30 pb-1 text-sm text-primary-foreground/70 transition-colors hover:border-accent hover:text-accent"
                      >
                        Read full review
                      </button>
                    )}

                    <div className="hairline-soft mt-8 mb-6" aria-hidden="true" />

                    <figcaption className="flex items-center gap-4">
                      {t.photo ? (
                        <img
                          src={t.photo}
                          alt={t.name}
                          loading="lazy"
                          decoding="async"
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className="h-12 w-12 rounded-full border border-accent/30 bg-accent/10 flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <span className="num-display text-base text-accent/70">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-primary-foreground">{t.name}</span>
                          {t.linkedIn && (
                            <a
                              href={t.linkedIn}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${t.name} on LinkedIn`}
                              className="text-primary-foreground/50 transition-colors hover:text-accent"
                            >
                              <Linkedin size={14} />
                            </a>
                          )}
                        </div>
                        {t.role && (
                          <span className="block text-xs text-primary-foreground/60">{t.role}</span>
                        )}
                      </div>
                    </figcaption>
                  </BentoTile>
                </motion.figure>
              );
            })}
          </div>
        </div>
      </div>

      {/* Full-review modal */}
      <Dialog open={openIndex !== null} onOpenChange={(o) => !o && setOpenIndex(null)}>
        <DialogContent className="max-w-2xl border-white/10 bg-[#050b14] p-8 md:p-12">
          {activeTestimonial && (
            <>
              <DialogTitle className="sr-only">Full review from {activeTestimonial.name}</DialogTitle>
              <Quote className="h-10 w-10 text-accent/55" aria-hidden="true" />

              {activeTestimonial.rating && (
                <div className="mt-4">
                  <StarRow count={activeTestimonial.rating} />
                </div>
              )}

              <blockquote className="mt-6 text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
                "{activeTestimonial.quote}"
              </blockquote>

              <div className="hairline-soft mt-8 mb-6" aria-hidden="true" />

              <div className="flex items-center gap-4">
                <div
                  className="h-12 w-12 rounded-full border border-accent/30 bg-accent/10 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="num-display text-base text-accent/70">
                    {String((openIndex ?? 0) + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <span className="block text-base font-semibold text-primary-foreground">
                    {activeTestimonial.name}
                  </span>
                  {activeTestimonial.role && (
                    <span className="block text-xs text-primary-foreground/60">
                      {activeTestimonial.role}
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
