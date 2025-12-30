import Link from "next/link"
import { cn } from "@/lib/utils"

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function NavLink({ href, children, className, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-foreground hover:text-primary transition-colors duration-200 font-medium",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}