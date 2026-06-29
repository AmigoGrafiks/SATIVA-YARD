import React, { useState } from 'react';
import { Mail, MapPin, Phone, Instagram, Facebook } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data';
import { Helmet } from 'react-helmet-async';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${encodeURIComponent(WHATSAPP_NUMBER)}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Security: Strip carriage returns and newlines from all free-text fields
    const cleanName = name.replace(/[\r\n]+/g, ' ').trim();
    const cleanEmail = email.replace(/[\r\n]+/g, ' ').trim();
    const cleanMessage = message.replace(/[\r\n]+/g, ' ').trim();

    const subject = `New website inquiry from ${cleanName}`;
    const body = `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`;
    
    window.location.href = `mailto:hello@sativayard.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 md:py-24">
      <Helmet>
        <title>Contact Us | Sativa Yard</title>
        <meta name="description" content="Reach out to Sativa Yard in Johannesburg. Contact us via phone, email, WhatsApp, or visit our retail store at 26 Van Beek St, New Doornfontein." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900 tracking-tight mb-4">Get In Touch</h1>
          <p className="text-emerald-800/70 leading-relaxed text-lg font-medium">
            Have questions about our products or need assistance with your order? Our dedicated team is here to provide professional support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-[40px] overflow-hidden shadow-sm border border-emerald-50 p-4">
          {/* Contact Info */}
          <div className="p-8 md:p-12 lg:p-16 bg-emerald-800 text-emerald-50 rounded-[32px]">
             <h2 className="text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase mb-8">Contact Information</h2>
             
             <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Our Location</h3>
                    <p className="text-emerald-100/70 leading-relaxed font-medium">26 Van Beek St, New Doornfontein<br/>Johannesburg, 2094</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Phone & WhatsApp</h3>
                    <p className="text-emerald-100/70 font-medium">+27 78 587 0868</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-emerald-100/70 font-medium">hello@sativayard.co.za</p>
                  </div>
                </div>
             </div>

              <div className="mt-12 pt-12 border-t border-emerald-700/50">
                 <h3 className="font-bold mb-4">Business Hours</h3>
                 <div className="space-y-2 text-emerald-100/70 font-medium text-sm">
                   <p className="flex justify-between"><span>Monday - Friday</span> <span>09:00 - 18:00</span></p>
                   <p className="flex justify-between"><span>Saturday</span> <span>10:00 - 16:00</span></p>
                   <p className="flex justify-between"><span>Sunday</span> <span>Closed</span></p>
                 </div>
              </div>

             <div className="mt-12 flex gap-4">
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener" 
                  className="bg-white/10 p-3 rounded-xl border border-white/10 hover:bg-white/20 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener" 
                  className="bg-white/10 p-3 rounded-xl border border-white/10 hover:bg-white/20 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
             </div>
          </div>

          {/* Form */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <h2 className="text-2xl font-extrabold text-emerald-900 mb-8">Send a Message</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-xs font-bold tracking-widest uppercase text-emerald-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-emerald-100 focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 outline-none transition-all hover:border-emerald-200"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-bold tracking-widest uppercase text-emerald-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-emerald-100 focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 outline-none transition-all hover:border-emerald-200"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-bold tracking-widest uppercase text-emerald-700 mb-2">Message</label>
                <textarea 
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-emerald-100 focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 outline-none transition-all resize-none hover:border-emerald-200"
                  placeholder="How can we help you?"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  type="submit"
                  className="flex-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-2xl py-4 font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  Send Email
                </button>
                <button 
                  type="button"
                  onClick={handleWhatsApp}
                  className="flex-1 bg-emerald-700 text-white rounded-2xl py-4 font-bold hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-700/20 cursor-pointer"
                >
                  WhatsApp Us
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
