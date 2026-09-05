'use client'

import { Search, X, CornerDownLeft, ArrowDown, ArrowUp } from 'lucide-react'
import { Project } from '@/types/project'
import { useCommandPalette, PaletteItem } from '@/lib/hooks/useCommandPalette'
import { CommandPaletteItem } from '@/components/micro/CommandPaletteItem'

interface CommandPaletteProps {
  projects?: Project[]
  isOpen?: boolean
  onClose?: () => void
}

const EMPTY_PROJECTS: Project[] = []

export function CommandPalette({
  projects = EMPTY_PROJECTS,
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
}: CommandPaletteProps) {
  const {
    isOpen: internalIsOpen,
    query,
    setQuery,
    selectedIndex,
    setSelectedIndex,
    filteredItems,
    closePalette,
  } = useCommandPalette(projects)

  const isVisible = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const handleClose = controlledOnClose || closePalette

  if (!isVisible) return null

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(
        (prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length)
      )
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action()
        handleClose()
      }
    }
  }

  const groups: Record<string, PaletteItem[]> = {}
  filteredItems.forEach((item) => {
    if (!groups[item.group]) groups[item.group] = []
    groups[item.group].push(item)
  })

  let flatIndex = 0

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4"
      onClick={handleClose}
    >
      <div
        className="brutal-card bg-white border-2 border-black shadow-[6px_6px_0px_0px_#000] w-full max-w-xl rounded-xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b-2 border-black bg-zinc-50">
          <Search size={18} className="text-black shrink-0" />
          <input
            type="text"
            autoFocus
            aria-label="Command palette search input"
            placeholder="Type a command, project, or section..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm font-mono text-black placeholder:text-zinc-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close command palette"
            className="p-1 text-black hover:bg-zinc-200 rounded"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-4">
          {filteredItems.length === 0 ? (
            <div className="py-10 text-center text-xs font-mono text-zinc-500">
              No matching commands or projects found.
            </div>
          ) : (
            Object.entries(groups).map(([groupName, items]) => (
              <div key={groupName} className="space-y-1">
                <div className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                  {groupName}
                </div>
                {items.map((item) => {
                  const currentIndex = flatIndex++
                  return (
                    <CommandPaletteItem
                      key={item.id}
                      item={item}
                      isSelected={selectedIndex === currentIndex}
                      onSelect={() => {
                        item.action()
                        handleClose()
                      }}
                      onHover={() => setSelectedIndex(currentIndex)}
                    />
                  )
                })}
              </div>
            ))
          )}
        </div>

        <div className="px-4 py-2 bg-zinc-100 border-t-2 border-black flex items-center justify-between text-[10px] font-mono text-zinc-600">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <ArrowUp size={11} /><ArrowDown size={11} /> Navigate
            </span>
            <span className="flex items-center gap-1">
              <CornerDownLeft size={11} /> Select
            </span>
          </div>
          <span className="px-1.5 py-0.5 bg-white border border-black rounded shadow-[1px_1px_0px_0px_#000]">
            ESC Close
          </span>
        </div>
      </div>
    </div>
  )
}
