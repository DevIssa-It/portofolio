import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SkillCardProps {
  icon: React.ReactNode
  name: string
  level?: string
  className?: string
}

export function SkillCard({ icon, name, level, className }: SkillCardProps) {
  return (
    <Card className={cn("group hover:shadow-lg transition-all duration-300", className)}>
      <CardContent className="p-6 text-center">
        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="font-semibold text-lg mb-2">{name}</h3>
        {level && (
          <p className="text-sm text-muted-foreground">{level}</p>
        )}
      </CardContent>
    </Card>
  )
}