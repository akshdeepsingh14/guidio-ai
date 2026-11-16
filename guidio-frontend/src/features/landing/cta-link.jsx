import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "@clerk/react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sizeClasses = {
  md: "h-9 gap-2 px-4",
  lg: "h-11 gap-2 px-6 text-[0.95rem]",
};

/**
 * A link that looks like a button. Pass `to` for an in-app route or `href`
 * for an in-page anchor. It is a real <a>, never a button wrapping a link.
 */
export function CtaLink({
  to,
  href,
  variant = "default",
  size = "lg",
  className,
  children,
  ...props
}) {
  const classes = cn(buttonVariants({ variant }), sizeClasses[size], className);

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}

/**
 * Main call to action. Sends signed-in students to the dashboard and
 * everyone else to sign-up.
 */
export function PrimaryCta({
  size = "lg",
  variant = "default",
  className,
  label = "Get Started for Free",
}) {
  const { isLoaded, isSignedIn } = useAuth();
  const signedIn = isLoaded && isSignedIn;

  return (
    <CtaLink
      to={signedIn ? "/dashboard" : "/sign-up"}
      size={size}
      variant={variant}
      className={className}
    >
      {signedIn ? "Go to dashboard" : label}
      <ArrowRight aria-hidden="true" />
    </CtaLink>
  );
}