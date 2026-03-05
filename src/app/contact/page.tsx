import { Metadata } from "next";
import {
  FaLinkedinIn,
  FaYoutube,
  FaXTwitter,
  FaGithub,
} from "react-icons/fa6";
import { HiOutlineEnvelope, HiOutlineShieldCheck } from "react-icons/hi2";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jatinmadan.com";

export const metadata: Metadata = {
  title: "Contact — Jatin Madan",
  description: "Get in touch with Jatin Madan for Azure cloud architecture, security consulting, and collaboration.",
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
  openGraph: {
    title: "Contact — Jatin Madan",
    description: "Get in touch with Jatin Madan for Azure cloud architecture, security consulting, and collaboration.",
    url: `${baseUrl}/contact`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: "Jatin Madan - Contact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Jatin Madan",
    description: "Get in touch with Jatin Madan for Azure cloud architecture, security consulting, and collaboration.",
    images: [`${baseUrl}/og-image.svg`],
  },
};

const socials = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/jatin39/",
    icon: FaLinkedinIn,
    color: "bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white",
    description: "Connect professionally",
  },
  {
    name: "GitHub",
    href: "https://github.com/stark3998",
    icon: FaGithub,
    color: "bg-slate-100 text-slate-700 hover:bg-slate-800 hover:text-white",
    description: "View my repositories",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCBr5dcWxXgJqptb3X6SmZdg",
    icon: FaYoutube,
    color: "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white",
    description: "Watch tutorials & talks",
  },
  {
    name: "X (Twitter)",
    href: "https://twitter.com/jatumadan",
    icon: FaXTwitter,
    color: "bg-slate-100 text-slate-700 hover:bg-black hover:text-white",
    description: "Follow for updates",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="max-w-xl">
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-slate-dark section-heading">
            Get in Touch
          </h1>
          <p className="mt-6 text-lg text-slate-mid leading-relaxed">
            Interested in cloud architecture, identity security, or AI platform
            engineering? Let&apos;s connect.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {/* Social Links */}
          <div className="space-y-4">
            <h2 className="font-heading font-semibold text-lg text-slate-dark flex items-center gap-2">
              <HiOutlineShieldCheck className="w-5 h-5 text-azure" />
              Connect
            </h2>
            <div className="space-y-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-4 flex items-center gap-4 group hover:border-azure/25"
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${social.color}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-slate-dark group-hover:text-azure transition-colors">
                      {social.name}
                    </p>
                    <p className="text-xs text-slate-mid">{social.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Email card */}
          <div className="space-y-4">
            <h2 className="font-heading font-semibold text-lg text-slate-dark flex items-center gap-2">
              <HiOutlineEnvelope className="w-5 h-5 text-azure" />
              Email
            </h2>
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-azure-light flex items-center justify-center mx-auto mb-4">
                <HiOutlineEnvelope className="w-8 h-8 text-azure" />
              </div>
              <p className="text-slate-mid text-sm leading-relaxed mb-6">
                For professional inquiries, consulting opportunities, or
                speaking engagements.
              </p>
              <a
                href="mailto:jatinmadan39@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-azure text-white font-medium text-sm hover:bg-azure-dark transition-colors shadow-lg shadow-azure/20"
              >
                <HiOutlineEnvelope className="w-4 h-4" />
                Send an Email
              </a>
            </div>

            {/* Quick facts */}
            <div className="glass-card p-6">
              <h3 className="font-heading font-semibold text-sm text-slate-dark mb-3">
                Quick Facts
              </h3>
              <div className="space-y-2 text-sm text-slate-mid">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-azure" />
                  Based in India
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                  Working at Deloitte USI
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-azure" />
                  11× Microsoft Certified
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                  Open to speaking engagements
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
