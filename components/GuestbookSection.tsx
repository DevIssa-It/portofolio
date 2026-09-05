'use client'

import { useState } from 'react'
import { MessageSquarePlus, Quote, CheckCircle2, User } from 'lucide-react'
import Image from 'next/image'
import { useGuestbook } from '@/lib/hooks/useGuestbook'
import { SignGuestbookDialog } from '@/components/micro/SignGuestbookDialog'

export function GuestbookSection() {
  const { entries, loading, submitting, feedback, submitEntry, clearFeedback } = useGuestbook()
  const [openModal, setOpenModal] = useState(false)

  return (
    <section id="guestbook" className="py-20 border-b-2 border-black bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="brutal-badge inline-block bg-sky-300 text-black px-2.5 py-0.5 text-xs font-mono font-bold uppercase">
              {'// Social Proof & Recommendations'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-black uppercase tracking-tight">
              Peer Endorsements & Guestbook
            </h2>
            <p className="text-xs sm:text-sm font-mono text-zinc-600 max-w-xl">
              Real testimonials from engineering peers, teammates, and mentors. Read publicly or leave an endorsement.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="brutal-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-300 hover:bg-emerald-400 text-black text-xs font-mono font-bold border-2 border-black shadow-[3px_3px_0px_0px_#000] shrink-0"
          >
            <MessageSquarePlus size={15} /> Sign Guestbook
          </button>
        </div>

        {feedback && (
          <div className="p-3.5 bg-emerald-100 border-2 border-black text-emerald-950 rounded-lg text-xs font-mono font-bold flex items-center justify-between shadow-[2px_2px_0px_0px_#000]">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} />
              <span>{feedback.text}</span>
            </div>
            <button type="button" onClick={clearFeedback} className="underline text-[11px]">
              Dismiss
            </button>
          </div>
        )}

        {loading ? (
          <div className="p-8 text-center border-2 border-dashed border-black rounded-xl bg-white font-mono text-xs text-zinc-500">
            Loading endorsements...
          </div>
        ) : entries.length === 0 ? (
          <div className="p-8 text-center border-2 border-dashed border-black rounded-xl bg-white space-y-2">
            <p className="font-mono text-xs font-bold text-black uppercase">No endorsements published yet.</p>
            <p className="font-mono text-[11px] text-zinc-500">Be the first colleague or recruiter to leave a message!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="brutal-card bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl p-5 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      {entry.avatarUrl ? (
                        <Image
                          src={entry.avatarUrl}
                          alt={entry.name}
                          width={36}
                          height={36}
                          className="w-9 h-9 rounded-lg border-2 border-black object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-sky-200 border-2 border-black flex items-center justify-center font-mono font-bold text-xs text-black">
                          <User size={16} />
                        </div>
                      )}
                      <div>
                        <h3 className="text-xs font-black font-mono text-black leading-tight">
                          {entry.name}
                        </h3>
                        {entry.role && (
                          <p className="text-[10px] font-mono text-zinc-600 line-clamp-1">
                            {entry.role}
                          </p>
                        )}
                      </div>
                    </div>
                    <Quote size={16} className="text-zinc-400" />
                  </div>

                  <p className="text-xs font-mono text-zinc-800 leading-relaxed italic">
                    &ldquo;{entry.message}&rdquo;
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span>{entry.githubUsername ? `@${entry.githubUsername}` : 'Verified Peer'}</span>
                  <span>{new Date(entry.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <SignGuestbookDialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={submitEntry}
        submitting={submitting}
      />
    </section>
  )
}
