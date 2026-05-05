import { Helmet } from "react-helmet";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/**
 * Renders a JSON-LD <script> tag inside <head> via react-helmet so that
 * structured data ships in the prerendered static HTML for each route.
 */
export const JsonLd = ({ data }: JsonLdProps) => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify(data)}</script>
  </Helmet>
);
