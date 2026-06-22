import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Star, ShoppingBag, Heart, 
  ArrowUpRight, Quote, ChevronLeft, ChevronRight,
  Heart as HeartIcon, Leaf, Award, Truck,
} from 'lucide-react';
import { featuredProducts, categories, testimonials } from '../data/products';

import heroSlide1 from '../assets/hero_slide_1.png';
import heroSlide2 from '../assets/hero_slide_2.png';
import heroSlide3 from '../assets/hero_slide_3.png';
import aboutProcess from '../assets/about_process.png';
import bgImage from '../assets/Demo Bg.png';
import testimonialsBg from '../assets/Testimonials.png';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// ========== MAIN HOMEPAGE ==========
const HomePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const heroImages = [heroSlide1, heroSlide2, heroSlide3];

  // Detect mobile for background-attachment fix (iOS doesn't support fixed)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Auto-advance testimonials on mobile
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: HeartIcon, title: 'Handcrafted with Love', description: 'Each toy is meticulously crafted by skilled artisans with attention to every stitch.' },
    { icon: Leaf, title: 'Eco-Friendly Materials', description: 'We use premium organic cotton and sustainable yarns for all our creations.' },
    { icon: Award, title: 'Premium Quality', description: 'Rigorous quality checks ensure every piece meets our high standards.' },
    { icon: Truck, title: 'Free Shipping', description: 'Complimentary shipping on all orders above Rs.999 across India.' },
  ];

  return (
    <main className="w-full relative overflow-x-hidden">

      {/* ========== HERO SECTION ========== */}
      <section
        id="home"
        className="relative w-full min-h-[500px] sm:min-h-[580px] lg:min-h-[700px] bg-[#1a1a5e] flex items-center overflow-hidden"
      >
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentHeroImage ? 1 : 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a5e]/95 via-[#1a1a5e]/75 to-[#1a1a5e]/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32 pt-28 sm:pt-36 lg:pt-48">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* Left: Text */}
            <div className="text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-4 sm:mb-6"
              >
                Handmade
                <br />
                <span className="text-[#c9a227]">Crochet</span> Magic
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-white/80 text-sm sm:text-base lg:text-lg max-w-sm sm:max-w-md mx-auto lg:mx-0 leading-relaxed"
              >
                Premium amigurumi toys & knitted soft toys crafted by skilled Indian artisans.
              </motion.p>
            </div>

            {/* Right: Floating Cards - Hidden on mobile/tablet */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block relative h-[380px] xl:h-[450px]"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-0 right-0 w-48 xl:w-56 h-64 xl:h-72 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20"
              >
                <img src={heroSlide1} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-white text-xs font-medium bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg">Teddy Bears</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-0 left-4 xl:left-8 w-44 xl:w-52 h-56 xl:h-64 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20"
              >
                <img src={heroSlide2} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-white text-xs font-medium bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg">Amigurumi</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 xl:w-48 h-52 xl:h-60 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 z-10"
              >
                <img src={heroSlide3} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-white text-xs font-medium bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg">Soft Toys</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-8 z-20 flex gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentHeroImage(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === currentHeroImage ? 'w-8 sm:w-10 bg-[#c9a227]' : 'w-3 sm:w-4 bg-white/40'}`}
            />
          ))}
        </div>
      </section>


      {/* ========== FIXED BACKGROUND WRAPPER ========== */}
      <div
        className="relative"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundAttachment: isMobile ? 'scroll' : 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/45 via-blue-50/75 to-white/85" />

        {/* ========== FEATURED PRODUCTS ========== */}
        <section id="products" className="relative z-10 w-full py-10 sm:py-14 lg:py-20">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-8 lg:mb-12"
            >
              <span className="text-[#c9a227] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase">Curated For You</span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a5e] mt-2">Featured Products</h2>
              <div className="w-14 sm:w-16 h-1 bg-[#c9a227] mx-auto mt-3 rounded-full" />
            </motion.div>

            {/* Products Grid: 1 col mobile, 2 col sm, 4 col lg */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
            >
              {featuredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={fadeInUp}
                  className="group bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-white/50"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-[#f0ebe3]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {product.badge && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#1a1a5e] text-white text-[9px] sm:text-[10px] font-bold rounded-full z-10">
                        {product.badge}
                      </span>
                    )}
                    <button
                      className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#1a1a5e] hover:text-white z-10"
                      aria-label="Add to wishlist"
                    >
                      <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </button>
                    <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                      <button className="w-full py-2 sm:py-2.5 bg-[#1a1a5e] text-white rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:bg-[#2a2a7e] transition-colors">
                        <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-2.5 sm:p-3 lg:p-4">
                    <span className="text-[9px] sm:text-[10px] text-[#6b6b6b] uppercase tracking-wider font-semibold">
                      {product.category}
                    </span>
                    <h3 className="font-display text-xs sm:text-sm lg:text-base font-bold text-[#1a1a5e] mt-0.5 mb-1.5 line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-0.5 sm:gap-1 mb-1.5 sm:mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${i < Math.floor(product.rating) ? 'text-[#c9a227] fill-[#c9a227]' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="text-[9px] sm:text-[10px] text-[#6b6b6b] ml-1">({product.rating})</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="text-sm sm:text-base font-bold text-[#1a1a5e]">Rs.{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-[10px] sm:text-xs text-[#6b6b6b] line-through">Rs.{product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mt-8 lg:mt-10"
            >
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#1a1a5e] text-[#1a1a5e] rounded-full font-bold text-sm hover:bg-[#1a1a5e] hover:text-white transition-all duration-300"
              >
                View All Products <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ========== CATEGORIES ========== */}
        <section id="categories" className="relative z-10 w-full py-10 sm:py-14 lg:py-20">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-8 lg:mb-12"
            >
              <span className="text-[#c9a227] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase">Browse By Type</span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a5e] mt-2">Our Collections</h2>
              <p className="text-[#6b6b6b] mt-3 max-w-xl mx-auto text-sm sm:text-base">
                From adorable amigurumi to cozy knitted soft toys, find the perfect handmade companion.
              </p>
            </motion.div>

            {/* Categories Grid: 1 col mobile, 2 col sm, 3 col lg */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
            >
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  variants={fadeInUp}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="group relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer aspect-[4/3] shadow-lg"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a5e]/95 via-[#1a1a5e]/40 to-transparent" />

                  <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end">
                    <span className="text-[#c9a227] text-xs font-bold mb-1">{category.count} Products</span>
                    <h3 className="font-display text-base sm:text-lg lg:text-xl font-bold text-white mb-1">{category.name}</h3>
                    <p className="text-white/80 text-xs mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{category.description}</p>
                    <div className="flex items-center gap-2 text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <span className="text-xs">Explore</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="absolute top-3 right-3 w-7 h-7 sm:w-8 sm:h-8 border border-white/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>

      {/* ========== ABOUT SECTION ========== */}
      <section id="about" className="relative z-10 w-full py-12 sm:py-16 lg:py-20 bg-white">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none"
            >
              <div className="relative aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <img src={aboutProcess} alt="Handmade crochet process" className="w-full h-full object-cover" loading="lazy" />
              </div>

              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -bottom-4 -right-3 sm:-right-4 lg:-right-8 bg-white p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl shadow-xl max-w-[160px] sm:max-w-[190px] z-10 border border-[#c9a227]/10"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#c9a227]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#c9a227] fill-[#c9a227]" />
                  </div>
                  <div>
                    <div className="font-display text-lg sm:text-xl font-bold text-[#1a1a5e]">100%</div>
                    <div className="text-[10px] sm:text-xs text-[#6b6b6b] font-medium">Handmade with Care</div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative border */}
              <div className="absolute -top-3 -left-3 w-16 h-16 sm:w-20 sm:h-20 border-2 border-[#c9a227]/30 rounded-2xl -z-10 hidden sm:block" />
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#c9a227] font-semibold text-xs tracking-[0.2em] uppercase">Our Story</span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1a5e] mt-2 mb-4 leading-tight">
                Crafting Joy, One Stitch at a Time
              </h2>
              <p className="text-[#6b6b6b] text-sm lg:text-base leading-relaxed mb-6 sm:mb-8">
                At Krishalaa, we believe in the magic of handmade. Our journey began with a simple crochet hook and a dream to bring warmth into every home. Today, we work with talented artisans across India to create exquisite amigurumi toys, crochet teddy bears, and knitted soft toys that become cherished companions.
              </p>

              {/* Features Grid: 1 col mobile, 2 col sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#1a1a5e]/5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <feature.icon className="w-4 h-4 text-[#1a1a5e]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1a1a5e] text-sm mb-0.5">{feature.title}</h4>
                      <p className="text-xs text-[#6b6b6b] leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-6 sm:mt-8"
              >
                <a
                  href="#products"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a5e] text-white rounded-full font-bold text-sm hover:bg-[#2a2a7e] transition-all duration-300"
                >
                  Explore Our Products <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="relative z-10 w-full py-12 sm:py-16 lg:py-20 overflow-hidden">

        {/* Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${testimonialsBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="absolute inset-0 z-0 bg-white/60" />

        <div className="w-full max-w-5xl sm:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10"
          >
            <span className="text-[#c9a227] font-semibold text-xs tracking-[0.2em] uppercase">Testimonials</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a5e] mt-2">
              What Our Customers Say
            </h2>
          </motion.div>

          {/* Testimonial Card */}
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/60 shadow-xl p-5 sm:p-8 lg:p-10"
              >
                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-center">

                  {/* User Info */}
                  <div className="lg:col-span-3 flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-0 w-full lg:w-auto">
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 border-[#c9a227] shadow-lg">
                        <img
                          src={testimonials[currentTestimonial].image}
                          alt={testimonials[currentTestimonial].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -inset-2 rounded-full border-2 border-dashed border-[#c9a227]/30 animate-spin" style={{ animationDuration: '10s' }} />
                    </div>
                    <div className="lg:mt-4">
                      <h4 className="text-[#1a1a5e] font-bold text-base sm:text-lg lg:text-xl">{testimonials[currentTestimonial].name}</h4>
                      <span className="text-[#c9a227] text-xs font-medium">Verified Buyer</span>
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c9a227] fill-[#c9a227]" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Divider - desktop only */}
                  <div className="hidden lg:block lg:col-span-1">
                    <div className="w-px h-32 bg-gradient-to-b from-transparent via-[#1a1a5e]/20 to-transparent mx-auto" />
                  </div>

                  {/* Quote */}
                  <div className="lg:col-span-8 text-center lg:text-left">
                    <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-[#c9a227]/30 mb-3 mx-auto lg:mx-0" />
                    <p className="text-[#1a1a5e]/90 font-display text-base sm:text-lg lg:text-xl xl:text-2xl italic leading-relaxed">
                      &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                    </p>
                    <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-[#c9a227] to-transparent mt-4 sm:mt-5 mx-auto lg:mx-0 rounded-full" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 sm:p-2.5 bg-white/80 backdrop-blur-sm border border-[#1a1a5e]/20 rounded-full text-[#1a1a5e] hover:bg-[#c9a227] hover:border-[#c9a227] hover:text-white transition-all duration-300 shadow-sm"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${i === currentTestimonial ? 'w-6 sm:w-8 bg-[#c9a227]' : 'w-2 bg-[#1a1a5e]/30 hover:bg-[#1a1a5e]/50'}`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 sm:p-2.5 bg-white/80 backdrop-blur-sm border border-[#1a1a5e]/20 rounded-full text-[#1a1a5e] hover:bg-[#c9a227] hover:border-[#c9a227] hover:text-white transition-all duration-300 shadow-sm"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
};

export default HomePage;