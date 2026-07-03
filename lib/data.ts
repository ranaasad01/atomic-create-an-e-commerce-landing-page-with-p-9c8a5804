export type NavLink = {
  label: string;
  href: string;
};

export type Brand = {
  name: string;
  tagline: string;
};

export const brand: Brand = {
  name: "Lumière",
  tagline: "Premium Goods, Curated for You",
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "#products" },
  { label: "Collections", href: "#categories" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#newsletter" },
];

export const navCTA = {
  label: "Shop Now",
  href: "#products",
};