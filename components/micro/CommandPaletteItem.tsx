'use client'

import { CornerDownLeft } from 'lucide-react'
import { PaletteItem } from '@/lib/hooks/useCommandPalette'

interface CommandPaletteItemProps {
  item: PaletteItem
  isSelected: boolean
  onSelect: () => void
  onHover: () => void
}

export function CommandPaletteItem({
  item,
  isSelected,
  onSelect,
  onHover,
}: CommandPaletteItemProps) {
  const Icon = item.icon

  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={onHover}
      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono flex items-center justify-between transition-all ${
        isSelected
          ? 'bg-black text-sky-300 font-bold shadow-[2px_2px_0px_0px_#000]'
          : 'text-black hover:bg-sky-50'
      }`}
    >
      <div className="flex items-center gap-2.5 truncate">
        <Icon size={15} className="shrink-0" />
        <span className="truncate">{item.title}</span>
        {item.subtitle && (
          <span
            className={`text-[10px] truncate ${
              isSelected ? 'text-sky-200' : 'text-zinc-500'
            }`}
          >
            {"//"} {item.subtitle}
          </span>
        )}
      </div>
      {isSelected && <CornerDownLeft size={13} className="shrink-0" />}
    </button>
  )
}
