import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChapterMarker } from "@/components/ui/editorial";

export const FAQSection = () => {
  const faqs = [
    {
      question: "How long does an automation project typically take?",
      answer:
        "Most automation projects ship in 2–6 weeks, depending on complexity. Simple workflows can be live in days; enterprise-level systems may take 2–3 months. We provide detailed timelines and acceptance criteria during the initial consultation.",
    },
    {
      question: "What if something breaks or stops working?",
      answer:
        "We provide ongoing monitoring and support for all automations. Our team receives instant alerts on any failure and typically resolves issues within hours. All clients have direct access to our support team and a regular maintenance cadence.",
    },
    {
      question: "Do I need technical knowledge to use the automations?",
      answer:
        "Not at all. We design automations to be invisible — they run in the background. Where interaction is needed, we build clean interfaces and provide hands-on training for your team.",
    },
    {
      question: "How much does automation cost?",
      answer:
        "Cost varies with complexity and scope. Focused automations start around $2,000; comprehensive systems range from $10,000–$50,000. Most clients see ROI within 3–6 months — we provide a written cost-benefit analysis before any work begins.",
    },
    {
      question: "Can you integrate with our existing software?",
      answer:
        "Yes. We work with 1,000+ business applications including CRMs, ERPs, project management tools, and custom internal software. If your stack has an API or webhook surface, we can connect to it. Compatibility is assessed during discovery.",
    },
    {
      question: "What happens if we want to make changes later?",
      answer:
        "Every automation we build is designed to be modified, expanded, and optimised as your business evolves. Many clients begin with one automation and expand to a portfolio over the following 12 months.",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-primary">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          {/* Editorial header */}
          <div className="mb-16 text-center">
            <ChapterMarker label="Frequently Asked" align="center" />
            <h2 className="mx-auto mt-8 max-w-3xl text-4xl font-bold leading-[1.05] text-primary-foreground md:text-6xl">
              Questions, <span className="font-normal text-gradient">answered.</span>
            </h2>
          </div>

          {/* Hairline-divided list — NO glass cards */}
          <div className="border-t border-accent/30">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-primary-foreground/10"
                >
                  <AccordionTrigger className="group py-7 text-left text-lg font-semibold text-primary-foreground hover:no-underline md:text-xl">
                    <span className="flex items-baseline gap-6">
                      <span className="num-display text-base text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="transition-colors group-hover:text-accent">
                        {faq.question}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 pl-12 text-base leading-relaxed text-primary-foreground/75 md:text-lg">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};
