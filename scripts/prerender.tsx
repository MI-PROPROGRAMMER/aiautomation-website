import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Helmet } from "react-helmet";
import { AppProviders, AppRoutes } from "../src/App";

const routes = ["/", "/services", "/about", "/contact", "/privacy-policy", "/terms-of-service"];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");
const templatePath = path.join(distDir, "index.html");
const template = await fs.readFile(templatePath, "utf-8");

await Promise.all(routes.map(async (route) => writePrerenderedPage(route, renderRoute(route))));

console.log(`Pre-rendered routes: ${routes.join(", ")}`);

function renderRoute(route: string) {
  const appHtml = renderToString(
    <AppProviders>
      <StaticRouter location={route}>
        <AppRoutes />
      </StaticRouter>
    </AppProviders>,
  );

  const helmet = Helmet.renderStatic();

  let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  const headTags = `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}`;
  html = html.replace("<!-- SSR_HEAD_OUTLET -->", headTags);

  return html;
}

async function writePrerenderedPage(route: string, html: string) {
  const outputPath =
    route === "/"
      ? path.join(distDir, "index.html")
      : path.join(distDir, route.replace(/^\//, ""), "index.html");

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, html, "utf-8");
}


