import { FileText, Share2, Download, Eye } from 'lucide-react';
import KpiCard from '../ui/KpiCard';
import DataTable from '../ui/DataTable';
import { ArrowButton } from '../ui/StatusBadge';
import DemoCard from '../ui/DemoCard';

const contentColumns = [
  { key: 'title', label: 'Title' },
  { key: 'type', label: 'Type' },
  { key: 'views', label: 'Views' },
  { key: 'engagement', label: 'Eng.' },
  { key: 'status', label: 'Status' },
];

const contentRows = [
  { title: 'Probe Installation Guide', type: 'Video', views: '12.4K', engagement: '8.2%', status: 'Published' },
  { title: 'Water Quality 101', type: 'Blog', views: '8.7K', engagement: '6.8%', status: 'Published' },
  { title: 'Advanced Troubleshooting', type: 'Guide', views: '5.2K', engagement: '12.1%', status: 'Draft' },
  { title: 'ROI Calculator', type: 'Tool', views: '3.8K', engagement: '15.3%', status: 'Published' },
];

const categories = [
  { name: 'Blog', count: 48 },
  { name: 'Video', count: 36 },
  { name: 'Guide', count: 24 },
  { name: 'Case Study', count: 18 },
];

export default function ContentEngine() {
  return (
    <DemoCard number={6} title="Content Engine">
      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-2">
          <KpiCard label="Total Assets" value="246" icon={<FileText size={12} />} />
          <KpiCard label="Engagement" value="4.8%" change="+1.2%" changeType="up" icon={<Eye size={12} />} />
          <KpiCard label="Social Shares" value="12.4K" change="+23%" changeType="up" icon={<Share2 size={12} />} />
          <KpiCard label="Downloads" value="8,932" change="+18%" changeType="up" icon={<Download size={12} />} />
        </div>
        <div>
          <span className="text-[10px] font-semibold text-fusion-text-muted uppercase tracking-wider mb-1 block">Top Content</span>
          <DataTable columns={contentColumns} rows={contentRows} />
        </div>
        <div className="flex gap-2">
          {categories.map((cat) => (
            <div key={cat.name} className="flex-1 bg-fusion-card-soft rounded-lg p-2 border border-fusion-border-light text-center">
              <span className="text-[9px] text-fusion-text-muted block">{cat.name}</span>
              <span className="text-xs font-bold text-fusion-text">{cat.count}</span>
            </div>
          ))}
        </div>
        <ArrowButton>Create New Content</ArrowButton>
      </div>
    </DemoCard>
  );
}
