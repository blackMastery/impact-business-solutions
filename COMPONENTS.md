# Component Reference Guide

## Overview
This guide provides detailed information about all available components in the Impact Business Solutions landing page.

---

## 🧭 Navbar
**File:** `components/Navbar.tsx`

### Description
Sticky navigation bar with mobile hamburger menu, smooth scroll, and scroll-based styling changes.

### Features
- ✅ Sticky positioning with scroll detection
- ✅ Mobile-responsive hamburger menu
- ✅ Smooth scroll to sections
- ✅ Animated logo
- ✅ CTA button

### Usage
```tsx
import { Navbar } from './components/Navbar';

<Navbar />
```

### Customization Points
- Navigation items array
- Logo design
- Brand colors
- CTA button text and action

---

## 🎯 Hero
**File:** `components/Hero.tsx`

### Description
Full-screen hero section with animated background, statistics, and call-to-action buttons.

### Features
- ✅ Animated background gradients
- ✅ Floating statistic cards
- ✅ Dual CTA buttons
- ✅ Scroll indicator
- ✅ Statistics grid

### Usage
```tsx
import { Hero } from './components/Hero';

<Hero />
```

### Customization Points
- Hero heading and subheading
- CTA button text and links
- Statistics values
- Background animations
- Floating card content

---

## 💼 Services
**File:** `components/Services.tsx`

### Description
Grid layout showcasing services with hover effects and gradient icons.

### Features
- ✅ Responsive grid (1-3 columns)
- ✅ Hover animations on cards
- ✅ Gradient icon backgrounds
- ✅ Staggered entrance animations

### Usage
```tsx
import { Services } from './components/Services';

<Services />
```

### Service Interface
```typescript
interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string; // Tailwind gradient classes
}
```

### Adding New Service
```tsx
{
  icon: <YourIcon className="w-8 h-8" />,
  title: 'Your Service',
  description: 'Service description',
  color: 'from-blue-500 to-indigo-500',
}
```

---

## 📖 About
**File:** `components/About.tsx`

### Description
Company information section with values grid, mission, and vision cards.

### Features
- ✅ Two-column layout (text + values)
- ✅ Core values grid
- ✅ Mission and vision cards
- ✅ Key points with checkmarks
- ✅ Hover effects on cards

### Usage
```tsx
import { About } from './components/About';

<About />
```

### Customization Points
- Company description
- Core values
- Mission statement
- Vision statement
- Key points list

---

## 📊 Stats
**File:** `components/Stats.tsx`

### Description
Animated statistics counter with intersection observer for scroll-triggered animations.

### Features
- ✅ Animated number counting
- ✅ Scroll-triggered activation
- ✅ Icon badges
- ✅ Gradient backgrounds
- ✅ Easing animations

### Usage
```tsx
import { Stats } from './components/Stats';

<Stats />
```

### Stat Interface
```typescript
interface Stat {
  icon: React.ReactNode;
  value: number;
  suffix: string; // '+', '%', etc.
  label: string;
  color: string;
}
```

---

## 💬 Testimonials
**File:** `components/Testimonials.tsx`

### Description
Carousel-style testimonials section with navigation and star ratings.

### Features
- ✅ Carousel navigation (prev/next)
- ✅ Dot indicators
- ✅ Star ratings
- ✅ Smooth transitions
- ✅ Trust badges

### Usage
```tsx
import { Testimonials } from './components/Testimonials';

<Testimonials />
```

### Testimonial Interface
```typescript
interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number; // 1-5
  image?: string;
}
```

---

## ❓ FAQ
**File:** `components/FAQ.tsx`

### Description
Accordion-style FAQ section with smooth expand/collapse animations.

### Features
- ✅ Accordion functionality
- ✅ Smooth animations
- ✅ Single item open at a time
- ✅ Keyboard accessible
- ✅ CTA at bottom

### Usage
```tsx
import { FAQ } from './components/FAQ';

<FAQ />
```

