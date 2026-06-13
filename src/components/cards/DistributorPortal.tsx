import { ArrowUpRight, Users, DollarSign, Phone } from 'lucide-react';
import KpiCard from '../ui/KpiCard';
import DataTable from '../ui/DataTable';
import ProgressBar from '../ui/Charts';
import { ArrowButton } from '../ui/StatusBadge';
import DemoCard from '../ui/DemoCard';

const leadColumns = [
  { key: 'name', label: 'Name' },
  { key: 'company', label: 'Company' },
  { key: 'score', label: 'Score' },
  { key: 'status', label: 'Status' },
  { key: 'date', label: 'Date' },
];

const leadRows = [
  { name: 'Sarah Chen', company: 'BlueSpring Resorts', score: '92', status: 'Hot', date: 'Mar 12' },
  { name: 'Mike Torres', company: 'Coastal Spas', score: '78', status: 'Warm', date: 'Mar 11' },
  { name: 'Jen Kim', company: 'Elite Wellness', score: '85', status: 'Hot', date: 'Mar 10' },
  { name: 'Dave Ross', company: 'Aqua Luxury', score: '63', status: 'Warm', date: 'Mar 09' },
];

export default function DistributorPortal() {
  return (
    <DemoCard number={2} title="Distributor Portal">
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <KpiCard label="Total Leads" value="1,247" change="+12%" changeType="up" icon={<Users size={12} />} />
          <KpiCard label="Sales Closed" value="384" change="+8%" changeType="up" icon={<DollarSign size={12} />} />
          <KpiCard label="Commissions" value="$184K" change="+15%" changeType="up" icon={<ArrowUpRight size={12} />} />
        </div>
        <div>
          <span className="text-[10px] font-semibold text-fusion-text-muted uppercase tracking-wider mb-1 block">Recent Leads</span>
          <DataTable columns={leadColumns} rows={leadRows} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <ArrowButton><Phone size={12} /> Call Queue (4)</ArrowButton>
          <ArrowButton><Users size={12} /> New Lead</ArrowButton>
        </div>
        <div className="space-y-2 bg-fusion-card-soft rounded-lg p-3 border border-fusion-border-light">
          <span className="text-[10px] font-semibold text-fusion-text-muted uppercase tracking-wider">Training Progress</span>
          <ProgressBar value={45} label="Product Knowledge" />
          <ProgressBar value={72} label="Sales Techniques" />
          <ProgressBar value={90} label="Compliance" />
        </div>
      </div>
    </DemoCard>
  );
}
