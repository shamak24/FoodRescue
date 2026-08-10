import { Loader2 } from 'lucide-react'

export default function LoadingSpinner({ label = 'Loading…', className = '' }) {
  return (
    <div className={`flex items-center gap-3 text-sm text-[hsl(var(--muted-foreground))] ${className}`}>
      <Loader2 className="h-4 w-4 animate-spin text-[hsl(var(--primary))]" />
      <span>{label}</span>
    </div>
  )
}