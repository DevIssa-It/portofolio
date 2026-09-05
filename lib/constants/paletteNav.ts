import {
  Compass,
  FolderKanban,
  BookOpen,
  Mail,
  Download,
  Github,
  Linkedin,
  Lock,
  LucideIcon,
} from 'lucide-react'

export interface StaticPaletteAction {
  id: string
  title: string
  subtitle: string
  group: 'Navigation' | 'Actions'
  icon: LucideIcon
  type: 'scroll' | 'cv' | 'email' | 'github' | 'linkedin' | 'admin'
  target?: string
}

export const STATIC_PALETTE_ACTIONS: StaticPaletteAction[] = [
  {
    id: 'nav-overview',
    title: 'Go to Overview / Hero',
    subtitle: 'Main introductory banner',
    group: 'Navigation',
    icon: Compass,
    type: 'scroll',
    target: 'hero',
  },
  {
    id: 'nav-bento',
    title: 'Go to Bento Hub',
    subtitle: 'Bio, terminal, and live stats',
    group: 'Navigation',
    icon: Compass,
    type: 'scroll',
    target: 'bento',
  },
  {
    id: 'nav-projects',
    title: 'Go to Works & Repositories',
    subtitle: 'Production applications & open source',
    group: 'Navigation',
    icon: FolderKanban,
    type: 'scroll',
    target: 'projects',
  },
  {
    id: 'nav-journey',
    title: 'Go to Career Journey',
    subtitle: 'Formal education & internship milestones',
    group: 'Navigation',
    icon: BookOpen,
    type: 'scroll',
    target: 'journey',
  },
  {
    id: 'nav-capabilities',
    title: 'Go to Technical Capabilities',
    subtitle: 'Architectural layers & stack breakdown',
    group: 'Navigation',
    icon: Compass,
    type: 'scroll',
    target: 'capabilities',
  },
  {
    id: 'nav-contact',
    title: 'Go to Contact Section',
    subtitle: 'Send direct message or inquiry',
    group: 'Navigation',
    icon: Mail,
    type: 'scroll',
    target: 'contact',
  },
  {
    id: 'act-cv',
    title: 'Download Resume (CV)',
    subtitle: 'PDF Curriculum Vitae',
    group: 'Actions',
    icon: Download,
    type: 'cv',
  },
  {
    id: 'act-email',
    title: 'Copy Email Address',
    subtitle: 'ahmadissadurrofiq17@gmail.com',
    group: 'Actions',
    icon: Mail,
    type: 'email',
  },
  {
    id: 'act-github',
    title: 'Open GitHub Profile',
    subtitle: 'github.com/DevIssa-It',
    group: 'Actions',
    icon: Github,
    type: 'github',
  },
  {
    id: 'act-linkedin',
    title: 'Open LinkedIn Profile',
    subtitle: 'A. Issadurrofiq Jaya Utama',
    group: 'Actions',
    icon: Linkedin,
    type: 'linkedin',
  },
  {
    id: 'act-admin',
    title: 'Admin Console Login',
    subtitle: 'Restricted administrative access',
    group: 'Actions',
    icon: Lock,
    type: 'admin',
  },
]

export function executePaletteAction(
  action: StaticPaletteAction,
  trackEvent: (type: any, target?: string) => void,
  onDone: () => void
) {
  onDone()
  if (action.type === 'scroll' && action.target) {
    document.getElementById(action.target)?.scrollIntoView({ behavior: 'smooth' })
  } else if (action.type === 'cv') {
    trackEvent('cv_download')
    window.open('/api/resume?download=true', '_blank')
  } else if (action.type === 'email') {
    navigator.clipboard.writeText('ahmadissadurrofiq17@gmail.com')
    trackEvent('contact_copied')
  } else if (action.type === 'github') {
    trackEvent('github_click', 'DevIssa-It')
    window.open('https://github.com/DevIssa-It', '_blank')
  } else if (action.type === 'linkedin') {
    window.open('https://www.linkedin.com/in/ahmad-issadurrofiq-jaya-utama-2541a5254/', '_blank')
  } else if (action.type === 'admin') {
    window.location.href = '/login'
  }
}
