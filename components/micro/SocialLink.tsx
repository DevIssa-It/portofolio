import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SocialLinkProps {
  href: string
  icon: React.ReactNode
  label: string
  className?: string
}

export function SocialLink({ href, icon, label, className }: SocialLinkProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      asChild
      className={cn("hover:scale-110 transition-transform duration-200", className)}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        {icon}
      </a>
    </Button>
  )
}