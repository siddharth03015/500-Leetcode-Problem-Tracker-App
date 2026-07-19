"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

const statements = [
  "Crack DSA by solving top 500 problems.",
  "Master Data Structures and Algorithms.",
  "Hand-picked Leetcode questions.",
  "Elevate your problem-solving skills.",
  "Ace your next technical interview.",
]

const features = [
  {
    title: "Curated Selection",
    description: "500 of the highest-yield LeetCode problems, hand-picked to cover every major pattern you'll face in interviews.",
    number: "01"
  },
  {
    title: "Track Progress",
    description: "Your progress is saved securely in your browser. Visualize your growth as you conquer easy, medium, and hard challenges.",
    number: "02"
  },
  {
    title: "Community Driven",
    description: "Join a wall of fame of dedicated engineers who have completed the challenge and left their mark on the community.",
    number: "03"
  }
]

export function About() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"])
  const smoothX = useSpring(x, { stiffness: 100, damping: 30 })

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden md:py-24" id="about">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-4 md:px-12 mb-0 py-20"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">03 — MISSION</p>
        <h2 className="font-sans text-3xl md:text-5xl font-light italic">Crack Top Leetcode Problems</h2>
      </motion.div>

      {/* Horizontal Scroll Container */}
      <div className="relative flex items-center overflow-hidden py-0 gap-0 h-16 mb-24">
        <motion.div style={{ x: smoothX }} className="flex gap-16 md:gap-24 px-4 md:px-12 whitespace-nowrap">
          {statements.map((statement, index) => (
            <motion.p
              key={index}
              className="text-4xl md:text-6xl lg:text-7xl font-sans font-light tracking-tight text-white/90"
              style={{
                WebkitTextStroke: index % 2 === 0 ? "none" : "1px rgba(255,255,255,0.3)",
                color: index % 2 === 0 ? "inherit" : "transparent",
              }}
            >
              {statement}
            </motion.p>
          ))}
        </motion.div>
      </div>

      {/* Detailed Info Grid */}
      <div className="px-4 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="flex flex-col gap-4 border-l border-white/10 pl-6"
          >
            <span className="font-mono text-xs text-accent">{feature.number}</span>
            <h3 className="font-sans text-2xl font-light">{feature.title}</h3>
            <p className="font-mono text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Decorative Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mt-24 mx-4 md:mx-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent origin-left"
      />
    </section>
  )
}

