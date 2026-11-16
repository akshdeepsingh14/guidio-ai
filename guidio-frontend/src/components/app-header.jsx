import { UserButton } from "@clerk/react";
import { Menu } from "lucide-react";
import { useLocation } from "react-router";
import { ModeToggle } from "@/components/mode-toggle";
import NotificationPopover from "@/components/notification-popover";
import { Button } from "@/components/ui/button";
import { navigationItems } from "@/lib/navigation";

function getPageTitle(pathname) {
  const match = navigationItems.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
  );

  return match?.title ?? "Guidio AI";
}

export function AppHeader({ onMenuClick }) {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between gap-3 border-b bg-background/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="size-9 shrink-0 lg:hidden"
        >
          <Menu aria-hidden="true" />
        </Button>

        <p className="truncate text-sm font-medium">{getPageTitle(pathname)}</p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <NotificationPopover />
        <ModeToggle />

        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "size-9",
              userButtonPopoverCard: "border shadow-xl",
            },
          }}
        />
      </div>
    </header>
  );
}