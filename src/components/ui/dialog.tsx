"use client"

import * as React from "react"
import * as RadixDialog from "@radix-ui/react-dialog"

export function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </RadixDialog.Root>
  )
}

export function DialogTrigger({
  asChild = false,
  children,
}: {
  asChild?: boolean
  children: React.ReactNode
}) {
  return <RadixDialog.Trigger asChild={asChild}>{children}</RadixDialog.Trigger>
}

export function DialogContent({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />
      <RadixDialog.Content className={`fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background rounded-lg shadow-lg max-w-full w-full sm:w-auto outline-none ${className}`}>
        {children}
        <RadixDialog.Close asChild>
          <button className="absolute top-2 right-2 text-muted-foreground hover:text-foreground focus:outline-none" aria-label="Закрыть">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  )
}

export function DialogTitle({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <RadixDialog.Title className={className}>{children}</RadixDialog.Title>
  )
}
