"use client"

import { motion } from "framer-motion"
import { ProblemTracker } from "./problem-tracker"

export function Works() {
  return (
    <section className="relative py-32 px-4 md:px-12 md:py-24" id="works">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">04 — TOP PROBLEMS</p>
        <h2 className="font-sans text-3xl md:text-5xl font-light italic">The 500 DSA List</h2>
      </motion.div>

      {/* Problem Tracker */}
      <ProblemTracker />

      {/* Bottom Border */}
      <div className="border-t border-white/10 mt-16" />
    </section>
  )
}
