import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ListOrdered, 
  Building2, 
  GitBranch, 
  Map, 
  FileText,
  Menu,
  X,
  Shield,
  ChevronLeft,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: '/', label: 'FX Flows', icon: TrendingUp },
  { path: '/overview', label: 'Stability Cockpit', icon: LayoutDashboard },
  { path: '/register', label: 'Remittance Register', icon: ListOrdered },
  { path: '/submissions', label: 'Institutional Submissions', icon: Building2 },
  { path: '/settlements', label: 'Settlement & Reconciliation', icon: GitBranch },
  { path: '/corridors', label: 'Corridors & Channels', icon: Map },
  { path: '/reports', label: 'Regulatory Reports', icon: FileText },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-sidebar border-b border-sidebar-border z-50 flex items-center px-4">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-sidebar-foreground p-2 hover:bg-sidebar-accent rounded-lg transition-colors"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="flex items-center gap-3 ml-4">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Shield className="w-5 h-5 text-accent-foreground" />
          </div>
          <span className="text-sidebar-foreground font-semibold">BoG Remittance</span>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full bg-sidebar z-40 transform transition-all duration-300 lg:translate-x-0 border-r border-sidebar-border",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
        collapsed ? "lg:w-20" : "lg:w-64"
      )}>
        <div className={cn(
          "p-6 border-b border-sidebar-border transition-all duration-300",
          collapsed && "lg:p-4 lg:flex lg:justify-center"
        )}>
          <div className={cn(
            "flex items-center gap-3",
            collapsed && "lg:flex-col lg:gap-2"
          )}>
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-accent-foreground" />
            </div>
            <div className={cn(
              "transition-opacity duration-300",
              collapsed && "lg:hidden"
            )}>
              <h1 className="text-sidebar-foreground font-bold text-lg">BoG</h1>
              <p className="text-sidebar-foreground/60 text-xs">Remittance Oversight</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          <TooltipProvider delayDuration={0}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return collapsed ? (
                <Tooltip key={item.path}>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        isActive ? 'nav-item-active' : 'nav-item-inactive',
                        'lg:justify-center lg:px-3'
                      )}
                    >
                      <item.icon size={20} />
                      <span className={cn("lg:hidden", collapsed && "lg:hidden")}>{item.label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="hidden lg:block">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={isActive ? 'nav-item-active' : 'nav-item-inactive'}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </TooltipProvider>
        </nav>

        {/* Collapse toggle - Desktop only */}
        <div className="hidden lg:block absolute bottom-20 left-0 right-0 px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "w-full text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
              collapsed && "justify-center px-0"
            )}
          >
            {collapsed ? <ChevronRight size={18} /> : (
              <>
                <ChevronLeft size={18} className="mr-2" />
                <span>Collapse</span>
              </>
            )}
          </Button>
        </div>

        <div className={cn(
          "absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border",
          collapsed && "lg:p-3"
        )}>
          <div className={cn(
            "flex items-center gap-3 px-3 py-2",
            collapsed && "lg:justify-center lg:px-1"
          )}>
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center shrink-0">
              <span className="text-sm font-medium text-sidebar-foreground">AD</span>
            </div>
            <div className={cn(
              "transition-opacity duration-300",
              collapsed && "lg:hidden"
            )}>
              <p className="text-sm font-medium text-sidebar-foreground">Admin User</p>
              <p className="text-xs text-sidebar-foreground/60">Supervisor</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className={cn(
        "min-h-screen pt-16 lg:pt-0 transition-all duration-300",
        collapsed ? "lg:ml-20" : "lg:ml-64"
      )}>
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}