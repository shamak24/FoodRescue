import { AlertTriangle } from 'lucide-react'

import { Button } from './ui/button'

export default function ErrorMessage({ title = 'Something went wrong', message, onRetry }) {
  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 p-5 text-red-900 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-full bg-red-100 p-2">
          <AlertTriangle className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-red-950">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-red-900/80">{message}</p>
          {onRetry ? (
            <Button type="button" variant="destructive" size="sm" className="mt-4" onClick={onRetry}>
              Try again
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}