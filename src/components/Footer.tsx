"use client";

import { HiOutlineShieldCheck } from "react-icons/hi2";
import {
  FaLinkedinIn,
  FaYoutube,
  FaXTwitter,
  FaGithub,
} from "react-icons/fa6";
import { trackSocialClick } from "@/lib/analytics";

const socials = [
  { href: "https://www.linkedin.com/in/jatin39/", icon: FaLinkedinIn, label: "LinkedIn" },
  { href: "https://github.com/stark3998", icon: FaGithub, label: "GitHub" },
  { href: "https://www.youtube.com/channel/UCBr5dcWxXgJqptb3X6SmZdg", icon: FaYoutube, label: "YouTube" },
  { href: "https://twitter.com/jatumadan", icon: FaXTwitter, label: "Twitter" },
];

export default function Footer() {
  return (
    <footer className="border-t border-azure/10 bg-white/50 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <HiOutlineShieldCheck className="w-5 h-5 text-azure" />
            <span className="font-heading font-bold text-slate-dark tracking-tight">
              Jatin Madan
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocialClick(s.label.toLowerCase(), "footer")}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-azure-light/50 text-azure hover:bg-azure hover:text-white transition-all"
                aria-label={s.label}
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-slate-mid/60">
            © {new Date().getFullYear()} Jatin Madan. Built with 💙
          </p>
        </div>
      </div>
    </footer>
  );
}
