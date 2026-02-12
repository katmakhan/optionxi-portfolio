"use client";

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { 
  Moon, Sun, ExternalLink, Smartphone, Globe, Server, Mail, CreditCard, 
  Layout, Plus, Database, School, Factory, MessageCircle, Code, Layers,
  Github, Linkedin, Twitter, Download, Users, TrendingUp, Zap, PenTool,
  CheckCircle2, Circle, Wrench, FileText, Award, Star,
  Instagram
} from 'lucide-react';

// --- Interfaces ---
interface ProjectBase {
  name: string;
  image: string;
  weblink: string;
  category: string;
  tech: string;
}

interface WebProject extends ProjectBase {
  domain: string;
}

interface AppProject extends ProjectBase {
  installs: string;
}

interface WebAppProject extends WebProject {
  screenshots?: string[];
}

interface ERPProject {
  title: string;
  icon: ReactNode;
  description: string;
  features: string[];
  priceStart: string;
  pricePremium: string;
  color: 'blue' | 'orange';
}

interface PricingOption {
  id: string;
  icon: ReactNode;
  label: string;
  detail: string;
  price: number;
  required?: boolean;
  badge?: string;
}

interface ClientSite {
  name: string;
  url: string;
}

// --- Portfolio Data ---

const WORDPRESS_PROJECTS: WebProject[] = [
  {
    name: "Circle Elevators",
    domain: "circleelavators.com",
    image: "/assets/website/circle-elevators.png",
    weblink: "https://circleelevators.com/",
    category: "Corporate Website",
    tech: "WordPress + Elementor"
  },
  {
    name: "Paalana",
    domain: "paalana.in",
    image: "/assets/website/paalana.png",
    weblink: "https://paalana.in/",
    category: "Hospital Website",
    tech: "WordPress + Elementor"
  },
  {
    name: "Tanva Ayurveda",
    domain: "tanvaayurveda.com",
    image: "/assets/website/tanva-ayurveda.png",
    weblink: "https://tanvaayurveda.com/",
    category: "Ayurvedic Website",
    tech: "WordPress + Elementor"
  },
  {
    name: "Byts Interior",
    domain: "bytsinterior.com",
    image: "/assets/website/byts-interiors.png",
    weblink: "https://bytsinterior.com/",
    category: "Interior Design Website",
    tech: "WordPress + Elementor"
  },
  {
    name: "Jimoffset Printers",
    domain: "jimoffsetprinters.in",
    image: "/assets/website/jimoffset.png",
    weblink: "https://jimoffsetprinters.in/",
    category: "Printing Press Website",
    tech: "WordPress + Elementor"
  },
  {
    name: "Deluxe Bifolds",
    domain: "deluxebifolds.co.uk",
    image: "/assets/website/deluxe-bifolds.png",
    weblink: "https://deluxebifolds.co.uk/",
    category: "Bi Folds Website",
    tech: "WordPress + Elementor"
  },
  {
    name: "Skepskew",
    domain: "skepskew.com",
    image: "/assets/website/skepskew.png",
    weblink: "https://skepskew.com/",
    category: "Digital Marketing Website",
    tech: "WordPress + Elementor"
  },
  {
    name: "Campfinder",
    domain: "campfinder.in",
    image: "/assets/website/campfinder.png",
    weblink: "https://campfinder.in/",
    category: "Travel Website",
    tech: "WordPress + Elementor"
  }
];

const WEB_PROJECTS: WebProject[] = [
  {
    name: "OptionXi Web",
    domain: "app.optionxi.com",
    image: "/assets/web-app/webapp-optionxi.png",
    weblink: "https://app.optionxi.com",
    category: "Finance Platform",
    tech: "Next.js"
  }
];

