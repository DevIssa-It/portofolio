'use client'
import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'

export default function VisitorCounter() {
  const [visitors, setVisitors] = useState(0)

  useEffect(() => {
    // Get current count from localStorage
    const currentCount = parseInt(localStorage.getItem('visitorCount') || '1247')
    
    // Check if user has visited before
    const hasVisited = localStorage.getItem('hasVisited')
    
    if (!hasVisited) {
      // New visitor
      const newCount = currentCount + 1
      localStorage.setItem('visitorCount', newCount.toString())
      localStorage.setItem('hasVisited', 'true')
      setVisitors(newCount)
    } else {
      setVisitors(currentCount)
    }
  }, [])

  return (
    <div className="flex items-center gap-2 text-zinc-600 text-xs">
      <Eye size={14} />
      <span>{visitors.toLocaleString()} visitors</span>
    </div>
  )
}
