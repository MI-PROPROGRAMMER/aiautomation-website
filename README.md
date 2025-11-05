# 🚀 ApexifyLabs - AI Automation Agency Website

<div align="center">

![ApexifyLabs](https://img.shields.io/badge/ApexifyLabs-AI%20Automation-00B5E2?style=for-the-badge&logo=artificial-intelligence&logoColor=white)
![React](https://img.shields.io/badge/React-18.3+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Transform your business with intelligent AI automation solutions**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Deployment](#-deployment)

</div>

---

## ✨ Overview

ApexifyLabs is a modern, high-performance website for an AI Automation Agency. Built with cutting-edge technologies, this platform showcases automation services, case studies, ROI calculators, and industry-specific solutions. The design features a futuristic aesthetic with glass morphism effects, smooth animations, and a professional dark blue color scheme.

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
- ⚡ **Performance**: Optimized with Vite for lightning-fast builds
- 🎨 **Design System**: Consistent color palette and typography
- 📊 **Interactive Components**: ROI calculator, FAQ accordion, case studies
- 🌐 **SEO Optimized**: Meta tags and structured content
- 🎭 **Accessible**: WCAG compliant components

## 🛠 Tech Stack

### Core Technologies

- **[React 18.3+](https://react.dev/)** - UI library
- **[TypeScript 5.8+](https://www.typescriptlang.org/)** - Type safety
- **[Vite 5.4+](https://vitejs.dev/)** - Build tool and dev server
- **[Tailwind CSS 3.4+](https://tailwindcss.com/)** - Utility-first CSS

### UI Components

- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful component library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[Lucide React](https://lucide.dev/)** - Icon library

### Additional Libraries

- **React Router** - Client-side routing
- **React Helmet** - SEO management
- **React Query** - Data fetching and caching
- **React Hook Form** - Form management
- **Zod** - Schema validation

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

3. **Start development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The site will be available at `http://localhost:8080`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build for development
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
├── public/                 # Static assets
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── assets/            # Images and media
│   ├── components/       # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── ServicesSection.tsx
│   │   └── ...
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── pages/            # Page components
│   │   ├── Index.tsx
│   │   └── Services.tsx
│   ├── App.tsx           # Main app component
│   ├── index.css         # Global styles
│   └── main.tsx          # Entry point
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## 🎯 Key Components

### Sections

- **Hero**: Eye-catching hero section with CTA
- **Services**: Showcase automation services
- **Process**: Implementation workflow
- **Tools**: Technology stack display
- **Industries**: Industry-specific solutions
- **ROI Calculator**: Interactive ROI calculator
- **Case Studies**: Client success stories
- **FAQ**: Frequently asked questions
- **CTA**: Call-to-action sections

### UI Components

All components follow shadcn/ui patterns:
- Accordion, Alert, Button, Card
- Dialog, Dropdown, Input, Select
- Toast, Tooltip, and more

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

The `dist/` folder contains the production-ready files.

### Deployment Options

#### Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

#### Netlify

1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy --prod`
3. Configure build command: `npm run build`
4. Set publish directory: `dist`

#### Other Platforms

Any static hosting service works:
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

## 📱 Responsive Design

The website is fully responsive with breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

Components use Tailwind's responsive utilities (`sm:`, `md:`, `lg:`) for adaptive layouts.

## 🧪 Development Tips

### Adding New Components

1. Create component in `src/components/`
2. Import and use in pages
3. Follow existing component patterns

### Styling Guidelines

- Use Tailwind utility classes
- Leverage design system variables
- Maintain glass morphism effects
- Keep animations smooth and subtle

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
