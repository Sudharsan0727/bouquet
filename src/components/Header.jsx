import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ALL_PRODUCTS, Prod1, Prod2, Prod3 } from '../data/products';
import FlowerLogo from '../assets/FlowerLogo.png';


export default function Header({ isScrolled, activePage }) {
  const { cartItems, wishlistItems, openSidebar } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = ALL_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6);
      setSearchResults(filtered);
      setShowSearchDropdown(true);
    } else {
      setSearchResults([]);
      setShowSearchDropdown(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearchQuery('');
    setShowSearchDropdown(false);
  };
  
  const navItems = [
    { label: 'EASTER', active: activePage === 'easter', link: '/easter' },
    { label: 'ROSES', active: activePage === 'roses', link: '/roses' },
    { label: 'BIRTHDAY', active: activePage === 'birthday', link: '/birthday' },
    {
      label: 'SYMPATHY',
      active: activePage === 'sympathy',
      dropdown: {
        sections: [
          { label: "Sympathy Collections", type: "header" },
          {
            label: "Sympathy Flowers",
            type: "header",
            items: ["Funeral Flowers", "Cremation and Memorial", "Casket Flowers", "Standing Sprays & Wreaths", "Sympathy Arrangements", "For The Home"]
          }
        ]
      }
    },
    {
      label: 'OCCASIONS',
      active: activePage === 'occasions',
      dropdown: {
        columns: [
          { label: "Events & Ceremony", items: ["Patriotic Flowers", "Wedding Flowers", "Wedding Bouquets", "Wedding Party Flowers", "Ceremony Flowers", "Reception Flowers"] },
          { label: "Life's Moments", items: ["Just Because", "Anniversary Flowers", "Birthday Flowers", "Get Well Flowers", "Graduation Flowers", "New Baby Flowers", "Back to School Flowers"] },
          { label: "Prom Archives", items: ["Corsages", "Boutonnieres", "Hairpieces & Handheld Bouquets"] }
        ],
        featured: { img: Prod1, title: "The Celebration Edit", subtitle: "Hand-crafted Party Suite" }
      }
    },
    {
      label: 'HOLIDAYS',
      active: activePage === 'holidays',
      dropdown: {
        columns: [
          { label: "Spring & Summer", items: ["Passover", "Easter", "Admin Professionals Day", "Mother's Day", "Father's Day", "Rosh Hashanah", "Grandparents Day"] },
          { label: "Autumn & Winter", items: ["National Boss Day", "Sweetest Day", "Halloween", "Thanksgiving (USA)", "Hanukkah", "Kwanzaa", "Christmas", "Valentine's Day"] }
        ],
        featured: { img: Prod2, title: "The Festive Archive", subtitle: "Hand-crafted Holiday Suite" }
      }
    },
  ];

  return (
    <header className={`sticky top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-violet-100 py-3' : 'bg-white border-b border-slate-100 py-5'}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center gap-8">
          <div className="flex-shrink-0">
            <Link to="/">
              <div className="flex items-center">
                <img src={FlowerLogo} alt="Gallatin Flower & Gift Shoppe" className="h-12 md:h-16 w-auto object-contain" />
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex flex-grow max-w-xl relative group" ref={searchRef}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim().length > 1 && setShowSearchDropdown(true)}
              placeholder="Search for lilies, roses, or dried flowers..."
              className="w-full pl-12 pr-6 py-3 bg-violet-50/50 rounded-2xl border border-transparent focus:border-brand-primary focus:bg-white focus:outline-none transition-all duration-300 text-sm"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-brand-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            {/* Search Dropdown */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div className="absolute top-[calc(100%+12px)] left-0 right-0 bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl overflow-hidden z-[110] animate-bloom-in origin-top">
                <div className="p-4 border-b border-slate-50 flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Matching Products</span>
                  <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest bg-violet-50 px-2 py-0.5 rounded-md">{searchResults.length} Results</span>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {searchResults.map((product) => (
                    <div 
                      key={product.id} 
                      onClick={() => handleProductClick(product.id)}
                      className="flex items-center gap-4 p-4 hover:bg-violet-50 transition-colors cursor-pointer border-b border-slate-50 last:border-0 group/result"
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                        <img src={product.image} className="w-full h-full object-cover group-hover/result:scale-110 transition-transform duration-500" alt={product.name} />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-sm font-bold text-slate-900 leading-tight group-hover/result:text-brand-primary transition-colors">{product.name}</h4>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-brand-accent">{product.price}</p>
                        <p className="text-[8px] font-bold text-slate-300 uppercase tracking-tighter">View Specimen</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-slate-50 text-center">
                  <button onClick={() => setShowSearchDropdown(false)} className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-brand-primary transition-colors">Close Search</button>
                </div>
              </div>
            )}
            
            {showSearchDropdown && searchQuery.trim().length > 1 && searchResults.length === 0 && (
              <div className="absolute top-[calc(100%+12px)] left-0 right-0 bg-white border border-slate-100 shadow-2xl rounded-3xl p-10 text-center z-[110] animate-bloom-in origin-top">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h4 className="text-lg font-serif text-slate-900 mb-1">No blooms found</h4>
                <p className="text-sm text-slate-400 font-light">We couldn't find any products matching "{searchQuery}"</p>
              </div>
            )}
          </div>

          <div className="flex gap-4 md:gap-8 items-center">
            <button className="lg:hidden p-2 text-slate-600 hover:text-brand-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <Link to="/account" className="hidden sm:flex flex-col items-start leading-none group cursor-pointer">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Hello, Sign In</span>
              <span className="text-sm font-bold group-hover:text-brand-primary transition-colors">My Account</span>
            </Link>

            <div className="flex gap-4 items-center border-l-2 border-slate-100 pl-4 md:pl-8">
              <button onClick={() => openSidebar('wishlist')} className="p-2 hover:bg-violet-50 rounded-full transition-colors relative group">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors ${wishlistItems.length > 0 ? 'fill-brand-accent text-brand-accent' : 'text-slate-700 group-hover:text-brand-primary'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold pb-px">{wishlistItems.length}</span>
              </button>

              <button onClick={() => openSidebar('cart')} className="p-2 hover:bg-violet-50 rounded-full transition-colors relative group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700 group-hover:text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold pb-px">{totalItemsCount}</span>
              </button>
            </div>

            <button className="lg:hidden p-2 text-slate-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="hidden lg:flex justify-center items-center gap-10 mt-4 pt-3 border-t border-slate-50">
          <Link to="/" className="text-slate-700 hover:text-brand-primary transition-colors py-1 group relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-0.5 transition-all duration-300">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <path d="M9 22V12h6v10" />
            </svg>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-accent group-hover:w-full transition-all"></span>
          </Link>

          {navItems.map((item) => (
            <div key={item.label} className="relative group/nav">
              <Link
                to={item.link || "#"}
                className={`text-sm font-bold tracking-wider py-1 flex items-center gap-1 transition-colors hover:text-brand-accent ${item.active ? 'text-brand-primary' : 'text-slate-700'}`}
              >
                {item.label}
                {item.dropdown && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover/nav:rotate-180 transition-transform duration-300 opacity-40">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                )}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-brand-accent transition-all ${item.active ? 'w-full' : 'w-0 group-hover/nav:w-full'}`}></span>
              </Link>

              {item.dropdown && (
                <div className={`absolute top-full pt-6 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-700 z-[100] translate-y-6 group-hover/nav:translate-y-0 ${item.label === 'HOLIDAYS' ? '-right-80' : 'left-1/2 -translate-x-1/2'}`}>
                  <div className="bg-white border border-brand-primary/5 shadow-[0_60px_100px_-20px_rgba(46,16,101,0.15)] rounded-[50px] p-0 min-w-[1000px] flex overflow-hidden">
                    <div className="w-[28%] bg-slate-50/80 p-12 flex flex-col justify-between border-r border-brand-primary/5">
                      <div className="space-y-4">
                        <span className="text-[10px] font-black text-brand-primary tracking-[0.5em] uppercase opacity-40">Collection . 025</span>
                        <h3 className="text-4xl font-serif text-brand-primary leading-tight tracking-tighter">
                          {item.label === 'SYMPATHY' ? 'The Grace Edit' : item.label === 'OCCASIONS' ? 'Life In Bloom' : 'The Festive Lab'}
                        </h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          Studio Authorized
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium">Curated by Master Florists</p>
                      </div>
                    </div>

                    <div className="flex-grow p-12">
                      <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                        {(item.dropdown.columns || (item.dropdown.sections ? [item.dropdown.sections[1]] : [])).map((col, cIdx) => (
                          <div key={cIdx} className="space-y-6">
                            <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">{col.label}</h4>
                            <ul className="space-y-4">
                              {col.items.map((subItem, sIdx) => (
                                <li key={sIdx}>
                                  <a href="#" className="group/item text-sm font-medium text-slate-500 hover:text-brand-primary transition-colors flex items-center gap-3">
                                    <span className="w-0 h-px bg-brand-primary/40 group-hover/item:w-4 transition-all"></span>
                                    {subItem}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="w-[32%] relative group/hero overflow-hidden">
                      <img
                        src={item.dropdown.featured ? item.dropdown.featured.img : (item.label === 'SYMPATHY' ? Prod3 : item.label === 'OCCASIONS' ? Prod1 : Prod2)}
                        className="w-full h-full object-cover group-hover/hero:scale-110 transition-transform duration-[2000ms]"
                        alt="Hero"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/60 via-transparent to-transparent opacity-60 group-hover/hero:opacity-80 transition-opacity"></div>
                      <div className="absolute bottom-10 left-10 right-10">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-1">
                          <p className="text-[8px] font-bold text-white/50 uppercase tracking-[0.3em]">Specimen ID #025</p>
                          <p className="text-sm font-serif text-white italic">
                            {item.dropdown.featured ? item.dropdown.featured.title : 'The Seasonal Signature'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
