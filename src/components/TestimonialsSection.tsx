import { motion } from "framer-motion";
import { Linkedin, Quote } from "lucide-react";
import { ChapterMarker, BentoTile } from "@/components/ui/editorial";

/**
 * TestimonialsSection — three named testimonials with photo, role, and LinkedIn.
 *
 * TODO: replace these placeholders with real client testimonials. Each entry
 * needs: real name, real role, real company, headshot URL, and a LinkedIn URL.
 * If a client cannot be named, anonymise the company ("Series-B SaaS, US") and
 * keep the named contact + role + photo.
 */

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  photo?: string;
  linkedIn?: string;
  isPlaceholder?: boolean;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "ApexifyLabs cut our lead-qualification cycle from 15 hours a week to under two. The team understood our pipeline within the first call — and shipped the first working version in eight days.",
    name: "Placeholder Name",
    role: "VP Operations",
    company: "Series-B SaaS, US",
    photo: undefined,
    linkedIn: undefined,
    isPlaceholder: true,
  },
  {
    quote:
      "What I expected from an agency: a bill. What I got: an end-to-end automation that paid for itself in seven weeks, with a clean handoff so we own and can extend it ourselves.",
    name: "Placeholder Name",
    role: "Head of Growth",
    company: "D2C E-commerce, UK",
    photo: undefined,
    linkedIn: undefined,
    isPlaceholder: true,
  },
  {
    quote:
      "We had three failed attempts at automating patient scheduling before working with ApexifyLabs. They mapped the actual bottleneck (insurance verification), not the obvious one. Different problem, real solution.",
    name: "Placeholder Name",
    role: "COO",
    company: "Multi-site Healthcare, AU",
    photo: undefined,
    linkedIn: undefined,
    isPlaceholder: true,
  },
];

export const TestimonialsSection = () => {
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
                Three voices from the past year. Real engagements, anonymised where contracts require — never the other way around.
              </p>
            </div>
          </div>

          {/* Three columns of testimonials */}
          <div className="grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.figure
                key={i}
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
                  <Quote className="h-8 w-8 text-accent/55" aria-hidden="true" />
                  <blockquote className="mt-6 flex-1 text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
                    "{t.quote}"
                  </blockquote>

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
                        <span className="text-sm font-semibold text-primary-foreground">
                          {t.name}
                        </span>
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
                      <span className="block text-xs text-primary-foreground/60">
                        {t.role} · {t.company}
                      </span>
                    </div>
                  </figcaption>
                  {t.isPlaceholder && (
                    <span className="mt-4 smallcaps text-[0.6rem] text-accent/65">
                      · Representative placeholder ·
                    </span>
                  )}
                </BentoTile>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
