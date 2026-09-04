'use client'

import { useState, useEffect } from 'react'
import { Github, GitFork, Star, BookOpen } from 'lucide-react'

interface GitHubStats {
  public_repos: number
  followers: number
  avatar_url: string
}

export function GitHubWidget() {
  const [stats, setStats] = useState<GitHubStats>({
    public_repos: 18,
    followers: 6,
    avatar_url: 'https://avatars.githubusercontent.com/u/150073236?v=4',
  })

  useEffect(() => {
    fetch('https://api.github.com/users/DevIssa-It')
      .then((res) => res.json())
      .then((data) => {
        if (data.public_repos !== undefined) {
          setStats({
            public_repos: data.public_repos,
            followers: data.followers,
            avatar_url: data.avatar_url,
          })
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div className="brutal-card bg-emerald-100 p-5 flex flex-col justify-between h-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full border-2 border-black overflow-hidden bg-white shadow-[2px_2px_0px_0px_#000]">
            <img src={stats.avatar_url} alt="DevIssa GitHub avatar" width={40} height={40} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-black">DevIssa-It</h3>
            <span className="text-[11px] font-mono text-zinc-800 block">GitHub Live API</span>
          </div>
        </div>
        <Github size={20} className="text-black" />
      </div>

      <div className="grid grid-cols-2 gap-2 font-mono text-xs">
        <div className="bg-white border-2 border-black p-2 rounded-md shadow-[2px_2px_0px_0px_#000]">
          <span className="text-[10px] text-zinc-700 block">Repositories</span>
          <span className="font-bold text-base text-black">{stats.public_repos}</span>
        </div>
        <div className="bg-white border-2 border-black p-2 rounded-md shadow-[2px_2px_0px_0px_#000]">
          <span className="text-[10px] text-zinc-700 block">Followers</span>
          <span className="font-bold text-base text-black">{stats.followers}</span>
        </div>
      </div>

      <a
        href="https://github.com/DevIssa-It"
        target="_blank"
        rel="noopener noreferrer"
        className="brutal-btn bg-white hover:bg-zinc-50 text-black text-xs py-2 px-3 rounded-md text-center block"
      >
        View GitHub Profile
      </a>
    </div>
  )
}
