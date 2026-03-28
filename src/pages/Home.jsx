import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { AnimatedTestimonials } from '../components/ui/AnimatedTestimonials'
import Footer from '../components/Footer'
import Header from '../components/Header'
import CartSidebar from '../components/CartSidebar'

// Local Assets
import HeroPrimary from '../assets/woman-holding-bouquet-purple-lilacs-roses-hand.jpg'
import HeroSecondary from '../assets/purple-bouquet.jpg'
import HeroTertiary from '../assets/lush-purple-floral-bouquet-golden-vase-adorning-home-decor.jpg'


// Category Images (Optimized for performance)
import CatWedding from '../assets/fantastic-wedding-bouquet-consists-colorful-roses-bride.jpg'
import CatVase from '../assets/bouquet-red-flowers-glass-vase-dark-background.jpg'
import CatSeasonal from '../assets/purple-bouquet.jpg'
import CatDried from '../assets/lush-purple-floral-bouquet-golden-vase-adorning-home-decor.jpg'
import CatBirthday from '../assets/colorful-bouquet-carnations-roses-windflowers-floss-flowers.jpg'

import { FEATURED_PRODUCTS, Prod1, Prod2, Prod3 } from '../data/products';
const SLIDER_PRODUCTS = FEATURED_PRODUCTS;

// Additional Page Specific Assets



