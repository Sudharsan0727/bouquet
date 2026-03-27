import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

import { ALL_PRODUCTS, Prod1, Prod2, Prod3 } from '../data/products';
const CORE_PRODUCTS = ALL_PRODUCTS;

import Header from '../components/Header';
import Footer from '../components/Footer';


export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

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
    for (let i = 0; i < quantity; i++) {
        addToCart(product);
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
               <div className="space-y-2 text-sm">
                  <p className="font-bold">About this item:</p>
                  <ul className="list-disc list-inside space-y-2 text-slate-600 font-light leading-relaxed">
                     <li>Hand-curated floral arrangement from our London studio.</li>
                     <li>Arrives in a signature protective eco-friendly packaging.</li>
                     <li>Includes premium plant food and care instructions.</li>
                     <li>Sourced directly from sustainable local flower farms.</li>
                  </ul>
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
      <section className="bg-slate-50 py-16 mt-16">
        <div className="container mx-auto px-6">
           <div className="flex border-b border-slate-200 mb-8 sticky top-20 bg-slate-50 z-20">
              {['Description', 'Information', 'Reviews'].map(tab => (
                 <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`px-8 py-4 text-sm font-medium border-b-2 transition-all ${activeTab === tab.toLowerCase() ? 'border-brand-primary text-brand-primary' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                 >
                   {tab}
                 </button>
              ))}
           </div>

           <div className="max-w-4xl min-h-[400px]">
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

      {/* ── Cart/Wishlist Sidebar ── */}
      <div className={`fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm transition-opacity duration-500 ${sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={closeSidebar}>
        <div className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-500 flex flex-col ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
             <div className="flex gap-6">
                <button onClick={() => setSidebarTab('cart')} className={`text-lg font-serif pb-1 ${sidebarTab === 'cart' ? 'text-brand-primary border-b-2 border-brand-primary font-bold' : 'text-slate-400'}`}>Cart ({cartItems.length})</button>
                <button onClick={() => setSidebarTab('wishlist')} className={`text-lg font-serif pb-1 ${sidebarTab === 'wishlist' ? 'text-brand-primary border-b-2 border-brand-primary font-bold' : 'text-slate-400'}`}>Wishlist ({wishlistItems.length})</button>
             </div>
             <button onClick={closeSidebar} className="p-2 text-slate-400 hover:text-brand-primary transition-all"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
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
                <div className="flex justify-between font-serif text-xl">
                   <span>Total</span>
                   <span className="text-brand-primary font-bold">${cartItems.reduce((acc, item) => acc + parseInt(item.price.replace('$', '')) * item.quantity, 0).toFixed(2)}</span>
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

    </div>
  );
}
