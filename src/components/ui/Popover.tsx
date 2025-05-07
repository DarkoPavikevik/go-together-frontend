"use client"

import React, { useState, createContext, useContext } from "react"
import { Popover as AntPopover } from "antd"

// Create a context to manage the popover state
type PopoverContextType = {
  open: boolean
  setOpen: (open: boolean) => void
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined)

// Main Popover component
interface PopoverProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Popover({ children, open, onOpenChange }: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false)

  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen

  const setOpen = (open: boolean) => {
    if (!isControlled) {
      setInternalOpen(open)
    }
    onOpenChange?.(open)
  }

  return <PopoverContext.Provider value={{ open: isOpen, setOpen }}>{children}</PopoverContext.Provider>
}

// PopoverTrigger component
interface PopoverTriggerProps {
  children: React.ReactNode
  asChild?: boolean
}

export function PopoverTrigger({ children, asChild = false }: PopoverTriggerProps) {
  const context = useContext(PopoverContext)
  if (!context) {
    throw new Error("PopoverTrigger must be used within a Popover")
  }

  const { setOpen } = context

  // If asChild is true and children is a valid element
  if (asChild && React.isValidElement(children)) {
    // Use a simpler approach - wrap the child in a div that handles the click
    return (
      <div onClick={() => setOpen(true)} style={{ display: "contents" }}>
        {children}
      </div>
    )
  }

  // Otherwise, wrap in a button
  return (
    <button type="button" onClick={() => setOpen(true)}>
      {children}
    </button>
  )
}

// PopoverContent component
interface PopoverContentProps {
  children: React.ReactNode
  className?: string
  align?: "start" | "center" | "end"
}

export function PopoverContent({ children, className = "", align = "center" }: PopoverContentProps) {
  const context = useContext(PopoverContext)
  if (!context) {
    throw new Error("PopoverContent must be used within a Popover")
  }

  const { open, setOpen } = context

  // Use Ant Design's Popover for the actual implementation
  return (
    <AntPopover
      open={open}
      onOpenChange={setOpen}
      content={<div className={className}>{children}</div>}
      trigger="click"
      placement={align === "start" ? "topLeft" : align === "end" ? "topRight" : "top"}
    >
      <div style={{ display: "none" }}></div>
    </AntPopover>
  )
}
