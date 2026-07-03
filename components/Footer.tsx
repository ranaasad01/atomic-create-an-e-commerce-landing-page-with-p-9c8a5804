"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Camera as Instagram, MessageCircle as Twitter, Code2 as Github, Mail, ArrowRight } from 'lucide-react';
import { brand, navLinks } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { useTranslations } from "next-intl";

const footerSections = [
  {
    titleKey: "footer.shop",
    links: [
      { labelKey: "footer.newArrivals", href: "#products" },
      { labelKey: "footer.bestsellers", href: "#products" },
      { labelKey: "footer.sale", href: "#products" },
      { labelKey: "footer.collections", href: "#categories" },
    ],
  },
  {
    titleKey: "footer.company",
    links: [
      { labelKey: "footer.about", href: "#about" },
      { labelKey: "footer.careers", href: "#about" },
      { labelKey: "footer.press", href: "#about" },
      { labelKey: "footer.sustainability", href: "#about" },
    ],
  },
  {
    titleKey: "footer.support",
    links: [
      { labelKey: "footer.contact", href: "#newsletter" },
      { labelKey: "footer.faq", href: "#newsletter" },
      { labelKey: "footer.shipping", href: "#newsletter" },
      { labelKey: "footer.returns", href: "#newsletter" },
    ],
  },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Mail, label: "Email", href: "#newsletter" },
];

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Top strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-2xl font-bold text-white tracking-tight">
              {brand.name}
            </p>
            <p className="text-sm text-slate-400 mt-1">{brand.tagline}</p>
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={getLinkHref(href)}
                onClick={(e) =>
                  handleAnchorClick(
                    e as React.MouseEvent<HTMLAnchorElement>,
                    href
                  )
                }
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={label}
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {/* Brand column */}
        <motion.div variants={fadeInUp} className="col-span-2 md:col-span-1">
          <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
            {t("footer.brandDesc")}
          </p>
          <Link
            href={getLinkHref("#products")}
            onClick={(e) => handleAnchorClick(e, "#products")}
            className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
          >
            {t("footer.browseAll")}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </motion.div>

        {/* Link columns */}
        {footerSections.map((section) => (
          <motion.div key={section.titleKey} variants={fadeInUp}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
              {t(section.titleKey)}
            </h3>
            <ul className="space-y-2.5">
              {section.links.map((link) => (
                <li key={link.labelKey}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            {t("footer.copyright", { year: "2025", brand: brand.name })}
          </p>
          <div className="flex items-center gap-4">
            {["footer.privacy", "footer.terms", "footer.cookies"].map((key) => (
              <Link
                key={key}
                href="#"
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
              >
                {t(key)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}