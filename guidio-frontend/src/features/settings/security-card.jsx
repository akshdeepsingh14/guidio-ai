import { useState } from "react";
import { useClerk, useUser } from "@clerk/react";
import { LoaderCircle, LogOut, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function getSignInMethods(user) {
  if (!user) return [];

  const methods = [];

  if (user.passwordEnabled) {
    methods.push("Email and password");
  }

  for (const account of user.externalAccounts ?? []) {
    const provider = String(account.provider ?? "")
      .replace(/^oauth_/, "")
      .replace(/^\w/, (letter) => letter.toUpperCase());

    if (provider) {
      methods.push(`${provider} sign-in`);
    }
  }

  return [...new Set(methods)];
}

/** How the student signs in, and the sign-out button. */
export function SecurityCard() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const methods = getSignInMethods(user);

  async function handleSignOut() {
    setIsSigningOut(true);

    try {
      await signOut({ redirectUrl: "/" });
    } catch {
      setIsSigningOut(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck aria-hidden="true" className="size-4 text-muted-foreground" />
          Authentication
        </CardTitle>
        <CardDescription>How you sign in to Guidio AI.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 text-sm">
        <div className="space-y-2">
          <p className="text-muted-foreground">Sign-in methods</p>

          {isLoaded && methods.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5">
              {methods.map((method) => (
                <li key={method}>
                  <Badge variant="secondary">{method}</Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-medium">
              {isLoaded ? "Not available" : "Loading…"}
            </p>
          )}
        </div>

        <p className="leading-6 text-muted-foreground">
          Sign-in is handled by Clerk, which runs in Development mode for this
          project. Passwords and sessions are never stored by Guidio AI. Use
          Manage account in the Account section to change your password or
          connected accounts.
        </p>

        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={handleSignOut}
          disabled={isSigningOut}
        >
          {isSigningOut ? (
            <LoaderCircle aria-hidden="true" className="animate-spin" />
          ) : (
            <LogOut aria-hidden="true" />
          )}
          {isSigningOut ? "Signing out..." : "Sign out"}
        </Button>
      </CardContent>
    </Card>
  );
}