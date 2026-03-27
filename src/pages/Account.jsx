import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';


export default function Account() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { 
    cartItems, 
    wishlistItems, 
    orders: contextOrders,
    sidebarOpen, 
    sidebarTab, 
    closeSidebar, 
    setSidebarTab, 
    addToCart, 
    removeFromCart, 
    removeFromWishlist,
    updateCartQuantity 
  } = useCart();
  const [activeSegment, setActiveSegment] = useState('dashboard');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock Data for the demo
  const user = {
    name: "Eleanor Vance",
    email: "eleanor@studio.com",
    memberSince: "March 2024",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    stats: [
      { label: "Orders", value: contextOrders.length.toString() },
      { label: "Wishlist", value: wishlistItems.length.toString() },
      { label: "Cart", value: cartItems.length.toString() }
    ]
  };

  const displayOrders = contextOrders.length > 0 ? contextOrders : [
    { id: "DEMO-001", date: "Jan 01, 2024", total: "$0.00", status: "Sample Order", items: 0 }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m12 12 4 4"/></svg> },
    { id: 'orders', label: 'Orders', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg> },
    { id: 'wishlist_view', label: 'Wishlist', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },

    { id: 'addresses', label: 'Addresses', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> },
    { id: 'account_details', label: 'Account details', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },

  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans text-slate-800">
      <Header isScrolled={isScrolled} activePage="account" />

      <main className="container mx-auto px-6 lg:px-12 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-[280px]">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-4 shadow-sm">
              <div className="p-8 pb-4">
                 <div className="flex items-center gap-4 mb-8">
                    <img src={user.avatar} className="w-12 h-12 rounded-full object-cover border-2 border-brand-primary/10" alt="" />
                    <div className="overflow-hidden">
                       <p className="text-sm font-bold truncate text-slate-900">{user.name}</p>
                       <p className="text-[10px] text-slate-400 font-medium">Artisanal Member</p>
                    </div>
                 </div>
              </div>
              
              <nav className="space-y-1">
                {menuItems.map(item => (
                  <button 
                    key={item.id}
                    onClick={() => setActiveSegment(item.id)}
                    className={`w-full flex items-center justify-between px-8 py-4 rounded-2xl transition-all group ${activeSegment === item.id ? 'bg-brand-primary text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 hover:text-brand-primary'}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`${activeSegment === item.id ? 'text-white' : 'text-slate-400 group-hover:text-brand-primary'}`}>
                        {item.icon}
                      </span>
                      <span className="text-sm font-bold tracking-tight">{item.label}</span>
                    </div>
                    {activeSegment === item.id && (
                       <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    )}
                  </button>
                ))}
                
                <div className="pt-4 mt-4 border-t border-slate-50 px-4">
                   <button className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-rose-500 hover:bg-rose-50 transition-all font-bold text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                      Log out
                   </button>
                </div>
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-grow">
            {activeSegment === 'dashboard' && (
              <div className="space-y-10 animate-fadeIn">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                   <h1 className="text-4xl font-serif text-slate-900">Velvet <span className="italic font-light text-brand-primary">Dashboard</span></h1>
                   <div className="flex items-center gap-3 px-6 py-3 bg-violet-50 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Premium Architecture Status</span>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {user.stats.map((stat, idx) => (
                      <div key={idx} className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
                         <p className="text-4xl font-serif text-brand-primary mb-2">{stat.value}</p>
                         <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                      </div>
                   ))}
                </div>

                <div className="bg-violet-900 rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative group">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors"></div>
                  <div className="space-y-4 relative z-10 text-center md:text-left">
                    <h3 className="text-3xl font-serif italic text-brand-accent">Gallatin Elite Member</h3>
                    <p className="max-w-md text-sm font-light text-violet-100 leading-relaxed">
                      Enjoy complimentary delivery on all arrangements over $150 and early access to our seasonal archives.
                    </p>
                  </div>
                  <button className="px-10 py-5 bg-white text-violet-900 rounded-full font-black text-[11px] uppercase tracking-[0.3em] hover:bg-brand-accent hover:text-white transition-all shadow-xl relative z-10">
                    Upgrade Status
                  </button>
                </div>
              </div>
            )}

            {activeSegment === 'orders' && (
               <div className="space-y-10 animate-fadeIn">
                  <h1 className="text-4xl font-serif text-slate-900">Order <span className="italic font-light text-brand-primary">Registry</span></h1>
                  <div className="bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-sm">
                     <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100">
                           <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              <th className="px-10 py-6">Order ID</th>
                              <th className="px-10 py-6">Date</th>
                              <th className="px-10 py-6">Status</th>
                              <th className="px-10 py-6 text-right">Value</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                           {displayOrders.map(order => (
                              <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                                 <td className="px-10 py-8 font-serif text-slate-900 font-bold">#{order.id}</td>
                                 <td className="px-10 py-8 text-xs font-bold text-slate-500">{order.date}</td>
                                 <td className="px-10 py-8">
                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-500' : 'bg-brand-accent/10 text-brand-accent'}`}>
                                       {order.status}
                                    </span>
                                 </td>
                                 <td className="px-10 py-8 text-right font-serif text-brand-primary font-bold">{order.total}</td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            )}

            {activeSegment === 'wishlist_view' && (
               <div className="space-y-10 animate-fadeIn">
                  <h1 className="text-4xl font-serif text-slate-900">Curated <span className="italic font-light text-brand-primary">Archive</span></h1>
                  {wishlistItems.length > 0 ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {wishlistItems.map((item) => (
                           <div key={item.id} className="bg-white border border-slate-100 rounded-[2.5rem] p-6 flex gap-6 items-center shadow-sm group hover:shadow-xl transition-all duration-500">
                              <div className="w-20 aspect-[4/5] overflow-hidden rounded-xl bg-slate-100 shrink-0">
                                 <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                              </div>
                              <div className="flex-grow">
                                 <p className="font-serif text-lg text-slate-900">{item.name}</p>
                                 <p className="text-brand-accent font-bold text-sm tracking-tight">{item.price}</p>
                              </div>
                              <div className="flex gap-2">
                                 <button 
                                    onClick={() => addToCart(item)}
                                    className="p-3 bg-violet-50 text-brand-primary rounded-full hover:bg-brand-primary hover:text-white transition-all"
                                 >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                                 </button>
                                 <button 
                                    onClick={() => removeFromWishlist(item.id)}
                                    className="p-3 bg-rose-50 text-rose-500 rounded-full hover:bg-rose-500 hover:text-white transition-all"
                                 >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                                 </button>
                              </div>
                           </div>
                        ))}
                     </div>
                  ) : (
                     <div className="text-center py-20 bg-slate-50 rounded-[3rem]">
                        <p className="text-slate-400 font-serif italic text-xl">Your archive is currently empty.</p>
                     </div>
                  )}
               </div>
            )}

            {activeSegment === 'account_details' && (
               <div className="space-y-10 animate-fadeIn">
                  <h1 className="text-4xl font-serif text-slate-900">Profile <span className="italic font-light text-brand-primary">Architecture</span></h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {[
                        { label: 'Display Name', value: user.name },
                        { label: 'Email Primary', value: user.email },
                        { label: 'Membership ID', value: 'AM-025-9981' },
                        { label: 'Language Archive', value: 'English (UK)' }
                     ].map((field, idx) => (
                        <div key={idx} className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">{field.label}</label>
                           <div className="px-8 py-5 bg-white border border-slate-100 rounded-[1.5rem] font-bold text-xs text-slate-900">{field.value}</div>
                        </div>
                     ))}
                  </div>
                  <button className="px-12 py-5 bg-brand-primary text-white rounded-full font-black text-[11px] uppercase tracking-[0.4em] hover:bg-brand-accent transition-all shadow-2xl shadow-brand-primary/20">
                     Update Settings
                  </button>
               </div>
            )}

            {['addresses'].includes(activeSegment) && (
               <div className="min-h-[500px] flex items-center justify-center text-center animate-fadeIn">
                  <div className="space-y-8 max-w-sm">
                     <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
                     </div>
                     <div className="space-y-4">
                        <h3 className="text-3xl font-serif text-slate-900 italic capitalize">{activeSegment} Laboratory</h3>
                        <p className="text-[10px] text-slate-400 font-bold leading-relaxed uppercase tracking-[0.3em]">Module is under artisanal calibration. Deployment scheduled for Q2 2025.</p>
                     </div>
                  </div>
               </div>
            )}

          </div>
        </div>
      </main>

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
               <button onClick={closeSidebar} className="p-2 text-slate-400 hover:text-brand-primary transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                           <div key={item.id} className="flex gap-6 border-b border-slate-50 pb-8 last:border-0 group/item">
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

      <Footer />
    </div>
  );
}
