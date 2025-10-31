import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  const faqs = [
    {
      question: "How long does an automation project typically take?",
      answer:
        "Most automation projects are completed within 2-6 weeks, depending on complexity. Simple workflows can be automated in days, while enterprise-level solutions may take 2-3 months. We provide detailed timelines during our initial consultation.",
    },
    {
      question: "What if something breaks or stops working?",
      answer:
        "We provide ongoing monitoring and support for all automations. Our team receives instant alerts if anything stops working, and we typically resolve issues within hours. All clients get access to our support team and regular maintenance updates.",
    },
    {
      question: "Do I need technical knowledge to use the automations?",
      answer:
        "Not at all! We design automations to be user-friendly and provide comprehensive training for your team. Most automations run in the background automatically, and when interaction is needed, we create intuitive interfaces that anyone can use.",
    },
    {
      question: "How much does automation cost?",
      answer:
        "Costs vary based on complexity and scope. Simple automations start around $2,000, while comprehensive systems range from $10,000-$50,000. However, most clients see ROI within 3-6 months through time savings and efficiency gains. We provide detailed cost-benefit analysis during consultation.",
    },
    {
      question: "Can you integrate with our existing software?",
      answer:
        "Yes! We work with 1000+ popular business applications including CRMs, ERPs, project management tools, and custom software. If your tools have an API or integration capability, we can connect them. We'll assess compatibility during our discovery phase.",
    },
    {
      question: "What happens if we want to make changes later?",
      answer:
        "All our automations are designed to be flexible and scalable. We can modify, expand, or optimize your automations as your business evolves. Many clients start with one automation and gradually expand to automate more processes over time.",
    },
  ];

  return (
    <section className="py-24 bg-[hsl(var(--section-alt))]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-xl text-primary-foreground/80">
            Everything you need to know about automation services
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card-light rounded-2xl px-8 border-0"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-primary-foreground hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-primary-foreground/80 leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
