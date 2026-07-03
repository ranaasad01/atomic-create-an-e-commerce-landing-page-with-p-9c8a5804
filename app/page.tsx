"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingBag, ArrowRight, Check, Heart, Truck, Shield, RefreshCw, Sparkles, ChevronRight } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { useTranslations } from "next-intl";

// ─── Inline Data ────────────────────────────────────────────────────────────

const featuredProducts = [
  {
    id: 1,
    name: "Silk Cashmere Throw",
    category: "Home & Living",
    price: 189,
    originalPrice: 240,
    rating: 4.9,
    reviews: 312,
    badge: "Bestseller",
    image: "https://picsum.photos/seed/675a7c24dc62/800/600",
    colors: ["#C4A882", "#8B7355", "#F5F0E8"],
  },
  {
    id: 2,
    name: "Matte Ceramic Vase Set",
    category: "Home & Living",
    price: 94,
    originalPrice: null,
    rating: 4.8,
    reviews: 187,
    badge: "New",
    image: "https://assets.weimgs.com/weimgs/rk/images/wcm/products/202620/0006/pure-white-matte-ceramic-vases-c.jpg",
    colors: ["#D4C5B0", "#A89880", "#6B5E4E"],
  },
  {
    id: 3,
    name: "Linen Relaxed Blazer",
    category: "Apparel",
    price: 265,
    originalPrice: 320,
    rating: 4.7,
    reviews: 428,
    badge: "Sale",
    image: "https://n.nordstrommedia.com/it/d19b05d7-a607-4134-953b-0de68a109c92.jpeg?w=780&h=1170&crop=pad",
    colors: ["#E8E0D5", "#B5A898", "#7A6E63"],
  },
  {
    id: 4,
    name: "Leather Card Wallet",
    category: "Accessories",
    price: 78,
    originalPrice: null,
    rating: 4.9,
    reviews: 654,
    badge: null,
    image: "https://www.popovleather.com/cdn/shop/files/leather-5-card-wallet-popov-leather-1174379443.jpg?v=1750466630",
    colors: ["#8B6914", "#3D2B1F", "#C4A882"],
  },
  {
    id: 5,
    name: "Merino Wool Scarf",
    category: "Accessories",
    price: 112,
    originalPrice: 145,
    rating: 4.8,
    reviews: 239,
    badge: "Sale",
    image: "https://arancrafts.com/wp-content/uploads/2016/06/1011-TRADITIONAL-MERINO-WOOL-HONEYCOMB-SCARF.jpg",
    colors: ["#D4C5B0", "#8B7355", "#4A3728"],
  },
  {
    id: 6,
    name: "Handcrafted Soy Candle",
    category: "Wellness",
    price: 48,
    originalPrice: null,
    rating: 5.0,
    reviews: 891,
    badge: "Top Rated",
    image: "https://thegiftgalashop.com/cdn/shop/products/amber-jar-soy-candle-handmade-soy-candles-soy-candle-thegiftgalashop-170915.jpg?v=1774114934",
    colors: ["#F5F0E8", "#E8D5B0", "#C4A882"],
  },
];

