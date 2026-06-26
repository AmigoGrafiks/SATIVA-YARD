import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Award, Users } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function About() {
  return (
    <div className="bg-gray-50">
      <Helmet>
        <title>About Us | Sativa Yard</title>
        <meta name="description" content="Discover Sativa Yard's mission, our core values of quality, education, and professional service, and our journey as a premium cannabis lifestyle destination in Johannesburg." />
      </Helmet>
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-emerald-900 text-white">
        <div className="absolute inset-0 opacity-15">
           <img 
            src="/About us 2.webp" 
            alt="Sativa Yard Storefront" 
            className="w-full h-full object-cover grayscale mix-blend-overlay"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[0.9]">Redefining Cannabis Wellness.</h1>
            <p className="text-xl text-emerald-100/70 leading-relaxed font-medium">
              Based in Johannesburg, Sativa Yard is a premium lifestyle brand committed to quality, education, and professional service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-white border-b border-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-emerald-50/50 p-12 rounded-[40px] border border-emerald-100/50"
            >
              <h2 className="text-xs font-bold tracking-[0.2em] text-emerald-600 uppercase mb-4">Our Mission</h2>
              <p className="text-emerald-900 font-serif italic text-2xl leading-relaxed">
                To destigmatize cannabis through education, unparalleled product quality, and a luxury retail experience. We aim to integrate the natural benefits of cannabis seamlessly into the modern wellness lifestyle.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-emerald-800 text-white p-12 rounded-[40px] border border-emerald-700 shadow-xl shadow-emerald-900/10"
            >
              <h2 className="text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase mb-4">Our Vision</h2>
              <p className="text-emerald-50/90 font-serif italic text-2xl leading-relaxed">
                To be the most trusted and respected cannabis brand in South Africa, setting the industry benchmark for purity, transparency, and customer care.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Space Section */}
      <section className="py-24 bg-white border-b border-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6 items-start"
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
                  alt="Sativa Yard Counter" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xs font-bold tracking-[0.2em] text-emerald-600 uppercase mb-4">Our Space</h2>
              <h3 className="text-3xl md:text-5xl font-extrabold text-emerald-900 tracking-tight leading-[1.1] mb-6">
                Step Into Sativa Yard
              </h3>
              <p className="text-emerald-800/70 mb-6 leading-relaxed text-lg font-medium">
                Our retail store is designed to be a welcoming, clean, and educational environment. From our custom-made wooden display menu to our curated apothecary-style shelves, every detail is crafted to help you find the perfect profile for your needs.
              </p>
              <p className="text-emerald-800/70 leading-relaxed text-lg font-medium">
                Our knowledgeable team is always available to walk you through our selections, explain different cannabinoid ratios, and help you select clean, tested, and reliable products.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold tracking-[0.2em] text-emerald-600 uppercase mb-4">Core Principles</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-emerald-900 tracking-tight">Our Values</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             {[
              { icon: Award, title: 'Uncompromising Quality', desc: 'Every product on our shelves undergoes rigorous vetting and testing. We only stock what we would confidently use ourselves.', style: 'bg-white border-emerald-50 shadow-sm text-emerald-900', iconStyle: 'bg-emerald-50 text-emerald-700' },
              { icon: Users, title: 'Community & Education', desc: 'We empower our customers to make informed decisions through transparent labeling and dedicated educational resources.', style: 'bg-emerald-100/50 border-emerald-100 text-emerald-900', iconStyle: 'bg-emerald-700 text-white' },
              { icon: Leaf, title: 'Purity & Nature', desc: 'Focusing on clean, organic cultivation practices and natural extracts without harmful additives.', style: 'bg-white border-emerald-50 shadow-sm text-emerald-900', iconStyle: 'bg-emerald-50 text-emerald-700'  }
            ].map((value, i) => (
              <motion.div 
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-10 rounded-[32px] border ${value.style}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${value.iconStyle}`}>
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-emerald-800/70 leading-relaxed font-medium">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
