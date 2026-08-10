import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import React from 'react'

import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-sm hover:translate-y-[-1px] hover:shadow-md',
        secondary: 'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/90',
        outline: 'border border-[hsl(var(--border))] bg-white/80 text-[hsl(var(--foreground))] hover:bg-white',
        ghost: 'text-[hsl(var(--foreground))] hover:bg-black/5',
        destructive: 'bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] hover:opacity-90',
        link: 'text-[hsl(var(--primary))] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-5',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'

  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
})
Button.displayName = 'Button'

export { Button, buttonVariants }