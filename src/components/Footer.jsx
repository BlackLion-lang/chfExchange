"use client"

import { FaTelegramPlane, FaDiscord, FaTwitter, FaLinkedin } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="border-t border-white/20 glass-card">
      <div className="container mx-auto px-4 py-6">
        
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
