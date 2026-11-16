import { Link } from "react-router";
import { AiUsageNotice } from "@/components/common/ai-usage-notice";
import { Logo } from "@/components/common/logo";
import { navLinks } from "@/features/landing/landing-data";

const productLinks = navLinks.map((link) => ({
  label: link.label,
  href: `#${link.id}`,
}));

const accountLinks = [
  { label: "Sign in", to: "/sign-in" },
  { label: "Create account", to: "/sign-up" },
];

const legalLinks = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms and Conditions", to: "/terms" },
];

const linkClass =
  "text-sm text-muted-foreground transition-colors hover:text-foreground";

function FooterColumn({ title, links }) {
  return (
    <div>
      <p className="text-sm font-medium">{title}</p>

      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            {link.to ? (
              <Link to={link.to} className={linkClass}>
                {link.label}
              </Link>
            ) : (
              <a href={link.href} className={linkClass}>
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LandingFooter() {
  return (
    <footer className="border-t">
      <div className="container max-w-6xl py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="max-w-xs text-sm leading-6 text-muted-foreground">
              Your AI career companion for skill gap analysis, career guidance
              and interview practice.
            </p>
          </div>

          <FooterColumn title="Product" links={productLinks} />
          <FooterColumn title="Account" links={accountLinks} />
          <FooterColumn title="Legal" links={legalLinks} />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-start sm:justify-between">
          <AiUsageNotice className="max-w-xl" />

          <p className="shrink-0 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Guidio AI
          </p>
        </div>
      </div>
    </footer>
  );
}