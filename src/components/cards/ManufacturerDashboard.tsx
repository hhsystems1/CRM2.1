import KpiCard from '../ui/KpiCard';
import { MiniLineChart, MiniPieChart, MapPlaceholder } from '../ui/Charts';
import DataTable from '../ui/DataTable';
import DemoCard from '../ui/DemoCard';

const kpis = [
  { label: 'Total Distributors', value: '342', change: '+12', changeType: 'up' as const },
  { label: 'Active Leads', value: '1,247', change: '+8.3%', changeType: 'up' as const },
  { label: 'Monthly Revenue', value: '$2.4M', change: '+14.2%', changeType: 'up' as const },
  { label: 'Inventory (Units)', value: '8,450', change: '-3.1%', changeType: 'down' as const },
];

const lineData = [24, 28, 32, 30, 36, 42, 40, 44, 48, 52, 56, 62];
const pieSegments = [
  { value: 45, color: '#0057D9' },
  { value: 30, color: '#0A66FF' },
  { value: 25, color: '#8BA0C4' },
];

const distColumns = [
  { key: 'name', label: 'Distributor' },
  { key: 'region', label: 'Region' },
  { key: 'status', label: 'Status' },
  { key: 'revenue', label: 'Revenue' },
];

const distRows = [
  { name: 'AquaPure Systems', region: 'West Coast', status: 'Active', revenue: '$384K' },
  { name: 'ClearWater Tech', region: 'Southeast', status: 'Active', revenue: '$291K' },
  { name: 'HydroLogic Inc.', region: 'Northeast', status: 'Active', revenue: '$247K' },
  { name: 'PureFlow Dist.', region: 'Midwest', status: 'Onboarding', revenue: '$112K' },
];

export default function ManufacturerDashboard() {
  return (
    <DemoCard number={1} title="Manufacturer Dashboard">
      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-2">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-fusion-card-soft rounded-lg p-3 border border-fusion-border-light">
            <span className="text-[10px] font-semibold text-fusion-text-muted uppercase tracking-wider">Revenue Trend (12mo)</span>
            <MiniLineChart data={lineData} />
          </div>
          <div className="bg-fusion-card-soft rounded-lg p-3 border border-fusion-border-light">
            <span className="text-[10px] font-semibold text-fusion-text-muted uppercase tracking-wider">Lead Sources</span>
            <div className="flex items-center gap-3 mt-1">
              <MiniPieChart segments={pieSegments} size={56} />
              <div className="space-y-1">
                {[{ label: 'Referral', color: '#0057D9', pct: '45%' }, { label: 'Direct', color: '#0A66FF', pct: '30%' }, { label: 'Social', color: '#8BA0C4', pct: '25%' }].map((s) => (
                  <div key={s.label} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-[10px] text-fusion-text-muted">{s.label} {s.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <MapPlaceholder />
          <div>
            <span className="text-[10px] font-semibold text-fusion-text-muted uppercase tracking-wider mb-1 block">Top Distributors</span>
            <DataTable columns={distColumns} rows={distRows} />
          </div>
        </div>
      </div>
    </DemoCard>
  );
}
