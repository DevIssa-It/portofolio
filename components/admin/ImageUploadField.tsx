'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Image as ImageIcon, Upload } from 'lucide-react'

interface ImageUploadFieldProps {
  value: string
  imageFile: File | null
  onFileChange: (file: File | null, previewUrl: string) => void
  onUrlChange: (url: string) => void
}

export function ImageUploadField({
  value,
  imageFile,
  onFileChange,
  onUrlChange,
}: ImageUploadFieldProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      onFileChange(file, previewUrl)
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="image">Project Image *</Label>
      <div className="space-y-3">
        {/* File Upload Option */}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="w-full gap-2"
          >
            <Upload size={18} />
            {imageFile ? imageFile.name : 'Upload Image File'}
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-xs text-zinc-500">OR</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        {/* URL Input Option */}
        <div className="relative">
          <ImageIcon
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />
          <Input
            id="image"
            value={imageFile ? '' : value}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="pl-12"
            disabled={Boolean(imageFile)}
          />
        </div>

        {/* Image Preview */}
        {value && (
          <div className="relative w-full h-48 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800">
            <img
              src={value}
              alt="Project preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  )
}
