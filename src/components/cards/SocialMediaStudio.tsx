import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { CalendarDays, CheckCircle2, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { createSocialPost, fetchSocialPosts, updateSocialPost } from '../../lib/queries';
import type { SocialPost, SocialPostStatus } from '../../types';
import DemoCard from '../ui/DemoCard';
import DataTable from '../ui/DataTable';
import KpiCard from '../ui/KpiCard';
import StatusBadge from '../ui/StatusBadge';

const PLATFORMS = ['Instagram', 'Facebook', 'X', 'LinkedIn', 'TikTok'] as const;

function formatDateTime(value: string | null): string {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? '—'
    : date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
}

function statusTone(status: SocialPostStatus): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
  switch (status) {
    case 'Published':
      return 'success';
    case 'Approved':
    case 'Scheduled':
      return 'info';
    case 'Ready for Review':
      return 'warning';
    default:
      return 'neutral';
  }
}

export default function SocialMediaStudio() {
  const { user, profile } = useAuth();
  const canManage = profile?.role === 'manufacturer' || profile?.role === 'distributor';
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '',
    platform: 'Instagram',
    content: '',
    campaign: '',
    scheduled_for: '',
  });

  useEffect(() => {
    fetchSocialPosts()
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const counts = useMemo(() => {
    const totals: Record<SocialPostStatus, number> = {
      Draft: 0,
      'Ready for Review': 0,
      Approved: 0,
      Scheduled: 0,
      Published: 0,
    };

    for (const post of posts) {
      totals[post.status] += 1;
    }

    return totals;
  }, [posts]);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!canManage) return;

    setSaving(true);
    setError(null);

    try {
      const created = await createSocialPost({
        title: form.title.trim(),
        platform: form.platform,
        content: form.content.trim(),
        campaign: form.campaign.trim() || undefined,
        status: 'Draft',
        scheduled_for: form.scheduled_for ? new Date(form.scheduled_for).toISOString() : null,
      });

      setPosts((prev) => [created, ...prev]);
      setForm({
        title: '',
        platform: 'Instagram',
        content: '',
        campaign: '',
        scheduled_for: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create social post');
    } finally {
      setSaving(false);
    }
  }

  async function transitionPost(post: SocialPost, nextStatus: SocialPostStatus) {
    setError(null);

    try {
      const updates: Parameters<typeof updateSocialPost>[1] = { status: nextStatus };
      if (nextStatus === 'Approved') {
        updates.approved_by = user?.id ?? post.approved_by;
      }
      if (nextStatus === 'Published') {
        updates.published_at = new Date().toISOString();
      }

      const updated = await updateSocialPost(post.id, updates);
      setPosts((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post');
    }
  }

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'platform', label: 'Platform' },
    { key: 'status', label: 'Status' },
    { key: 'scheduled_for', label: 'Scheduled' },
    { key: 'actions', label: 'Actions' },
  ];

  const rows = posts.map((post) => {
    const action =
      post.status === 'Draft' ? (
        <button
          type="button"
          onClick={() => transitionPost(post, 'Ready for Review')}
          className="rounded-lg border border-fusion-blue px-2 py-1 text-[10px] font-semibold text-fusion-blue hover:bg-blue-50"
        >
          Send to review
        </button>
      ) : post.status === 'Ready for Review' ? (
        <button
          type="button"
          onClick={() => transitionPost(post, 'Approved')}
          className="rounded-lg bg-fusion-blue px-2 py-1 text-[10px] font-semibold text-white hover:bg-fusion-blue-light"
        >
          Approve
        </button>
      ) : post.status === 'Approved' ? (
        <button
          type="button"
          onClick={() => transitionPost(post, 'Scheduled')}
          className="rounded-lg bg-fusion-blue px-2 py-1 text-[10px] font-semibold text-white hover:bg-fusion-blue-light"
        >
          Schedule
        </button>
      ) : post.status === 'Scheduled' ? (
        <button
          type="button"
          onClick={() => transitionPost(post, 'Published')}
          className="rounded-lg bg-fusion-success px-2 py-1 text-[10px] font-semibold text-white hover:opacity-90"
        >
          Publish
        </button>
      ) : (
        <span className="text-[10px] text-fusion-text-muted">Done</span>
      );

    return {
      title: post.title,
      platform: post.platform,
      status: (
        <StatusBadge variant={statusTone(post.status)}>
          {post.status}
        </StatusBadge>
      ),
      scheduled_for: formatDateTime(post.scheduled_for),
      actions: <div className="flex justify-end">{action}</div>,
    };
  });

  return (
    <DemoCard number={9} title="Social Media Studio" className="xl:col-span-2">
      {loading ? (
        <div className="py-4 text-center text-[11px] text-fusion-text-muted">Loading...</div>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-5 gap-2">
            <KpiCard label="Draft" value={String(counts.Draft)} icon={<Sparkles size={12} />} />
            <KpiCard label="Review" value={String(counts['Ready for Review'])} icon={<Send size={12} />} />
            <KpiCard label="Approved" value={String(counts.Approved)} icon={<ShieldCheck size={12} />} />
            <KpiCard label="Scheduled" value={String(counts.Scheduled)} icon={<CalendarDays size={12} />} />
            <KpiCard label="Published" value={String(counts.Published)} icon={<CheckCircle2 size={12} />} />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
          )}

          {canManage ? (
            <form onSubmit={handleCreate} className="space-y-3 rounded-lg border border-fusion-border-light bg-fusion-card-soft p-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-fusion-text-muted">
                    Title
                  </label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full rounded-lg border border-fusion-border bg-white px-3 py-2 text-sm"
                    placeholder="New product spotlight"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-fusion-text-muted">
                    Platform
                  </label>
                  <select
                    value={form.platform}
                    onChange={(e) => setForm((prev) => ({ ...prev, platform: e.target.value }))}
                    className="w-full rounded-lg border border-fusion-border bg-white px-3 py-2 text-sm"
                  >
                    {PLATFORMS.map((platform) => (
                      <option key={platform} value={platform}>{platform}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-fusion-text-muted">
                  Content
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                  className="min-h-28 w-full rounded-lg border border-fusion-border bg-white px-3 py-2 text-sm"
                  placeholder="Write the post copy, hook, CTA, and approval notes."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-fusion-text-muted">
                    Campaign
                  </label>
                  <input
                    value={form.campaign}
                    onChange={(e) => setForm((prev) => ({ ...prev, campaign: e.target.value }))}
                    className="w-full rounded-lg border border-fusion-border bg-white px-3 py-2 text-sm"
                    placeholder="Q3 pool push"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-fusion-text-muted">
                    Schedule
                  </label>
                  <input
                    type="datetime-local"
                    value={form.scheduled_for}
                    onChange={(e) => setForm((prev) => ({ ...prev, scheduled_for: e.target.value }))}
                    className="w-full rounded-lg border border-fusion-border bg-white px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-1.5 rounded-lg bg-fusion-blue px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-fusion-blue-light disabled:opacity-50"
              >
                {saving ? 'Creating...' : 'Create Draft'}
              </button>
            </form>
          ) : (
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
              Read-only view. Social publishing is limited to manufacturer and distributor roles.
            </div>
          )}

          <div>
            <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-fusion-text-muted">
              Social Queue
            </span>
            {rows.length > 0 ? (
              <DataTable columns={columns} rows={rows} />
            ) : (
              <div className="py-2 text-[11px] text-fusion-text-muted">No social posts yet</div>
            )}
          </div>
        </div>
      )}
    </DemoCard>
  );
}