const categories = [
  {
    id: 1,
    name: "Apparel",
    count: 142,
    image: "http://www.apparelentrepreneurship.com/wp-content/uploads/2019/04/apparel_entrepreneurship_what_your_clothing_brand_needs_to_stay_relevant_2019.jpg",
    description: "Refined wardrobe essentials",
  },
  {
    id: 2,
    name: "Home & Living",
    count: 98,
    image: "http://www.apparelentrepreneurship.com/wp-content/uploads/2019/04/apparel_entrepreneurship_what_your_clothing_brand_needs_to_stay_relevant_2019.jpg",
    description: "Curated for your sanctuary",
  },
  {
    id: 3,
    name: "Accessories",
    count: 76,
    image: "https://media.designcafe.com/wp-content/uploads/2020/12/21184029/living-room-furniture-decor-ideas.jpg",
    description: "The finishing touch",
  },
  {
    id: 4,
    name: "Wellness",
    count: 54,
    image: "https://cdn.shopify.com/s/files/1/0281/3837/3173/files/dressbarn_Rich_Media_Blog_2_Types_of_Accessories_Header_600x600.jpg?v=1629829475",
    description: "Rituals for the senses",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Margot Delacroix",
    location: "Paris, France",
    rating: 5,
    text: "The quality of every piece I have ordered from Lumière is extraordinary. The cashmere throw arrived beautifully packaged and feels even more luxurious than described.",
    product: "Silk Cashmere Throw",
    avatar: "https://pbs.twimg.com/profile_images/1359693959400992770/Q0nqVgqZ_400x400.jpg",
  },
  {
    id: 2,
    name: "James Whitfield",
    location: "London, UK",
    rating: 5,
    text: "I have been searching for a linen blazer that actually fits well and looks polished. Lumière delivered exactly that. The attention to detail in the stitching is remarkable.",
    product: "Linen Relaxed Blazer",
    avatar: "https://simons.berkeley.edu/sites/default/files/styles/post_card_lg_2x/public/jdw_by_jg.jpg?h=711cf4df&itok=qFEhXVtC",
  },
  {
    id: 3,
    name: "Aiko Tanaka",
    location: "Tokyo, Japan",
    rating: 5,
    text: "The ceramic vase set transformed my living room. Each piece has a subtle variation that makes them feel truly handcrafted. Shipping was fast and packaging was impeccable.",
    product: "Matte Ceramic Vase Set",
    avatar: "https://i.redd.it/joc4uvudpnf91.jpg",
  },
];

const valueProps = [
  {
    icon: Truck,
    title: "Free Worldwide Shipping",
    description: "Complimentary delivery on all orders over $150, shipped with care to over 60 countries.",
  },
  {
    icon: Shield,
    title: "Authenticity Guaranteed",
    description: "Every product is verified for quality and craftsmanship before it reaches your door.",
  },
  {
    icon: RefreshCw,
    title: "30-Day Returns",
    description: "Not completely satisfied? Return any item within 30 days for a full, no-questions refund.",
  },
  {
    icon: Sparkles,
    title: "Curated Selection",
    description: "Our team of experts hand-picks every item so you only see the finest goods available.",
  },
];

const stats = [
  { value: "40K+", label: "Happy Customers" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "370+", label: "Premium Products" },
  { value: "60+", label: "Countries Served" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-slate-500 font-medium">
        {rating.toFixed(1)} ({count})
      </span>
    </div>
  );
}

