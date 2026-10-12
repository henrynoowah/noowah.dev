import type { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  from: "user" | "assistant"
}

export const Message = ({ className, from, ...props }: MessageProps) => (
  <div
    className={cn(
      "group flex w-full py-2",
      from === "user" ? "is-user justify-end" : "is-assistant justify-start",
      className
    )}
    {...props}
  />
)

export type MessageContentProps = HTMLAttributes<HTMLDivElement>

/** Visitor lines print inverted; the assistant's print as plain ink. */
export const MessageContent = ({
  children,
  className,
  ...props
}: MessageContentProps) => (
  <div
    className={cn(
      "flex max-w-[85%] flex-col gap-2 overflow-hidden text-[15px] leading-relaxed",
      "group-[.is-user]:bg-ink group-[.is-user]:px-3.5 group-[.is-user]:py-2.5 group-[.is-user]:text-paper",
      className
    )}
    {...props}
  >
    {children}
  </div>
)
