import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Account() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { 
    cartItems,
    wishlistItems, 
    orders: contextOrders,
    addToCart, 
    removeFromWishlist,
    removeFromCart,
    updateCartQuantity
  } = useCart();
  
  const [activeSegment, setActiveSegment] = useState('dashboard');
  const [showLandmarkModel, setShowLandmarkModel] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      title: "Primary Residence",
      name: "Eleanor Vance",
      street: "124 Studio Heights",
      city: "London",
      zip: "W8 4QG",
      isDefault: true
    }
  ]);

  const [newAddress, setNewAddress] = useState({
    title: '',
    name: '',
    street: '',
    suite: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  });

  const handleSaveAddress = () => {
    if (!newAddress.title || !newAddress.street) return;
    const addr = {
      ...newAddress,
      id: Date.now(),
      isDefault: false
    };
    setAddresses([...addresses, addr]);
    setShowLandmarkModel(false);
    setNewAddress({ title: '', name: '', street: '', suite: '', city: '', state: '', zip: '', phone: '' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock User Data
  const user = {
    firstName: "Eleanor",
    lastName: "Vance",
    email: "eleanor@studio.com",
    memberSince: "March 2024",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
    loyaltyPoints: 1250,
    tier: "Platinum Member"
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: (props) => <svg {...props} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg> },
    { id: 'orders', label: 'Order History', icon: (props) => <svg {...props} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> },
    { id: 'wishlist', label: 'My Favorites', icon: (props) => <svg {...props} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> },
    { id: 'addresses', label: 'Addresses', icon: (props) => <svg {...props} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> },
    { id: 'settings', label: 'Account Settings', icon: (props) => <svg {...props} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.72V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.17a2 2 0 0 1 1-1.74l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg> },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800">
      <Header isScrolled={isScrolled} activePage="account" />

      {/* ── Dashboard Hero ── */}
      <section className="bg-white border-b border-slate-100 pt-20 pb-12">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-brand-primary/20 rounded-full blur-2xl group-hover:bg-brand-primary/30 transition-all"></div>
              <img src={user.avatar} className="w-24 md:w-32 h-24 md:h-32 rounded-full object-cover border-4 border-white shadow-2xl relative z-10" alt="Profile" />
              <button className="absolute bottom-1 right-1 w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center border-4 border-white shadow-xl z-20 hover:scale-110 transition-transform">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
            </div>
            <div className="text-center md:text-left space-y-2">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <h1 className="text-3xl md:text-4xl font-serif text-slate-900 leading-tight">Welcome, <span className="italic font-light text-brand-primary">{user.firstName}</span></h1>
                <span className="px-4 py-1.5 bg-violet-50 text-brand-primary rounded-full text-[10px] uppercase font-black tracking-widest border border-brand-primary/10">
                  {user.tier}
                </span>
              </div>
              <p className="text-slate-400 text-sm font-medium">Member since {user.memberSince} • {user.loyaltyPoints} Blooms Accumulated</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Account Management Grid ── */}
      <main className="container mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col xl:flex-row gap-12">
          
          {/* 1. Universal Navigation (Sidebar/TopNav) */}
          <aside className="w-full xl:w-72">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden sticky top-32">
              <nav className="flex flex-row xl:flex-col overflow-x-auto no-scrollbar">
                {menuItems.map(item => (
                  <button 
                    key={item.id}
                    onClick={() => setActiveSegment(item.id)}
                    className={`flex-grow xl:flex-initial flex items-center gap-4 px-8 py-5 transition-all text-sm font-bold whitespace-nowrap border-b-4 xl:border-b-0 xl:border-l-4 ${activeSegment === item.id ? 'bg-violet-50/50 text-brand-primary border-brand-primary' : 'text-slate-400 border-transparent hover:text-slate-600 hover:bg-slate-50'}`}
                  >
                    <item.icon className={`transition-colors ${activeSegment === item.id ? 'text-brand-primary' : 'text-slate-300'}`} />
                    {item.label}
                  </button>
                ))}
                <button className="flex items-center gap-4 px-8 py-5 text-rose-500 hover:bg-rose-50 transition-all text-sm font-bold whitespace-nowrap border-l-4 border-transparent">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                  Sign Out
                </button>
              </nav>
            </div>
          </aside>

          {/* 2. Content Segments */}
          <div className="flex-grow">
            
            {activeSegment === 'dashboard' && (
              <div className="space-y-10 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-brand-primary/5 transition-all group">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Total Bloom Balance</p>
                    <div className="text-4xl font-serif text-brand-primary mb-4 flex items-baseline gap-2">
                       {user.loyaltyPoints} <span className="text-sm font-sans font-bold text-slate-300 uppercase tracking-tighter">Pts</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-brand-primary w-[65%]" />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-4 leading-relaxed font-medium">Accumulate <span className="text-brand-primary font-bold">250 more Blooms</span> to unlock the <span className="italic">Botanist Reserve</span> status.</p>
                  </div>
                  
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-brand-primary/5 transition-all">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Registry Overview</p>
                    <div className="text-4xl font-serif text-slate-900 mb-6">{contextOrders.length} <span className="text-sm font-sans font-bold text-slate-300 uppercase tracking-tighter">Items Ordered</span></div>
                    <button onClick={() => setActiveSegment('orders')} className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-2">
                      View registries registry
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </button>
                  </div>

                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-brand-primary/5 transition-all">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Curated Archive</p>
                    <div className="text-4xl font-serif text-slate-900 mb-6">{wishlistItems.length} <span className="text-sm font-sans font-bold text-slate-300 uppercase tracking-tighter">Favorites</span></div>
                    <button onClick={() => setActiveSegment('wishlist')} className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-2">
                      Browse archive
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-[2.5rem] p-10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-primary/20 transition-all duration-700"></div>
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-serif text-white italic">Complimentary Botanical Design</h3>
                      <p className="text-slate-400 text-sm max-w-md font-light leading-relaxed">
                        As a <span className="text-brand-accent font-bold">Platinum Member</span>, you're entitled to a personal consultation with our lead curator to design a bespoke residential subscription.
                      </p>
                    </div>
                    <button className="px-10 py-5 bg-brand-accent text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.3em] hover:bg-white hover:text-slate-900 transition-all shadow-2xl">
                        Schedule Consultation
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSegment === 'orders' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="flex justify-between items-end">
                   <h2 className="text-2xl font-serif text-slate-900 tracking-tight">Order Registry</h2>
                   <p className="text-xs font-bold text-slate-400">Showing {contextOrders.length} recent fulfillments</p>
                </div>
                
                {contextOrders.length === 0 ? (
                  <div className="bg-white p-20 rounded-[2.5rem] text-center border border-slate-100 shadow-sm space-y-4">
                     <p className="text-xl font-serif italic text-slate-400">No botanical archives found yet.</p>
                     <Link to="/" className="text-xs font-bold text-brand-primary hover:underline uppercase tracking-widest">Begin Exploring ›</Link>
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="divide-y divide-slate-50">
                      {contextOrders.map(order => (
                        <div key={order.id} className="p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-slate-50/50 transition-colors">
                          <div className="space-y-1">
                             <div className="flex items-center gap-3">
                                <span className="font-serif text-lg text-slate-900 font-bold">Order #{order.id}</span>
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 'bg-brand-primary/10 text-brand-primary'}`}>
                                  {order.status}
                                </span>
                             </div>
                             <p className="text-sm font-medium text-slate-400 italic">Placed on {order.date}</p>
                          </div>
                          <div className="flex items-center gap-10">
                            <div className="text-right">
                               <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-1">Valuation</p>
                               <p className="text-xl font-serif font-black text-brand-primary">{order.total}</p>
                            </div>
                            <button 
                              onClick={() => setSelectedOrder(order)}
                              className="px-6 py-3 border border-slate-100 rounded-xl text-[10px] font-black uppercase text-slate-400 hover:border-brand-primary hover:text-brand-primary transition-all"
                            >
                              Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detailed Order Modal (Full Manifest) */}
                {selectedOrder && (
                  <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[300] flex items-center justify-center p-6 animate-fadeIn">
                     <div className="bg-white rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-scaleIn">
                        <div className="p-10 pb-0 flex justify-between items-start">
                           <div className="space-y-1">
                              <h3 className="text-2xl font-serif text-slate-900 tracking-tight">Archive Record</h3>
                              <p className="text-xs text-slate-400 font-medium">Historical data for registry #{selectedOrder.id}</p>
                           </div>
                           <button onClick={() => setSelectedOrder(null)} className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
                           </button>
                        </div>
                        
                        <div className="p-10 space-y-8">
                           <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-b border-slate-50 pb-8">
                              <div className="space-y-1">
                                 <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Order ID</p>
                                 <p className="text-xs font-bold text-slate-900 font-mono italic">{selectedOrder.id}</p>
                              </div>
                              <div className="space-y-1">
                                 <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Status</p>
                                 <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">{selectedOrder.status}</p>
                              </div>
                              <div className="space-y-1">
                                 <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Valuation</p>
                                 <p className="text-xs font-black text-brand-primary">{selectedOrder.total}</p>
                              </div>
                              <div className="space-y-1">
                                 <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Order Date</p>
                                 <p className="text-xs font-bold text-slate-900">{selectedOrder.date}</p>
                              </div>
                              <div className="space-y-1">
                                 <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Delivery Target</p>
                                 <p className="text-xs font-bold text-slate-900">Historical Record</p>
                              </div>
                              <div className="space-y-1">
                                 <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Documents</p>
                                 <button className="flex items-center gap-1.5 text-brand-primary text-[10px] font-black uppercase hover:underline">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                                    Invoice
                                 </button>
                              </div>
                           </div>

                           <div className="space-y-6">
                              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em]">Manifested Specimens</h4>
                              <div className="space-y-4 max-h-[250px] overflow-y-auto pr-4 no-scrollbar">
                                 {selectedOrder.fullItems ? selectedOrder.fullItems.map((item, idx) => (
                                   <div key={idx} className="flex items-center gap-6 p-4 rounded-3xl bg-slate-50/50 border border-slate-100">
                                      <div className="w-14 h-16 bg-white rounded-2xl overflow-hidden border border-slate-200">
                                         <img src={item.image} className="w-full h-full object-cover" alt="" />
                                      </div>
                                      <div className="flex-grow">
                                         <p className="text-sm font-serif font-bold text-slate-900">{item.name}</p>
                                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.category}</p>
                                      </div>
                                      <div className="text-right">
                                         <p className="text-sm font-serif font-black text-slate-900">{item.price}</p>
                                         <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                                      </div>
                                   </div>
                                 )) : (
                                   <div className="p-8 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                                       <p className="text-xs text-slate-400 italic font-medium">No botanical manifests found for this record.</p>
                                   </div>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                )}
              </div>
            )}

            {activeSegment === 'wishlist' && (
              <div className="space-y-8 animate-fadeIn">
                 <div className="flex justify-between items-end">
                    <h2 className="text-2xl font-serif text-slate-900 tracking-tight">Curated Favorites</h2>
                    <p className="text-xs font-bold text-slate-400">{wishlistItems.length} preserved specimens</p>
                 </div>

                 {wishlistItems.length === 0 ? (
                   <div className="bg-white p-20 rounded-[2.5rem] text-center border border-slate-100 shadow-sm space-y-4">
                      <p className="text-xl font-serif italic text-slate-400">Your archive is awaiting its first selection.</p>
                      <Link to="/" className="text-xs font-bold text-brand-primary hover:underline uppercase tracking-widest">Start Browsing ›</Link>
                   </div>
                 ) : (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {wishlistItems.map((item) => (
                        <div key={item.id} className="bg-white border border-slate-100 rounded-[2rem] p-5 flex gap-6 items-center shadow-sm group hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                           <div className="w-24 aspect-[4/5] overflow-hidden rounded-2xl bg-slate-50 shrink-0 border border-slate-50 relative">
                              <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                              <div className="absolute inset-0 bg-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                           </div>
                           <div className="flex-grow space-y-1">
                              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{item.category}</p>
                              <h4 className="font-serif text-lg text-slate-900 leading-tight">{item.name}</h4>
                              <p className="text-brand-primary font-bold">{item.price}</p>
                              
                              <div className="flex gap-3 pt-3">
                                 <button 
                                    onClick={() => addToCart(item)}
                                    className="p-3 bg-slate-900 text-white rounded-xl hover:bg-brand-primary transition-all shadow-lg hover:shadow-brand-primary/20"
                                    title="Add to Bag"
                                 >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                                 </button>
                                 <button 
                                    onClick={() => removeFromWishlist(item.id)}
                                    className="p-3 bg-white border border-slate-100 text-slate-300 rounded-xl hover:border-rose-100 hover:text-rose-500 transition-all group/trash"
                                    title="Remove from Archive"
                                 >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/trash:rotate-12 transition-transform"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                                 </button>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                 )}
              </div>
            )}

            {activeSegment === 'addresses' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="flex justify-between items-end">
                   <h2 className="text-2xl font-serif text-slate-900 tracking-tight">Addresses</h2>
                   <button 
                      onClick={() => setShowLandmarkModel(true)}
                      className="text-[10px] font-black uppercase text-brand-primary tracking-widest py-3 px-6 bg-brand-primary/5 rounded-full hover:bg-brand-primary hover:text-white transition-all transition-all"
                   >
                     + Add Landmark
                   </button>
                </div>

                {/* Shipping Model (requested fields) */}
                {showLandmarkModel && (
                  <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] flex items-center justify-center p-6 animate-fadeIn">
                     <div className="bg-white rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-scaleIn">
                        <div className="p-10 pb-0 flex justify-between items-start">
                           <div className="space-y-1">
                              <h3 className="text-2xl font-serif text-slate-900">Add New Landmark</h3>
                              <p className="text-xs text-slate-400 font-medium">Save a new shipping destination to your personal archive.</p>
                           </div>
                           <button onClick={() => setShowLandmarkModel(false)} className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
                           </button>
                        </div>
                        
                        <div className="p-10 space-y-6">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Landmark Title</label>
                                <input 
                                  type="text" 
                                  value={newAddress.title}
                                  onChange={(e) => setNewAddress({...newAddress, title: e.target.value})}
                                  placeholder="e.g. Home, Creative Studio" 
                                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:border-brand-primary transition-all outline-none" 
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Full Name</label>
                                <input 
                                  type="text" 
                                  value={newAddress.name}
                                  onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                                  placeholder="Recipient's Name" 
                                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:border-brand-primary transition-all outline-none" 
                                />
                              </div>
                           </div>

                           <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Street Address</label>
                             <input 
                               type="text" 
                               value={newAddress.street}
                               onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                               placeholder="124 Studio Heights..." 
                               className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:border-brand-primary transition-all outline-none" 
                             />
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Apartment / Suite</label>
                                <input 
                                  type="text" 
                                  value={newAddress.suite}
                                  onChange={(e) => setNewAddress({...newAddress, suite: e.target.value})}
                                  placeholder="Optional" 
                                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:border-brand-primary transition-all outline-none" 
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">City</label>
                                <input 
                                  type="text" 
                                  value={newAddress.city}
                                  onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                                  placeholder="e.g. London" 
                                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:border-brand-primary transition-all outline-none" 
                                />
                              </div>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">State / Province</label>
                                <input 
                                  type="text" 
                                  value={newAddress.state}
                                  onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                                  placeholder="e.g. Kensington" 
                                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:border-brand-primary transition-all outline-none" 
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Zip / Postal Code</label>
                                <input 
                                  type="text" 
                                  value={newAddress.zip}
                                  onChange={(e) => setNewAddress({...newAddress, zip: e.target.value})}
                                  placeholder="W8 4QG" 
                                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:border-brand-primary transition-all outline-none" 
                                />
                              </div>
                           </div>

                           <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Phone Number</label>
                             <input 
                               type="tel" 
                               value={newAddress.phone}
                               onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                               placeholder="+44 (0) 20 ..." 
                               className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:border-brand-primary transition-all outline-none" 
                             />
                           </div>

                           <div className="pt-6 border-t border-slate-50 flex gap-4">
                              <button onClick={handleSaveAddress} className="flex-grow py-5 bg-brand-primary text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.3em] hover:bg-brand-accent transition-all shadow-xl shadow-brand-primary/20">
                                 Save Address Landmark 
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {addresses.map((addr) => (
                     <div key={addr.id} className={`bg-white p-8 rounded-[2.5rem] border-2 transition-all shadow-xl shadow-brand-primary/5 space-y-4 relative ${addr.isDefault ? 'border-brand-primary' : 'border-slate-100'}`}>
                        {addr.isDefault && (
                          <div className="absolute top-6 right-8">
                           <span className="text-[9px] font-black uppercase text-brand-primary bg-violet-50 px-3 py-1 rounded-full border border-brand-primary/10">Default</span>
                          </div>
                        )}
                        <h4 className="font-serif text-lg mb-4">{addr.title}</h4>
                        <div className="text-sm text-slate-500 font-medium space-y-1">
                           <p className="text-slate-900 font-bold mb-2">{addr.name}</p>
                           <p>{addr.street}</p>
                           <p>{addr.city}, {addr.zip}</p>
                        </div>
                        <div className="pt-6 flex gap-4 border-t border-slate-50">
                           <button className="text-[10px] font-black uppercase text-slate-400 hover:text-brand-primary transition-colors">Modify</button>
                           <button onClick={() => setAddresses(addresses.filter(a => a.id !== addr.id))} className="text-[10px] font-black uppercase text-rose-400 hover:text-rose-600 transition-colors">Delete</button>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            )}

            {activeSegment === 'settings' && (
              <div className="space-y-8 animate-fadeIn">
                <h2 className="text-2xl font-serif text-slate-900 tracking-tight">Security & Identity</h2>
                <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
                   <div className="p-10 space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">First Name</label>
                            <input type="text" defaultValue={user.firstName} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:border-brand-primary transition-all outline-none" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Last Name</label>
                            <input type="text" defaultValue={user.lastName} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:border-brand-primary transition-all outline-none" />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Electronic Correspondence</label>
                         <input type="email" defaultValue={user.email} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:border-brand-primary transition-all outline-none" />
                      </div>
                      <div className="pt-6 border-t border-slate-50">
                         <button className="px-10 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.3em] hover:bg-brand-primary transition-all shadow-xl">
                            Save Personal Archive
                         </button>
                      </div>
                   </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      <CartSidebar />
      <Footer />
    </div>
  );
}
