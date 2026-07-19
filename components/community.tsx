"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Review = {
  id: string
  name: string
  role: string
  message: string
  date: string
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: "1",
    name: "Alex Johnson",
    role: "Software Engineer @ TechCorp",
    message: "Completing all 500 problems was the hardest but most rewarding thing I've done for my career. The curated list made sure I didn't waste time on irrelevant topics. Totally aced my system design and DSA rounds!",
    date: "2023-11-15",
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "Frontend Developer",
    message: "I used to struggle with dynamic programming, but pushing through the DP section here finally made it click. The interface is beautiful and kept me motivated every single day.",
    date: "2024-02-28",
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    role: "Student",
    message: "Just finished the 500th problem! It took me 6 months of consistent effort. For anyone starting out: don't give up. The patterns repeat and it gets easier.",
    date: "2024-05-10",
  },
]

export function Community() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS)
  const [solvedCount, setSolvedCount] = useState(0)
  const [mounted, setMounted] = useState(false)
  
  // Form State
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load from local storage
  useEffect(() => {
    // Load solved progress
    const savedSolved = localStorage.getItem("dsa-solved")
    if (savedSolved) {
      try {
        setSolvedCount(JSON.parse(savedSolved).length)
      } catch (e) {}
    }

    // Load custom reviews
    const savedReviews = localStorage.getItem("dsa-reviews")
    if (savedReviews) {
      try {
        const parsed = JSON.parse(savedReviews)
        setReviews([...INITIAL_REVIEWS, ...parsed])
      } catch (e) {}
    }

    setMounted(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !message) return

    setIsSubmitting(true)
    
    // Simulate network delay for UI feel
    setTimeout(() => {
      const newReview: Review = {
        id: Date.now().toString(),
        name,
        role: role || "DSA Challenger",
        message,
        date: new Date().toISOString().split("T")[0],
      }
      
      const newReviewsList = [...reviews, newReview]
      setReviews(newReviewsList)
      
      // Save only user generated ones
      const userReviews = newReviewsList.slice(INITIAL_REVIEWS.length)
      localStorage.setItem("dsa-reviews", JSON.stringify(userReviews))
      
      setName("")
      setRole("")
      setMessage("")
      setIsSubmitting(false)
    }, 600)
  }

  if (!mounted) return null

  const isEligible = solvedCount >= 500

  return (
    <section className="relative py-32 px-4 md:px-12 bg-[#050505]" id="community">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">05 — COMMUNITY</p>
        <h2 className="font-sans text-3xl md:text-5xl font-light italic">Wall of Fame</h2>
        <p className="mt-4 font-mono text-sm text-muted-foreground max-w-2xl">
          Hear from those who have conquered the 500 DSA challenge. Only those who have solved every single problem are immortalized here.
        </p>
      </motion.div>

      {/* Review Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        {reviews.map((review, idx) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm flex flex-col gap-4"
          >
            <p className="font-sans text-lg font-light italic text-white/90 leading-relaxed flex-1">
              "{review.message}"
            </p>
            <div className="pt-4 border-t border-white/10 flex justify-between items-end">
              <div>
                <p className="font-sans text-white/80">{review.name}</p>
                <p className="font-mono text-xs text-muted-foreground mt-1">{review.role}</p>
              </div>
              <span className="font-mono text-[10px] text-white/30">{review.date}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Review Form */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto border border-white/10 rounded-2xl p-8 bg-[#0d1117]"
      >
        <div className="text-center mb-8">
          <h3 className="font-sans text-3xl font-light mb-2">Leave Your Mark</h3>
          <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
            {isEligible 
              ? "You have completed the challenge. Write a review." 
              : `You must solve 500 problems. (Currently: ${solvedCount}/500)`}
          </p>
        </div>

        {isEligible ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-white/70 tracking-wider">NAME</label>
                <input 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-sans text-white placeholder:text-white/20 focus:outline-none focus:border-accent transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-white/70 tracking-wider">ROLE (OPTIONAL)</label>
                <input 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-sans text-white placeholder:text-white/20 focus:outline-none focus:border-accent transition-colors"
                  placeholder="e.g. Software Engineer"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs text-white/70 tracking-wider">YOUR EXPERIENCE</label>
              <textarea 
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-sans text-white placeholder:text-white/20 focus:outline-none focus:border-accent transition-colors min-h-[120px] resize-y custom-scrollbar"
                placeholder="How did solving these 500 problems help you?"
              />
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="mt-4 px-8 py-4 bg-white text-black font-mono text-xs tracking-widest uppercase rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Publish Review"}
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-white/10 rounded-lg bg-white/5">
            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-4 text-2xl">
              🔒
            </div>
            <p className="font-sans text-lg text-white/80 mb-2">Form Locked</p>
            <p className="font-mono text-xs text-muted-foreground max-w-sm">
              Keep solving! Come back here when you've reached 500 problems to leave your review on the wall of fame.
            </p>
            {/* Secret Dev Bypass Button */}
            <button 
              onClick={() => setSolvedCount(500)}
              className="mt-6 font-mono text-[10px] text-white/10 hover:text-white/30 transition-colors"
            >
              [Dev Bypass]
            </button>
          </div>
        )}
      </motion.div>
    </section>
  )
}
