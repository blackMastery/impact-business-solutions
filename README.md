# iMPACT Business Solutions Landing Page

A modern, animated landing page built with Next.js, React, TypeScript, and Tailwind CSS for Impact Business Solutions - a leading technology company in Guyana.

## 🎨 Features

- **Modern Design**: Clean, professional design with the company's brand colors (Navy Blue #00072D and Neon Orange #FF5C00)
- **Fully Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: CSS animations and transitions for enhanced user experience
- **Reusable Components**: Modular React components that can be easily customized
- **SEO Friendly**: Built with Next.js for optimal SEO performance
- **Accessibility**: WCAG compliant with proper semantic HTML and ARIA labels
- **Performance Optimized**: Fast loading times with optimized images and code

## 🚀 Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: CSS Animations & Transitions

## 📦 Installation

1. Clone or copy the project files into your Next.js project directory

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
impact-landing/
├── components/
│   ├── Navbar.tsx          # Navigation with mobile menu
│   ├── Hero.tsx            # Hero section with CTA
│   ├── Services.tsx        # Services grid with cards
│   ├── About.tsx           # About section with values
│   ├── Stats.tsx           # Animated statistics
│   ├── CTA.tsx             # Contact form section
│   └── Footer.tsx          # Footer with links
├── page.tsx                # Main landing page
├── globals.css             # Global styles
├── tailwind.config.ts      # Tailwind configuration
└── package.json            # Dependencies
```

## 🎯 Components

### Navbar
- Sticky navigation with scroll effect
- Mobile-responsive hamburger menu
- Smooth scroll to sections
- Company logo with branding

### Hero
- Full-screen hero section
- Animated background elements
- Call-to-action buttons
- Statistics showcase
- Floating cards with data

### Services
- Grid layout for services
- Hover effects on cards
- Icon integration
- Responsive design

### About
- Company information
- Core values grid
- Mission and vision cards
- Trust indicators

### Stats
- Animated counters
- Intersection Observer for scroll triggers
- Icon badges
- Gradient backgrounds

### CTA (Contact)
- Contact form with validation
- Contact information cards
- Social proof elements
- Form submission handling

### Footer
- Multi-column layout
- Social media links
- Quick links
- Company information
- Copyright notice

## 🎨 Customization

### Colors
The primary colors are defined in `tailwind.config.ts`:
```typescript
colors: {
  'impact-navy': '#00072D',
  'impact-orange': '#FF5C00',
}
```

### Animations
Custom animations are defined in `tailwind.config.ts` and can be applied using Tailwind classes:
- `animate-fade-in-up`
- `animate-fade-in-down`
- `animate-fade-in-left`
- `animate-fade-in-right`
- `animate-float`
- `animate-pulse-slow`

### Content
To update content, simply edit the respective component files. All text, links, and data are easily accessible and modifiable.

## 🔧 Usage in Next.js

### App Router (Next.js 13+)
Place the landing page in your `app` directory:

```typescript
// app/page.tsx
import LandingPage from './impact-landing/page';

export default function Home() {
  return <LandingPage />;
}
```

### Pages Router (Next.js 12 and below)
Place the landing page in your `pages` directory:

```typescript
// pages/index.tsx
import LandingPage from '../impact-landing/page';

export default LandingPage;
```

### Using Individual Components
You can import and use individual components:

```typescript
import { Hero } from './components/Hero';
import { Services } from './components/Services';

export default function CustomPage() {
  return (
    <>
      <Hero />
      <Services />
    </>
  );
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility

- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus visible indicators
- Alt text for images
- Proper heading hierarchy

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is created for Impact Business Solutions.

## 🤝 Contributing

To modify or enhance the components:

1. Update the respective component file
2. Test responsiveness on different devices
3. Ensure animations work smoothly
4. Maintain the consistent color scheme

## 📞 Support

For questions or issues, contact Impact Business Solutions:
- Email: info@impactbusiness.gy
- Phone: +592 XXX-XXXX
- Location: Georgetown, Guyana

---

Built with ❤️ for Impact Business Solutions - Making an Impact, One Solution at a Time
