import { useUser } from "@clerk/clerk-react";
import { Link, NavLink } from "react-router";
import { LogoMark } from "@/components/common/logo";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { navigationItems } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function SidebarBrand({ onNavigate }) {
  return (
    <Link
      to="/dashboard"
      onClick={onNavigate}
      aria-label="Guidio AI dashboard"
      className="inline-flex items-center gap-2.5 rounded-md transition-opacity hover:opacity-80"
    >
      <LogoMark />
      <span className="text-base font-semibold tracking-tight">Guidio AI</span>
    </Link>
  );
}

function NavigationLinks({ onNavigate }) {
  return (
    <nav aria-label="Main navigation" className="space-y-1 px-3 py-4">
      {navigationItems.map(({ href, title, icon: Icon }) => (
        <NavLink
          key={href}
          to={href}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-accent text-foreground ring-1 ring-border"
                : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
            )
          }
        >
          <Icon aria-hidden="true" className="size-4 shrink-0" />
          <span className="truncate">{title}</span>
        </NavLink>
      ))}
    </nav>
  );
}

function SidebarUser() {
  const { user } = useUser();

  const name =
    user?.fullName || user?.firstName || user?.username || "Student";
  const email = user?.primaryEmailAddress?.emailAddress || "";
  const initial = name.trim().charAt(0).toUpperCase() || "S";

  return (
    <div className="flex items-center gap-3 border-t p-4">
      <span
        aria-hidden="true"
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium"
      >
        {initial}
      </span>

      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{name}</p>
        {email ? (
          <p className="truncate text-xs text-muted-foreground">{email}</p>
        ) : null}
      </div>
    </div>
  );
}

function SidebarPanel({ onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center border-b px-4">
        <SidebarBrand onNavigate={onNavigate} />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <NavigationLinks onNavigate={onNavigate} />
      </div>

      <SidebarUser />
    </div>
  );
}

/** Always visible from the "lg" breakpoint (1024px) upwards. */
export function DesktopSidebar() {
  return (
    <aside
      aria-label="Sidebar"
      className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r bg-card lg:block"
    >
      <SidebarPanel />
    </aside>
  );
}

/** Slide-in drawer for phones and tablets. */
export function MobileSidebar({ open, onOpenChange }) {
  const close = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="gap-0 p-0 data-[side=left]:w-72 data-[side=left]:max-w-[85vw] data-[side=left]:sm:max-w-72"
      >
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <SheetDescription className="sr-only">
          Move between the pages of Guidio AI.
        </SheetDescription>

        <SidebarPanel onNavigate={close} />
      </SheetContent>
    </Sheet>
  );
}