function ProductCard({ product, index }: { product: typeof featuredProducts[0]; index: number }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] border border-black/5 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/5] bg-slate-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
              product.badge === "Sale"
                ? "bg-rose-500 text-white"
                : product.badge === "New"
                ? "bg-indigo-600 text-white"
                : product.badge === "Top Rated"
                ? "bg-amber-500 text-white"
                : "bg-slate-900 text-white"
            }`}
          >
            {product.badge}
          </span>
        )}
        {/* Wishlist */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setWished((w) => !w)}
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-black/5 flex items-center justify-center shadow-sm transition-all duration-200 hover:bg-white"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              wished ? "fill-rose-500 text-rose-500" : "text-slate-400"
            }`}
          />
        </motion.button>
        {/* Color swatches */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {product.colors.map((color, i) => (
            <span
              key={i}
              className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <p className="text-xs font-medium text-indigo-600 uppercase tracking-wider">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-slate-900 leading-snug">
          {product.name}
        </h3>
        <StarRating rating={product.rating} count={product.reviews} />
        <div className="flex items-center gap-2 mt-auto pt-1">
          <span className="text-base font-bold text-slate-900">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-slate-400 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleAdd}
          className={`mt-1 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
            added
              ? "bg-emerald-500 text-white"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              Added
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              Add to Bag
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center bg-[#FAF8F5]">
        {/* Subtle radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-indigo-100/60 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-50/80 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full w-fit"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Summer Collection 2025
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05] text-balance"
            >
              Goods Worth
              <br />
              <span className="text-indigo-600">Keeping.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-600 leading-relaxed max-w-md text-pretty"
            >
              Lumière brings together the world's finest artisans and makers.
              Every piece is chosen for its craft, longevity, and quiet
              elegance.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <motion.a
                href="#products"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-300 shadow-[0_4px_14px_rgba(99,102,241,0.35)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.45)]"
              >
                Shop the Collection
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#about"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 text-slate-700 font-semibold px-5 py-3.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-white transition-all duration-300"
              >
                Our Story
                <ChevronRight className="w-4 h-4" />
              </motion.a>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-200"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-2xl font-bold text-slate-900 tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right image collage */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:grid grid-cols-2 gap-4 h-[560px]"
          >
            <motion.div
              variants={scaleIn}
              className="col-span-1 row-span-2 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-black/5"
            >
              <img
                src="https://images.squarespace-cdn.com/content/v1/527877e1e4b0d495e4b9f61d/1416344479470-7L8LWQZTNQ37QROU5U4R/image-asset.jpeg"
                alt="Lumière curated collection"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              variants={scaleIn}
              className="rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.10)] border border-black/5"
            >
              <img
                src="https://thegiftgalashop.com/cdn/shop/products/amber-jar-soy-candle-handmade-soy-candles-soy-candle-thegiftgalashop-170915.jpg?v=1774114934"
                alt="Handcrafted soy candle"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              variants={scaleIn}
              className="rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.10)] border border-black/5"
            >
              <img
                src="https://assets.weimgs.com/weimgs/rk/images/wcm/products/202620/0006/pure-white-matte-ceramic-vases-c.jpg"
                alt="Matte ceramic vase"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section id="categories" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-12"
          >
            <motion.div variants={fadeInUp} className="flex flex-col gap-3 max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
                Browse by Category
              </span>
              <h2 className="text-4xl font-bold tracking-tight text-slate-900 text-balance">
                Find Your Perfect Collection
              </h2>
              <p className="text-slate-500 leading-relaxed">
                From refined apparel to artisan home goods, every category is
                curated with the same commitment to quality.
              </p>
            </motion.div>

            {/* Asymmetric grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat, i) => (
                <motion.a
                  key={cat.id}
                  href="#products"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  variants={scaleIn}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className={`group relative overflow-hidden rounded-2xl border border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] cursor-pointer ${
                    i === 0 ? "lg:col-span-2 aspect-[16/9]" : "aspect-square"
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <p className="text-white font-bold text-lg leading-tight">
                      {cat.name}
                    </p>
                    <p className="text-white/70 text-sm mt-0.5">
                      {cat.description}
                    </p>
                    <p className="text-indigo-300 text-xs font-medium mt-1">
                      {cat.count} items
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section id="products" className="py-24 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-12"
          >
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
            >
              <div className="flex flex-col gap-3 max-w-xl">
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
                  Featured Products
                </span>
                <h2 className="text-4xl font-bold tracking-tight text-slate-900 text-balance">
                  Handpicked for This Season
                </h2>
                <p className="text-slate-500 leading-relaxed">
                  Our editors select the finest pieces each season. These are
                  the items worth adding to your life.
                </p>
              </div>
              <motion.a
                href="#categories"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#categories")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 border border-indigo-200 hover:border-indigo-300 px-5 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap bg-white"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5"
            >
              {featuredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Value Props ── */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {valueProps.map((vp) => {
              const Icon = vp.icon;
              return (
                <motion.div
                  key={vp.title}
                  variants={fadeInUp}
                  className="flex flex-col gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-sm font-bold text-slate-900">
                      {vp.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {vp.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── About / Brand Story ── */}
      <section id="about" className="py-24 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-black/5">
                <img
                  src="https://lumierecreation.com/cdn/shop/files/cutting.jpg?v=1744649523&width=3840"
                  alt="Artisan craftsmanship at Lumière"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-black/5 flex flex-col gap-1"
              >
                <span className="text-3xl font-bold text-slate-900">12+</span>
                <span className="text-sm text-slate-500 font-medium">
                  Years of Curation
                </span>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Copy side */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-6"
            >
              <motion.span
                variants={fadeInUp}
                className="text-xs font-semibold uppercase tracking-widest text-indigo-600"
              >
                Our Story
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="text-4xl font-bold tracking-tight text-slate-900 leading-tight text-balance"
              >
                Crafted with Intention. Chosen with Care.
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-slate-600 leading-relaxed text-pretty"
              >
                Lumière was founded on a simple belief: that the objects we
                surround ourselves with should be beautiful, durable, and made
                by people who care. We travel the world to find artisans who
                share that philosophy.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-slate-600 leading-relaxed text-pretty"
              >
                From a family-run ceramics studio in Kyoto to a heritage
                leather workshop in Florence, every maker in our network is
                chosen for their commitment to craft over convenience. We
                believe in slow goods for a fast world.
              </motion.p>
              <motion.ul
                variants={staggerContainer}
                className="flex flex-col gap-3 pt-2"
              >
                {[
                  "Ethically sourced from 30+ countries",
                  "Carbon-neutral shipping on every order",
                  "1% of revenue donated to artisan communities",
                ].map((point) => (
                  <motion.li
                    key={point}
                    variants={fadeInUp}
                    className="flex items-center gap-3 text-sm text-slate-700 font-medium"
                  >
                    <span className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-indigo-600" />
                    </span>
                    {point}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.a
                variants={fadeInUp}
                href="#products"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-300 w-fit mt-2"
              >
                Explore the Collection
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-12"
          >
            <motion.div variants={fadeInUp} className="flex flex-col gap-3 max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                Customer Stories
              </span>
              <h2 className="text-4xl font-bold tracking-tight text-white text-balance">
                Loved by People Who Value Quality
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid md:grid-cols-3 gap-6"
            >
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className={`flex flex-col gap-5 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm ${
                    i === 1 ? "md:mt-6" : ""
                  }`}
                >
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm text-pretty">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 flex-shrink-0 bg-slate-700">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{t.name}</p>
                      <p className="text-slate-500 text-xs">{t.location}</p>
                    </div>
                    <span className="ml-auto text-xs text-indigo-400 font-medium bg-indigo-400/10 px-2.5 py-1 rounded-full border border-indigo-400/20">
                      {t.product}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section id="newsletter" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative overflow-hidden rounded-3xl bg-indigo-600 px-8 py-16 md:px-16 md:py-20 flex flex-col lg:flex-row items-center justify-between gap-10"
          >
            {/* Background texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-indigo-400/30 blur-2xl" />
            </div>

            <motion.div
              variants={slideInLeft}
              className="relative flex flex-col gap-4 max-w-lg"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-200">
                Stay in the Loop
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight text-balance">
                New Arrivals, Early Access, and Members-Only Offers.
              </h2>
              <p className="text-indigo-200 leading-relaxed text-pretty">
                Join over 40,000 discerning shoppers who receive our curated
                picks and exclusive discounts before anyone else.
              </p>
            </motion.div>

            <motion.div
              variants={slideInRight}
              className="relative w-full lg:w-auto lg:min-w-[380px]"
            >
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-3 bg-white/10 border border-white/20 rounded-2xl p-8 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white font-bold text-lg">You are in.</p>
                  <p className="text-indigo-200 text-sm">
                    Welcome to the Lumière community. Watch your inbox for
                    something special.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/15 transition-all duration-200"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3.5 bg-white text-indigo-600 font-bold text-sm rounded-xl hover:bg-indigo-50 transition-all duration-200 whitespace-nowrap shadow-[0_4px_14px_rgba(0,0,0,0.15)]"
                  >
                    Subscribe
                  </motion.button>
                </form>
              )}
              <p className="text-indigo-300 text-xs mt-3 text-center">
                No spam, ever. Unsubscribe at any time.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}