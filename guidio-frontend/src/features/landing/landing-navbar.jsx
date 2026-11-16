import { useState } from "react";
import { Menu } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { Logo } from "@/components/common/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CtaLink, PrimaryCta } from "@/features/landing/cta-link";
import { navLinks } from "@/features/landing/landing-data";

function AuthActions({ fullWidth = false }) {
  const { isLoaded, isSignedIn } = useAuth();
  const signedIn = isLoaded && isSignedIn;
  const widthClass = fullWidth ? "w-full" : undefined;

  return (
    <>
      {signedIn ? null : (
        <CtaLink
          to="/sign-in"
          variant={fullWidth ? "outline" : "ghost"}
          size="md"
          className={widthClass}
        >
          Sign in
        </CtaLink>
      )}

      <PrimaryCta size="md" className={widthClass} />
    </>
  );
}

export function LandingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // The sheet locks page scroll while it is open, so close it first and
  // scroll to the section once the lock has been released.
  const handleMobileNavigate = (event, id) => {
    event.preventDefault();
    setMenuOpen(false);

    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    }, 250);
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-6xl items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />

          <div className="hidden items-center gap-2 lg:flex">
            <AuthActions />
          </div>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              render={
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Open menu"
                  className="size-9 lg:hidden"
                />
              }
            >
              <Menu aria-hidden="true" />
            </SheetTrigger>

            <SheetContent side="right" className="data-[side=right]:w-4/5">
              <SheetHeader className="border-b">
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigate around the Guidio AI home page.
                </SheetDescription>
              </SheetHeader>

              <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(event) => handleMobileNavigate(event, link.id)}
                    className="rounded-lg px-3 py-2.5 text-base font-medium transition-colors hover:bg-muted"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <SheetFooter className="border-t">
                <AuthActions fullWidth />
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}