import { cn } from "@/lib/utils"

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section 
      id={id}
      className={cn("min-h-screen py-20 px-6 flex items-center", className)}
    >
      <div className="container mx-auto max-w-7xl w-full">
        {children}
      </div>
    </section>
  )
}