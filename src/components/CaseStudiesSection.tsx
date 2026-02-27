import { BadgeCheck, Bot, Workflow } from "lucide-react";

export const CaseStudiesSection = () => {
  const portfolioItems = [
    {
      title: "Customer Interaction Chatbot Demo",
      type: "video" as const,
      category: "WhatsApp Automation",
      description: "Live walkthrough of a chatbot automating customer interactions for gyms.",
      assetPath: "/resources/Chatbot (whatsapp)/Automating Customer Interaction_ A Chatbot Solution for Gyms.mp4",
    },
    {
      title: "WhatsApp, Instagram, Messenger Chatbot",
      type: "image" as const,
      category: "Omnichannel Chatbot",
      description: "Unified chatbot setup handling conversations across major messaging channels.",
      assetPath: "/resources/Chatbot (whatsapp)/Chatbot for whatsapp, instagram, messenger automation screenshot.png",
    },
    {
      title: "WhatsApp Bot Conversation Flow",
      type: "image" as const,
      category: "Conversation Design",
      description: "Sample end-to-end conversation between customer and automation assistant.",
      assetPath: "/resources/Chatbot (whatsapp)/whatsapp conversation between chatbot and human screenshot.png",
    },
    {
      title: "WhatsApp Assistant Response Demo",
      type: "image" as const,
      category: "Customer Support Bot",
      description: "Automated response quality and routing shown in an actual WhatsApp flow.",
      assetPath: "/resources/Chatbot (whatsapp)/conversation with whatsapp bot.png",
    },
    {
      title: "n8n Omnichannel Chatbot Workflow",
      type: "image" as const,
      category: "n8n Workflow",
      description: "n8n-based workflow powering chatbot interactions across WhatsApp, Instagram, and Messenger.",
      assetPath: "/resources/n8n-portfolio/Chatbot for whatsapp, instagram, messenger.png",
    },
    {
      title: "Discord and Telegram Posting Automation",
      type: "image" as const,
      category: "Content Automation",
      description: "Automated publishing flow for cross-posting content to Discord and Telegram channels.",
      assetPath: "/resources/n8n-portfolio/Discord and Telegram Posting Automation.png",
    },
    {
      title: "Discord AI Conversation Starter",
      type: "image" as const,
      category: "Community Automation",
      description: "Workflow that starts contextual AI conversations with community members.",
      assetPath: "/resources/n8n-portfolio/Discord AI Conversation Starter.png",
    },
    {
      title: "Discord and Telegram Automation (Khawar)",
      type: "image" as const,
      category: "Cross-platform Automation",
      description: "Automation setup showing synchronized actions across Discord and Telegram.",
      assetPath: "/resources/n8n-portfolio/Dicord and Telegram Automation Khawar.png",
    },
    {
      title: "Discord AI Conversation Responder",
      type: "image" as const,
      category: "AI Responder",
      description: "Automated AI responder flow for handling and continuing Discord conversations.",
      assetPath: "/resources/n8n-portfolio/Discord AI Conversation Responder.png",
    },
  ];

  return (
    <section id="portfolio" className="py-24 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Our <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="text-xl text-primary-foreground/80">
            Real chatbot and n8n automation work delivered for client use-cases.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {portfolioItems.map((item) => (
            <article key={item.assetPath} className="glass-card-light rounded-3xl p-5 hover-lift h-full">
              <div className="rounded-2xl overflow-hidden border border-white/10 mb-5 bg-primary-dark/30">
                {item.type === "video" ? (
                  <video className="w-full h-56 object-cover" controls muted preload="metadata">
                    <source src={encodeURI(item.assetPath)} type="video/mp4" />
                    Your browser does not support video playback.
                  </video>
                ) : (
                  <img
                    src={encodeURI(item.assetPath)}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-56 object-cover"
                  />
                )}
              </div>

              <div className="flex items-center gap-2 mb-3">
                {item.category.includes("n8n") ? (
                  <Workflow className="w-5 h-5 text-accent" />
                ) : item.category.includes("AI") || item.category.includes("Chatbot") ? (
                  <Bot className="w-5 h-5 text-accent" />
                ) : (
                  <BadgeCheck className="w-5 h-5 text-accent" />
                )}
                <p className="text-sm text-accent font-semibold">{item.category}</p>
              </div>

              <h3 className="text-lg font-bold text-primary-foreground mb-2 leading-snug">{item.title}</h3>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
