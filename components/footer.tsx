"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

export function Footer() {
  const [time, setTime] = useState("")
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, "0")
      const minutes = now.getMinutes().toString().padStart(2, "0")
      const seconds = now.getSeconds().toString().padStart(2, "0")
      const milliseconds = now.getMilliseconds().toString().padStart(3, "0")
      setTime(`${hours}:${minutes}:${seconds}.${milliseconds}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 10)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="relative">
      {/* Main CTA */}
      <motion.a
        href="#works"
        onClick={(e) => {
          e.preventDefault()
          document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' })
        }}
        data-cursor-hover
        className="relative block overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Curtain */}
        <motion.div
          className="absolute inset-0 bg-[#2563eb]"
          initial={{ y: "100%" }}
          animate={{ y: isHovered ? "0%" : "100%" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Content */}
        <div className="relative py-16 md:py-24 px-8 md:px-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.h2
              className="font-sans text-4xl md:text-6xl lg:text-8xl font-light tracking-tight text-center md:text-left"
              animate={{
                color: isHovered ? "#050505" : "#fafafa",
              }}
              transition={{ duration: 0.3 }}
            >
              Start <span className="italic">Solving</span>
            </motion.h2>

            <motion.div
              animate={{
                rotate: isHovered ? 45 : 0,
                color: isHovered ? "#050505" : "#fafafa",
              }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="w-12 h-12 md:w-16 md:h-16" />
            </motion.div>
          </div>
        </div>
      </motion.a>

      {/* Footer Info */}
      <div className="px-8 md:px-12 py-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Local Time */}
          <div className="font-mono text-xs tracking-widest text-muted-foreground">
            <span className="mr-2">LOCAL TIME</span>
            <span className="text-white tabular-nums">{time}</span>
          </div>

          {/* Links */}
          <div className="flex gap-8">
            {["LinkedIn", "GitHub", "Twitter"].map((platform) => (
              <button
                key={platform}
                onClick={(e) => {
                  e.preventDefault()
                  let solvedCount = 0
                  try {
                    const saved = localStorage.getItem("dsa-solved")
                    if (saved) {
                      solvedCount = JSON.parse(saved).length
                    }
                  } catch (err) {}

                  const repoUrl = "https://github.com/siddharth03015/500-Leetcode-Problem-Tracker-App"
                  const text = `I've just reached a milestone: ${solvedCount}/500 top DSA problems solved using the 500 DSA Tracker! 🚀`

                  let shareUrl = ""
                  if (platform === "LinkedIn") {
                    shareUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text + "\n\nCheck it out here: " + repoUrl)}`
                  } else if (platform === "Twitter") {
                    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(repoUrl)}`
                  } else if (platform === "GitHub") {
                    shareUrl = repoUrl
                  }

                  if (shareUrl) {
                    window.open(shareUrl, "_blank", "noopener,noreferrer")
                  }
                }}
                data-cursor-hover
                className="font-mono text-xs tracking-widest text-muted-foreground hover:text-white transition-colors duration-300"
              >
                {platform}
              </button>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-mono text-xs tracking-widest text-muted-foreground">© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}
