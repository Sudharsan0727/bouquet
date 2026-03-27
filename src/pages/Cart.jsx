import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';


export default function Cart() {
  const { cartItems, addToCart, removeFromCart, updateCartQuantity, openSidebar, wishlistItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + parseInt(item.price.replace('$', '')) * item.quantity, 0);
  const shipping = subtotal > 99 ? 0 : 15;
  const total = subtotal + shipping;

  const handleQtyChange = (id, delta) => {
    const item = cartItems.find(i => i.id === id);
    if (!item) return;
    const newQty = item.quantity + delta;
    updateCartQuantity(id, newQty);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans text-slate-800">
      <Header isScrolled={isScrolled} activePage="" />

      {/* ── Page Banner ── */}
      <section className="bg-white border-b border-slate-100 py-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-accent/60 mb-2 relative z-10">Artisanal Archive</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 leading-tight tracking-tight relative z-10">
            Shopping <span className="italic font-light text-brand-primary underline decoration-brand-accent/20 underline-offset-[12px]">Bag</span>
          </h1>
      </section>


      {/* ── Cart Content ── */}
      <main className="container mx-auto px-6 lg:px-12 py-20">
        {cartItems.length === 0 ? (
          <div className="text-center py-20 space-y-8">
             <div className="text-7xl opacity-10">🏺</div>
             <p className="text-2xl font-serif text-slate-400 italic">Your bag is currently empty of botanical wonders.</p>
             <Link to="/" className="inline-block px-10 py-4 bg-brand-primary text-white rounded-full font-bold text-xs uppercase tracking-[0.3em] hover:bg-brand-accent transition-all shadow-xl">
                Begin Exploring
             </Link>
          </div>
        ) : (
          <div className="flex flex-col xl:flex-row gap-16">
            
            {/* Table of Items */}
            <div className="w-full xl:w-2/3">
              <div className="hidden md:grid grid-cols-5 pb-6 border-b border-slate-100 text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">
                 <div className="col-span-2">Specimen Detail</div>
                 <div className="text-center">Value</div>
                 <div className="text-center">Count</div>
                 <div className="text-right">Valuation</div>
              </div>


              <div className="divide-y divide-slate-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-10 grid grid-cols-1 md:grid-cols-5 gap-8 items-center group">
                    
                    {/* Image & Name */}
                    <div className="col-span-1 md:col-span-2 flex items-center gap-6">
                       <Link to={`/product/${item.id}`} className="w-24 aspect-[4/5] shrink-0 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-sm group-hover:shadow-xl transition-all duration-500 block">
                          <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       </Link>
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.category}</p>
                          <Link to={`/product/${item.id}`} className="text-xl font-serif text-slate-900 hover:text-brand-primary transition-colors block leading-tight">{item.name}</Link>
                          <button onClick={() => removeFromCart(item.id)} className="text-[10px] font-black uppercase tracking-widest text-rose-500 hover:text-rose-700 transition-colors pt-2">Remove</button>
                       </div>
                    </div>

                    {/* Price */}
                    <div className="text-center text-lg font-serif italic text-slate-400">
                       {item.price}
                    </div>


                    {/* Quantity Selector */}
                    <div className="flex justify-center">
                       <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl px-4 py-2 hover:border-brand-primary transition-colors">
                          <button onClick={() => handleQtyChange(item.id, -1)} className="text-slate-400 hover:text-brand-primary transition-colors text-xl font-light">−</button>
                          <span className="w-8 text-center font-bold text-slate-900">{item.quantity}</span>
                          <button onClick={() => handleQtyChange(item.id, 1)} className="text-slate-400 hover:text-brand-primary transition-colors text-xl font-light">+</button>
                       </div>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right text-xl font-serif font-black tracking-tighter text-brand-primary">
                       ${(parseInt(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                    </div>


                  </div>
                ))}
              </div>

              {/* Extra Cart Tools */}
              <div className="mt-12 flex flex-col md:flex-row justify-between gap-8 pt-10 border-t border-slate-100">
                 <div className="flex gap-4">
                    <input className="px-6 py-4 border border-slate-200 rounded-2xl focus:border-brand-primary outline-none text-sm w-full md:w-64" placeholder="Voucher Code" />
                    <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-brand-primary transition-colors">Apply</button>
                 </div>
                 <Link to="/" className="px-8 py-4 border border-slate-200 rounded-2xl font-bold text-[10px] uppercase tracking-widest text-slate-400 hover:border-brand-primary hover:text-brand-primary transition-all text-center">
                    Continue Shopping
                 </Link>
              </div>
            </div>

            {/* Totals Sidebar */}
            <div className="w-full xl:w-1/3">
               <div className="bg-white border border-slate-100 rounded-[3rem] p-12 shadow-2xl sticky top-40 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-[0.03] text-6xl font-serif italic text-brand-primary pointer-events-none">Bag</div>
                  
                  <h3 className="text-2xl font-serif text-slate-900 mb-10 border-b border-slate-50 pb-6">Summary</h3>
                  
                  <div className="space-y-6 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
                     <div className="flex justify-between">
                        <span>Initial Subtotal</span>
                        <span className="text-slate-900">${subtotal.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between">
                        <span>Courier & Logistics</span>
                        <span className="text-slate-900">
                          {shipping === 0 ? <span className="text-emerald-500">Complimentary</span> : `$${shipping.toFixed(2)}`}
                        </span>
                     </div>
                     
                     <div className="pt-8 border-t border-slate-100 flex justify-between items-center text-slate-900">
                        <span className="text-xs">Final Valuation</span>
                        <span className="text-3xl font-serif text-brand-primary tracking-tighter">${total.toFixed(2)}</span>
                     </div>
                  </div>

                  <Link to="/checkout" className="mt-12 w-full py-6 bg-slate-900 text-white rounded-3xl font-black uppercase text-[10px] tracking-[0.4em] hover:bg-brand-primary transition-all shadow-2xl flex items-center justify-center text-center">
                    Initiate Fulfillment
                  </Link>


                  <div className="mt-10 p-6 bg-violet-50/50 rounded-2xl space-y-3">
                     <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Studio Guarantee</p>
                     </div>
                     <p className="text-[10px] font-medium leading-relaxed text-slate-500">Every bouquet is hand-assembled by our master florists and delivered in temperature-controlled environments.</p>
                  </div>
               </div>
            </div>

          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <Footer />


    </div>
  );
}
