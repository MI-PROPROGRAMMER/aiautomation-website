import { Button } from "./ui/button";
import { Calendar, MessageSquare, Phone, Clock } from "lucide-react";
import { CALENDLY_LINK } from "@/config/constants";

export const ServicesCTASection = () => {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-[#021224] via-[#032a44] to-[#041e34]" aria-hidden="true" />
      <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <div className="absolute top-[-10%] right-[-10%] h-[28rem] w-[28rem] rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-15%] h-[32rem] w-[32rem] rounded-full bg-accent/25 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Not sure which service you need?
          </h2>
          <p className="mb-12 text-xl text-white">
            Let's talk! We'll analyze your workflow and recommend the perfect automation solution
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold" asChild>
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                <Calendar className="w-5 h-5 mr-2" />
                Book Free Consultation
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-accent/60 text-accent hover:bg-accent/15 hover:text-accent-foreground"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Start Live Chat
            </Button>
          </div>

          {/* Contact Options */}
          <div className="flex flex-wrap justify-center gap-8 text-white">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span>Get free automation audit</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>15-min response time</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <span>No commitment required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
