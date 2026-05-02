import { Button } from "./ui/button";
import { Calendar, MessageSquare, Phone, Clock } from "lucide-react";
import { CALENDLY_LINK, CONTACT_EMAIL } from "@/config/constants";

export const ServicesCTASection = () => {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-[#021224] via-[#032a44] to-[#041e34]" aria-hidden="true" />
      <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
      <div className="absolute inset-0 opacity-25" aria-hidden="true">
        <div className="absolute top-[-10%] right-[-10%] h-[28rem] w-[28rem] rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-15%] h-[32rem] w-[32rem] rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-16">
            <div className="md:col-span-7">
              <span className="eyebrow">Not sure which fits?</span>
              <h2 className="mt-5 text-4xl font-bold leading-[1.05] text-white md:text-5xl lg:text-6xl">
                Let's talk.
                <span className="block font-normal text-gradient">We'll figure it out together.</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
                We'll analyse your workflow and recommend the automation that delivers the
                fastest, most durable ROI — no upsell, no commitment.
              </p>
            </div>

            <div className="md:col-span-5 space-y-6">
              <div className="hairline" aria-hidden="true" />
              <div className="flex flex-col gap-3">
                <Button size="lg" className="gradient-accent hover-lift glow-accent w-full sheen-card" asChild>
                  <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book free consultation
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="w-full justify-center text-white/85 hover:bg-white/5 hover:text-white"
                >
                  <a href={`mailto:${CONTACT_EMAIL}`}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Email us instead
                  </a>
                </Button>
              </div>
              <div className="hairline-soft" aria-hidden="true" />
              <ul className="grid grid-cols-1 gap-3 text-sm text-white/75">
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-accent" />
                  <span>Free automation audit</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-accent" />
                  <span>15-minute response time</span>
                </li>
                <li className="flex items-center gap-3">
                  <MessageSquare className="h-4 w-4 text-accent" />
                  <span>No commitment required</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
