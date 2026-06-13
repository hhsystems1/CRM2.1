import { Clock, CheckCircle, AlertTriangle, Users } from 'lucide-react';
import DataTable from '../ui/DataTable';
import DemoCard from '../ui/DemoCard';

const statusCards = [
  { label: 'Open', value: '23', icon: Clock, color: '#0057D9' },
  { label: 'In Progress', value: '15', icon: Clock, color: '#F59E0B' },
  { label: 'Resolved', value: '187', icon: CheckCircle, color: '#16A34A' },
  { label: 'Urgent', value: '4', icon: AlertTriangle, color: '#DC2626' },
];

const ticketColumns = [
  { key: 'id', label: 'ID' },
  { key: 'customer', label: 'Customer' },
  { key: 'subject', label: 'Subject' },
  { key: 'status', label: 'Status' },
  { key: 'priority', label: 'Priority' },
  { key: 'agent', label: 'Agent' },
];

const ticketRows = [
  { id: '#4421', customer: 'AquaPure', subject: 'Probe calibration error', status: 'Open', priority: 'High', agent: 'Sarah M.' },
  { id: '#4420', customer: 'ClearWater', subject: 'Shipping delay inquiry', status: 'In Progress', priority: 'Med', agent: 'Tom K.' },
  { id: '#4419', customer: 'HydroLogic', subject: 'Bulk order pricing', status: 'Resolved', priority: 'Low', agent: 'Lisa R.' },
  { id: '#4418', customer: 'BlueSpring', subject: 'Sensor failure (RMA)', status: 'Urgent', priority: 'High', agent: 'Sarah M.' },
  { id: '#4417', customer: 'Elite Wellness', subject: 'Account update', status: 'Open', priority: 'Low', agent: 'Tom K.' },
];

export default function SupportTicketSystem() {
  return (
    <DemoCard number={8} title="Support & Ticket System">
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
          <DataTable columns={ticketColumns} rows={ticketRows} />
        </div>
        <div className="bg-fusion-card-soft rounded-lg p-3 border border-fusion-border-light">
          <span className="text-[10px] font-semibold text-fusion-text-muted uppercase tracking-wider mb-2 block">Support Team</span>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="w-8 h-8 rounded-full bg-fusion-blue/10 flex items-center justify-center mx-auto mb-1">
                <Users size={14} className="text-fusion-blue" />
              </div>
              <span className="text-[10px] font-bold text-fusion-text block">Sarah M.</span>
              <span className="text-[9px] text-fusion-text-muted">12 tickets</span>
            </div>
            <div>
              <div className="w-8 h-8 rounded-full bg-fusion-warning/10 flex items-center justify-center mx-auto mb-1">
                <Users size={14} className="text-fusion-warning" />
              </div>
              <span className="text-[10px] font-bold text-fusion-text block">Tom K.</span>
              <span className="text-[9px] text-fusion-text-muted">8 tickets</span>
            </div>
            <div>
              <div className="w-8 h-8 rounded-full bg-fusion-success/10 flex items-center justify-center mx-auto mb-1">
                <Users size={14} className="text-fusion-success" />
              </div>
              <span className="text-[10px] font-bold text-fusion-text block">Lisa R.</span>
              <span className="text-[9px] text-fusion-text-muted">6 tickets</span>
            </div>
          </div>
        </div>
      </div>
    </DemoCard>
  );
}
