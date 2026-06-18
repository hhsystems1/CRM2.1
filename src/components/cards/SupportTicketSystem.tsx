import { useEffect, useState } from 'react';
import { Clock, CheckCircle, AlertTriangle, Users } from 'lucide-react';
import DataTable from '../ui/DataTable';
import DemoCard from '../ui/DemoCard';
import { fetchTickets } from '../../lib/queries';
import type { SupportTicket } from '../../types';

function shortId(id: string): string {
  return `#${id.slice(0, 4)}`;
}

export default function SupportTicketSystem() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTickets()
      .then(setTickets)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const statusCounts: Record<string, number> = {};
  for (const t of tickets) {
    const s = t.status === 'Open' && t.priority === 'High' ? 'Urgent' : t.status;
    statusCounts[s] = (statusCounts[s] || 0) + 1;
  }

  const statusCards = [
    { label: 'Open', value: String(statusCounts['Open'] ?? statusCounts['Open'] ?? 0), icon: Clock, color: '#0057D9' },
    { label: 'In Progress', value: String(statusCounts['In Progress'] ?? 0), icon: Clock, color: '#F59E0B' },
    { label: 'Resolved', value: String(statusCounts['Resolved'] ?? 0), icon: CheckCircle, color: '#16A34A' },
    { label: 'Urgent', value: String(statusCounts['Urgent'] ?? 0), icon: AlertTriangle, color: '#DC2626' },
  ];

  const ticketColumns = [
    { key: 'id', label: 'ID' },
    { key: 'subject', label: 'Subject' },
    { key: 'status', label: 'Status' },
    { key: 'priority', label: 'Priority' },
  ];

  const ticketRows = tickets.map((t) => ({
    id: shortId(t.id),
    subject: t.subject,
    status: t.status,
    priority: t.priority,
  }));

  const agentCounts: Record<string, number> = {};
  for (const t of tickets) {
    if (t.assigned_to) {
      agentCounts[t.assigned_to] = (agentCounts[t.assigned_to] || 0) + 1;
    }
  }

  return (
    <DemoCard number={8} title="Support & Ticket System">
      {loading ? (
        <div className="text-[11px] text-fusion-text-muted py-4 text-center">Loading...</div>
      ) : error ? (
        <div className="text-[11px] text-red-400 py-4 text-center">{error}</div>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-2">
            {statusCards.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-fusion-card-soft rounded-lg p-3 border border-fusion-border-light">
                <div className="flex items-center gap-2 mb-1">
                  <Icon size={14} style={{ color }} />
                  <span className="text-[10px] font-semibold text-fusion-text-muted uppercase">{label}</span>
                </div>
                <span className="text-lg font-bold" style={{ color }}>{value}</span>
              </div>
            ))}
          </div>
          <div>
            <span className="text-[10px] font-semibold text-fusion-text-muted uppercase tracking-wider mb-1 block">Recent Tickets</span>
            {ticketRows.length > 0 ? (
              <DataTable columns={ticketColumns} rows={ticketRows} />
            ) : (
              <div className="text-[11px] text-fusion-text-muted py-2">No tickets yet</div>
            )}
          </div>
          {Object.keys(agentCounts).length > 0 && (
            <div className="bg-fusion-card-soft rounded-lg p-3 border border-fusion-border-light">
              <span className="text-[10px] font-semibold text-fusion-text-muted uppercase tracking-wider mb-2 block">Support Team</span>
              <div className="grid grid-cols-3 gap-2 text-center">
                {Object.entries(agentCounts).map(([agentId, count]) => (
                  <div key={agentId}>
                    <div className="w-8 h-8 rounded-full bg-fusion-blue/10 flex items-center justify-center mx-auto mb-1">
                      <Users size={14} className="text-fusion-blue" />
                    </div>
                    <span className="text-[10px] font-bold text-fusion-text block">{agentId.slice(0, 6)}...</span>
                    <span className="text-[9px] text-fusion-text-muted">{count} tickets</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </DemoCard>
  );
}
