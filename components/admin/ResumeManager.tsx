'use client'

import { FileText, Upload, CheckCircle2, AlertCircle, ExternalLink, Loader2, RefreshCw } from 'lucide-react'
import { useResumeManager } from '@/lib/hooks/useResumeManager'

export function ResumeManager() {
  const {
    meta,
    selectedFile,
    loading,
    fetching,
    message,
    fileInputRef,
    fetchMeta,
    handleFileChange,
    handleUpload,
  } = useResumeManager()

  const formatSize = (bytes: number) => {
    if (!bytes) return '0 KB'
    return bytes > 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(2)} MB` : `${(bytes / 1024).toFixed(1)} KB`
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Not available'
    return new Date(dateStr).toLocaleString('en-US', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    })
  }

  const previewUrl = meta?.path
    ? `${meta.path}${meta.path.includes('?') ? '&' : '?'}t=${meta.updatedAt ? new Date(meta.updatedAt).getTime() : Date.now()}`
    : `/api/resume?download=true&t=${Date.now()}`

  return (
    <div className="space-y-6">
      {message && (
        <div className={`p-3 border-2 border-black rounded-lg text-xs font-mono font-bold flex items-center gap-2 shadow-[2px_2px_0px_0px_#000] ${
          message.type === 'success' ? 'bg-emerald-100 text-emerald-950' : 'bg-red-100 text-red-950'
        }`}>
          {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="brutal-card bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b-2 border-black/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-sky-100 border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_#000]">
                <FileText size={18} />
              </div>
              <div>
                <h3 className="text-sm font-black font-mono text-black uppercase">Active CV Document</h3>
                <p className="text-[11px] font-mono text-zinc-600">Public file downloaded by visitors</p>
              </div>
            </div>
            <span className="brutal-badge bg-emerald-300 text-black px-2 py-0.5 text-[10px] font-mono font-bold uppercase">
              {meta?.exists ? 'Live' : 'Missing'}
            </span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <div className="flex justify-between py-1 border-b border-zinc-100">
              <span className="text-zinc-500">File Name</span>
              <span className="font-bold text-black">{meta?.filename || 'resume.pdf'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-zinc-100">
              <span className="text-zinc-500">File Size</span>
              <span className="font-bold text-black">{meta ? formatSize(meta.size) : '...'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-zinc-100">
              <span className="text-zinc-500">Last Modified</span>
              <span className="font-bold text-black">{meta ? formatDate(meta.updatedAt) : '...'}</span>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-btn inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-200 hover:bg-sky-300 text-black text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000]"
            >
              <ExternalLink size={14} /> Preview Live PDF
            </a>
            <button
              type="button"
              suppressHydrationWarning
              onClick={fetchMeta}
              disabled={fetching}
              className="brutal-btn inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-zinc-100 text-black text-xs font-mono font-bold border-2 border-black"
            >
              <RefreshCw size={13} className={fetching ? 'animate-spin' : ''} /> Refresh
            </button>
          </div>
        </div>

        <div className="brutal-card bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl p-6 space-y-4">
          <div className="pb-3 border-b-2 border-black/10">
            <h3 className="text-sm font-black font-mono text-black uppercase">Upload New Version</h3>
            <p className="text-[11px] font-mono text-zinc-600">Replaces active CV document immediately</p>
          </div>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-black rounded-lg p-6 text-center cursor-pointer bg-sky-50/50 hover:bg-sky-100/60 transition-colors"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <Upload size={24} className="mx-auto text-black mb-2" />
            <p className="text-xs font-mono font-bold text-black">
              {selectedFile ? selectedFile.name : 'Click to select a new PDF file'}
            </p>
            <p className="text-[10px] font-mono text-zinc-500 mt-1">
              {selectedFile ? `${formatSize(selectedFile.size)} • Ready to upload` : 'PDF format up to 15MB'}
            </p>
          </div>

          <button
            type="button"
            suppressHydrationWarning
            onClick={handleUpload}
            disabled={!selectedFile || loading}
            className="brutal-btn w-full py-2.5 rounded-lg bg-black text-sky-300 disabled:opacity-40 font-mono font-bold text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                <span>Uploading & Replacing...</span>
              </>
            ) : (
              <>
                <Upload size={15} />
                <span>Deploy New CV</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
