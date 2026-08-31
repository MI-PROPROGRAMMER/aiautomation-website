import { Button } from "@/components/ui/button";
import { getServiceCta } from "@/lib/blog-taxonomy";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type ServiceCTAProps = {
  tags?: string[];
};

/**
 * End-of-article CTA pointing at the service that actually solves the problem
 * the post describes, chosen from the post's own tags.
 *
 * Before this existed every post ended by offering `/contact` and nothing else,
 * so a reader who had just read 1,400 words about their exact operational
 * problem was handed a generic form instead of the relevant engagement — and
 * the four commercial pages held 31 internal links between them while /about
 * held 106.
 */
export const ServiceCTA = ({ tags }: ServiceCTAProps) => {
  const { service, heading, body } = getServiceCta(tags);

  return (
    <aside className="mt-16 rounded-2xl border border-accent/20 bg-accent/[0.04] px-6 py-10 md:px-10">
      <span className="eyebrow text-accent">Where this goes next</span>

      <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-primary-foreground md:text-3xl">
        {heading}
      </h2>

      <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/75">
        {body}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Button asChild className="gradient-accent hover-lift glow-accent">
          <Link to={service.path} className="cursor-pointer">
            Explore {service.name}
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </Button>

        <Link
          to="/contact"
          className="cursor-pointer text-sm font-semibold text-primary-foreground/70 underline decoration-primary-foreground/25 underline-offset-4 transition-colors duration-200 hover:text-accent"
        >
          Or book a free automation audit
        </Link>
      </div>
    </aside>
  );
};
