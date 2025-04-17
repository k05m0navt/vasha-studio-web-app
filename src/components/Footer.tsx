import Link from "next/link";
import { FaInstagram, FaTelegramPlane, FaVk, FaCamera } from "react-icons/fa";

const socials = [
  {
    href: "https://instagram.com/yourstudio",
    icon: <FaInstagram size={24} />,
    label: "Instagram",
  },
  {
    href: "https://t.me/yourstudio",
    icon: <FaTelegramPlane size={24} />,
    label: "Telegram",
  },
  { href: "https://vk.com/yourstudio", icon: <FaVk size={24} />, label: "VK" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-muted mt-12">
      <div className="max-w-6xl mx-auto flex flex-col gap-6 py-8 px-4 sm:px-6">
        <div className="flex items-center gap-2 justify-center mb-2">
          <FaCamera size={28} className="text-primary" />
          <span className="hidden sm:inline gap-2 text-xl font-bold tracking-tight text-primary">
            Vasha Studio
          </span>
        </div>
        <div className="flex gap-4 items-center justify-center">
          {socials.map((soc) => (
            <Link
              key={soc.href}
              href={soc.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={soc.label}
              className="hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
            >
              {soc.icon}
            </Link>
          ))}
        </div>
        <div className="text-sm text-muted-foreground text-center">
          {new Date().getFullYear()} Vasha Studio. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
