"use client"

import { FaTelegramPlane, FaDiscord, FaTwitter, FaLinkedin } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="border-t border-white/20 glass-card">
      <div className="container mx-auto px-4 py-6">
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> */}
          {/* Logo & About */}
          {/* <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <img src="/chf-logo.png" alt="CHF.CH Logo" className="w-6 h-6 rounded-full" />
              </div>
              <span className="font-bold text-lg text-white">CHF.CH</span>
            </div>
            <p className="text-white text-sm">
              The premier Swiss Franc stablecoin exchange platform.
              Trade securely, transparently, and globally.
            </p>
          </div> */}

          {/* Trading */}
          {/* <div>
            <h4 className="font-semibold mb-3 text-white">Trading</h4>
            <ul className="space-y-2 text-sm text-white">
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Exchange
                </a>
              </li>
              <li>
                <a href="https://coinmarketcap.com/" className="hover:text-red-400 transition-colors">
                  Markets
                </a>
              </li>
            </ul>
          </div> */}

          {/* Support */}
          {/* <div>
            <h4 className="font-semibold mb-3 text-white">Support</h4>
            <ul className="space-y-2 text-sm text-white">
              <li>
                <a href="/help-center" className="hover:text-red-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-red-400 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div> */}

          {/* Legal */}
          {/* <div>
            <h4 className="font-semibold mb-3 text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-white">
              <li>
                <a href="/terms" className="hover:text-red-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-red-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/compliance" className="hover:text-red-400 transition-colors">
                  Compliance & Risk
                </a>
              </li>
            </ul>
          </div>
        </div> */}

        {/* Social + Copyright */}
        <div className=" border-white/20 mt-1 pt-1 flex flex-col md:flex-row items-center justify-between text-sm text-white">
          <p>&copy; 2025 CHF.CH Exchange. All rights reserved. | Regulated Swiss Stablecoin Platform</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://t.me/yourtelegram" target="_blank" rel="noreferrer" className="hover:text-red-400">
              <FaTelegramPlane size={18} />
            </a>
            <a href="https://discord.gg/yourdiscord" target="_blank" rel="noreferrer" className="hover:text-red-400">
              <FaDiscord size={18} />
            </a>
            <a href="https://twitter.com/yourtwitter" target="_blank" rel="noreferrer" className="hover:text-red-400">
              <FaTwitter size={18} />
            </a>
            {/* <a href="https://linkedin.com/company/yourlinkedin" target="_blank" rel="noreferrer" className="hover:text-red-400">
              <FaLinkedin size={18} />
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
