import { Button } from "./ui/button";
import { Calendar, MessageSquare, Phone, Clock } from "lucide-react";

export const ServicesCTASection = () => {
  return (
    <section className="py-24 bg-gradient-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Not sure which service you need?
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Let's talk! We'll analyze your workflow and recommend the perfect automation solution
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
              <Calendar className="w-5 h-5 mr-2" />
              Book Free Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <MessageSquare className="w-5 h-5 mr-2" />
              Start Live Chat
            </Button>
          </div>

          {/* Contact Options */}
          <div className="flex flex-wrap gap-8 justify-center text-white/80">
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
