"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { PROBLEMS, type Problem } from "@/lib/problems"

export function ProblemTracker() {
  const [solved, setSolved] = useState<Set<number>>(new Set())
  const [mounted, setMounted] = useState(false)

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("dsa-solved")
    if (saved) {
      try {
        setSolved(new Set(JSON.parse(saved)))
      } catch (e) {
        console.error("Failed to parse solved problems", e)
      }
    }
    setMounted(true)
  }, [])

  const toggleSolved = (id: number) => {
    const newSolved = new Set(solved)
    if (newSolved.has(id)) {
      newSolved.delete(id)
    } else {
      newSolved.add(id)
    }
    setSolved(newSolved)
    localStorage.setItem("dsa-solved", JSON.stringify(Array.from(newSolved)))
  }

  if (!mounted) return null

  const totalProblems = PROBLEMS.length
  const solvedCount = solved.size
  const progressPercentage = Math.round((solvedCount / totalProblems) * 100) || 0

  const easyTotal = PROBLEMS.filter((p) => p.d === "Easy").length
  const easySolved = PROBLEMS.filter((p) => p.d === "Easy" && solved.has(p.n)).length
  
  const mediumTotal = PROBLEMS.filter((p) => p.d === "Medium").length
  const mediumSolved = PROBLEMS.filter((p) => p.d === "Medium" && solved.has(p.n)).length
  
  const hardTotal = PROBLEMS.filter((p) => p.d === "Hard").length
  const hardSolved = PROBLEMS.filter((p) => p.d === "Hard" && solved.has(p.n)).length

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 pb-32">
      {/* Progress Dashboard */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-white/10 rounded-xl bg-[#151b23]/50 backdrop-blur-sm"
      >
        <div className="md:col-span-1 flex flex-col justify-center">
          <div className="text-5xl font-light font-sans">
            <span className="text-white">{solvedCount}</span>
            <span className="text-muted-foreground text-3xl"> / {totalProblems}</span>
          </div>
          <div className="text-sm font-mono text-muted-foreground mt-2 uppercase tracking-widest">
            Problems Solved
          </div>
        </div>
        
        <div className="md:col-span-3 flex flex-col justify-center gap-4">
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-xs font-mono tracking-wider">
            <div className="flex flex-col gap-1">
              <span className="text-emerald-400">EASY</span>
              <span className="text-muted-foreground">{easySolved} / {easyTotal}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-yellow-500">MEDIUM</span>
              <span className="text-muted-foreground">{mediumSolved} / {mediumTotal}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-red-400">HARD</span>
              <span className="text-muted-foreground">{hardSolved} / {hardTotal}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Problem Table Header */}
      <div className="mt-8 border border-white/10 rounded-xl overflow-hidden bg-[#0d1117]/80 backdrop-blur-md">
        <div className="grid grid-cols-[60px_1fr_100px_100px_80px] gap-4 p-4 border-b border-white/10 text-xs font-mono text-muted-foreground tracking-widest uppercase">
          <div className="text-center">Status</div>
          <div>Title</div>
          <div className="text-right">Difficulty</div>
          <div className="text-right hidden sm:block">Acceptance</div>
          <div className="text-right">Action</div>
        </div>

        {/* Problem List */}
        <div className="max-h-[600px] overflow-y-auto custom-scrollbar" data-lenis-prevent="true">
          {PROBLEMS.map((problem, idx) => {
            const isSolved = solved.has(problem.n)
            
            return (
              <motion.div
                key={problem.n}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.5) }}
                className={`grid grid-cols-[60px_1fr_100px_100px_80px] gap-4 p-4 border-b border-white/5 items-center transition-colors hover:bg-white/5 ${
                  isSolved ? "bg-emerald-950/20" : ""
                }`}
              >
                <div className="flex justify-center">
                  <button 
                    onClick={() => toggleSolved(problem.n)}
                    className={`w-5 h-5 rounded-sm border flex items-center justify-center transition-all ${
                      isSolved 
                        ? "bg-emerald-500 border-emerald-500 text-white" 
                        : "border-white/20 hover:border-white/50 text-transparent"
                    }`}
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                </div>
                
                <div className="truncate">
                  <a 
                    href={`https://leetcode.com/problems/${problem.s}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-sans text-sm md:text-base hover:underline transition-colors ${
                      isSolved ? "text-emerald-400/80" : "text-white/90"
                    }`}
                  >
                    {problem.n}. {problem.t}
                  </a>
                </div>

                <div className="text-right">
                  <span className={`text-xs font-mono px-2 py-1 rounded bg-white/5 ${
                    problem.d === "Easy" ? "text-emerald-400" :
                    problem.d === "Medium" ? "text-yellow-500" :
                    "text-red-400"
                  }`}>
                    {problem.d}
                  </span>
                </div>

                <div className="text-right hidden sm:block font-mono text-xs text-muted-foreground">
                  {problem.a}%
                </div>

                <div className="text-right">
                  <a
                    href={`https://leetcode.com/problems/${problem.s}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-white/50 hover:text-white transition-colors"
                  >
                    Solve ↗
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
