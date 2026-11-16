import { Palette } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChoiceGroup } from "@/features/onboarding/choice-group";
import { useTheme } from "@/hooks/use-theme";

const THEME_OPTIONS = [
  { value: "light", label: "Light", description: "Bright background" },
  { value: "dark", label: "Dark", description: "Dark background" },
  { value: "system", label: "System", description: "Match your device" },
];

/** Theme selection. The choice is stored in this browser only. */
export function AppearanceCard() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette aria-hidden="true" className="size-4 text-muted-foreground" />
          Appearance
        </CardTitle>
        <CardDescription>
          Choose how Guidio AI looks on this device.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <ChoiceGroup
          name="theme"
          aria-label="Theme"
          value={theme}
          onChange={setTheme}
          options={THEME_OPTIONS}
          className="sm:grid-cols-3"
        />

        <p className="text-xs leading-5 text-muted-foreground">
          Currently showing the {resolvedTheme} theme
          {theme === "system" ? " (from your device settings)" : ""}. This
          choice is saved in this browser only, so it is not shared between
          your devices.
        </p>
      </CardContent>
    </Card>
  );
}