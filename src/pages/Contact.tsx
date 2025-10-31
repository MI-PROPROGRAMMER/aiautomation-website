import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - UX Pilot | Get In Touch</title>
        <meta
          name="description"
          content="Get in touch with UX Pilot. Book a free consultation or reach out to discuss your automation needs. We're here to help transform your business."
        />
        <meta
          name="keywords"
          content="contact UX Pilot, automation consultation, business automation, get in touch"
        />
        <meta property="og:title" content="Contact Us - UX Pilot" />
        <meta
          property="og:description"
          content="Ready to automate your workflows? Get in touch with our team for a free consultation."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-20 gradient-hero relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
                  Let's Start a{" "}
                  <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-accent to-white">
                    Conversation
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
                  Ready to automate your workflows? Get in touch and we'll help you reclaim your time.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-24 bg-[hsl(var(--section-alt))]">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Left: Contact Form */}
                <div className="glass-card p-8 rounded-xl">
                  <h2 className="text-3xl font-bold text-primary-foreground mb-6">Send us a message</h2>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-primary-foreground">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          className="bg-white/5 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-primary-foreground">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          className="bg-white/5 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-primary-foreground">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="bg-white/5 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-primary-foreground">
                        Company (Optional)
                      </Label>
                      <Input
                        id="company"
                        type="text"
                        placeholder="Your Company"
                        className="bg-white/5 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-primary-foreground">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your automation needs..."
                        rows={6}
                        className="bg-white/5 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50 resize-none"
                      />
                    </div>
                    <Button type="submit" className="w-full gradient-accent hover-lift glow-accent text-lg py-6">
                      Send Message
                      <Send className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                </div>

                {/* Right: Contact Info */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-primary-foreground mb-6">Get in touch</h2>
                    <p className="text-lg text-primary-foreground/80 mb-8">
                      Whether you have a question about our services, need a consultation, or want to discuss a
                      potential project, we're here to help.
                    </p>
                  </div>

                  {/* Contact Cards */}
                  <div className="space-y-4">
                    <div className="glass-card p-6 rounded-xl hover-lift">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center flex-shrink-0">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary-foreground mb-1">Email</h3>
                          <a
                            href="mailto:contact@uxpilot.ai"
                            className="text-accent hover:underline text-primary-foreground/80"
                          >
                            contact@uxpilot.ai
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="glass-card p-6 rounded-xl hover-lift">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center flex-shrink-0">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary-foreground mb-1">Phone</h3>
                          <a
                            href="tel:+15551234567"
                            className="text-accent hover:underline text-primary-foreground/80"
                          >
                            +1 (555) 123-4567
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="glass-card p-6 rounded-xl hover-lift">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary-foreground mb-1">Business Hours</h3>
                          <p className="text-primary-foreground/80">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                          <p className="text-primary-foreground/80">Weekend: By appointment</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="glass-card p-6 rounded-xl bg-gradient-accent/10 border-accent/20">
                    <h3 className="font-semibold text-primary-foreground mb-2">Book a Free Consultation</h3>
                    <p className="text-primary-foreground/80 mb-4">
                      Get a free automation audit and discover opportunities to streamline your workflows.
                    </p>
                    <Button className="gradient-accent hover-lift glow-accent w-full">
                      Schedule Free Audit
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
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

