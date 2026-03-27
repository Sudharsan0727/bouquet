import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FlowerLogo from '../assets/FlowerLogo.png';



export default function Checkout() {
  const { cartItems, sidebarOpen, openSidebar, closeSidebar, setSidebarTab, sidebarTab, removeFromCart, wishlistItems, addOrder } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
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
    paymentMethod: 'credit_card',
    deliveryMethod: 'ship',
    pickupDate: '',
    pickupTime: ''
  });



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + parseInt(item.price.replace('$', '')) * item.quantity, 0);
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
      amount: Math.round(total * 100), // Amount in paise
      currency: "INR",
      name: "Gallatin",
      description: "Luxury Botanical Wonders Purchase",
      image: FlowerLogo, // Updated to use the correct imported logo

      handler: function (response) {
        addOrder({
            id: response.razorpay_payment_id || `B-${Math.floor(100000 + Math.random() * 900000)}`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            total: `$${total.toFixed(2)}`,
            status: "In Preparation",
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
      notes: {
        address: formData.address,
      },
      theme: {
        color: "#5b21b6", // Brand primary color (violet-800/900 range)
      },
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
      <div className="min-h-screen bg-[#fcfcfc] flex flex-col items-center justify-center p-6 text-center">
         <div className="text-4xl font-serif text-slate-300 mb-8 italic">Your cart is empty.</div>
         <Link to="/" className="px-10 py-4 bg-brand-primary text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-brand-accent transition-all shadow-xl shadow-brand-primary/20">
           Discover Our Collections
         </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans text-slate-800">
      <Header isScrolled={isScrolled} activePage="" />

      {/* ── Breadcrumb Banner ── */}
      <section className="bg-white border-b border-slate-100 py-10 text-center">
          <h1 className="text-3xl font-serif text-slate-900 leading-tight tracking-tight">
            Checkout <span className="italic font-light text-brand-primary">Process</span>
          </h1>
      </section>

      {/* ── Main Checkout Grid ── */}
      <main className="container mx-auto px-6 lg:px-12 py-16">
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-16">
          
          {/* LEFT: Information & Form */}
          <div className="w-full lg:w-2/3 space-y-12">
            
            {/* Delivery Method Selection */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                <span className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-sm">01</span>
                <h3 className="text-xl font-serif text-slate-900 tracking-tight leading-tight">Delivery Choice</h3>
              </div>
              
              <div className="bg-slate-100/50 p-2 rounded-2xl flex gap-2">
                <button 
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, deliveryMethod: 'ship' }))}
                  className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl transition-all font-bold text-sm ${formData.deliveryMethod === 'ship' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Ship
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, deliveryMethod: 'pickup' }))}
                  className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl transition-all font-bold text-sm ${formData.deliveryMethod === 'pickup' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Pickup
                </button>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                <span className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-sm">02</span>
                <h3 className="text-xl font-serif text-slate-900 tracking-tight leading-tight">
                  {formData.deliveryMethod === 'ship' ? 'Shipping Destination' : 'Billing Identity'}
                </h3>
              </div>

              
              {formData.deliveryMethod === 'pickup' && (
                <div className="bg-violet-50/50 p-8 rounded-[2rem] border border-violet-100 space-y-4 animate-fadeIn">
                  <div className="flex items-center gap-3 text-brand-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h4 className="font-serif text-lg tracking-tight">Gallatin Artisanal Studio</h4>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <p className="text-xs text-slate-500 font-light leading-relaxed">
                      123 Artisanal Way, Suite 100 <br />
                      Gallatin, Tennessee 37066 <br />
                      <span className="font-bold">Contact:</span> (615) 555-FLWR
                    </p>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=123+Artisanal+Way+Gallatin+TN+37066" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white border border-violet-100 text-brand-primary rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-violet-50 transition-all shadow-sm w-fit"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Get Directions
                    </a>
                  </div>

                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-violet-100">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Pickup Date</label>
                      <input 
                        type="date" 
                        required={formData.deliveryMethod === 'pickup'} 
                        name="pickupDate" 
                        value={formData.pickupDate} 
                        onChange={handleInputChange} 
                        className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:border-brand-primary outline-none transition-colors" 
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Preferred Time</label>
                       <select 
                         required={formData.deliveryMethod === 'pickup'} 
                         name="pickupTime" 
                         value={formData.pickupTime} 
                         onChange={handleInputChange} 
                         className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:border-brand-primary outline-none transition-colors appearance-none"
                       >
                         <option value="">Select a slot</option>
                         <option value="09:00 - 11:00">09:00 - 11:00 AM</option>
                         <option value="11:00 - 13:00">11:00 AM - 01:00 PM</option>
                         <option value="13:00 - 15:00">01:00 - 03:00 PM</option>
                         <option value="15:00 - 17:00">03:00 - 05:00 PM</option>
                         <option value="17:00 - 19:00">05:00 - 07:00 PM</option>
                       </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">First Name</label>
                  <input required name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:border-brand-primary outline-none transition-colors" placeholder="e.g. Eleanor" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Last Name</label>
                  <input required name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:border-brand-primary outline-none transition-colors" placeholder="e.g. Vance" />
                </div>
                
                {formData.deliveryMethod === 'ship' && (
                  <>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Shipping Address</label>
                      <input required name="address" value={formData.address} onChange={handleInputChange} className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:border-brand-primary outline-none transition-colors" placeholder="House no, Street name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">City</label>
                      <input required name="city" value={formData.city} onChange={handleInputChange} className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:border-brand-primary outline-none transition-colors" placeholder="e.g. London" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">ZIP / Postcode</label>
                      <input required name="zip" value={formData.zip} onChange={handleInputChange} className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:border-brand-primary outline-none transition-colors" placeholder="e.g. EH1 1AA" />
                    </div>
                  </>
                )}
                
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:border-brand-primary outline-none transition-colors" placeholder="eleanor@studio.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Phone</label>
                  <input required name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:border-brand-primary outline-none transition-colors" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>

            </div>

            {/* Payment Method */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                <span className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-sm">03</span>
                <h3 className="text-xl font-serif text-slate-900 tracking-tight leading-tight">Payment Architecture</h3>
              </div>

              <div className="space-y-4">
                 {[
                   { id: 'razorpay', label: 'Online Payment (Razorpay)', info: 'Securely pay using UPI, Cards, or Netbanking via Razorpay.' },
                   { id: 'cod', label: 'Cash on Delivery', info: 'Pay with cash upon delivery of your bouquet.' },
                   { id: 'bank_transfer', label: 'Direct Bank Transfer', info: 'Make your payment directly into our bank account. Please use your Order ID as reference.' }
                 ].map(method => (
                   <div key={method.id} className={`p-8 rounded-[2rem] border transition-all cursor-pointer ${formData.paymentMethod === method.id ? 'border-brand-primary bg-violet-50/30' : 'border-slate-100 bg-white hover:border-violet-200'}`} onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.id }))}>
                     <div className="flex items-center gap-4 mb-2">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === method.id ? 'border-brand-primary bg-brand-primary' : 'border-slate-200'}`}>
                           {formData.paymentMethod === method.id && <div className="w-2 h-2 rounded-full bg-white"></div>}
                        </div>
                        <span className="text-sm font-bold tracking-widest uppercase text-slate-900">{method.label}</span>
                     </div>
                     {formData.paymentMethod === method.id && (
                        <p className="pl-9 text-xs font-light leading-relaxed text-slate-500 animate-fadeIn">{method.info}</p>
                     )}
                   </div>
                 ))}
              </div>
            </div>

            <button type="submit" className="w-full py-6 bg-brand-primary text-white rounded-3xl font-black uppercase text-xs tracking-[0.4em] hover:bg-brand-accent transition-all shadow-2xl shadow-brand-primary/20">
              {formData.paymentMethod === 'razorpay' ? 'Secure Payment via Razorpay' : 'Complete Order Architecture'}
            </button>
          </div>

          {/* RIGHT: Order Summary Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-40 bg-white border border-slate-100 rounded-[3rem] p-10 shadow-xl overflow-hidden relative">
               {/* Aesthetic Decoration */}
               <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none text-6xl font-serif italic text-brand-primary select-none">Order</div>
               
               <h3 className="text-2xl font-serif text-slate-900 mb-8 border-b border-slate-50 pb-6">Bag Summary</h3>
               
               <div className="space-y-6 mb-10 overflow-y-auto max-h-[400px] pr-2 scrollbar-thin scrollbar-thumb-slate-100">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex gap-4">
                       <img src={item.image} className="w-16 h-20 object-cover rounded-xl bg-slate-50" />
                       <div className="flex-grow space-y-1">
                          <p className="font-serif text-slate-900 leading-tight">{item.name}</p>
                          <div className="flex justify-between items-center text-[11px] font-bold">
                             <span className="text-slate-400">Qty: {item.quantity}</span>
                             <span className="text-brand-accent">{item.price}</span>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>

               <div className="space-y-4 border-t border-slate-50 pt-8 text-[11px] font-bold uppercase tracking-widest">
                  <div className="flex justify-between text-slate-500">
                     <span>Initial Deposit</span>
                     <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                     <span>Courier Logistics</span>
                     <span className={shipping === 0 ? 'text-emerald-500' : ''}>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                     <span>Service Value Add (8%)</span>
                     <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 text-slate-900 border-t border-slate-50">
                     <span className="text-sm">Total Payable</span>
                     <span className="text-2xl font-serif text-brand-primary tracking-tighter">${total.toFixed(2)}</span>
                  </div>
               </div>
               
               <div className="mt-10 p-4 bg-slate-50/80 rounded-2xl flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">Safe Delivery Guaranteed</span>
               </div>
            </div>
          </div>

        </form>
      </main>

      {/* ── Footer ── */}
      <Footer />


    </div>
  );
}
