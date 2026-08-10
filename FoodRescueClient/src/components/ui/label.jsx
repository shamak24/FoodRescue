import * as LabelPrimitive from '@radix-ui/react-label'
import React from 'react'

import { cn } from '../../lib/utils'

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn('text-sm font-semibold leading-none text-[hsl(var(--foreground))]', className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }