import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, GraduationCap } from "lucide-react"

interface EducationCardProps {
  degree: string
  institution: string
  location: string
  period: string
  gpa?: string
  description?: string
  achievements?: string[]
  status: "graduated" | "ongoing"
}

export function EducationCard({ 
  degree, 
  institution, 
  location, 
  period, 
  gpa, 
  description, 
  achievements, 
  status 
}: EducationCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <GraduationCap className="w-6 h-6 text-primary mt-1" />
            <div>
              <CardTitle className="text-xl">{degree}</CardTitle>
              <p className="text-lg font-semibold text-primary mt-1">{institution}</p>
            </div>
          </div>
          <Badge variant={status === "graduated" ? "default" : "secondary"}>
            {status === "graduated" ? "Graduated" : "Ongoing"}
          </Badge>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 text-sm text-muted-foreground ml-9">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {period}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {location}
          </div>
          {gpa && (
            <div className="font-medium text-foreground">
              GPA: {gpa}
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="ml-9">
        {description && (
          <p className="text-muted-foreground mb-4">{description}</p>
        )}
        
        {achievements && achievements.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Achievements:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}