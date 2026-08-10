import React from 'react'

import { cn } from '../../lib/utils'

const badgeVariants = {
  default: 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]',
  secondary: 'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]',
  outline: 'border border-[hsl(var(--border))] bg-white/85 text-[hsl(var(--foreground))]',
  success: 'bg-emerald-100 text-emerald-900',
  warning: 'bg-amber-100 text-amber-900',
  destructive: 'bg-red-100 text-red-800',
  muted: 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]',
}

const Badge = React.forwardRef(({ className, variant = 'default', ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      'inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase',
      badgeVariants[variant] ?? badgeVariants.default,
      className,
    )}
    {...props}
  />
))
Badge.displayName = 'Badge'

export { Badge }