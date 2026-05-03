import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, Mail, Phone, Clock, Send } from "lucide-react";
import { CALENDLY_LINK, CONTACT_EMAIL, EMAILJS_CONFIG } from "@/config/constants";
import { useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";
import { ChapterMarker, BentoTile } from "@/components/ui/editorial";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    companyWebsite: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.companyWebsite.trim() !== "") return;

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast({ title: "Validation Error", description: "Please fill in your first and last name.", variant: "destructive" });
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      toast({ title: "Validation Error", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    if (!formData.message.trim()) {
      toast({ title: "Validation Error", description: "Please enter your message.", variant: "destructive" });
      return;
    }

    if (
      EMAILJS_CONFIG.SERVICE_ID === "YOUR_SERVICE_ID" ||
      EMAILJS_CONFIG.TEMPLATE_ID === "YOUR_TEMPLATE_ID" ||
      EMAILJS_CONFIG.PUBLIC_KEY === "YOUR_PUBLIC_KEY"
    ) {
      toast({
        title: "Configuration Required",
        description: "EmailJS is not configured yet. Please set up your EmailJS credentials in src/config/constants.ts",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        company: formData.company || "Not provided",
        message: formData.message,
        to_email: EMAILJS_CONFIG.RECIPIENT_EMAIL,
      };
      await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams);
      toast({ title: "Message Sent!", description: "Thank you for contacting us. We'll get back to you soon." });
      setFormData({ firstName: "", lastName: "", email: "", company: "", companyWebsite: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Error Sending Message",
        description: `There was an error sending your message. Please try again or email us directly at ${CONTACT_EMAIL}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - ApexifyLabs | Get In Touch</title>
        <meta
          name="description"
          content="Get in touch with ApexifyLabs. Book a free consultation or reach out to discuss your automation needs. We're here to help transform your business."
        />
        <meta property="og:title" content="Contact Us - ApexifyLabs" />
        <meta property="og:description" content="Ready to automate your workflows? Get in touch with our team for a free consultation." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://apexifylabs.com/contact" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        <main>
          {/* Editorial hero */}
          <section className="relative overflow-hidden pt-28 md:pt-40 pb-16 md:pb-24 gradient-hero">
            <div className="absolute inset-0 opacity-25" aria-hidden="true">
              <div className="absolute -right-32 top-0 h-[40rem] w-[40rem] rounded-full bg-accent/15 blur-3xl" />
              <div className="absolute -left-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-accent/10 blur-3xl" />
            </div>
            <div className="container relative z-10 mx-auto px-4">
              <div className="mx-auto max-w-6xl">
                <ChapterMarker number="" label="Contact" />
                <h1 className="mt-8 max-w-5xl text-4xl font-bold leading-[1.05] text-primary-foreground sm:text-5xl md:text-7xl lg:text-8xl">
                  Let's start a
                  <span className="block font-normal text-gradient">conversation.</span>
                </h1>
                <p className="mt-10 max-w-2xl text-lg leading-relaxed text-primary-foreground/85 md:text-xl">
                  Ready to automate your workflows? Get in touch and we'll help you reclaim your time.
                </p>
              </div>
            </div>
          </section>

          {/* Contact body — form (left, large) + meta (right, narrow) */}
          <section className="py-24 bg-[hsl(var(--section-alt))]">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-6xl">
                <div className="grid gap-12 md:grid-cols-12 md:gap-16">
                  {/* Form */}
                  <div className="md:col-span-7">
                    <BentoTile tone="feature" rounded="xl" className="p-6 md:p-12">
                      <span className="eyebrow">Send us a message</span>
                      <h2 className="mt-3 text-3xl font-bold text-primary-foreground md:text-4xl">
                        Tell us about your <span className="font-normal text-gradient">project.</span>
                      </h2>
                      <div className="hairline-soft mt-8 mb-8" aria-hidden="true" />
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="hidden" aria-hidden="true">
                          <Label htmlFor="companyWebsite" className="text-primary-foreground">Company Website</Label>
                          <Input
                            id="companyWebsite"
                            type="text"
                            autoComplete="off"
                            tabIndex={-1}
                            value={formData.companyWebsite}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="smallcaps text-xs text-primary-foreground/70">First Name *</Label>
                            <Input
                              id="firstName"
                              type="text"
                              placeholder="John"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              required
                              disabled={isSubmitting}
                              className="bg-white/5 border-white/15 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:border-accent"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="smallcaps text-xs text-primary-foreground/70">Last Name *</Label>
                            <Input
                              id="lastName"
                              type="text"
                              placeholder="Doe"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              required
                              disabled={isSubmitting}
                              className="bg-white/5 border-white/15 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:border-accent"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="smallcaps text-xs text-primary-foreground/70">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            disabled={isSubmitting}
                            className="bg-white/5 border-white/15 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:border-accent"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company" className="smallcaps text-xs text-primary-foreground/70">Company (Optional)</Label>
                          <Input
                            id="company"
                            type="text"
                            placeholder="Your company"
                            value={formData.company}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                            className="bg-white/5 border-white/15 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:border-accent"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message" className="smallcaps text-xs text-primary-foreground/70">Message *</Label>
                          <Textarea
                            id="message"
                            placeholder="Tell us about your automation needs…"
                            rows={6}
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            disabled={isSubmitting}
                            className="bg-white/5 border-white/15 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:border-accent resize-none"
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full gradient-accent hover-lift glow-accent text-base py-6 sheen-card disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="animate-spin mr-2">⏳</span>
                              Sending…
                            </>
                          ) : (
                            <>
                              Send message
                              <Send className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                      </form>
                    </BentoTile>
                  </div>

                  {/* Meta column — list, NOT four boxes */}
                  <div className="md:col-span-5 space-y-10">
                    <div>
                      <span className="eyebrow">Get in touch</span>
                      <h2 className="mt-3 text-3xl font-bold text-primary-foreground md:text-4xl">
                        We'd love to <span className="font-normal text-gradient">hear from you.</span>
                      </h2>
                      <p className="mt-4 text-base leading-relaxed text-primary-foreground/75">
                        Whether you have a question, need a consultation, or want to discuss a potential
                        engagement — we're here to help.
                      </p>
                    </div>

                    <div className="hairline" aria-hidden="true" />

                    <ul className="space-y-7">
                      <li className="flex items-start gap-5">
                        <Mail className="mt-1 h-5 w-5 text-accent" />
                        <div>
                          <span className="smallcaps text-xs text-primary-foreground/55">Email</span>
                          <a
                            href={`mailto:${CONTACT_EMAIL}`}
                            className="block text-lg text-primary-foreground transition-colors hover:text-accent"
                          >
                            {CONTACT_EMAIL}
                          </a>
                        </div>
                      </li>
                      <li className="flex items-start gap-5">
                        <Phone className="mt-1 h-5 w-5 text-accent" />
                        <div>
                          <span className="smallcaps text-xs text-primary-foreground/55">Phone</span>
                          <a
                            href="tel:+923315183565"
                            className="block text-lg text-primary-foreground transition-colors hover:text-accent"
                          >
                            +92 331 5183565
                          </a>
                        </div>
                      </li>
                      <li className="flex items-start gap-5">
                        <Clock className="mt-1 h-5 w-5 text-accent" />
                        <div>
                          <span className="smallcaps text-xs text-primary-foreground/55">Hours</span>
                          <p className="text-base text-primary-foreground/85">Mon – Fri · 9 AM – 11 PM PKT</p>
                          <p className="text-sm text-primary-foreground/65">Weekend by appointment, invite only</p>
                        </div>
                      </li>
                    </ul>

                    <div className="hairline-soft" aria-hidden="true" />

                    <div>
                      <span className="eyebrow">Or — book directly</span>
                      <h3 className="mt-3 text-xl font-bold text-primary-foreground">
                        Free 30-minute consultation
                      </h3>
                      <p className="mt-2 text-sm text-primary-foreground/70">
                        Get a free automation audit and discover where your team is leaking time.
                      </p>
                      <Button className="mt-4 w-full gradient-accent hover-lift glow-accent" asChild>
                        <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                          Schedule free audit
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Contact;