const APP_PROJECTS: AppProject[] = [
  {
    name: "StockEx",
    image: "/assets/flutter-app/stockex.png",
    installs: "50K+",
    weblink: "https://play.google.com/store/apps/details?id=com.btechtraders.btechtraders",
    category: "Stock Trading",
    tech: "Flutter + Firebase"
  },
  {
    name: "OptionXi",
    image: "/assets/flutter-app/optionxi.png",
    installs: "4K+",
    weblink: "https://play.google.com/store/apps/details?id=com.optionxi.app",
    category: "Options Analytics",
    tech: "Flutter + Supabase + Python"
  },
  {
    name: "Benchmate",
    image: "/assets/flutter-app/benchmateapp.png",
    installs: "10K+",
    weblink: "https://play.google.com/store/apps/details?id=com.studentscafe.benchmate",
    category: "Education",
    tech: "Flutter + FIrebase"
  },
   {
    name: "KCYM App",
    image: "/assets/flutter-app/kcymapp.png",
    installs: "4K+",
    weblink: "https://play.google.com/store/apps/details?id=com.kcym.kcym",
    category: "Utility",
    tech: "Flutter + FIrebase"
  }
];

const WEBAPP_PROJECTS: WebAppProject[] = [
  {
    name: "OptionXi Dashboard",
    domain: "app.optionxi.com",
    image: "/assets/optionxi-web.png",
    weblink: "https://app.optionxi.com",
    category: "Analytics Platform",
    tech: "Next.js + Python Backend",
    screenshots: [
      "/assets/web-app/webapp-optionxi-ss1.png",
      "/assets/web-app/webapp-optionxi-ss2.png",
      // "/assets/optionxi-screen-3.png"
    ]
  }
];

const ERP_SOLUTIONS: ERPProject[] = [
  {
    title: "Campus ERP",
    icon: <School className="w-8 h-8 mb-4" />,
    description: "Complete management for schools and colleges with student tracking, attendance, and fee management.",
    features: ["Student Management", "Attendance Tracking", "Fee Collection", "Reports & Analytics"],
    priceStart: "3,999",
    pricePremium: "6,999",
    color: "blue"
  },
  {
    title: "Manufacturing ERP",
    icon: <Factory className="w-8 h-8 mb-4" />,
    description: "Inventory, production, and supply chain tracking with real-time insights and dashboard with notifications",
    features: ["Inventory Control", "Production Planning", "Supply Chain", "Quality Management"],
    priceStart: "3,999",
    pricePremium: "6,999",
    color: "orange"
  }
];

// Tech Stack with real logos (using CDN URLs)
const TECH_STACK = [
  { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", color: "text-blue-400" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", color: "text-orange-400" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "text-white" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "text-yellow-400" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "text-blue-500" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "text-green-500" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "text-cyan-400" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", color: "text-yellow-300" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", color: "text-blue-400" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "text-orange-500" }
];

