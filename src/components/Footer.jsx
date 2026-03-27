import React from 'react';
import { Link } from 'react-router-dom';
import FlowerLogo from '../assets/FlowerLogo.png';


export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Artisanal Studio",
      links: [
        { label: "Our Philosophy", to: "#" },
        { label: "Floral Archives", to: "#" },
        { label: "Sustainability", to: "#" },
        { label: "Bespoke Suites", to: "#" }
      ]
    },
    {
      title: "Client Service",
      links: [
        { label: "Track Acquisition", to: "/account" },
        { label: "Delivery Protocol", to: "#" },
        { label: "Care Instructions", to: "#" },
        { label: "Returns Archive", to: "#" }
      ]
    },
    {
      title: "The Collective",
      links: [
        { label: "Easter '25", to: "/easter" },
        { label: "The Rose Room", to: "/roses" },
        { label: "Birthday Edits", to: "/birthday" },
        { label: "Seasonal Gallery", to: "#" }
      ]
    }
  ];

  return (
    <footer className="bg-slate-950 text-white pt-24 pb-24 overflow-hidden relative">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
          <div className="space-y-10">
            <Link to="/">
              <div className="flex items-center mb-8">
                <img src={FlowerLogo} alt="Gallatin Flower & Gift Shoppe Logo" className="h-20 w-auto object-contain" />
              </div>
            </Link>
            <p className="max-w-md text-slate-300 font-light leading-relaxed text-sm">
              We curate high-architecture botanical wonders for those who appreciate the fine art of nature. Each stem is hand-selected from our private sustainable nurseries across the globe.
            </p>
            <div className="flex gap-6">
              {[
                { name: 'Instagram', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> },
                { name: 'Pinterest', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.621 0 11.988-5.367 11.988-11.987S18.638 0 12.017 0z"/></svg> },
                { name: 'Threads', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 11c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4z"></path><path d="M12 11c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4"></path><path d="M4.1 11c.1-3.3 2.1-6.1 5.1-7.1"></path><path d="M14.9 3.9c3 1 5 3.8 5.1 7.1"></path><path d="M19.9 13.5c-.2 3.2-2.1 6-5 7"></path><path d="M9.1 20.6c-3-1-5-3.8-5.1-7.1"></path></svg> }
              ].map(social => (
                <a key={social.name} href="#" className="text-slate-400 hover:text-brand-accent transition-all transform hover:scale-110">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-10">
            {footerSections.map(section => (
              <div key={section.title} className="space-y-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map(link => (
                    <li key={link.label}>
                      <Link to={link.to} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter / CTA Section */}
        <div className="border-y border-white/5 py-12 flex flex-col lg:flex-row items-center justify-between gap-10 mb-12">
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-2xl font-serif italic text-brand-accent">Inhabit Gallatin</h3>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Join the Artisanal Elite Circle for Private Previews</p>
          </div>
          <div className="flex w-full max-w-md bg-white/5 border border-white/10 rounded-full p-1.5 focus-within:border-brand-accent transition-colors">
            <input 
              type="email" 
              placeholder="Newsletter ID..." 
              className="bg-transparent flex-grow px-6 text-sm font-medium focus:outline-none"
            />
            <button className="px-8 py-3 bg-brand-primary text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-brand-accent transition-all shadow-xl">
              Apply
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-white/5 opacity-50">
          <p className="text-[10px] font-black uppercase tracking-[0.4em]">
            Copyrights © 2026 Gallatin Flower & Gift Shoppe. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.3em]">
            <span className="text-slate-400">Powered by MBW</span>
          </div>
        </div>
      </div>

      {/* Background Aesthetic */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 opacity-30 pointer-events-none"></div>
    </footer>
  );
}
