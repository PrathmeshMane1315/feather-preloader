import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Heart, ArrowUp, Share2, Link, MessageCircle } from 'lucide-react';
import logo from '../assets/logo.png';
import footerBg from '../assets/footer_design.png';

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const socialIcons = [
    { Icon: Share2, label: 'Share' },
    { Icon: Link, label: 'Website' },
    { Icon: MessageCircle, label: 'Chat' }
  ];

  return (
    <footer 
      id="footer" 
      className="text-white relative"
      style={{
        backgroundImage: `url(${footerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-[#0f0f2e]/70" />

      {/* ===== NEWSLETTER STRIP ===== */}
      <div className="relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            <div className="text-center lg:text-left">
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Stay in the Loop</h3>
              <p className="text-white/60 text-sm sm:text-base">Subscribe to get special offers, free giveaways, and first dibs on new crochet creations.</p>
            </div>
            <div className="flex flex-col xs:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:border-[#c9a227] transition-colors text-sm sm:text-base" 
              />
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-[#c9a227] text-[#1a1a5e] rounded-full font-bold hover:bg-[#d4b43a] transition-all duration-300 hover:shadow-lg hover:shadow-[#c9a227]/20 whitespace-nowrap text-sm sm:text-base">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MAIN FOOTER GRID ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          
          {/* Brand Column - full width on mobile */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <img src={logo} alt="Krishalaa" className="h-14 sm:h-16 lg:h-20 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">Crafting handmade crochet toys, amigurumi, and knitted soft toys with love and precision since 2020.</p>
            <div className="flex gap-3">
              {socialIcons.map(({ Icon, label }, i) => (
                <motion.a 
                  key={i} 
                  href="#" 
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -4 }} 
                  className="group w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#c9a227] transition-all duration-300"
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 group-hover:text-[#0f0f2e] transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-bold mb-4 text-[#c9a227] text-sm sm:text-base">Quick Links</h5>
            <ul className="space-y-2.5 sm:space-y-3">
              {['Home', 'Shop All', 'New Arrivals', 'Best Sellers', 'Gift Cards'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-white/60 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block text-xs sm:text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h5 className="font-bold mb-4 text-[#c9a227] text-sm sm:text-base">Categories</h5>
            <ul className="space-y-2.5 sm:space-y-3">
              {['Amigurumi Toys', 'Crochet Toys', 'Handmade Plush', 'Teddy Bears', 'Knitted Toys', 'Yarn Crafts'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-white/60 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block text-xs sm:text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="col-span-2 sm:col-span-1">
            <h5 className="font-bold mb-4 text-[#c9a227] text-sm sm:text-base">Get in Touch</h5>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#c9a227] mt-0.5 flex-shrink-0" />
                <span className="text-white/60 text-xs sm:text-sm">123 Craft Lane, Artisan District<br />Mumbai, Maharashtra 400001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#c9a227] flex-shrink-0" />
                <a href="tel:+919876543210" className="text-white/60 text-xs sm:text-sm hover:text-white transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#c9a227] flex-shrink-0" />
                <a href="mailto:hello@krishalaa.com" className="text-white/60 text-xs sm:text-sm hover:text-white transition-colors">hello@krishalaa.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-white/40 text-xs sm:text-sm text-center sm:text-left">
            &copy; 2026 Krishalaa. Developed by Qiro Tech Innovation Pvt. Ltd.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Shipping Info</a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button 
        onClick={scrollToTop} 
        whileHover={{ scale: 1.1, y: -2 }} 
        whileTap={{ scale: 0.9 }} 
        className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-[#c9a227] text-[#1a1a5e] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-[#d4b43a] transition-all duration-300 z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
      </motion.button>
    </footer>
  );
};

export default Footer;