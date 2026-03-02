# 🚀 ApexifyLabs - AI Automation Agency Website

<div align="center">

![ApexifyLabs](https://img.shields.io/badge/ApexifyLabs-AI%20Automation-00B5E2?style=for-the-badge&logo=artificial-intelligence&logoColor=white)
![React](https://img.shields.io/badge/React-18.3+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Transform your business with intelligent AI solutions**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Deployment](#-deployment)

</div>

---

## ✨ Overview

ApexifyLabs is a modern, high-performance website for an AI Automation Agency. Built with Vite, React, and TypeScript, this platform showcases automation services, case studies, an interactive ROI calculator, industry-specific solutions, and a blog. The design features a futuristic aesthetic with glass morphism effects, smooth animations, and a professional dark blue color scheme.

## 🎨 Design System

### Color Palette

- **Primary**: `#002347` - Dark Blue (Trust, Intelligence)
- **Secondary**: `#FFFFFF` - White (Clarity, Simplicity)
- **Neutral**: `#F2F2F2` - Light Gray (Balance, Background)
- **Accent**: `#00B5E2` - Cyan (Vibrant, Tech-Forward)

### Design Principles

- **Modern & Futuristic**: Sleek, tech-forward aesthetic
- **Glass Morphism**: Transparent elements with backdrop blur
- **Smooth Animations**: Subtle hover effects and micro-interactions
- **Clean & Minimal**: Plenty of white space, clear visual hierarchy
- **Rounded Corners**: 8px-12px border radius on cards and buttons
- **Gradients**: Subtle gradients using accent cyan and dark blue

### Typography

- **Headings**: Inter Bold / Poppins SemiBold
- **Body**: Inter Regular / Poppins Regular
- **Responsive**: Fluid typography scales across devices

## ✨ Features

- 🎯 **Modern UI/UX**: Glass morphism effects with smooth animations
- 📱 **Mobile-First**: Fully responsive design across all devices
- ⚡ **Performance**: Optimized with Vite, lazy-loaded routes, and code splitting
- 🎨 **Design System**: Consistent color palette and typography
- 📊 **Interactive Components**: ROI calculator, FAQ accordion, case studies carousel
- 🌐 **SEO Optimized**: Meta tags via React Helmet, sitemap, and robots.txt
- 📝 **Blog**: MDX-powered blog system with post cards and individual post pages
- 📧 **Contact Form**: EmailJS-powered contact form (no backend required)
- 🗺️ **Global Reach Map**: Interactive world map visualization
- 🎭 **Accessible**: WCAG compliant components via Radix UI

## 🛠 Tech Stack

### Core Technologies

- **[React 18.3+](https://react.dev/)** - UI library
- **[TypeScript 5.8+](https://www.typescriptlang.org/)** - Type safety
- **[Vite 5.4+](https://vitejs.dev/)** - Build tool and dev server
- **[Tailwind CSS 3.4+](https://tailwindcss.com/)** - Utility-first CSS

### UI Components

- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful component library (40+ components)
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible primitives
- **[Lucide React](https://lucide.dev/)** - Icon library

### Additional Libraries

- **[React Router DOM](https://reactrouter.com/)** - Client-side routing with lazy loading
- **[React Helmet](https://github.com/nfl/react-helmet)** - SEO and meta tag management
- **[React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)** - Form management and validation
- **[@emailjs/browser](https://www.emailjs.com/)** - Client-side email sending for contact form
- **[@mdx-js/react](https://mdxjs.com/)** - MDX support for blog posts
- **[Recharts](https://recharts.org/)** - Data visualization (ROI calculator charts)
- **[react-simple-maps](https://www.react-simple-maps.io/)** - Interactive world map
- **[Embla Carousel](https://www.embla-carousel.com/)** - Carousel/slider component
- **[Sonner](https://sonner.emilkowal.dev/)** - Toast notifications
- **[date-fns](https://date-fns.org/)** - Date utility library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm/yarn/pnpm
- Basic knowledge of React and TypeScript

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd website-development
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Configure environment variables**

Create a `.env` file in the project root and add:

```
VITE_EMAILJS_SERVICE_ID=your-service-id
VITE_EMAILJS_TEMPLATE_ID=your-template-id
VITE_EMAILJS_PUBLIC_KEY=your-public-key
VITE_EMAILJS_RECIPIENT_EMAIL=team@yourcompany.com
VITE_CONTACT_EMAIL=contact@yourcompany.com
VITE_LINKEDIN_URL=https://www.linkedin.com/company/apexifylabs
VITE_TWITTER_URL=https://twitter.com/apexifylabs
```

See `EMAILJS_SETUP.md` for detailed EmailJS configuration instructions.

4. **Start development server**

```bash
npm run dev
```

The site will be available at `http://localhost:8080`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build for development
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run prerender    # Prerender static pages for SEO
```

## 📁 Project Structure

```
├── public/                    # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   └── resources/             # Portfolio images, blog assets, media
│       ├── n8n-portfolio/     # N8N automation screenshots
│       ├── Chatbot (whatsapp)/ # Chatbot screenshots and demo videos
│       └── blog/              # Blog post hero images
│
├── scripts/
│   └── prerender.tsx          # Static site generation script
│
├── src/
│   ├── components/            # React components
│   │   ├── ui/                # shadcn/ui components (40+)
│   │   ├── blog/              # Blog-specific components
│   │   │   └── PostCard.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ServicesCTASection.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── ToolsSection.tsx
│   │   ├── IndustrySection.tsx
│   │   ├── ROICalculatorSection.tsx
│   │   ├── CaseStudiesSection.tsx
│   │   ├── ProblemSection.tsx
│   │   ├── SocialProofSection.tsx
│   │   ├── FAQSection.tsx
│   │   ├── CTASection.tsx
│   │   ├── GlobalReachMap.tsx
│   │   ├── Footer.tsx
│   │   ├── PageLoader.tsx
│   │   └── ScrollToHash.tsx
│   │
│   ├── config/
│   │   └── constants.ts       # EmailJS config, social links, Calendly
│   │
│   ├── content/
│   │   └── blog/              # Blog content
│   │       ├── posts.ts       # Blog post loader/registry
│   │       ├── automation-roi-playbook.mdx
│   │       └── agentic-ai-blueprint.mdx
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   │
│   ├── lib/
│   │   └── utils.ts           # Utility functions (cn helper)
│   │
│   ├── pages/                 # Page components (lazy-loaded)
│   │   ├── Index.tsx          # Home page
│   │   ├── Services.tsx       # Services page
│   │   ├── About.tsx          # About page
│   │   ├── Contact.tsx        # Contact page (EmailJS form)
│   │   ├── Blog.tsx           # Blog listing page
│   │   ├── BlogPost.tsx       # Individual blog post page
│   │   ├── Privacy.tsx        # Privacy policy
│   │   ├── Terms.tsx          # Terms of service
│   │   └── NotFound.tsx       # 404 page
│   │
│   ├── App.tsx                # Main app component with routing
│   ├── App.css                # App-level styles
│   ├── index.css              # Global styles and design system
│   ├── main.tsx               # Entry point
│   └── vite-env.d.ts          # Vite type declarations
│
├── components.json            # shadcn/ui configuration
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML entry point
├── package.json
├── postcss.config.js          # PostCSS (Tailwind + Autoprefixer)
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript root config
├── tsconfig.app.json          # App TypeScript config
├── tsconfig.node.json         # Node TypeScript config
├── vercel.json                # Vercel deployment config (SPA rewrites)
└── EMAILJS_SETUP.md           # EmailJS setup guide
```

## 🗺️ Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Index | Home page with all main sections |
| `/services` | Services | Detailed services breakdown |
| `/about` | About | Company information |
| `/contact` | Contact | Contact form (EmailJS) |
| `/blog` | Blog | Blog post listing |
| `/blog/:slug` | BlogPost | Individual MDX blog post |
| `/privacy-policy` | Privacy | Privacy policy |
| `/terms-of-service` | Terms | Terms of service |
| `*` | NotFound | 404 page |

All routes are lazy-loaded with React Suspense for optimal performance.

## 🎯 Key Components

### Page Sections

- **Hero**: Eye-catching hero section with CTA
- **ProblemSection**: Highlights pain points that automation solves
- **Services**: Showcase automation services
- **ServicesCTA**: Services-specific call-to-action
- **Process**: Implementation workflow steps
- **Tools**: Technology stack display
- **Industries**: Industry-specific solutions
- **ROI Calculator**: Interactive ROI calculator with charts (Recharts)
- **Case Studies**: Client success stories carousel
- **SocialProof**: Testimonials and trust indicators
- **GlobalReachMap**: Interactive world map showing global presence
- **FAQ**: Frequently asked questions accordion
- **CTA**: Call-to-action sections

### Blog System

- MDX-powered blog posts in `src/content/blog/`
- Post registry in `src/content/blog/posts.ts`
- `PostCard` component for blog listing
- Dynamic routing via `/blog/:slug`

### UI Components

40+ shadcn/ui components including:
Accordion, Alert, Avatar, Badge, Button, Calendar, Card, Carousel, Checkbox, Command, Dialog, Drawer, Dropdown Menu, Form, Hover Card, Input, Label, Menubar, Navigation Menu, Pagination, Popover, Progress, Radio Group, Scroll Area, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner (Toast), Table, Tabs, Toggle, Tooltip, and more.

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

The `dist/` folder contains the production-ready files.

### Vercel (Configured)

This project includes a `vercel.json` with SPA rewrite rules. To deploy:

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Other Platforms

Any static hosting service works:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Azure Static Web Apps
- Firebase Hosting

## 🎨 Customization

### Colors

Edit `src/index.css` to modify the color scheme:

```css
:root {
  --primary: 210 100% 14%;      /* #002347 */
  --accent: 192 100% 44%;      /* #00B5E2 */
  /* ... */
}
```

### Typography

Fonts are loaded from Google Fonts in `index.html`. Modify the font families in `src/index.css`:

```css
h1, h2, h3 {
  font-family: 'Inter', 'Poppins', sans-serif;
}
```

### Components

All components are in `src/components/`. Each component is self-contained and can be easily modified.

### Blog Posts

Add new blog posts by:
1. Creating an `.mdx` file in `src/content/blog/`
2. Registering the post in `src/content/blog/posts.ts`
3. Adding a hero image in `public/resources/blog/<slug>/`

## 📱 Responsive Design

The website is fully responsive with breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

Components use Tailwind's responsive utilities (`sm:`, `md:`, `lg:`) for adaptive layouts.

## 📄 License

This project is proprietary and confidential.

## 🤝 Support

For questions or issues:
- Email: contact@apexifylabs.com
- Website: [ApexifyLabs](https://apexifylabs.com)

---

<div align="center">

**Built with ❤️ by ApexifyLabs**

*Empowering businesses with intelligent automation*

</div>
