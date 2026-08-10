import React from 'react'

import { cn } from '../../lib/utils'

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'flex min-h-30 w-full rounded-[1.25rem] border border-[hsl(var(--input))] bg-white/85 px-4 py-3 text-sm text-[hsl(var(--foreground))] shadow-sm transition-colors placeholder:text-[hsl(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
))
Textarea.displayName = 'Textarea'

export { Textarea }