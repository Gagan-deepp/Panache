"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Dot } from "lucide-react"

const Input = React.forwardRef(({ className, type, label, ...props }, ref) => {
  const innerRef = React.useRef(null)
  const containerRef = React.useRef(null)
  const id = React.useId()
  const [isFocused, setIsFocused] = React.useState(false)
  const [hasValue, setHasValue] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)

  const handleFocus = () => {
    setIsFocused(true)
    innerRef.current?.focus()
  }

  const handleHover = (hovering) => {
    setIsHovered(hovering)
  }

  const handleBlur = (e) => {
    setIsFocused(false)
    setHasValue(e.target.value !== "")
  }

  const handleChange = (e) => setHasValue(e.target.value !== "")

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsFocused(false)
        if (!hasValue) {
          setHasValue(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [hasValue])

  React.useImperativeHandle(ref, () => innerRef.current)

  const showPlaceholder = isFocused || isHovered

  return (
    <div
      className="relative"
      ref={containerRef}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <input
        type={type}
        className={cn(
          "flex h-10 w-full border-b-2 border-black/50 focus:border-black-3 outline-none bg-transparent px-2 py-2 text-sm file:border-0 placeholder:opacity-0 file:bg-transparent file:text-sm file:font-medium transition-all duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-50",
          label && "pt-4",
          className,
        )}
        ref={innerRef}
        id={id}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        {...props}
      />
      <div
        className={cn(
          "absolute left-3 top-1/2 -translate-y-1/2 text-black-hover/30 pointer-events-none opacity-0 text-xs transition-all duration-300 ease-in-out",
          showPlaceholder && "opacity-100",
          isFocused && "opacity-0"
        )}
      >
        {props.placeholder}
      </div>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "absolute textColor left-3 top-1/2 -translate-y-1/2 startup-form_label transition-all duration-200 cursor-text flex items-center gap-1 origin-left ",
            (isFocused || hasValue || isHovered) && "top-2 -translate-y-full text-xs scale-[0.85] text-primary",
          )}
          onClick={handleFocus}
        >
          <Dot className="!text-bg_dot" />
          {label}
        </label>
      )}
    </div>
  )
})
Input.displayName = "Input"

export { Input }
