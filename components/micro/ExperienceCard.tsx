import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"

interface ExperienceCardProps {
  title: string
  company: string
  location: string
  period: string
  description: string
  technologies: string[]
  type: "work" | "internship" | "freelance"
}

export function ExperienceCard({ 
  title, 
  company, 
  location, 
  period, 
  description, 
  technologies, 
  type 
}: ExperienceCardProps) {
  const typeColors = {
    work: "bg-green-100 text-green-800",
    internship: "bg-blue-100 text-blue-800", 
    freelance: "bg-purple-100 text-purple-800"
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <p className="text-lg font-semibold text-primary mt-1">{company}</p>
          </div>
          <Badge className={typeColors[type]} variant="secondary">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {period}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {location}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}