// Client websites - Add your client sites here
const CLIENT_SITES: ClientSite[] = [
  // { name: "Evince Display", url: "https://evincedisplays.co.uk" },
  { name: "Skepskew", url: "https://skepskew.com" },
  { name: "Dubai Docs", url: "https://dubaidocs.com/" },
  { name: "Aloe International", url: "https://aloeinternational.com" },
  { name: "Circle Elevators", url: "https://circleelevators.com" },
  { name: "Migstaffing", url: "https://migstaffing.com" },
  { name: "Paalana Hospital", url: "https://paalana.in" },
  { name: "Tanva Ayurveda", url: "https://tanvaayurveda.com" },
  { name: "KCYM Palakkad", url: "https://kcymdioceseofpalghat.in" },
  { name: "Heerachal", url: "https://heeraachal.in" },
  { name: "Campfinder", url: "https://campfinder.in" },
  { name: "Sinai Renewal Centre", url: "https://sinairenewalcentre.org/" },
  { name: "Sanjo College", url: "https://sanjocollegeofnursing.org/" },
  { name: "Deivadan", url: "https://deivadan.org/" },
  { name: "Home for Aged", url: "https://homefortheaged.org/" }
];

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => {
  //   const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  //   setDarkMode(isDark);
  // }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleWhatsAppContact = (type: string, total?: number, selectedItems?: string[]) => {
    let message = "";
    const phone = "919496672190"; // Replace with your actual WhatsApp number
    
    switch(type) {
      case 'wordpress':
        if (total && selectedItems && selectedItems.length > 0) {
          const itemsList = selectedItems.map(item => `• ${item}`).join('\n');
          message = `Hi! I'm interested in the WordPress Web Development package.\n\n*Selected options:*\n${itemsList}\n\n*Total: ₹${total.toLocaleString()}*\n\nI'd like to discuss my requirements.`;
        } else {
          message = `Hi! I'm interested in the WordPress Web Development package. I'd like to discuss my requirements.`;
        }
        break;
      case 'android':
        message = `Hi! I'm interested in Android App Development (₹2,000/screen). I have a project in mind.`;
        break;
      case 'nextjs':
        message = `Hi! I'm interested in Next.js WebApp Development (₹2,000/screen). Let's discuss my project.`;
        break;
      case 'campus-erp':
        message = `Hi! I'm interested in the Campus ERP solution. I'd like to know more about the pricing and features.`;
        break;
      case 'manufacturing-erp':
        message = `Hi! I'm interested in the Manufacturing ERP solution. Can we discuss implementation details?`;
        break;
      case 'general':
        message = `Hi! I came across your portfolio and would like to discuss a project.`;
        break;
      default:
        message = `Hi! I'm interested in your development services.`;
    }
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-slate-950' : 'bg-gray-50'
    }`}>
      
      {/* --- Navbar --- */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              {/* <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                JV
              </div> */}
              <h1 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Dev OptionXi
              </h1>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => handleWhatsAppContact('general')}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-green-600/30 hover:shadow-green-600/50 text-sm"
              >
                <MessageCircle size={18} />
                <span className="hidden sm:inline">Let's Talk</span>
              </button>
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 rounded-xl hover:bg-gray-200 dark:hover:bg-slate-800 transition-all border border-gray-200 dark:border-slate-700"
                aria-label="Toggle Theme"
              >
                {darkMode ? (
                  <Sun size={20} className="text-yellow-400" />
                ) : (
                  <Moon size={20} className="text-slate-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-20 sm:space-y-32">

        {/* --- Hero Section --- */}
        <section className="text-center py-12 sm:py-16 relative">
          <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 to-indigo-600/10 dark:from-blue-600/5 dark:to-indigo-600/5 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-400 text-sm font-semibold">
              ✨ Full-Stack Development Services
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-gray-900 dark:text-white">
              Transforming Ideas into <br className="hidden sm:block" />
              <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Digital Reality
              </span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed px-4">
              Premium Web Development, Mobile Apps, and Custom ERP Solutions <br className="hidden md:block" />
              built with cutting-edge technology to scale your business.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <button 
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50"
              >
                View Projects
              </button>
              <button 
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 border-2 border-gray-300 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-all"
              >
                See Pricing
              </button>
            </div>
          </div>
        </section>

        {/* --- Pricing Section --- */}
        <section id="pricing" className="pb-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Transparent Pricing</h3>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">No hidden fees. Pay for what you need.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* WordPress Package with Interactive Pricing */}
            <WordPressPricing onContact={handleWhatsAppContact} darkMode={darkMode} />

            {/* App Development Rates */}
            <AppDevelopmentPricing onContact={handleWhatsAppContact} />

          </div>
        </section>

        {/* --- Portfolio Section --- */}
        <PortfolioSection />

        {/* --- ERP Solutions --- */}
        <section id="erp">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">ERP Solutions</h3>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">Custom enterprise solutions for your business</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {ERP_SOLUTIONS.map((erp, index) => (
              <ERPCard key={index} erp={erp} onContact={handleWhatsAppContact} />
            ))}
          </div>
        </section>

        {/* --- Tech Stack Section (OPTIMIZED) --- */}
        {/* <section className="py-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Tech Stack</h3>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">Technologies I work with</p>
          </div>
          
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {TECH_STACK.map((tech, index) => (
              <div 
                key={index} 
                className="group flex flex-col items-center gap-2 p-3 sm:p-4 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg hover:scale-105"
              >
                <img 
                  src={tech.icon} 
                  alt={tech.name} 
                  className="w-8 h-8 sm:w-10 sm:h-10 group-hover:scale-110 transition-transform"
                  style={tech.name === "Next.js" && darkMode ? { filter: 'invert(1)' } : {}}
                />
                <span className={`text-[10px] sm:text-xs font-semibold ${tech.color} opacity-0 group-hover:opacity-100 transition-opacity text-center leading-tight`}>
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </section> */}

        {/* --- Clients/Websites Showcase --- */}
        <ClientShowcase sites={CLIENT_SITES} />

         {/* --- Achievement Banner --- */}
        {/* <section className="py-8">
          <div className="bg-linear-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                <Award className="w-5 h-5" />
                <span className="font-semibold">Our Flagship Product</span>
              </div>
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">StockEx</h3>
              <p className="text-lg sm:text-xl mb-6 text-green-100">Real-time Stock Trading Platform</p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="flex items-center gap-3 px-6 py-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Download className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-3xl sm:text-4xl font-bold">50,000+</p>
                    <p className="text-sm text-green-100">Total Installs</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-6 py-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-2xl sm:text-3xl font-bold">Growing</p>
                    <p className="text-sm text-green-100">Active Users Daily</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-6 py-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Star className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-2xl sm:text-3xl font-bold">4.5+</p>
                    <p className="text-sm text-green-100">Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

      </main>

      {/* --- Footer --- */}
      <Footer onContact={handleWhatsAppContact} />
    </div>
  );
}

// --- Component: Interactive WordPress Pricing ---
function WordPressPricing({ onContact, darkMode }: { onContact: (type: string, total?: number, selectedItems?: string[]) => void, darkMode: boolean }) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['hosting', 'pages']);

  const pricingOptions: PricingOption[] = [
    {
      id: 'hosting',
      icon: <Server size={16} />,
      label: 'Initial Setup + Hosting',
      detail: 'Domain, SSL, Cloudflare, 1st Year',
      price: 5000,
      required: true,
      badge: 'Required'
    },
    {
      id: 'pages',
      icon: <Layout size={16} />,
      label: 'Web Design (8 Pages)',
      detail: 'Home, About, Services, etc.',
      price: 8000,
      required: true,
      badge: 'Required'
    },
    {
      id: 'blog',
      icon: <FileText size={16} />,
      label: 'Blog Design',
      detail: 'Custom blog layout',
      price: 3000,
      badge: 'Optional'
    },
    {
      id: 'email',
      icon: <Mail size={16} />,
      label: 'Professional Email',
      detail: 'Zoho Workspace (India)',
      price: 3000,
      badge: 'Optional'
    },
    {
      id: 'seo',
      icon: <Mail size={16} />,
      label: 'SEO and Analytics',
      detail: 'Google Analytics',
      price: 5000,
      badge: 'Optional'
    },
    {
      id: 'payment',
      icon: <CreditCard size={16} />,
      label: 'Payment Gateway',
      detail: 'Razorpay or Stripe',
      price: 7000,
      badge: 'Optional'
    },
    {
      id: 'theme',
      icon: <PenTool size={16} />,
      label: 'Custom Theme',
      detail: 'Fully customized design',
      price: 10000,
      badge: 'Optional'
    }
  ];

  const toggleOption = (id: string) => {
    const option = pricingOptions.find(opt => opt.id === id);
    if (option?.required) return;

    setSelectedOptions(prev => 
      prev.includes(id) 
        ? prev.filter(optId => optId !== id)
        : [...prev, id]
    );
  };

  const totalPrice = pricingOptions
    .filter(opt => selectedOptions.includes(opt.id))
    .reduce((sum, opt) => sum + opt.price, 0);

  return (
    <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-200 dark:border-slate-800">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
            <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">WordPress Website</h4>
            <p className="text-xs sm:text-sm text-gray-500">Built with Elementor</p>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs sm:text-sm text-gray-500">Starting at</p>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">₹13,000</p>
        </div>
      </div>
      
      <div className="space-y-2 mb-6">
        {pricingOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => toggleOption(option.id)}
            disabled={option.required}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
              selectedOptions.includes(option.id)
                ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500'
                : 'bg-gray-50 dark:bg-slate-800/50 border-2 border-transparent hover:border-gray-300 dark:hover:border-slate-700'
            } ${option.required ? 'cursor-default' : 'cursor-pointer'}`}
          >
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className={`p-1.5 sm:p-2 rounded-lg transition-all shrink-0 ${
                selectedOptions.includes(option.id)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-400'
              }`}>
                {option.icon}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <p className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm">{option.label}</p>
                  {option.badge && (
                    <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full ${
                      option.required 
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                        : 'bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {option.badge}
                    </span>
                  )}
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">{option.detail}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm">
                ₹{(option.price / 1000).toFixed(0)}k
              </span>
              {selectedOptions.includes(option.id) ? (
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
              ) : (
                <Circle className="w-5 h-5 text-gray-300 dark:text-slate-600" />
              )}
            </div>
          </button>
        ))}
        
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-slate-800 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Total</span>
          <span className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
            ₹{totalPrice.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between text-xs">
          <span className="text-gray-700 dark:text-gray-300">+ Additional Pages</span>
          <span className="font-semibold text-gray-900 dark:text-white">₹1,000/page</span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/10 rounded-xl">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-green-600" />
            <div>
              <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Hosting AMC</p>
              <p className="text-[10px] text-gray-600 dark:text-gray-400">Annual Maintenance</p>
            </div>
          </div>
          <span className="font-semibold text-green-600 text-sm">₹3,000/yr</span>
        </div>


      </div>

      <button 
        onClick={() => {
          const selectedLabels = pricingOptions
            .filter(opt => selectedOptions.includes(opt.id))
            .map(opt => `${opt.label} — ₹${opt.price.toLocaleString()}`);
          onContact('wordpress', totalPrice, selectedLabels);
        }}
        className="w-full mt-4 px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base"
      >
        <MessageCircle size={18} />
        Get Started - ₹{totalPrice.toLocaleString()}
      </button>
    </div>
  );
}

