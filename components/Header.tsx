import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { ThemeToggle } from "@/components/ui/theme-toggle"

interface HeaderProps {
  title: string
  showBackButton?: boolean
  onMenuClick?: () => void
}

export function Header({ title, showBackButton, onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-gradient-card backdrop-blur-md border-b border-border/50">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Button variant="ghost" size="sm" onClick={onMenuClick}>
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
              2
            </span>
          </Button>
          {/* <ThemeToggle /> */}
        </div>
      </div>
    </header>
  )
}