"use client"
import * as React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"
import { Modal } from "antd"

// Create context for the dialog state
type DialogContextType = {
  open: boolean
  setOpen: (open: boolean) => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

function useDialogContext() {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error("Dialog components must be used within a Dialog provider")
  }
  return context
}

// Main Dialog component
interface DialogProps {
  children: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Dialog({ children, open, onOpenChange }: DialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)

  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen

  const setOpen = (open: boolean) => {
    if (!isControlled) {
      setInternalOpen(open)
    }
    onOpenChange?.(open)
  }

  return <DialogContext.Provider value={{ open: isOpen, setOpen }}>{children}</DialogContext.Provider>
}

// Dialog Trigger
interface DialogTriggerProps {
  children: ReactNode
  asChild?: boolean
}

export function DialogTrigger({ children, asChild = false }: DialogTriggerProps) {
  const { open, setOpen } = useDialogContext()

  // Simple button approach - no cloneElement
  if (!asChild) {
    return (
      <button type="button" onClick={() => setOpen(true)}>
        {children}
      </button>
    )
  }

  // For asChild=true, we'll wrap the child in a div that handles the click
  return (
    <div onClick={() => setOpen(true)} style={{ display: "contents" }}>
      {children}
    </div>
  )
}

// Dialog Content
interface DialogContentProps {
  children: ReactNode
  className?: string
}

export function DialogContent({ children, className = "" }: DialogContentProps) {
  const { open, setOpen } = useDialogContext()

  return (
    <Modal open={open} onCancel={() => setOpen(false)} footer={null} width={500} className={className} centered>
      {children}
    </Modal>
  )
}

// Dialog Header
interface DialogHeaderProps {
  children: ReactNode
  className?: string
}

export function DialogHeader({ children, className = "" }: DialogHeaderProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>
}

// Dialog Title
interface DialogTitleProps {
  children: ReactNode
  className?: string
}

export function DialogTitle({ children, className = "" }: DialogTitleProps) {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>
}

// Dialog Description
interface DialogDescriptionProps {
  children: ReactNode
  className?: string
}

export function DialogDescription({ children, className = "" }: DialogDescriptionProps) {
  return <p className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}>{children}</p>
}

// Dialog Footer
interface DialogFooterProps {
  children: ReactNode
  className?: string
}

export function DialogFooter({ children, className = "" }: DialogFooterProps) {
  return <div className={`mt-6 flex justify-end gap-3 ${className}`}>{children}</div>
}
