
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { assets } from "../Assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
       
        <div>
          <Image
            src={assets.logo_light}
            alt="Blog Logo"
            width={150}
            className="mb-4"
          />
          <p className="text-sm leading-relaxed">
            Discover insightful articles, tutorials, and stories on technology,
            design, and development. Stay inspired with us.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-amber-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-amber-400 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="hover:text-amber-400 transition">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-amber-400 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/category/technology" className="hover:text-amber-400">
                Technology
              </Link>
            </li>
            <li>
              <Link href="/category/design" className="hover:text-amber-400">
                Design
              </Link>
            </li>
            <li>
              <Link href="/category/tutorials" className="hover:text-amber-400">
                Tutorials
              </Link>
            </li>
            <li>
              <Link href="/category/startups" className="hover:text-amber-400">
                Startups
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Get in Touch
          </h3>
          <p className="text-sm mb-3">
            Email us at:
            <a
              href="mailto:hello@blog.com"
              className="text-amber-400 hover:underline ml-1"
            >
              hello@blog.com
            </a>
          </p>

          <div className="flex gap-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel=""
            >
              <Image
                src={assets.facebook_icon}
                alt="Facebook"
                width={32}
                height={32}
                className="hover:scale-110 transition"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={assets.twitter_icon}
                alt="Twitter"
                width={32}
                height={32}
                className="hover:scale-110 transition"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={assets.googleplus_icon} // Replace with LinkedIn icon if available
                alt="LinkedIn"
                width={32}
                height={32}
                className="hover:scale-110 transition"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-700 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Blog. All rights reserved.</p>
          <div className="flex gap-4 mt-3 sm:mt-0">
            <Link href="/privacy" className="hover:text-amber-400 transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-amber-400 transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