// --- Component: App Development Pricing ---
function AppDevelopmentPricing({ onContact }: { onContact: (type: string) => void }) {
  return (
    <div className="lg:col-span-1 bg-linear-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 shadow-2xl border border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-white/10 rounded-xl">
            <Smartphone className="w-6 h-6 text-green-400" />
          </div>
          <h4 className="text-xl sm:text-2xl font-bold">App Development</h4>
        </div>
        
        <div className="space-y-6">
          {/* Android App Card */}
          <div className="p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-green-400/30 transition-all group">
            <div className="flex items-center gap-2 mb-3">
              <Smartphone className="w-5 h-5 text-green-400" />
              <h5 className="font-bold text-base sm:text-lg text-green-400">Android App</h5>
            </div>
            <p className="text-2xl sm:text-3xl font-bold mb-2">
              ₹2,000 <span className="text-sm font-normal text-gray-400">/ screen</span>
            </p>
            <p className="text-xs text-gray-400 mb-4">+ Functionality charges</p>
            
            <div className="flex items-center gap-2 mb-4 p-2 bg-white/5 rounded-lg">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" alt="Flutter" className="w-5 h-5" />
              <span className="text-xs text-gray-400">+</span>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" alt="Firebase" className="w-5 h-5" />
              <span className="text-xs font-medium ml-2">Flutter + Firebase</span>
            </div>
            
            <div className="text-xs text-gray-500 space-y-1 mb-4">
              <p>• Cross-platform ready</p>
              <p>• Backend integration</p>
              <p>• Push notifications</p>
            </div>
            <button 
              onClick={() => onContact('android')}
              className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-sm"
            >
              <MessageCircle size={18} />
              Build My App
            </button>
          </div>

          {/* Next.js WebApp Card */}
          <div className="p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-400/30 transition-all group">
            <div className="flex items-center gap-2 mb-3">
              <Code className="w-5 h-5 text-blue-400" />
              <h5 className="font-bold text-base sm:text-lg text-blue-400">Next.js WebApp</h5>
            </div>
            <p className="text-2xl sm:text-3xl font-bold mb-2">
              ₹2,000 <span className="text-sm font-normal text-gray-400">/ screen</span>
            </p>
            <p className="text-xs text-gray-400 mb-4">+ Functionality charges</p>
            
            <div className="flex items-center gap-2 mb-4 p-2 bg-white/5 rounded-lg">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" className="w-5 h-5 invert" />
              <span className="text-xs font-medium ml-2">Next.js</span>
            </div>
            
            <div className="text-xs text-gray-500 space-y-1 mb-4">
              <p>• Modern React framework</p>
              <p>• SEO optimized</p>
              <p>• API integration</p>
            </div>
            <button 
              onClick={() => onContact('nextjs')}
              className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-sm"
            >
              <MessageCircle size={18} />
              Start Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Component: Portfolio Section ---
function PortfolioSection() {
  return (
    <section id="portfolio">
      <div className="text-center mb-12">
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Featured Projects</h3>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">Real products, real impact, real results</p>
      </div>

      {/* WordPress Projects FIRST */}
      <div className="mb-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
          <PenTool className="w-6 h-6 text-blue-500 dark:text-blue-400" />
          <h4 className="text-2xl font-bold text-gray-900 dark:text-white">WordPress Sites</h4>
          <span className="ml-0 sm:ml-auto text-sm text-gray-500 bg-gray-200 dark:bg-slate-800 px-3 py-1 rounded-full">
            Elementor
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WORDPRESS_PROJECTS.map((item, index) => (
            <ProjectCard key={index} project={item} />
          ))}
        </div>
      </div>

      {/* Mobile Apps SECOND */}
      <div className="mb-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
          <Smartphone className="w-6 h-6 text-green-600 dark:text-green-400" />
          <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Mobile Applications</h4>
          <span className="ml-0 sm:ml-auto text-sm text-gray-500 bg-gray-200 dark:bg-slate-800 px-3 py-1 rounded-full">
            Flutter + Firebase
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {APP_PROJECTS.map((item, index) => (
            <AppCard key={index} app={item} />
          ))}
        </div>
      </div>

      {/* Web Applications THIRD */}
      <div className="mb-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Web Applications</h4>
          <span className="ml-0 sm:ml-auto text-sm text-gray-500 bg-gray-200 dark:bg-slate-800 px-3 py-1 rounded-full">
            Next.js
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WEB_PROJECTS.map((item, index) => (
            <ProjectCard key={index} project={item} />
          ))}
        </div>
      </div>

      {/* WebApp Showcase LAST */}
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
          <Layers className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Full-Stack WebApps</h4>
          <span className="ml-0 sm:ml-auto text-sm text-gray-500 bg-gray-200 dark:bg-slate-800 px-3 py-1 rounded-full">
            Next.js + Python
          </span>
        </div>
        
        {WEBAPP_PROJECTS.map((item, index) => (
          <WebAppShowcase key={index} webapp={item} />
        ))}
      </div>
    </section>
  );
}

