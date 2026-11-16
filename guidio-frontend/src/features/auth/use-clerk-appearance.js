import { useMemo } from "react";
import { useTheme } from "@/hooks/use-theme";

/**
 * Clerk injects its own unlayered CSS, which beats Tailwind v4 utility
 * classes. So Clerk is themed through its `variables` and style objects
 * instead, using the same black-and-white values as globals.css.
 */
const palettes = {
  light: {
    background: "#ffffff",
    text: "#050505",
    muted: "#6b6b6b",
    primary: "#050505",
    onPrimary: "#ffffff",
    input: "#ffffff",
    border: "#e5e5e5",
    field: "#8c8c8c",
    danger: "#b91c1c",
    success: "#166534",
    warning: "#92400e",
  },
  dark: {
    background: "#111111",
    text: "#ffffff",
    muted: "#a3a3a3",
    primary: "#ffffff",
    onPrimary: "#050505",
    input: "#050505",
    border: "#262626",
    field: "#666666",
    danger: "#ef4444",
    success: "#22c55e",
    warning: "#f59e0b",
  },
};

export function useClerkAppearance() {
  const { resolvedTheme } = useTheme();

  return useMemo(() => {
    const p = palettes[resolvedTheme] ?? palettes.dark;

    return {
      variables: {
        colorPrimary: p.primary,
        colorTextOnPrimaryBackground: p.onPrimary,
        colorBackground: p.background,
        colorText: p.text,
        colorTextSecondary: p.muted,
        colorNeutral: p.text,
        colorInputBackground: p.input,
        colorInputText: p.text,
        colorDanger: p.danger,
        colorSuccess: p.success,
        colorWarning: p.warning,
        fontFamily:
          '"Geist Variable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        borderRadius: "0.5rem",
      },
      elements: {
        rootBox: { width: "100%" },
        cardBox: {
          width: "100%",
          maxWidth: "100%",
          boxShadow: "none",
          border: `1px solid ${p.border}`,
          borderRadius: "0.75rem",
        },
        card: { boxShadow: "none" },
        socialButtonsBlockButton: { boxShadow: "none" },
        formButtonPrimary: { boxShadow: "none", textTransform: "none" },
        formFieldInput: { borderColor: p.field },
      },
    };
  }, [resolvedTheme]);
}