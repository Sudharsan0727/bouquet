import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';


export default function OrderSuccess() {
  const { clearCart } = useCart();
  const location = useLocation();
  const orderData = location.state || {};
  const { items = [], transactionId = `B_${Math.floor(100000 + Math.random() * 900000)}`, total = 0 } = orderData;

  useEffect(() => {
    // Clear the cart when the order success page is reached
    clearCart();
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans text-slate-800 flex flex-col">
      <Header isScrolled={false} activePage="" />

      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="max-w-3xl w-full text-center space-y-12">
          {/* Animated Success Icon */}
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center relative z-10 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-emerald-400/20 rounded-full animate-ping"></div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-serif text-brand-primary leading-tight tracking-tight">
              Order <span className="italic font-light text-brand-accent">Confirmed</span>
            </h1>
            <p className="text-sm text-slate-400 font-medium max-w-lg mx-auto">
               Your botanical masterpiece is being prepared for delivery.
            </p>
          </div>

          <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl overflow-hidden">
             {/* Header Info */}
             <div className="bg-slate-50/50 p-8 border-b border-slate-100 grid grid-cols-2 md:grid-cols-3 gap-6 text-left">
                <div className="space-y-1">
                   <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Transaction ID</p>
                   <p className="text-xs font-bold text-slate-900 truncate">{transactionId}</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Status</p>
                   <p className="text-xs font-bold text-emerald-500 flex items-center gap-1.5">
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                       Paid via Razorpay
                   </p>
                </div>
                <div className="space-y-1 hidden md:block">
                   <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Total Value</p>
                   <p className="text-xs font-bold text-brand-primary">${total ? total.toFixed(2) : '0.00'}</p>
                </div>
             </div>

             {/* Items List */}
             <div className="p-8 space-y-6">
                <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] text-left">Purchased Specimen</h4>
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                   {items.length > 0 ? items.map((item, idx) => (
                     <div key={idx} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                        <div className="w-16 h-20 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                           <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow text-left space-y-1">
                           <p className="font-serif text-base text-slate-900 leading-tight">{item.name}</p>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.category}</p>
                        </div>
                        <div className="text-right space-y-1">
                           <p className="text-sm font-bold text-brand-primary">{item.price}</p>
                           <p className="text-[10px] font-bold text-slate-400">Qty: {item.quantity}</p>
                        </div>
                     </div>
                   )) : (
                     <p className="text-xs text-slate-400 italic py-4">No items displayed in demo mode.</p>
                   )}
                </div>
             </div>
             
             <div className="p-8 bg-slate-50/30 border-t border-slate-100 space-y-6">
                <p className="text-[10px] text-slate-400 italic">A digital receipt has been sent to your email.</p>
                <Link to="/" className="inline-block px-12 py-4 bg-brand-primary text-white rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-brand-accent transition-all shadow-xl shadow-brand-primary/20">
                   Back to Studio
                </Link>
             </div>
          </div>

          <div className="flex justify-center items-center gap-4 text-[9px] font-black text-slate-200 uppercase tracking-[0.5em]">
             <span className="w-12 h-px bg-slate-100"></span>
             <span>Authorized Signature</span>
             <span className="w-12 h-px bg-slate-100"></span>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <Footer />

    </div>
  );
}
