# Quick Start Guide - iMPACT Business Solutions Landing Page

## 🚀 Get Started in 3 Steps

### Step 1: Copy Files
Copy all files from the `impact-landing` folder to your Next.js project.

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your landing page!

---

## 📝 Quick Customization Guide

### Change Brand Colors
**File:** `tailwind.config.ts`
```typescript
colors: {
  'impact-navy': '#YOUR_COLOR_HERE',    // Main brand color
  'impact-orange': '#YOUR_COLOR_HERE',   // Accent color
}
```

### Update Company Information
**File:** `components/Footer.tsx`
- Company name
- Address
- Phone number
- Email
- Social media links

### Modify Services
**File:** `components/Services.tsx`
- Service titles
- Service descriptions
- Service icons

### Update Statistics
**File:** `components/Stats.tsx` and `components/Hero.tsx`
- Change numbers
- Update labels
- Modify icons

### Edit Contact Form
**File:** `components/CTA.tsx`
- Form fields
- Validation rules
- Submit handler

---

## 🎨 Using Components Individually

### Example: Custom Page
```typescript
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Footer } from './components/Footer';

export default function CustomPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Footer />
    </>
  );
}
```

### Example: Reorder Sections
```typescript
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Stats } from './components/Stats';
import { Services } from './components/Services';

export default function ReorderedPage() {
  return (
    <>
      <Hero />
      <About />       {/* About before Services */}
      <Services />
      <Stats />
    </>
  );
}
```

---

## 🔧 Common Customizations

### 1. Add New Service Card
**File:** `components/Services.tsx`

```typescript
{
  icon: <YourIcon className="w-8 h-8" />,
  title: 'Your Service Title',
  description: 'Your service description here.',
  color: 'from-purple-500 to-pink-500',
}
```

### 2. Update Navigation Links
**File:** `components/Navbar.tsx`

```typescript
const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Your New Link', href: '#section-id' },
  // ... more items
];
```

### 3. Change Hero Heading
**File:** `components/Hero.tsx`

```typescript
<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
  Your Custom Heading
</h1>
```

### 4. Add Testimonials Section
**File:** `page.tsx`

```typescript
import { Testimonials } from './components/Testimonials';

// Add between other sections
<Testimonials />
```

---

## 🎯 Key Files Reference

| File | Purpose |
|------|---------|
| `page.tsx` | Main landing page layout |
| `components/Navbar.tsx` | Navigation bar |
| `components/Hero.tsx` | Hero section with CTA |
| `components/Services.tsx` | Services grid |
| `components/About.tsx` | About section |
| `components/Stats.tsx` | Statistics with animations |
| `components/CTA.tsx` | Contact form |
| `components/Footer.tsx` | Footer with links |
| `tailwind.config.ts` | Colors & animations |
| `globals.css` | Global styles |

---

## 🐛 Troubleshooting

### Issue: Styles Not Loading
**Solution:** Make sure `globals.css` is imported in your main layout or `_app.tsx`
```typescript
import './globals.css'
```

### Issue: Icons Not Showing
**Solution:** Install lucide-react
```bash
npm install lucide-react
```

### Issue: Animations Not Working
**Solution:** Ensure Tailwind is configured correctly in `tailwind.config.ts` and PostCSS is set up

### Issue: TypeScript Errors
**Solution:** Make sure `tsconfig.json` is present and dependencies are installed

---

## 📱 Testing Checklist

- [ ] Mobile responsiveness (< 640px)
- [ ] Tablet view (640px - 1024px)
- [ ] Desktop view (> 1024px)
- [ ] All links work correctly
- [ ] Smooth scroll behavior
- [ ] Form validation
- [ ] Animations play correctly
- [ ] Images load properly
- [ ] Cross-browser compatibility

---

## 💡 Pro Tips

1. **Use the color palette consistently** across all custom components
2. **Maintain animation delays** for sequential loading effects
3. **Test on real devices** not just browser dev tools
4. **Optimize images** before deployment
5. **Keep components small** and focused on single responsibility
6. **Use semantic HTML** for better SEO
7. **Add loading states** for better UX
8. **Test form submissions** thoroughly

---

## 🔗 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [React Documentation](https://react.dev/)

---

## 📞 Need Help?

Contact Impact Business Solutions:
- **Email:** info@impactbusiness.gy
- **Phone:** +592 XXX-XXXX
- **Location:** Georgetown, Guyana

---

Happy Coding! 🎉
