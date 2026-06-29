import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Truck, BookOpen, Star, Sparkles, CheckCircle2, Leaf } from 'lucide-react';
import { products } from '../data';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../lib/utils';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  const { addToCart } = useCart();
  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="flex flex-col">
      <Helmet>
        <title>Sativa Yard | Premium Cannabis Lifestyle Destination - Johannesburg</title>
        <meta name="description" content="Welcome to Sativa Yard, Johannesburg's premier cannabis lifestyle destination. Explore our curated selection of premium top-shelf flower, edibles, concentrates, and accessories." />
      </Helmet>
      {/* Hero Section */}
      <section className="relative pt-16 pb-16 md:pt-32 md:pb-32 overflow-hidden bg-gradient-to-br from-emerald-50/60 via-white to-emerald-50/30">
        {/* Ambient Decorative Glowing Blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-emerald-100/40 blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] rounded-full bg-emerald-100/20 blur-[100px] pointer-events-none z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Text Content Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-left"
            >
              <span className="inline-block py-2 px-4 rounded-full bg-emerald-100/60 text-emerald-800 text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-emerald-200/50 shadow-sm">
                JOHANNESBURG, SA
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-emerald-900 leading-[1.05] tracking-tight mb-4">
                Sativa Yard
              </h1>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-emerald-700 leading-tight mb-6">
                Johannesburg's Premium Cannabis Destination.
              </h2>
              <p className="text-lg text-emerald-800/80 mb-10 leading-relaxed font-medium">
                Explore premium cannabis products, wellness solutions, accessories, and expert education from SA's most trusted lifestyle brand.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-emerald-700/20"
                >
                  Shop Products
                </Link>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-emerald-700 bg-white hover:bg-emerald-50 border border-emerald-200 rounded-2xl transition-all hover:scale-[1.02] shadow-sm"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>

            {/* Image Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="relative w-full aspect-[4/3] md:aspect-[1.35] rounded-[40px] overflow-hidden shadow-2xl shadow-emerald-950/15 border border-emerald-100/70 group bg-emerald-50"
            >
              <img
                src="/Homepage.webp"
                alt="Sativa Yard Storefront"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/10 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-16 md:py-24 bg-emerald-50 border-t border-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xs font-bold tracking-[0.2em] text-emerald-600 uppercase mb-6">Sativa Yard Cannabis Culture: Who We Are</h2>
          <p className="text-2xl md:text-3xl font-serif italic text-emerald-900 leading-relaxed">
            "Sativa Yard is a cannabis retail brand that promotes quality products, education, and responsible use in a welcoming space known for uplifting and energizing effects, typically relaxing and calming, a balanced combination of Sativa and Indica strains."
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white border-y border-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6 items-start pb-8 md:pb-0"
            >
              <div className="aspect-[3/4] rounded-[32px] overflow-hidden relative border border-emerald-100 shadow-lg hover:scale-[1.02] transition-transform duration-500">
                <img 
                  src="/About us 1.webp" 
                  alt="Sativa Yard Blackboard Sign" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] rounded-[32px] overflow-hidden relative border border-emerald-100 shadow-lg translate-y-4 hover:scale-[1.02] transition-transform duration-500">
                <img 
                  src="/About us 2.webp" 
                  alt="Sativa Yard Shelves" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xs font-bold tracking-[0.2em] text-emerald-600 uppercase mb-4">About Sativa Yard</h2>
              <h3 className="text-3xl md:text-5xl font-extrabold text-emerald-900 tracking-tight leading-[1.1] mb-6">
                Elevating the Standard of Cannabis Wellness.
              </h3>
              <p className="text-emerald-800/70 mb-8 leading-relaxed text-lg">
                We believe in the natural power of cannabis to enhance daily living. As an established lifestyle brand, we are committed to providing meticulously curated products, backed by science and rigorous quality standards.
              </p>
              <ul className="space-y-4 mb-8">
                {['Uncompromising Quality Assurance', 'Expert Curated Selection', 'Discreet & Professional Service', 'Community Education Focus'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700">
                       <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span className="text-emerald-900 font-bold">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/about" className="inline-flex items-center font-bold text-emerald-700 hover:text-emerald-800 transition-colors uppercase tracking-widest text-sm">
                Read our full story <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block py-1.5 px-4 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-widest mb-4">
              Our Benchmarks
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-emerald-900 tracking-tight">Why Choose Us</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Sparkles, 
                title: 'Premium Selection', 
                desc: 'Carefully curated indoor flowers and artisan products.', 
                style: 'bg-emerald-900 text-white border-emerald-950 shadow-md hover:bg-emerald-950', 
                iconStyle: 'bg-white/10 text-white border border-white/10 shadow-lg',
                descStyle: 'text-emerald-100/80'
              },
              { 
                icon: ShieldCheck, 
                title: 'Quality Assured', 
                desc: 'Rigorous lab testing and meticulous sourcing.', 
                style: 'bg-emerald-900 text-white border-emerald-950 shadow-md hover:bg-emerald-950', 
                iconStyle: 'bg-white/10 text-white border border-white/10 shadow-lg',
                descStyle: 'text-emerald-100/80'
              },
              { 
                icon: Truck, 
                title: 'Fast WhatsApp Ordering', 
                desc: 'Secure, discreet, and swift delivery across JHB.', 
                style: 'bg-emerald-900 text-white border-emerald-950 shadow-md hover:bg-emerald-950', 
                iconStyle: 'bg-white/10 text-white border border-white/10 shadow-lg',
                descStyle: 'text-emerald-100/80'
              },
            ].map((feature, i) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -12, 
                  rotateX: 6,
                  rotateY: -6,
                  boxShadow: "0 30px 60px -15px rgba(6, 78, 59, 0.20), 0 15px 30px -10px rgba(0, 0, 0, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.4)"
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 250, 
                  damping: 18,
                  mass: 0.8
                }}
                className={`p-10 rounded-[38px] border flex flex-col justify-between min-h-[280px] cursor-pointer transition-all ${feature.style}`}
                style={{ 
                  transformStyle: 'preserve-3d', 
                  perspective: 1000 
                }}
              >
                <div 
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${feature.iconStyle}`}
                  style={{ transform: 'translateZ(50px)' }}
                >
                  <feature.icon className="h-7 w-7" />
                </div>
                <div style={{ transform: 'translateZ(30px)' }}>
                  <h3 className="text-2xl font-black mb-3 tracking-tight">{feature.title}</h3>
                  <p className={`leading-relaxed text-sm font-medium ${feature.descStyle}`}>{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white border-t border-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-900 tracking-tight mb-2">Featured Products</h2>
              <p className="text-emerald-800/70">Discover our most sought-after wellness and lifestyle items.</p>
            </div>
            <Link to="/products" className="hidden md:inline-flex items-center font-bold text-emerald-700 hover:text-emerald-800 transition-colors uppercase tracking-widest text-sm">
              View All Collection <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-[32px] border border-emerald-50 overflow-hidden hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 flex flex-col p-3 sm:p-4 shadow-sm">
                <div className="aspect-square bg-emerald-50/50 rounded-2xl relative overflow-hidden mb-4">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-emerald-800 uppercase tracking-widest border border-emerald-100">
                    {product.category}
                  </div>
                </div>
                <div className="flex flex-col flex-grow px-2">
                  <h3 className="text-lg font-bold text-emerald-900 mb-1">{product.name}</h3>
                  <div className="text-xs text-emerald-600 mb-4">{product.strainType !== 'N/A' ? `${product.strainType} • ` : ''}{product.weight}</div>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-black text-emerald-900">{formatCurrency(product.price)}</span>
                    {product.availability === 'Out of Stock' ? (
                      <span className="text-[10px] font-black text-red-600 bg-red-50 border border-red-100 px-2.5 py-1.5 rounded-xl uppercase tracking-widest">
                        Sold Out
                      </span>
                    ) : (
                      <button 
                        onClick={() => addToCart(product, 1)}
                        className="bg-emerald-50 hover:bg-emerald-700 text-emerald-700 hover:text-white p-3 rounded-xl transition-colors border border-emerald-100 hover:border-emerald-700 cursor-pointer"
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <Sparkles className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-24 bg-emerald-900 text-emerald-50 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <Leaf className="w-full h-full object-cover scale-150 rotate-12 text-white" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-16">
            <h2 className="text-sm font-bold tracking-[0.2em] text-emerald-400 uppercase mb-4">The Library</h2>
            <h3 className="text-4xl font-serif italic mb-6 leading-tight max-w-2xl">"Understanding the fundamental differences between major cannabis profiles."</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Sativa', highlight: 'Energy & Focus', desc: 'Known for uplifting and cerebral effects. Ideal for daytime use, creative projects, and social gatherings.' },
              { title: 'Indica', highlight: 'Relaxation & Rest', desc: 'Provides deep physical relaxation. Perfect for evening use, stress relief, and promoting restful sleep.' },
              { title: 'Hybrid', highlight: 'Balanced Harmony', desc: 'A curated blend of both profiles. Offers a balanced experience customized by specific strain ratios.' }
            ].map((edu) => (
              <div key={edu.title} className="bg-emerald-800/50 backdrop-blur-md rounded-[32px] p-8 border border-emerald-700/50">
                <div className="text-[10px] font-black text-emerald-400 tracking-widest uppercase mb-4">{edu.highlight}</div>
                <h3 className="text-2xl font-black mb-4">{edu.title}</h3>
                <p className="text-emerald-100/70 leading-relaxed text-sm font-medium">{edu.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50 border-t border-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-xs font-bold tracking-[0.2em] text-emerald-600 uppercase mb-4">Reviews</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-emerald-900 tracking-tight">Client Experiences</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah M.', role: 'Wellness Advocate', text: 'The most professional dispensary experience in Johannesburg. The product quality is unmatched.' },
              { name: 'David T.', role: 'Creative Director', text: 'Clean, modern, and reliable. Their product knowledge helped me find exactly what I needed for daytime focus.' },
              { name: 'Jessica L.', role: 'Yoga Instructor', text: 'Sativa Yard feels like a premium wellness brand. Delivery is always discreet and perfectly packaged.' }
            ].map((review) => (
              <div key={review.name} className="bg-white p-10 rounded-[32px] text-left border border-emerald-50 shadow-sm flex flex-col h-full">
                <div className="flex text-emerald-400 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-emerald-900 font-serif italic text-lg leading-relaxed mb-6 flex-grow">"{review.text}"</p>
                <div className="pt-6 border-t border-emerald-50">
                  <div className="font-bold text-emerald-900">{review.name}</div>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-emerald-600/70">{review.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-emerald-800 text-emerald-50 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8">Ready to Explore?</h2>
          <p className="text-xl text-emerald-200/80 mb-12 max-w-2xl mx-auto">Discover our full collection of perfectly cultivated flower, handcrafted edibles, and lifestyle accessories.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md mx-auto sm:max-w-none">
            <Link 
              to="/products"
              className="inline-flex items-center justify-center px-10 py-5 text-base font-bold text-emerald-900 bg-white hover:bg-emerald-50 rounded-2xl transition-colors shadow-xl shadow-black/10"
            >
              Shop Collection
            </Link>
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center px-10 py-5 text-base font-bold text-white bg-transparent border-2 border-emerald-700 hover:bg-emerald-700/50 rounded-2xl transition-colors"
            >
              WhatsApp Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
