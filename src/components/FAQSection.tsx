import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChapterMarker } from "@/components/ui/editorial";
import { FAQ_ITEMS } from "@/lib/seo";

export const FAQSection = () => {
  const faqs = FAQ_ITEMS.map((item) => ({ question: item.question, answer: item.answer }));

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
