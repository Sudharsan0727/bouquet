import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import FlowerLogo from '../assets/FlowerLogo.png';

export default function Checkout() {
  const { cartItems, addOrder } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    country: 'United States',
    paymentMethod: 'razorpay',
    deliveryMethod: 'ship',
    pickupDate: '',
    pickupTime: '',
    orderNotes: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate Totals using high precision
  const subtotal = cartItems.reduce((acc, item) => {
    const base = parseFloat(item.price.replace('$', ''));
    let extra = 0;
    if (item.options?.chocolates) {
      const match = item.options.chocolates.match(/\+(\d+\.\d+)/);
      if (match) extra += parseFloat(match[1]);
    }
    if (item.options?.stuffedAnimal) {
      const match = item.options.stuffedAnimal.match(/\+(\d+\.\d+)/);
      if (match) extra += parseFloat(match[1]);
    }
    return acc + (base + extra) * item.quantity;
  }, 0);

  const shipping = formData.deliveryMethod === 'pickup' ? 0 : (subtotal > 99 ? 0 : 15);
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = () => {
    const options = {
      key: "rzp_test_SUZjdzjcXcSFpD", // Razorpay API Key
      amount: Math.round(total * 100), 
      currency: "INR",
      name: "Gallatin",
      description: "Luxury Botanical Purchase",
      image: FlowerLogo,
      handler: function (response) {
        addOrder({
            id: response.razorpay_payment_id || `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            total: `$${total.toFixed(2)}`,
            status: "Processing",
            items: cartItems.length,
            fullItems: cartItems
        });
        navigate('/order-success', { 
            state: { 
                items: cartItems, 
                transactionId: response.razorpay_payment_id,
                total: total
            } 
        });
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone,
      },
      theme: { color: "#5b21b6" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.paymentMethod === 'razorpay') {
      handlePayment();
    } else {
      alert("Order placed successfully! This is a demo for " + formData.paymentMethod);
      navigate('/');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 text-center">
         <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-300"><path d="m6 2-3 4v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
         </div>
         <h1 className="text-3xl font-serif text-slate-900 mb-2 italic">Archive is Empty</h1>
         <p className="text-slate-500 mb-8 max-w-sm">You haven't added any luxury specimens to your registry yet.</p>
         <Link to="/" className="px-10 py-4 bg-brand-primary text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-brand-accent transition-all shadow-xl shadow-brand-primary/20">
           Start Collecting
         </Link>
      </div>
    );
  }

  const steps = [
    { id: 1, label: 'Contact', icon: (p) => <svg {...p} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
    { id: 2, label: 'Delivery', icon: (p) => <svg {...p} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> },
    { id: 3, label: 'Payment', icon: (p) => <svg {...p} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg> },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800">
      <Header isScrolled={isScrolled} activePage="" />

      {/* ── Progress Banner ── */}
      <section className="bg-white border-b border-slate-100 pt-16 pb-12">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
             <div className="space-y-1">
                <nav className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3 flex gap-2">
                  <Link to="/cart" className="hover:text-brand-primary">Cart Archive</Link>
                  <span>/</span>
                  <span className="text-slate-900">Checkout</span>
                </nav>
                <h1 className="text-3xl md:text-4xl font-serif text-slate-900 leading-tight">Complete Your <span className="italic font-light text-brand-primary">Registry</span></h1>
             </div>
             
             {/* Progress Bubbles */}
             <div className="flex items-center gap-4">
                {steps.map((step, idx) => (
                   <React.Fragment key={step.id}>
                      <div className={`flex flex-col items-center gap-2 group transition-all ${activeStep >= step.id ? 'opacity-100' : 'opacity-40'}`}>
                         <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${activeStep === step.id ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20 scale-110' : activeStep > step.id ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-slate-100 text-slate-400'}`}>
                            {activeStep > step.id ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5"/></svg> : <step.icon />}
                         </div>
                         <span className="text-[9px] font-black uppercase tracking-widest">{step.label}</span>
                      </div>
                      {idx < steps.length - 1 && <div className={`w-8 h-[2px] mb-6 transition-all ${activeStep > step.id ? 'bg-emerald-500' : 'bg-slate-100'}`} />}
                   </React.Fragment>
                ))}
             </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* LEFT: Checkout Steps */}
          <div className="w-full lg:w-2/3 space-y-6">
            
            {/* Step 1: Contact Information */}
            <div className={`bg-white rounded-[2rem] border transition-all ${activeStep === 1 ? 'border-brand-primary shadow-2xl p-8' : 'border-slate-100 opacity-60 p-6'}`}>
               <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-4">
                     <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${activeStep === 1 ? 'bg-brand-primary text-white' : 'bg-slate-100 text-slate-400'}`}>01</span>
                     <h3 className="text-xl font-serif text-slate-900">Personal Information</h3>
                  </div>
                  {activeStep > 1 && <button onClick={() => setActiveStep(1)} className="text-[10px] font-black uppercase text-brand-primary hover:underline">Edit</button>}
               </div>

               {activeStep === 1 ? (
                 <div className="space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest pl-1">First Name</label>
                          <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Eleanor" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:border-brand-primary outline-none transition-all shadow-inner" />
                       </div>
                       <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest pl-1">Last Name</label>
                          <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Vance" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:border-brand-primary outline-none transition-all shadow-inner" />
                       </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest pl-1">Email Registry</label>
                          <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="eleanor@studio.com" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:border-brand-primary outline-none transition-all shadow-inner" />
                       </div>
                       <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest pl-1">Contact Number</label>
                          <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 (212) 000-000" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:border-brand-primary outline-none transition-all shadow-inner" />
                       </div>
                    </div>
                    <button onClick={() => setActiveStep(2)} className="w-full py-5 bg-brand-primary text-white rounded-[1.5rem] font-black uppercase text-[11px] tracking-[0.3em] hover:bg-brand-accent transition-all shadow-xl shadow-brand-primary/20">
                       Continue To Delivery
                    </button>
                 </div>
               ) : (
                 <div className="flex gap-4 text-xs font-medium text-slate-500 italic">
                    {formData.firstName} {formData.lastName} • {formData.email}
                 </div>
               )}
            </div>

            {/* Step 2: Delivery Specifics */}
            <div className={`bg-white rounded-[2rem] border transition-all ${activeStep === 2 ? 'border-brand-primary shadow-2xl p-8' : 'border-slate-100 opacity-60 p-6'}`}>
               <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-4">
                     <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${activeStep === 2 ? 'bg-brand-primary text-white' : 'bg-slate-100 text-slate-400'}`}>02</span>
                     <h3 className="text-xl font-serif text-slate-900">Delivery Architecture</h3>
                  </div>
                  {activeStep > 2 && <button onClick={() => setActiveStep(2)} className="text-[10px] font-black uppercase text-brand-primary hover:underline">Edit</button>}
               </div>

               {activeStep === 2 && (
                  <div className="space-y-8 animate-fadeIn">
                     <div className="bg-slate-50 p-1.5 rounded-2xl flex gap-1">
                        <button type="button" onClick={() => setFormData({...formData, deliveryMethod: 'ship'})} className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl transition-all text-[11px] font-black uppercase tracking-widest ${formData.deliveryMethod === 'ship' ? 'bg-white shadow-md text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>
                           Shipping
                        </button>
                        <button type="button" onClick={() => setFormData({...formData, deliveryMethod: 'pickup'})} className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl transition-all text-[11px] font-black uppercase tracking-widest ${formData.deliveryMethod === 'pickup' ? 'bg-white shadow-md text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>
                           Atelier Pickup
                        </button>
                     </div>

                     {formData.deliveryMethod === 'ship' ? (
                       <div className="space-y-6">
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest pl-1">Street Address</label>
                            <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="124 Studio Heights" className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold focus:border-brand-primary outline-none transition-all shadow-sm" />
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                             <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest pl-1">City</label>
                                <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Chelsea" className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold focus:border-brand-primary outline-none transition-all shadow-sm" />
                             </div>
                             <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest pl-1">Postal Code</label>
                                <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} placeholder="SW3 4RY" className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold focus:border-brand-primary outline-none transition-all shadow-sm" />
                             </div>
                          </div>
                       </div>
                     ) : (
                       <div className="bg-violet-50 p-6 rounded-2xl border border-brand-primary/10 space-y-4">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-brand-primary text-white rounded-xl flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                             </div>
                             <div>
                                <h4 className="font-serif text-slate-900 leading-tight">Gallatin Master Atelier</h4>
                                <p className="text-[10px] text-brand-primary font-black uppercase tracking-widest mt-0.5">Ready in 2 Hours</p>
                             </div>
                          </div>
                          <p className="text-xs text-slate-500 italic leading-relaxed font-medium">123 Artisanal Way, Suit 100 • London, UK</p>
                       </div>
                     )}

                     <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest pl-1">Order Annotations (Optional)</label>
                        <textarea name="orderNotes" value={formData.orderNotes} onChange={handleInputChange} placeholder="Special delivery instructions, gate codes, etc." className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold focus:border-brand-primary outline-none transition-all shadow-sm min-h-[100px]" />
                     </div>

                     <button onClick={() => setActiveStep(3)} className="w-full py-5 bg-brand-primary text-white rounded-[1.5rem] font-black uppercase text-[11px] tracking-[0.3em] hover:bg-brand-accent transition-all shadow-xl shadow-brand-primary/20">
                        Proceed to Payment
                     </button>
                  </div>
               )}

               {activeStep > 2 && (
                 <div className="flex gap-4 text-xs font-medium text-slate-500 italic">
                    {formData.deliveryMethod === 'pickup' ? 'Atelier Pickup' : `${formData.address}, ${formData.city}`}
                 </div>
               )}
            </div>

            {/* Step 3: Secure Payment */}
            <div className={`bg-white rounded-[2rem] border transition-all ${activeStep === 3 ? 'border-brand-primary shadow-2xl p-8' : 'border-slate-100 opacity-60 p-6'}`}>
               <div className="flex items-center gap-4 mb-8">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${activeStep === 3 ? 'bg-brand-primary text-white' : 'bg-slate-100 text-slate-400'}`}>03</span>
                  <h3 className="text-xl font-serif text-slate-900">Secure Payment</h3>
               </div>

               {activeStep === 3 && (
                 <div className="space-y-8 animate-fadeIn">
                    <div className="grid grid-cols-1 gap-4">
                       <div className={`p-8 border-2 rounded-[2rem] flex items-center gap-6 transition-all border-brand-primary bg-violet-50`}>
                          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-primary shadow-sm border border-brand-primary/10">
                             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                          </div>
                          <div>
                             <p className="text-[12px] font-black uppercase tracking-widest text-slate-900">Secure Online Terminal</p>
                             <p className="text-[10px] text-slate-500 font-bold mt-1">Processed securely via Razorpay Archive</p>
                          </div>
                          <div className="ml-auto">
                              <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-[8px] font-black uppercase tracking-widest">Active</span>
                          </div>
                       </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-[1.5rem] border border-slate-100">
                       <p className="text-xs text-slate-500 italic leading-relaxed font-medium">
                          By confirming, you agree to our <span className="text-brand-primary font-bold hover:underline cursor-pointer">Specimen Terms</span> and botanical handling protocols.
                       </p>
                    </div>

                    <button onClick={handleSubmit} className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase text-[11px] tracking-[0.3em] hover:bg-brand-primary transition-all shadow-2xl">
                       Authorize Transaction — ${total.toFixed(2)}
                    </button>
                 </div>
               )}
            </div>

          </div>

          {/* RIGHT: High-Precision Summary */}
          <div className="w-full lg:w-1/3">
             <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-2xl sticky top-32 space-y-8">
                <div className="flex justify-between items-center">
                   <h4 className="text-xl font-serif text-slate-900">Registry Summary</h4>
                   <Link to="/cart" className="text-[9px] font-black uppercase text-brand-primary bg-violet-50 px-3 py-1 rounded-full border border-brand-primary/10">Modify Bag</Link>
                </div>

                <div className="space-y-4 max-h-[300px] overflow-y-auto no-scrollbar">
                   {cartItems.map(item => {
                     const base = parseFloat(item.price.replace('$', ''));
                     let extra = 0;
                     if (item.options?.chocolates) {
                        const match = item.options.chocolates.match(/\+(\d+\.\d+)/);
                        if (match) extra += parseFloat(match[1]);
                     }
                     if (item.options?.stuffedAnimal) {
                        const match = item.options.stuffedAnimal.match(/\+(\d+\.\d+)/);
                        if (match) extra += parseFloat(match[1]);
                     }
                     return (
                        <div key={item.cartKey || item.id} className="flex gap-4 group">
                           <div className="w-14 h-14 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-slate-50">
                              <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                           </div>
                           <div className="flex-grow min-w-0">
                              <p className="text-xs font-bold text-slate-900 truncate">{item.name}</p>
                              <p className="text-[10px] text-slate-400 font-medium">Qty: {item.quantity} • ${(base+extra).toFixed(2)} ea</p>
                           </div>
                           <p className="text-xs font-serif font-black text-slate-900">${((base+extra)*item.quantity).toFixed(2)}</p>
                        </div>
                     );
                   })}
                </div>

                <div className="pt-8 border-t border-slate-100 space-y-4">
                   <div className="flex justify-between items-center text-sm font-medium">
                      <span className="text-slate-400 font-medium">Preserved Subtotal</span>
                      <span className="text-slate-900 font-bold">${subtotal.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between items-center text-sm font-medium">
                      <span className="text-slate-400 font-medium tracking-tight">Processing & Transit</span>
                      <span className="text-slate-900 font-bold">{shipping === 0 ? <span className="text-emerald-500 uppercase text-[10px] font-black">Free</span> : `$${shipping.toFixed(2)}`}</span>
                   </div>
                   <div className="flex justify-between items-center text-sm font-medium">
                      <span className="text-slate-400 font-medium tracking-tight">Ecological Tax (8%)</span>
                      <span className="text-slate-900 font-bold">${tax.toFixed(2)}</span>
                   </div>
                   
                   <div className="pt-8 flex justify-between items-baseline border-t border-slate-50">
                      <span className="text-lg font-serif">Final Valuation</span>
                      <div className="text-right">
                         <p className="text-3xl font-serif font-black text-brand-primary tracking-tighter">${total.toFixed(2)}</p>
                         <p className="text-[9px] text-slate-400 uppercase tracking-widest font-black mt-1">Inclusive of VAT</p>
                      </div>
                   </div>
                </div>

                <div className="pt-6 grid grid-cols-2 gap-4 border-t border-slate-50">
                   <div className="flex items-center gap-3 grayscale opacity-30">
                      <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                      <span className="text-[8px] font-black uppercase tracking-tight">Archival Security</span>
                   </div>
                   <div className="flex items-center gap-3 grayscale opacity-30">
                      <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-[8px] font-black uppercase tracking-tight">Priority Care</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </main>

      <CartSidebar />
      <Footer />
    </div>
  );
}