// --- Component: Client Showcase with Autoscroll & Fading Sides ---
// Drop-in replacement. Requires: useEffect, useRef imported from 'react'
// (already present in your portfolio file)

function ClientShowcase({ sites }: { sites: ClientSite[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const posRef = useRef(0);

  // Duplicate list for seamless infinite loop
  const duplicated = [...sites, ...sites];

  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 0.45; // px per frame — tweak for faster/slower

    const step = () => {
      if (!pausedRef.current) {
        posRef.current += speed;
        // Snap back at exactly the halfway point (the duplicate boundary)
        const half = track.scrollWidth / 2;
        if (posRef.current >= half) posRef.current = 0;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => {
      if (animRef.current !== null) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <section className="py-16 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-blue-500 dark:text-blue-400 mb-3">
          Our Clients
        </p>
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Trusted By
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
          Companies and brands we've worked with
        </p>
      </div>

      {/* Scroll track + fade overlays */}
      <div className="relative">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-28 z-10
          bg-linear-to-r from-gray-50 to-transparent
          dark:from-slate-950 dark:to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-28 z-10
          bg-linear-to-l from-gray-50 to-transparent
          dark:from-slate-950 dark:to-transparent" />

        <div className="overflow-hidden py-4">
          <div
            ref={trackRef}
            className="flex gap-5 will-change-transform"
            style={{ width: "max-content" }}
            onMouseEnter={() => (pausedRef.current = true)}
            onMouseLeave={() => (pausedRef.current = false)}
          >
            {duplicated.map((site, index) => {
              const faviconUrl = getFaviconUrl(site.url);
              return (
                <a
                  key={index}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 px-6 py-5 rounded-2xl
                    bg-white dark:bg-slate-900
                    border border-gray-100 dark:border-slate-800
                    hover:border-blue-400 dark:hover:border-blue-500
                    hover:-translate-y-1 hover:shadow-xl
                    transition-all duration-300 min-w-32.5"
                  style={{ boxShadow: "0 2px 12px 0 rgba(0,0,0,0.06)" }}
                >
                  {/* Icon container */}
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    {/* Background pill that tints on hover */}
                    <div className="absolute inset-0 rounded-xl
                      bg-linear-to-br from-gray-50 to-gray-100
                      dark:from-slate-800 dark:to-slate-700
                      group-hover:from-blue-50 group-hover:to-indigo-50
                      dark:group-hover:from-blue-950 dark:group-hover:to-indigo-950
                      transition-all duration-300" />
                    {faviconUrl ? (
                      <img
                        src={faviconUrl}
                        alt={site.name}
                        className="relative w-8 h-8 object-contain
                          group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.style.display = "none";
                          const wrap = img.parentElement;
                          if (wrap) {
                            const fb = document.createElement("span");
                            fb.className =
                              "relative text-xl font-bold text-blue-600 dark:text-blue-400";
                            fb.textContent = site.name.charAt(0).toUpperCase();
                            wrap.appendChild(fb);
                          }
                        }}
                      />
                    ) : (
                      <span className="relative text-xl font-bold
                        bg-linear-to-br from-blue-500 to-indigo-500
                        bg-clip-text text-transparent
                        group-hover:scale-110 transition-transform duration-300">
                        {site.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Site name */}
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400
                    text-center leading-tight max-w-25
                    group-hover:text-blue-600 dark:group-hover:text-blue-400
                    transition-colors duration-300">
                    {site.name}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Component: Project Card ---
function ProjectCard({ project }: { project: WebProject }) {
  return (
    <a 
      href={project.weblink} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group block relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-slate-800"
    >
      <div className="aspect-video w-full overflow-hidden bg-linear-to-br from-gray-200 to-gray-300 dark:from-slate-800 dark:to-slate-900 relative">
        <img 
          src={project.image} 
          alt={project.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/600x400/3B82F6/FFFFFF?text=' + encodeURIComponent(project.name);
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <span className="text-white font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
            View the website <ExternalLink size={16} />
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{project.name}</h4>
        <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">{project.domain}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-700 dark:text-blue-400">
            {project.category}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{project.tech}</span>
        </div>
      </div>
    </a>
  );
}

// --- Component: App Card ---
function AppCard({ app }: { app: AppProject }) {
  return (
    <a 
      href={app.weblink} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group block relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-slate-800"
    >
      <div className="aspect-video w-full overflow-hidden bg-linear-to-br from-green-100 to-emerald-200 dark:from-green-900/20 dark:to-emerald-900/20 relative">
        <img 
          src={app.image} 
          alt={app.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/600x400/10B981/FFFFFF?text=' + encodeURIComponent(app.name);
          }}
        />
        <div className="absolute top-4 right-4 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
          <Download size={14} className="text-green-600" />
          <span className="text-sm font-bold text-green-600">{app.installs}</span>
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <span className="text-white font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
            View Details <ExternalLink size={16} />
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{app.name}</h4>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium px-3 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-700 dark:text-green-400">
            {app.category}
          </span>
          <div className="flex items-center gap-1 text-green-600">
            <TrendingUp size={14} />
            <span className="text-xs font-semibold">{app.installs}</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{app.tech}</p>
      </div>
    </a>
  );
}

// --- Component: WebApp Showcase ---
function WebAppShowcase({ webapp }: { webapp: WebAppProject }) {
  const [currentScreen, setCurrentScreen] = useState(0);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200 dark:border-slate-800">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center">
          <div className="inline-block mb-4">
            <span className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-xs font-semibold">
              {webapp.tech}
            </span>
          </div>
          <h4 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900 dark:text-white">{webapp.name}</h4>
          <p className="text-blue-600 dark:text-blue-400 mb-4">{webapp.domain}</p>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            A comprehensive {webapp.category.toLowerCase()} built with Next.js frontend and Python backend, 
            featuring real-time data processing and advanced analytics capabilities.
          </p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Zap className="w-5 h-5 text-purple-600" />
              <span className="text-sm">Real-time data updates</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Server className="w-5 h-5 text-purple-600" />
              <span className="text-sm">Python backend integration</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Users className="w-5 h-5 text-purple-600" />
              <span className="text-sm">User authentication & management</span>
            </div>
          </div>

          <a 
            href={webapp.weblink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-purple-600/30 w-fit"
          >
            View Project <ExternalLink size={18} />
          </a>
        </div>

        <div className="relative">
          <div className="aspect-video bg-linear-to-br from-purple-100 to-indigo-200 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={webapp.screenshots?.[currentScreen] || webapp.image} 
              alt={`${webapp.name} screenshot ${currentScreen + 1}`} 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/800x450/8B5CF6/FFFFFF?text=' + encodeURIComponent(webapp.name);
              }}
            />
          </div>
          
          {webapp.screenshots && webapp.screenshots.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {webapp.screenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentScreen(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentScreen === index 
                      ? 'bg-purple-600 w-8' 
                      : 'bg-gray-300 dark:bg-slate-700'
                  }`}
                  aria-label={`View screenshot ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Component: ERP Card ---
function ERPCard({ erp, onContact }: { erp: ERPProject, onContact: (t: string) => void }) {
  const colorMap = {
    blue: {
      gradient: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-600 dark:text-blue-400',
      button: 'from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-blue-600/30'
    },
    orange: {
      gradient: 'from-orange-500 to-red-500',
      bg: 'bg-orange-100 dark:bg-orange-900/30',
      text: 'text-orange-600 dark:text-orange-400',
      button: 'from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-orange-600/30'
    }
  };

  const colors = colorMap[erp.color];

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-500">
      <div className={`absolute top-0 right-0 w-64 h-64 bg-linear-to-br ${colors.gradient} opacity-10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`}></div>
      
      <div className="relative p-6 sm:p-8">
        <div className={`${colors.bg} w-fit p-3 rounded-2xl mb-4`}>
          {React.cloneElement(erp.icon as React.ReactElement<{ className?: string }>, { 
            className: `w-8 h-8 ${colors.text}` 
          })}
        </div>
        
        <h4 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900 dark:text-white">{erp.title}</h4>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{erp.description}</p>
        
        <div className="space-y-2 mb-6">
          {erp.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className={`w-1.5 h-1.5 rounded-full ${colors.bg}`}></div>
              <span className="text-gray-600 dark:text-gray-400">{feature}</span>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-gray-200 dark:border-slate-800">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Starter</p>
              <p className={`text-xl sm:text-2xl font-bold ${colors.text}`}>
                ₹{erp.priceStart}
                <span className="text-sm font-normal text-gray-500">/mo</span>
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Premium</p>
              <p className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300">
                ₹{erp.pricePremium}
                <span className="text-sm font-normal text-gray-500">/mo</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => onContact(erp.title.toLowerCase().replace(' ', '-'))}
            className={`w-full px-6 py-4 bg-linear-to-r ${colors.button} text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg`}
          >
            <MessageCircle size={20} />
            Get {erp.title}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Component: Footer ---
function Footer({ onContact }: { onContact: (type: string) => void }) {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                JV
              </div> */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Dev OptionXi</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Crafting digital experiences with modern technology. Full-stack development services for web and mobile.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Creator</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {/* <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                  JV
                </div> */}
                <img
                    src="/assets/jibin.jpeg"
                    alt="Jibin"
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = ""; // or a fallback URL
                      e.currentTarget.style.display = "none";
                    }}
                  />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Jibin Victor John</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Full-Stack Developer</p>
                </div>
              </div>
            </div>
            {/* <br/>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                  NG
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Nithin George</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">UI/UX Designer</p>
                </div>
              </div>
            </div> */}
          </div>

          <div>
            <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Connect</h4>
            <div className="flex flex-wrap gap-3 mb-4">
              <a 
                href="https://github.com/katmakhan" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-xl transition-all text-gray-700 dark:text-white"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com/in/jibin-victor-john-73a330114" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-xl transition-all text-gray-700 dark:text-white"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://twitter.com/jibinvictorjohn" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-xl transition-all text-gray-700 dark:text-white"
              >
                <Twitter size={20} />
              </a>
               <a 
                href="https://instagram.com/hi_functioning_sociopath" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-xl transition-all text-gray-700 dark:text-white"
              >
                <Instagram size={20} />
              </a>
              <button
                onClick={() => onContact('general')}
                className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all"
              >
                <MessageCircle size={20} />
              </button>
            </div>
            <button
              onClick={() => onContact('general')}
              className="w-full px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/30"
            >
              Get in Touch
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-slate-800 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Jibin Victor John. All rights reserved. Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}