### FAQ Interface
```typescript
interface FAQItem {
  question: string;
  answer: string;
}
```

---

## 📞 CTA (Contact)
**File:** `components/CTA.tsx`

### Description
Contact section with form, contact information cards, and trust indicators.

### Features
- ✅ Contact form with validation
- ✅ Form state management
- ✅ Contact info cards with icons
- ✅ Trust indicators
- ✅ Hover effects

### Usage
```tsx
import { CTA } from './components/CTA';

<CTA />
```

### Form Fields
- Name (required)
- Email (required)
- Phone (optional)
- Message (required)

### Customization Points
- Form fields
- Validation rules
- Submit handler
- Contact information
- Trust indicators

---

## 🦶 Footer
**File:** `components/Footer.tsx`

### Description
Multi-column footer with links, social media, and company information.

### Features
- ✅ Responsive grid layout
- ✅ Social media icons
- ✅ Quick links
- ✅ Contact information
- ✅ Animated hover effects
- ✅ Copyright notice

### Usage
```tsx
import { Footer } from './components/Footer';

<Footer />
```

### Customization Points
- Footer link sections
- Social media links
- Contact information
- Copyright text
- Bottom bar links

---

## 🎨 Global Styles

### Color Palette
```css
--impact-navy: #00072D
--impact-orange: #FF5C00
```

### Custom Animations
- `animate-fade-in-up`
- `animate-fade-in-down`
- `animate-fade-in-left`
- `animate-fade-in-right`
- `animate-float`
- `animate-pulse-slow`

### Animation Delays
```tsx
className="animate-fade-in-up"
style={{ animationDelay: '100ms' }}
```

---

## 📱 Responsive Design

### Breakpoints
```typescript
sm: 640px   // Mobile landscape
md: 768px   // Tablet
lg: 1024px  // Desktop
xl: 1280px  // Large desktop
```

### Usage
```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3">
  // 1 column on mobile
  // 2 columns on tablet
  // 3 columns on desktop
</div>
```

---

## 🔌 Props and Interfaces

### Common Props Pattern
Most components don't require props and use internal state. They can be used as:

```tsx
<ComponentName />
```

For components with optional configuration:

```tsx
<ComponentName 
  variant="primary"
  showAnimation={true}
/>
```

---

## 🎯 Best Practices

### 1. Component Usage
- Keep components in the `components/` folder
- Import only what you need
- Maintain consistent naming

### 2. Styling
- Use Tailwind utility classes
- Extend theme in `tailwind.config.ts` for custom values
- Keep custom CSS minimal

### 3. Animations
- Use built-in animations
- Add delays for staggered effects
- Test on different devices

### 4. Accessibility
- Use semantic HTML
- Include ARIA labels
- Test keyboard navigation
- Ensure proper focus indicators

### 5. Performance
- Lazy load images
- Minimize bundle size
- Use Next.js Image component
- Optimize animations

---

## 🔧 Advanced Customization

### Creating Variants
```tsx
// In your component file
type Variant = 'primary' | 'secondary';

interface ComponentProps {
  variant?: Variant;
}

export function Component({ variant = 'primary' }: ComponentProps) {
  const styles = variant === 'primary' 
    ? 'bg-impact-orange' 
    : 'bg-impact-navy';
  
  return <div className={styles}>...</div>;
}
```

### Adding New Animations
```typescript
// In tailwind.config.ts
extend: {
  keyframes: {
    yourAnimation: {
      '0%': { /* start */ },
      '100%': { /* end */ },
    }
  },
  animation: {
    'your-animation': 'yourAnimation 1s ease-in-out',
  }
}
```

---

## 📚 Additional Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Lucide Icons](https://lucide.dev/)
- [React Hooks](https://react.dev/reference/react)

---

## 🆘 Support

For component-specific issues or questions:
- Check the QUICKSTART.md guide
- Review the README.md
- Contact: info@impactbusiness.gy

---

**Last Updated:** November 2025  
**Version:** 1.0.0
