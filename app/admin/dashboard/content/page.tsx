import { getHomepageStats } from "@/lib/data/site-content";
import { StatsEditor } from "@/components/admin/content/stats-editor";

export default async function AdminContentPage() {
  const stats = await getHomepageStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Site Content</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Edit content blocks that appear on the public site.
        </p>
      </div>
      <StatsEditor initialStats={stats} />
    </div>
  );
}
