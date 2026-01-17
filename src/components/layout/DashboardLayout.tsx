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
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: '/', label: 'Overview', icon: LayoutDashboard },
  { path: '/register', label: 'Remittance Register', icon: ListOrdered },
  { path: '/submissions', label: 'Institutional Submissions', icon: Building2 },
  { path: '/settlements', label: 'Settlement & Reconciliation', icon: GitBranch },
  { path: '/corridors', label: 'Corridors & Channels', icon: Map },
  { path: '/reports', label: 'Regulatory Reports', icon: FileText },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-sidebar border-b border-sidebar-border z-50 flex items-center px-4">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-sidebar-foreground p-2 hover:bg-sidebar-accent rounded-lg"
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
        "fixed top-0 left-0 h-full w-64 bg-sidebar z-40 transform transition-transform duration-200 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <Shield className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-sidebar-foreground font-bold text-lg">BoG</h1>
              <p className="text-sidebar-foreground/60 text-xs">Remittance Oversight</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
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
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
              <span className="text-sm font-medium text-sidebar-foreground">AD</span>
            </div>
            <div>
              <p className="text-sm font-medium text-sidebar-foreground">Admin User</p>
              <p className="text-xs text-sidebar-foreground/60">Supervisor</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
