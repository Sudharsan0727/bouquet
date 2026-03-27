import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

import { ROSES_PRODUCTS } from '../data/products';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Roses() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { 
    cartItems, 
    wishlistItems, 
    addToCart, 
    toggleWishlist, 
    sidebarOpen, 
    sidebarTab, 
    openSidebar, 
    closeSidebar, 
    setSidebarTab, 
    removeFromCart, 
    removeFromWishlist,
    updateCartQuantity 
  } = useCart();
  const [priceRange, setPriceRange] = useState(300);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = ROSES_PRODUCTS
    .filter(p => {
      const cost = parseInt(p.price.replace('$', '').split('.')[0]);
      if (cost > priceRange) return false;
      if (activeCategory !== "All" && p.category !== activeCategory) return false;
      return true;
    })
    .sort((a,b) => {
      if (sortBy === 'price-low') {
        return parseInt(a.price.replace('$', '')) - parseInt(b.price.replace('$', ''));
      }
      if (sortBy === 'price-high') {
        return parseInt(b.price.replace('$', '')) - parseInt(a.price.replace('$', ''));
      }
      if (sortBy === 'latest') {
        return b.id - a.id;
      }
      if (sortBy === 'popularity') {
         return (b.badge === 'Best Seller' ? 1 : 0) - (a.badge === 'Best Seller' ? 1 : 0);
      }
      return 0;
    });


  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans text-slate-800">
      <Header isScrolled={isScrolled} activePage="roses" />

      {/* ── Page Header ── */}
      <section className="relative bg-violet-50 py-16 md:py-24 overflow-hidden flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)' }}>
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-brand-accent/10 blur-[80px] rounded-full" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] bg-brand-primary/10 blur-[80px] rounded-full" />
        </div>

        <div className="relative z-10 text-center space-y-4 px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-primary leading-tight tracking-tight">
            Roses <span className="italic font-light text-brand-accent">Collection</span>
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto font-light md:text-lg">
            Express your deepest emotions with our exquisite collection of premium roses, hand-selected for unmatched beauty and longevity.
          </p>
        </div>
      </section>

      {/* ── Main Content Area (Sidebar + Grid) ── */}
      <section className="container mx-auto px-6 lg:px-12 py-16 flex flex-col lg:flex-row gap-12">

        {/* Sidebar Filter */}
        <aside className="w-full lg:w-1/4 space-y-10">

          {/* Search */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif text-slate-900 border-b border-slate-200 pb-2">Search</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-xl focus:border-brand-primary outline-none transition-colors text-sm"
              />
              <svg className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif text-slate-900 border-b border-slate-200 pb-2">Varieties</h3>
            <ul className="space-y-3">
              {["All", "Red Roses", "White Roses", "Pink Roses", "Mixed", "Premium"].map(category => (
                <li key={category}>
                  <button
                    onClick={() => setActiveCategory(category)}
                    className={`text-sm w-full text-left transition-colors flex items-center justify-between ${activeCategory === category ? 'text-brand-primary font-bold' : 'text-slate-500 hover:text-brand-primary'}`}
                  >
                    <span>{category}</span>
                    {activeCategory === category && <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif text-slate-900 border-b border-slate-200 pb-2">Filter by Price</h3>
            <div className="pt-2">
              <input
                type="range"
                min="0"
                max="300"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-brand-primary"
              />
              <div className="flex justify-between items-center mt-4 text-sm font-bold text-slate-600">
                <span>Price: <span className="text-brand-primary">$0 - ${priceRange}</span></span>
                <button className="text-[10px] uppercase tracking-widest bg-slate-100 hover:bg-brand-primary hover:text-white px-3 py-1 rounded-full transition-colors">
                  Filter
                </button>
              </div>
            </div>
          </div>

        </aside>

        {/* Product Grid */}
        <div className="w-full lg:w-3/4">

          {/* Top Bar inside Grid */}
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
            <p className="text-sm text-slate-500">Showing 1–{filteredProducts.length} of {ROSES_PRODUCTS.length} results</p>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border border-slate-200 text-sm py-2 px-4 rounded-lg focus:outline-none focus:border-brand-primary"
            >
              <option value="default">Default sorting</option>
              <option value="popularity">Sort by popularity</option>
              <option value="latest">Sort by latest</option>
              <option value="price-low">Sort by price: low to high</option>
              <option value="price-high">Sort by price: high to low</option>
            </select>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group flex flex-col">
                <Link to={`/product/${product.id}`} className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-100 mb-4 cursor-pointer block">
                  {/* Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Badges */}
                  {product.badge && (
                    <span className={`absolute top-4 left-4 text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full z-10 ${product.badge === 'Sale' ? 'bg-rose-500 text-white' :
                        product.badge === 'New' ? 'bg-brand-accent text-white' :
                          'bg-white text-slate-800'
                      }`}>
                      {product.badge}
                    </span>
                  )}

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }}
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-800 hover:bg-brand-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 shadow-lg cursor-pointer"
                      title="Add to Cart"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
                      className={`w-12 h-12 bg-white rounded-full flex items-center justify-center transition-all transform translate-y-4 group-hover:translate-y-0 shadow-lg delay-75 cursor-pointer ${wishlistItems.some(item => item.id === product.id) ? 'text-brand-accent/90 focus:text-brand-accent hover:text-white' : 'text-slate-800 hover:text-white hover:bg-brand-primary'}`}
                      title="Add to Wishlist"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 pointer-events-none ${wishlistItems.some(item => item.id === product.id) ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </Link>

                {/* Details */}
                <div className="text-center space-y-1">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">{product.category}</p>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-serif text-lg text-slate-900 group-hover:text-brand-primary transition-colors cursor-pointer">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex flex-col items-center">
                    <span className="text-brand-accent font-bold">{product.price}</span>
                    <span className={`text-[8px] font-black uppercase tracking-widest mt-1 ${product.stock <= 5 ? 'text-rose-500' : 'text-slate-300'}`}>
                      {product.stock <= 5 ? `In Stock: ${product.stock}` : `Available`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-serif text-slate-500 mb-2">No products found</h3>
              <p className="text-slate-400">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>

      </section>



      {/* ── Slide-Over Sidebar (Cart & Wishlist) ── */}
      <div className={`fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm transition-opacity duration-500 ${sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={closeSidebar}>
        <div className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] flex flex-col ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={e => e.stopPropagation()}>

          <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
            <div className="flex gap-6">
              <button
                onClick={() => setSidebarTab('cart')}
                className={`text-lg font-serif transition-colors pb-1 ${sidebarTab === 'cart' ? 'text-brand-primary font-bold border-b-2 border-brand-primary' : 'text-slate-400 hover:text-slate-900'}`}
              >
                Cart ({cartItems.length})
              </button>
              <button
                onClick={() => setSidebarTab('wishlist')}
                className={`text-lg font-serif transition-colors pb-1 ${sidebarTab === 'wishlist' ? 'text-brand-primary font-bold border-b-2 border-brand-primary' : 'text-slate-400 hover:text-slate-900'}`}
              >
                Wishlist ({wishlistItems.length})
              </button>
            </div>
            <button onClick={closeSidebar} className="p-2 text-slate-400 hover:text-brand-primary hover:bg-violet-50 rounded-full transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-8 border-b border-slate-50">
             {sidebarTab === 'cart' ? (
                cartItems.length > 0 ? (
                   <div className="space-y-8">
                      {cartItems.map(item => (
                         <div key={item.id} className="flex gap-6 border-b border-slate-50 pb-8 last:border-0 group/item">
                            <div className="w-24 aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100 shrink-0 shadow-sm transition-transform group-hover/item:scale-105">
                               <img src={item.image} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow flex flex-col justify-between py-1">
                               <div>
                                  <div className="flex justify-between items-start mb-1">
                                     <p className="font-serif text-slate-900 text-lg leading-tight line-clamp-2">{item.name}</p>
                                     <button 
                                        onClick={() => removeFromCart(item.id)} 
                                        className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                                     >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                     </button>
                                  </div>
                                  <p className="text-brand-accent font-black text-sm">{item.price}</p>
                               </div>
                               
                               <div className="flex items-center justify-between">
                                  <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl p-1">
                                     <button 
                                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                        className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-brand-primary hover:bg-white rounded-lg transition-all"
                                     >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                                        </svg>
                                     </button>
                                     <span className="w-8 text-center text-xs font-black text-slate-700">{item.quantity}</span>
                                     <button 
                                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                        className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-brand-primary hover:bg-white rounded-lg transition-all"
                                     >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                                        </svg>
                                     </button>
                                  </div>
                                  <span className="text-xs font-bold text-slate-400">
                                     Subtotal: <span className="text-slate-900">${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</span>
                                  </span>
                               </div>
                            </div>
                         </div>
                      ))}
                   </div>
                ) : <div className="text-center pt-20"><p className="font-serif text-slate-300 text-2xl italic">The vault is currently empty.</p></div>
             ) : (
                wishlistItems.length > 0 ? (
                   <div className="space-y-8">
                      {wishlistItems.map(item => (
                        <div key={item.id} className="flex gap-6 border-b border-slate-50 pb-8">
                           <div className="w-20 aspect-[4/5] overflow-hidden rounded-xl bg-slate-100 shrink-0">
                              <img src={item.image} className="w-full h-full object-cover" />
                           </div>
                            <div className="flex-grow">
                               <p className="font-serif text-slate-900 text-lg mb-4">{item.name}</p>
                               <div className="flex gap-2">
                                  <button onClick={() => { addToCart(item); removeFromWishlist(item.id); }} className="text-[10px] font-black uppercase text-brand-primary tracking-[0.2em] bg-brand-primary/5 px-3 py-1 rounded-full">To Cart</button>
                                  <button onClick={() => removeFromWishlist(item.id)} className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] bg-slate-50 px-3 py-1 rounded-full">Remove</button>
                               </div>
                            </div>
                         </div>
                      ))}
                   </div>
                ) : <div className="text-center pt-20"><p className="font-serif text-slate-300 text-2xl italic">No specimens saved yet.</p></div>
             )}
          </div>

          {/* Fixed Footer for Cart Sidebar */}
          {sidebarTab === 'cart' && cartItems.length > 0 && (
             <div className="p-8 space-y-6 bg-white shrink-0">
                <div className="flex justify-between font-serif text-xl text-slate-900 font-bold">
                   <span>Total</span>
                   <span className="text-brand-primary">${cartItems.reduce((acc, item) => acc + parseInt(item.price.replace('$', '')) * item.quantity, 0).toFixed(2)}</span>
                </div>
                <div className="space-y-3">
                   <Link 
                      to="/checkout"
                      onClick={closeSidebar}
                      className="w-full bg-brand-primary text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:bg-brand-accent transition-all shadow-2xl flex items-center justify-center text-center"
                   >
                      Proceed to Checkout
                   </Link>
                   <Link 
                      to="/cart"
                      onClick={closeSidebar}
                      className="w-full py-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-brand-primary transition-colors text-center block"
                   >
                      View carts
                   </Link>
                </div>
             </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
