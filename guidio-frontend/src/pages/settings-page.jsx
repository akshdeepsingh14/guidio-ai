import { PageHeader } from "@/components/common/page-header";
import { AiUsageNotice } from "@/components/common/ai-usage-notice";
import { AccountCard } from "@/features/settings/account-card";
import { AppearanceCard } from "@/features/settings/appearance-card";
import { SecurityCard } from "@/features/settings/security-card";

function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-8">
      <PageHeader
        title="Settings"
        description="Manage your account, appearance and see how the AI features work."
      />

      <AccountCard />
      <AppearanceCard />
      <SecurityCard />
      <AiUsageNotice variant="card" />
    </div>
  );
}

export default SettingsPage;