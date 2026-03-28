import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

import { ALL_PRODUCTS, Prod1, Prod2, Prod3 } from '../data/products';
const CORE_PRODUCTS = ALL_PRODUCTS;

import Header from '../components/Header';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';


export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    addToCart, 
    toggleWishlist, 
    wishlistItems,
    openSidebar
  } = useCart();
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [chocolates, setChocolates] = useState('Select Option');
  const [stuffedAnimal, setStuffedAnimal] = useState('Select Option');

  const product = CORE_PRODUCTS.find(p => p.id.toString() === id) || CORE_PRODUCTS[0];
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (product) setSelectedImage(product.image);
  }, [product]);

  const handleAddToCart = () => {
    const options = {};
    if (chocolates !== 'Select Option') options.chocolates = chocolates;
    if (stuffedAnimal !== 'Select Option') options.stuffedAnimal = stuffedAnimal;

    for (let i = 0; i < quantity; i++) {
        addToCart(product, options);
    }
    setQuantity(1);
    openSidebar('cart');
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      
      <Header isScrolled={isScrolled} activePage="" />

      {/* ── Breadcrumbs ── */}
      <div className="container mx-auto px-6 py-6 flex items-center gap-2 text-sm text-slate-400 font-medium">
        <Link to="/" className="hover:text-brand-primary">Home</Link>
        <span>›</span>
        <Link to={`/${product.category.toLowerCase()}`} className="hover:text-brand-primary cursor-pointer transition-colors capitalize">{product.category}</Link>
        <span>›</span>
        <span className="text-slate-900">{product.name}</span>
      </div>

      {/* ── Product Section (Amazon Inspired) ── */}
      <section className="container mx-auto px-6 lg:px-12 py-8 max-w-[1400px]">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* 1. Left: Image Gallery */}
          <div className="w-full lg:w-[50%] flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-16 shrink-0">
              {[product.image, Prod1, Prod2, Prod3].map((img, idx) => (
                <button 
                  key={idx}
                  onMouseEnter={() => setSelectedImage(img)}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-[4/5] w-14 md:w-full rounded border-2 overflow-hidden transition-all ${selectedImage === img ? 'border-brand-primary' : 'border-transparent hover:border-brand-primary'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image with Zoom */}
            <div 
              className="flex-grow relative aspect-[4/5] bg-[#f8f8f8] overflow-hidden rounded-lg cursor-zoom-in group border border-slate-100"
              onMouseMove={(e) => {
                const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                const x = ((e.pageX - left - window.scrollX) / width) * 100;
                const y = ((e.pageY - top - window.scrollY) / height) * 100;
                e.currentTarget.querySelector('img').style.transformOrigin = `${x}% ${y}%`;
              }}
            >
              <img 
                key={selectedImage}
                src={selectedImage} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[2.2] animate-fadeIn" 
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-rose-600 text-white text-[10px] font-bold px-3 py-1 rounded shadow-lg z-10">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* 2. Middle: Product General Info */}
          <div className="w-full lg:w-[30%] space-y-4">
            <h1 className="text-2xl md:text-3xl font-medium text-slate-900 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-2 text-sm border-b border-slate-100 pb-4">
               <div className="flex text-amber-500">★★★★★</div>
               <span className="text-brand-primary hover:text-brand-accent hover:underline cursor-pointer">456 ratings</span>
               <span className="text-slate-300">|</span>
               <span className="text-brand-primary hover:underline cursor-pointer">12 answered questions</span>
            </div>

            <div className="py-2">
               <span className="text-[12px] text-slate-500">Price:</span>
               <span className="text-2xl font-medium text-brand-primary ml-2">{product.price}</span>
            </div>

            <div className="space-y-4">
               <p className="text-sm text-slate-700 italic border-l-4 border-slate-100 pl-4">{product.category} Selection</p>
               <div className="space-y-2 text-sm border-b border-slate-100 pb-8">
                  <p className="font-bold">About this item:</p>
                  <ul className="list-disc list-inside space-y-2 text-slate-600 font-light leading-relaxed">
                     <li>Hand-curated floral arrangement from our London studio.</li>
                     <li>Arrives in a signature protective eco-friendly packaging.</li>
                     <li>Includes premium plant food and care instructions.</li>
                     <li>Sourced directly from sustainable local flower farms.</li>
                  </ul>
               </div>

               {/* Add A Little Something Extra */}
               <div className="pt-8 space-y-6">
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <span className="w-1 h-4 bg-brand-primary rounded-full"></span>
                    Add A Little Something Extra
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {/* Chocolates */}
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-300">
                      <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-brand-primary shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 shrink-0">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M22 12H2"/><path d="m18 6-6 6-6-6"/><path d="m18 18-6-6-6 6"/></svg>
                      </div>
                      <div className="flex-grow space-y-1.5">
                        <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">Sweetness</p>
                        <div className="flex flex-col gap-1">
                          <label className="text-sm font-serif text-slate-800">Artisanal Chocolates</label>
                          <select 
                            value={chocolates}
                            onChange={(e) => setChocolates(e.target.value)}
                            className="w-full bg-white/50 border border-slate-200 rounded-lg px-3 py-1.5 text-[12px] focus:border-brand-primary transition-all outline-none appearance-none cursor-pointer"
                          >
                            <option>Select Option</option>
                            <option>Milk Chocolate Box (+$12.00)</option>
                            <option>Dark Chocolate Truffles (+$18.00)</option>
                            <option>Assorted Belgian (+$25.00)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Stuffed Animal */}
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-300">
                      <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-brand-primary shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 shrink-0">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M10 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M14 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M12 10c-3 0-5 2-5 5v3c0 1 1 2 2 2h6c1 0 2-1 2-2v-3c0-3-2-5-5-5Z"/></svg>
                      </div>
                      <div className="flex-grow space-y-1.5">
                        <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">Companion</p>
                        <div className="flex flex-col gap-1">
                          <label className="text-sm font-serif text-slate-800">Stuffed Animal</label>
                          <select 
                            value={stuffedAnimal}
                            onChange={(e) => setStuffedAnimal(e.target.value)}
                            className="w-full bg-white/50 border border-slate-200 rounded-lg px-3 py-1.5 text-[12px] focus:border-brand-primary transition-all outline-none appearance-none cursor-pointer"
                          >
                            <option>Select Option</option>
                            <option>Classic Teddy Bear (+$15.00)</option>
                            <option>Bunny Plush (+$12.00)</option>
                            <option>Luxury Weighted Bear (+$35.00)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* 3. Right: Purchase Box (The Amazon Buy Box) */}
          <div className="w-full lg:w-[20%]">
             <div className="border border-slate-200 rounded-xl p-5 space-y-4 shadow-sm sticky top-32 bg-white">
                <div className="text-2xl font-medium text-slate-900">{product.price}</div>
                <div className="text-sm text-slate-600">
                   <p>FREE delivery <span className="font-bold">Tomorrow</span>.</p>
                   <p>Order within <span className="text-emerald-600 font-medium">8 hrs 15 mins</span></p>
                </div>
                
                <div className="text-emerald-700 font-bold text-lg">In Stock.</div>

                <div className="space-y-3">
                   <div className="flex items-center gap-3">
                      <span className="text-xs">Quantity:</span>
                      <select 
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 text-sm shadow-sm focus:outline-none"
                      >
                         {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                   </div>

                   <button 
                     onClick={handleAddToCart}
                     className="w-full py-2.5 bg-brand-primary hover:bg-brand-accent text-white rounded-full font-medium text-sm transition-all shadow-sm"
                   >
                     Add to Cart
                   </button>
                   <button 
                     onClick={handleBuyNow}
                     className="w-full py-2.5 bg-brand-accent hover:bg-violet-600 text-white rounded-full font-medium text-sm transition-all shadow-sm"
                   >
                     Buy Now
                   </button>
                </div>

                <div className="pt-4 space-y-2 text-[11px] text-slate-500 border-t border-slate-100">
                   <div className="flex justify-between">
                      <span>Ships from</span>
                      <span className="text-slate-900 font-medium text-right">Gallatin Atelier</span>
                   </div>
                   <div className="flex justify-between">
                      <span>Sold by</span>
                      <span className="text-slate-900 font-medium text-right">The Boutique Official</span>
                   </div>
                </div>

                <button 
                  onClick={() => toggleWishlist(product)}
                  className="w-full pt-4 text-[12px] text-left text-brand-primary hover:text-brand-accent hover:underline flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  {isInWishlist ? 'Saved to your list' : 'Add to List'}
                </button>
             </div>
          </div>

        </div>
      </section>

      {/* ── Additional Sections (Related, Tabs) ── */}
      <section className="bg-slate-50 py-10 mt-10">
        <div className="container mx-auto px-6">
           <div className="flex border-b border-slate-200 mb-6 sticky top-20 bg-slate-50 z-20">
              {['Description', 'Information', 'Reviews'].map(tab => (
                 <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`px-8 py-3 text-sm font-bold border-b-2 transition-all uppercase tracking-widest ${activeTab === tab.toLowerCase() ? 'border-brand-primary text-brand-primary' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                 >
                   {tab}
                 </button>
              ))}
           </div>

           <div className="max-w-4xl min-h-[150px]">
              {activeTab === 'description' && (
                 <div className="space-y-6 animate-fadeIn">
                    <h3 className="text-xl font-bold text-slate-900">Product Description</h3>
                    <p className="text-slate-600 leading-loose">Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>
                 </div>
              )}
              {activeTab === 'information' && (
                 <div className="space-y-4 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="border border-slate-200 p-4 rounded-lg bg-white">
                          <p className="text-xs font-bold text-slate-400 uppercase mb-1">Dimensions</p>
                          <p className="font-medium">40 x 40 x 60 cm</p>
                       </div>
                       <div className="border border-slate-200 p-4 rounded-lg bg-white">
                          <p className="text-xs font-bold text-slate-400 uppercase mb-1">Weight</p>
                          <p className="font-medium">1.5 kg</p>
                       </div>
                    </div>
                 </div>
              )}
              {activeTab === 'reviews' && (
                 <div className="space-y-8 animate-fadeIn">
                    <div className="flex gap-4 items-start">
                       <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary font-bold">SJ</div>
                       <div className="space-y-1">
                          <div className="flex text-amber-500 text-xs">★★★★★</div>
                          <p className="font-bold text-sm">Sarah J.</p>
                          <p className="text-slate-600 text-sm italic">"The most beautiful arrangement I have ever received. The colors were so vivid and the scent filled the entire house."</p>
                       </div>
                    </div>
                 </div>
              )}
           </div>
        </div>
      </section>

      <section className="py-20 border-t border-slate-100">
         <div className="container mx-auto px-6">
            <h2 className="text-xl font-bold mb-10">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {CORE_PRODUCTS.filter(p => p.id !== product.id).slice(0, 6).map((rel) => (
                <div key={rel.id} className="group flex flex-col">
                  <Link to={`/product/${rel.id}`} className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-slate-50 mb-3 border border-slate-100">
                    <img src={rel.image} alt={rel.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </Link>
                  <Link to={`/product/${rel.id}`} className="text-sm font-medium text-brand-primary hover:text-brand-accent truncate mb-1">{rel.name}</Link>
                  <div className="text-brand-primary font-bold text-sm">{rel.price}</div>
                </div>
              ))}
            </div>
         </div>
      </section>

      <Footer />
      <CartSidebar />
    </div>
  );
}
