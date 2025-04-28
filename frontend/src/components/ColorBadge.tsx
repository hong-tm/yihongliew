import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
      },
      color: {
        red: 'bg-red-100 border-red-200 text-red-800 dark:bg-red-800 dark:border-red-700 dark:text-red-100',
        orange:
          'bg-orange-100 border-orange-200 text-orange-800 dark:bg-orange-800 dark:border-orange-700 dark:text-orange-100',
        amber:
          'bg-amber-100 border-amber-200 text-amber-800 dark:bg-amber-800 dark:border-amber-700 dark:text-amber-100',
        yellow:
          'bg-yellow-100 border-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:border-yellow-700 dark:text-yellow-100',
        lime: 'bg-lime-100 border-lime-200 text-lime-800 dark:bg-lime-800 dark:border-lime-700 dark:text-lime-100',
        green:
          'bg-green-100 border-green-200 text-green-800 dark:bg-green-800 dark:border-green-700 dark:text-green-100',
        emerald:
          'bg-emerald-100 border-emerald-200 text-emerald-800 dark:bg-emerald-800 dark:border-emerald-700 dark:text-emerald-100',
        teal: 'bg-teal-100 border-teal-200 text-teal-800 dark:bg-teal-800 dark:border-teal-700 dark:text-teal-100',
        cyan: 'bg-cyan-100 border-cyan-200 text-cyan-800 dark:bg-cyan-800 dark:border-cyan-700 dark:text-cyan-100',
        sky: 'bg-sky-100 border-sky-200 text-sky-800 dark:bg-sky-800 dark:border-sky-700 dark:text-sky-100',
        blue: 'bg-blue-100 border-blue-200 text-blue-800 dark:bg-blue-800 dark:border-blue-700 dark:text-blue-100',
        indigo:
          'bg-indigo-100 border-indigo-200 text-indigo-800 dark:bg-indigo-800 dark:border-indigo-700 dark:text-indigo-100',
        violet:
          'bg-violet-100 border-violet-200 text-violet-800 dark:bg-violet-800 dark:border-violet-700 dark:text-violet-100',
        purple:
          'bg-purple-100 border-purple-200 text-purple-800 dark:bg-purple-800 dark:border-purple-700 dark:text-purple-100',
        fuchsia:
          'bg-fuchsia-100 border-fuchsia-200 text-fuchsia-800 dark:bg-fuchsia-800 dark:border-fuchsia-700 dark:text-fuchsia-100',
        pink: 'bg-pink-100 border-pink-200 text-pink-800 dark:bg-pink-800 dark:border-pink-700 dark:text-pink-100',
        rose: 'bg-rose-100 border-rose-200 text-rose-800 dark:bg-rose-800 dark:border-rose-700 dark:text-rose-100',
        neutral:
          'bg-neutral-100 border-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      color: 'none',
    },
  },
)

function ColorBadge({
  className,
  variant,
  color,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, color }), className)}
      {...props}
    />
  )
}

export { ColorBadge, badgeVariants }