function FloralHeroBanner() {
  return (
    <section className="relative h-screen min-h-[700px] flex overflow-hidden bg-[#12091e]">
      
      {/* ══ LEFT PANEL — Editorial Text ══ */}
      <div className="relative z-20 flex flex-col justify-between w-full lg:w-[48%] px-10 md:px-16 py-14">
        
        {/* Top tag */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-[1px] bg-brand-accent/60"></div>
          <span className="text-[9px] font-black text-brand-accent/80 uppercase tracking-[0.5em]">Gallatin · Atelier MMXXV</span>
        </div>

        {/* Center Content */}
        <div className="space-y-10">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl xl:text-[5.5rem] font-serif text-white leading-[0.88] tracking-tighter">
              Where
              <br />
              <span className="italic font-light" style={{ background: 'linear-gradient(135deg, #B57C3C, #d4a96a, #c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Flowers
              </span>
              <br />
              Become Art.
            </h1>
          </div>

          <p className="text-slate-400 text-base md:text-lg font-light leading-relaxed max-w-md">
            Luxury bouquet ateliers crafted by master florists. Rare stems, avant-garde design, and same-day delivery across the city.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <Link to="/roses" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-[#12091e] rounded-full font-black text-[10px] tracking-[0.4em] uppercase hover:bg-brand-accent hover:text-white transition-all duration-500 shadow-2xl hover:-translate-y-1 group">
              Shop The Edit
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </Link>
            <Link to="/birthday" className="inline-flex items-center gap-3 px-8 py-5 border border-white/20 text-white/70 rounded-full font-bold text-[10px] tracking-[0.4em] uppercase hover:border-brand-accent hover:text-brand-accent transition-all duration-500">
              View Occasions
            </Link>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-8 pt-4 border-t border-white/10">
            {[
              { num: "12K+", label: "Bouquets Delivered" },
              { num: "98%", label: "5-Star Reviews" },
              { num: "2hr", label: "Express Delivery" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-serif font-bold text-white leading-none">{s.num}</div>
                <div className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ══ RIGHT PANEL — Image Collage ══ */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[58%] z-10">
        
        {/* Main full-height image */}
        <div className="absolute inset-0">
          <img src={HeroPrimary} className="w-full h-full object-cover" alt="Luxury Bouquet" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#12091e] via-[#12091e]/30 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#12091e]/50 via-transparent to-transparent"></div>
        </div>

        {/* Floating image card — top right */}
        <div className="absolute top-10 right-8 w-40 aspect-[3/4] rounded-[36px] overflow-hidden border-2 border-white/10 shadow-2xl animate-float-gentle z-20 backdrop-blur-sm">
          <img src={HeroSecondary} className="w-full h-full object-cover" alt="Floral" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        {/* Floating image card — bottom */}
        <div className="absolute bottom-12 right-44 w-48 aspect-[4/5] rounded-[44px] overflow-hidden border-2 border-white/10 shadow-2xl animate-float-gentle [animation-delay:1.2s] z-20">
          <img src={HeroTertiary} className="w-full h-full object-cover" alt="Floral" />
        </div>

        {/* Floating badge — In Season */}
        <div className="absolute top-1/2 left-8 -translate-y-1/2 z-30 bg-white/8 backdrop-blur-xl border border-white/15 rounded-3xl p-5 shadow-2xl space-y-2 min-w-[180px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0"></span>
            <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">In Season Now</span>
          </div>
          <p className="text-white font-serif text-base leading-tight">Summer <br /><span className="italic font-light" style={{ color: '#d4a96a' }}>Rose Archive</span></p>
          <p className="text-[10px] text-white/40 font-medium">From £65 · Same Day</p>
        </div>
      </div>


    </section>
  );
}


function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { 
    addToCart, 
    toggleWishlist, 
    wishlistItems
  } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Header isScrolled={isScrolled} activePage="home" />

      {/* ── 🌸 FLORAL HERO BANNER ── */}
      <FloralHeroBanner />

      {/* ── Trust Markers (Redesigned) ── */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="flex flex-col items-center mb-16 text-center">
            <span className="text-brand-primary text-[10px] font-black tracking-[0.4em] uppercase mb-4">Our Commitment</span>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 leading-tight">
              Why Choose <span className="italic text-brand-primary">The Boutique?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "M5 13l4 4L19 7",
                title: "Arrives Fresh",
                desc: "Hand-selected stems, kept in water until the final moment to ensure peak bloom longevity.",
                num: "01"
              },
              {
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Same Day Delivery",
                desc: "Local delivery in local time. Order by 2pm for guaranteed delivery before the sun sets.",
                num: "02"
              },
              {
                icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                title: "Artisan Florists",
                desc: "Each bouquet is a bespoke creation, crafted with passion by our award-winning master designers.",
                num: "03"
              },
            ].map((item) => (
              <div key={item.title} className="group relative bg-slate-50/50 border border-slate-100 rounded-[2.5rem] p-10 hover:bg-white hover:shadow-[0_20px_60px_-15px_rgba(76,29,149,0.12)] transition-all duration-500">
                {/* Large Background Number */}
                <div className="absolute top-8 right-10 text-6xl font-serif italic text-brand-primary/[0.03] select-none">{item.num}</div>

                <div className="space-y-6 relative z-10">
                  <div className="w-16 h-16 bg-brand-primary/5 rounded-2xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 rotate-3 group-hover:rotate-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-serif text-slate-900">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>

                  <div className="pt-4 flex items-center gap-2 text-brand-primary text-[10px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <span>Learn More</span>
                    <span className="w-6 h-[1px] bg-brand-primary"></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 🌸 TOP CATEGORIES (Visual Gallery) ── */}
      <section className="bg-slate-50/50 py-24 relative overflow-hidden">
        {/* Decorative background label */}
        <div className="absolute top-10 right-10 text-[10rem] font-serif italic text-brand-primary/[0.03] rotate-12 select-none pointer-events-none">
          Curation
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4">
              <span className="text-brand-primary text-[10px] font-black tracking-[0.5em] uppercase">Seasonal Edits</span>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900">Explore <span className="italic text-brand-primary">Categories</span></h2>
            </div>
            <p className="text-slate-500 text-sm font-light max-w-xs text-right hidden md:block italic">
              "Every flower is a soul blossoming in nature."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
            {[
              { name: "EASTER", img: CatSeasonal, count: "09 Items", shape: "rounded-t-full", link: "/easter" },
              { name: "ROSES", img: CatWedding, count: "10 Items", shape: "rounded-[3rem]", link: "/roses" },
              { name: "BIRTHDAY", img: CatBirthday, count: "09 Items", shape: "rounded-t-full", link: "/birthday" },
              { name: "SYMPATHY", img: Prod3, count: "12 Items", shape: "rounded-[3rem]", link: "#" },
              { name: "OCCASIONS", img: CatVase, count: "15 Items", shape: "rounded-t-full", link: "#" },
              { name: "HOLIDAYS", img: Prod2, count: "08 Items", shape: "rounded-[3rem]", link: "#" },
            ].map((cat, i) => (
              <Link
                key={i}
                to={cat.link}
                className={`group block relative ${i % 2 !== 0 ? 'md:translate-y-8' : ''} transition-transform duration-700`}
              >
                <div className={`relative aspect-[4/5] ${cat.shape} overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 bg-slate-200`}>
                  <img
                    src={cat.img}
                    alt={cat.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] will-change-transform"
                  />
                  {/* Premium Tint Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-primary/5 to-brand-primary/40 opacity-60 group-hover:opacity-100 transition-opacity"></div>

                  {/* Floating Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[8px] font-bold text-white/70 uppercase tracking-[0.3em] mb-2 block">{cat.count}</span>
                    <h3 className="text-lg font-serif text-white tracking-wider">{cat.name}</h3>
                  </div>
                </div>

                {/* Hover Indicator Icon */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-50 group-hover:scale-100 hover:bg-brand-primary hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>




      {/* ── Redesigned Signature Collections (The Precision Boutique - E-commerce Style) ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-8">

          {/* E-commerce Style Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-100 pb-12 gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-50 text-brand-primary rounded-md text-[10px] font-bold uppercase tracking-widest border border-violet-100">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
                Live Inventory
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">Signature <br /><span className="italic text-brand-primary">Arrangements.</span></h2>
            </div>

            <div className="flex items-center gap-8">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sort By</span>
                <button className="text-sm font-bold text-slate-800 flex items-center gap-2 hover:text-brand-primary transition-colors">
                  Recommended
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="stroke-current">
                    <path d="M1 1L5 5L9 1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <button className="px-8 py-4 bg-brand-primary text-white rounded-xl font-bold text-[11px] tracking-widest uppercase hover:bg-brand-accent transition-all shadow-xl shadow-brand-primary/20">
                View All Shop
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {FEATURED_PRODUCTS.map((product) => (
              <div key={product.id} className="group flex flex-col items-center text-center h-full hover:-translate-y-2 transition-transform duration-500">
                {/* Product Image Stage */}
                <Link to={`/product/${product.id}`} className="relative aspect-[4/5] w-full overflow-hidden rounded-[40px] bg-white mb-8 shadow-sm border border-slate-50 group-hover:shadow-2xl transition-all duration-700 block">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                  />

                  {/* Badges */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    {product.id === 2 && (
                      <span className="bg-brand-primary/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-white shadow-xl">
                        Best Seller
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="absolute top-6 right-6 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 z-30">
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl transition-all cursor-pointer group/icon ${wishlistItems.some(item => item.id === product.id) ? 'bg-brand-primary text-white' : 'bg-white text-slate-800 hover:bg-brand-primary hover:text-white'}`}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={`stroke-current pointer-events-none group-hover/icon:fill-white ${wishlistItems.some(item => item.id === product.id) ? 'fill-current' : ''}`}>
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>

                  {/* Instant Add-to-Cart Reveal */}
                  <div className="absolute inset-x-6 bottom-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }}
                      className="w-full py-5 bg-brand-primary/95 backdrop-blur-md text-white rounded-2xl font-black text-[10px] tracking-[0.3em] uppercase hover:bg-brand-accent transition-all shadow-2xl cursor-pointer"
                    >
                      Add to Cart — {product.price}
                    </button>
                  </div>
                </Link>

                {/* Info & Reviews */}
                <div className="px-1 flex flex-col items-center">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-xl font-serif text-slate-900 group-hover:text-brand-primary transition-colors mb-2 cursor-pointer">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-lg font-serif italic text-brand-primary">{product.price}</span>
                    <span className={`text-[9px] font-bold uppercase tracking-widest ${product.stock <= 5 ? 'text-rose-500' : 'text-slate-400 opacity-60'}`}>
                      {product.stock <= 5 ? `Only ${product.stock} Left` : `${product.stock} in stock`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── New Product Slider Section ── */}
      <section className="py-24 bg-slate-50/30 border-t border-slate-100 overflow-hidden relative">
        <div className="container mx-auto px-8 mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-2">
            <span className="text-brand-primary text-[10px] font-black tracking-[0.4em] uppercase">Just Landed</span>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mt-2">
              Curated <span className="italic text-brand-primary">Discoveries.</span>
            </h2>
          </div>
          <div className="flex gap-4 items-center z-10">
            <button className="w-12 h-12 border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-brand-primary hover:border-brand-primary transition-all hidden md:flex group shadow-sm hover:shadow-md" onClick={() => document.getElementById('product-slider').scrollBy({left: -(document.getElementById('product-slider').clientWidth + 24), behavior: 'smooth'})}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="stroke-current group-hover:-translate-x-1 transition-transform duration-300">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="w-12 h-12 border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-brand-primary hover:border-brand-primary transition-all hidden md:flex group shadow-sm hover:shadow-md" onClick={() => document.getElementById('product-slider').scrollBy({left: (document.getElementById('product-slider').clientWidth + 24), behavior: 'smooth'})}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="stroke-current group-hover:translate-x-1 transition-transform duration-300">
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Horizontal scroll container */}
        <div className="container mx-auto px-8">
          <div id="product-slider" className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {SLIDER_PRODUCTS.map((product) => (
              <div key={product.id} className="snap-start shrink-0 w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] group relative flex flex-col h-full hover:-translate-y-2 transition-transform duration-500">
                
                {/* Product Image Stage */}
                <Link to={`/product/${product.id}`} className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white mb-6 shadow-sm border border-slate-100 group-hover:shadow-2xl transition-all duration-700 block">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                  />

                  {/* E-comm Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-800 shadow-sm">
                      {product.category}
                    </span>
                  </div>

                  {/* Actions (Wishlist & Quick-look) */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 z-30">
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xl transition-all cursor-pointer group/icon ${wishlistItems.some(item => item.id === product.id) ? 'bg-brand-primary text-white' : 'bg-white text-slate-800 hover:bg-brand-primary hover:text-white'}`}
                      title="Add to Wishlist"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={`stroke-current pointer-events-none group-hover/icon:fill-white ${wishlistItems.some(item => item.id === product.id) ? 'fill-current' : ''}`}>
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>

                  {/* Instant Add-to-Cart Reveal */}
                  <div className="absolute inset-x-4 bottom-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }}
                      className="w-full py-4 bg-brand-primary/95 backdrop-blur-md text-white rounded-xl font-bold text-[10px] tracking-widest uppercase hover:bg-brand-accent transition-colors shadow-2xl cursor-pointer"
                    >
                      Add to Cart — {product.price}
                    </button>
                  </div>

                  {/* Gradient Shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </Link>

                {/* Info */}
                <div className="px-1 flex flex-col items-center gap-1">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-primary transition-colors mb-1 text-center cursor-pointer">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-slate-900">{product.price}</span>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${product.stock <= 5 ? 'text-rose-500' : 'text-slate-400 opacity-60'}`}>
                      {product.stock <= 5 ? `Urgent: ${product.stock} Left` : `${product.stock} available`}
                    </span>
                  </div>
                </div>

              </div>
            ))}
        </div>
        </div>
      </section>

      {/* ── ❓ PREMIUM FAQ SECTION ── */}
      <section className="py-28 bg-slate-50/50 relative overflow-hidden">
        {/* Background branding mark */}
        <div className="absolute -bottom-20 -right-20 text-[15rem] font-serif italic text-brand-primary/[0.02] select-none pointer-events-none">
          Care
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20">

            {/* Left: Content Header */}
            <div className="w-full lg:w-1/3 space-y-8">
              <div className="space-y-4">
                <span className="text-brand-primary text-[10px] font-black tracking-[0.4em] uppercase">Common Inquiries</span>
                <h2 className="text-4xl md:text-6xl font-serif text-slate-900 leading-tight">
                  Your <br /><span className="italic text-brand-primary">Questions</span>, <br />Answered.
                </h2>
              </div>
              <p className="text-slate-500 font-light leading-relaxed max-w-sm">
                Everything you need to know about our sourcing, delivery, and floral care. Can't find what you're looking for?
              </p>
              <div className="pt-4">
                <button className="flex items-center gap-4 group text-brand-primary font-bold text-[10px] tracking-widest uppercase pb-2 border-b border-brand-primary/20 hover:border-brand-primary transition-all">
                  Contact Our Studio
                  <svg width="18" height="12" viewBox="0 0 18 12" fill="none" className="stroke-current group-hover:translate-x-2 transition-transform">
                    <path d="M12 1L17 6L12 11M1 6H17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right: Accordion FAQ */}
            <div className="w-full lg:w-2/3 space-y-4">
              {[
                {
                  q: "Do you offer same-day delivery?",
                  a: "Yes, for orders placed before 2:00 PM local time. We deliver throughout the greater metropolitan area using our climate-controlled courier fleet to ensure your blooms arrive in harvest-fresh condition."
                },
                {
                  q: "How long will my arrangement stay fresh?",
                  a: "Most of our signature bouquets last between 7-10 days. We include a specialty ‘Studio Bloom’ nutrient packet and a digital care guide with every order to help you maximize the longevity of your stems."
                },
                {
                  q: "Are your flowers sustainably sourced?",
                  a: "Transparency is our core value. 100% of our stems are sourced from certified ethical farms that prioritize biodiversity and soil health. Plus, our packaging is entirely compostable and plastic-free."
                },
                {
                  q: "Can I request a custom color palette?",
                  a: "Absolutely. Our master florists specialize in bespoke architecture. You can select 'Custom Edit' at checkout or contact our studio directly to discuss a one-of-a-kind palette for your event."
                },
                {
                  q: "What is your substitution policy?",
                  a: "Since we work with seasonal nature, occasionally a specific stem may be unavailable. In these rare cases, our lead florists will substitute with a bloom of equal or greater value that maintains the specific aesthetic integrity of your chosen design."
                }
              ].map((faq, i) => (
                <div key={i} className="group border-b border-slate-200">
                  <button
                    onClick={() => {
                      const el = document.getElementById(`faq-ans-${i}`);
                      const icon = document.getElementById(`faq-icon-${i}`);
                      const isOpen = el.style.maxHeight !== '0px' && el.style.maxHeight !== '';

                      // Close all others
                      for (let j = 0; j < 5; j++) {
                        document.getElementById(`faq-ans-${j}`).style.maxHeight = '0px';
                        document.getElementById(`faq-icon-${j}`).style.transform = 'rotate(0deg)';
                      }

                      if (!isOpen) {
                        el.style.maxHeight = el.scrollHeight + 'px';
                        icon.style.transform = 'rotate(180deg)';
                      }
                    }}
                    className="w-full py-8 flex items-center justify-between text-left outline-none group"
                  >
                    <span className="text-lg md:text-xl font-serif text-slate-800 group-hover:text-brand-primary transition-colors pr-8">
                      <span className="text-xs font-serif italic text-brand-primary/40 mr-4">0{i + 1}</span>
                      {faq.q}
                    </span>
                    <div id={`faq-icon-${i}`} className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-all duration-500 shadow-sm">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="stroke-current">
                        <path d="M1 1L6 6L11 1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>
                  <div
                    id={`faq-ans-${i}`}
                    className="overflow-hidden transition-all duration-500"
                    style={{ maxHeight: '0px' }}
                  >
                    <div className="pb-8 pr-12">
                      <p className="text-slate-500 font-light leading-relaxed text-sm md:text-base max-w-2xl">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── ✍️ REDESIGNED TESTIMONIALS (Animated Anthology) ── */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Decorative Watermark */}
        <div className="absolute top-0 right-0 p-20 opacity-[0.02] pointer-events-none select-none">
          <span className="text-[15rem] font-serif italic text-brand-primary">Voices</span>
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="flex flex-col items-center text-center mb-16 space-y-4">
            <span className="text-brand-accent text-[11px] font-black tracking-[0.5em] uppercase">Community Stories</span>
            <h2 className="text-4xl md:text-6xl font-serif text-slate-900 leading-tight">
              Shared <span className="italic text-brand-primary">Experiences.</span>
            </h2>
          </div>

          <AnimatedTestimonials
            autoplay={true}
            testimonials={[
              {
                name: "Eleanor Vance",
                designation: "Verified Collector · London Studio",
                quote: "The Midnight Rose Symphony arrived in such a pristine state. It felt like a piece of art rather than just a bouquet. Simply breathtaking.",
                src: Prod1
              },
              {
                name: "Julian Barnes",
                designation: "Floral Subscriber · Surrey Annex",
                quote: "I’ve been a subscriber for six months now. Every Friday feels like a celebration. The seasonal variety is absolutely unmatched.",
                src: Prod2
              },
              {
                name: "Sophia Thorne",
                designation: "Bridal Client · Chelsea Boutique",
                quote: "Our wedding flowers were the talk of the evening. The team's attention to detail and color palette was beyond my expectations.",
                src: Prod3
              }
            ]}
          />
        </div>
      </section>


      {/* ── Subscription Section ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="relative rounded-[50px] overflow-hidden bg-violet-950 min-h-[440px] flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 h-56 lg:h-full relative overflow-hidden">
              <img src={HeroTertiary} alt="Subscription" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-r from-violet-950 via-transparent to-transparent hidden lg:block"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-violet-950 via-transparent to-transparent lg:hidden"></div>
            </div>
            <div className="w-full lg:w-1/2 p-10 lg:p-16 relative z-10 text-center lg:text-left">
              <span className="text-brand-accent text-xs font-bold tracking-[0.3em] uppercase mb-3 block">Seasonal Subscription</span>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-6 leading-tight">Always bloom with our <br /><span className="italic text-brand-secondary">floral membership</span></h2>
              <p className="text-violet-200 text-base mb-8 font-light max-w-md">Save up to 25% and receive a fresh bundle of joy every week. Pause or cancel anytime.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-violet-300/50 focus:outline-none focus:ring-2 focus:ring-brand-accent backdrop-blur-md"
                />
                <button className="px-8 py-4 bg-white text-violet-950 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-brand-accent hover:text-white transition-all shadow-2xl">
                  Join Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ── Boutique Hours Section ── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left: Branding/Visual */}
            <div className="w-full lg:w-1/2 space-y-10 order-2 lg:order-1">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                    {(() => {
                      const now = new Date();
                      const day = now.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
                      const hour = now.getHours();
                      const min = now.getMinutes();
                      const timeString = hour * 60 + min;

                      const schedule = [
                        { open: null, close: null }, // Sun
                        { open: 8.5 * 60, close: 16.5 * 60 }, // Mon
                        { open: 8.5 * 60, close: 16.5 * 60 }, // Tue
                        { open: 8.5 * 60, close: 16.5 * 60 }, // Wed
                        { open: 8.5 * 60, close: 16.5 * 60 }, // Thu
                        { open: 8.5 * 60, close: 16.5 * 60 }, // Fri
                        { open: 8 * 60, close: 12 * 60 } // Sat
                      ];

                      const todaySchedule = schedule[day];
                      if (!todaySchedule.open) return "Closed Today";
                      if (timeString >= todaySchedule.open && timeString < todaySchedule.close) {
                        return "Open Now";
                      }
                      return "Closed Now";
                    })()}
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-serif text-slate-900 leading-tight">
                  Visit Our <br /><span className="italic text-brand-primary">Atelier.</span>
                </h2>
                <p className="text-slate-500 font-light leading-relaxed max-w-sm">
                  Step into our London studio to experience the scents and textures of our latest floral arrivals in person.
                </p>
              </div>

              <div className="space-y-6 pt-6">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-primary shrink-0 transition-transform hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-serif text-slate-900 text-lg">Location</h4>
                    <p className="text-slate-500 font-light">42 Main Street, Gallatin <br />TN 37066</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-primary shrink-0 transition-transform hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h2.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-serif text-slate-900 text-lg">Contact</h4>
                    <p className="text-slate-500 font-light">+1 (615) 452 0123 <br />studio@gallatinflower.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Hours Table */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="bg-slate-50/50 rounded-[40px] p-8 md:p-12 border border-slate-100 shadow-sm relative overflow-hidden group">
                {/* Subtle background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/[0.03] rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-primary/[0.05] transition-colors duration-700"></div>
                
                <div className="space-y-4 relative z-10">
                  {[
                    { day: "Mon", hours: "8:30 AM - 4:30 PM" },
                    { day: "Tue", hours: "8:30 AM - 4:30 PM" },
                    { day: "Wed", hours: "8:30 AM - 4:30 PM" },
                    { day: "Thu", hours: "8:30 AM - 4:30 PM" },
                    { day: "Fri", hours: "8:30 AM - 4:30 PM" },
                    { day: "Sat", hours: "8:00 AM - 12:00 PM" },
                    { day: "Sun", hours: "Closed", special: true },
                  ].map((row, i) => {
                    const isToday = new Date().getDay() === (i + 1) % 7;
                    return (
                      <div key={row.day} className={`flex items-center justify-between py-4 ${i !== 6 ? 'border-b border-slate-200/50' : ''}`}>
                        <div className="flex items-center gap-4">
                          <span className={`text-base font-serif w-12 ${isToday ? 'text-brand-primary font-bold' : 'text-slate-800'}`}>
                            {row.day}
                          </span>
                          {isToday && <span className="text-[9px] uppercase tracking-widest font-black text-brand-accent/80 bg-brand-accent/10 px-2 py-0.5 rounded-md">Today</span>}
                        </div>
                        <span className={`font-light text-sm ${row.special ? 'text-brand-primary italic font-medium' : 'text-slate-500'}`}>{row.hours}</span>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-10 pt-10 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                  <p className="text-[10px] text-slate-400 font-light italic leading-relaxed">** Atelier visits and pick-up orders are <br />strictly limited to these hours.</p>
                  <button className="whitespace-nowrap px-8 py-4 bg-brand-primary text-white rounded-full font-bold text-[10px] tracking-widest uppercase hover:bg-brand-accent transition-all shadow-xl shadow-brand-primary/20 active:scale-95">
                    Navigate to Studio
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Footer ── */}

      <CartSidebar />
      <Footer />
    </div>
  );
}

export default Home;
