import { BookOpen, Wrench, FileQuestion, GraduationCap, Shield, HelpCircle } from 'lucide-react';
import DemoCard from '../ui/DemoCard';

const categories = [
  { icon: BookOpen, title: 'Product Specs', count: 24, updated: 3, color: '#0057D9' },
  { icon: Wrench, title: 'Installation Guides', count: 18, updated: 2, color: '#0A66FF' },
  { icon: FileQuestion, title: 'Troubleshooting', count: 31, updated: 5, color: '#1A7AFF' },
  { icon: GraduationCap, title: 'Training Materials', count: 12, updated: 1, color: '#8BA0C4' },
  { icon: Shield, title: 'Compliance', count: 9, updated: 0, color: '#16A34A' },
  { icon: HelpCircle, title: 'FAQ', count: 45, updated: 7, color: '#F59E0B' },
];

export default function InternalKnowledgeBase() {
  return (
    <DemoCard number={7} title="Internal Knowledge Base">
      <div className="grid grid-cols-3 gap-2">
        {categories.map(({ icon: Icon, title, count, updated, color }) => (
          <div
            key={title}
            className="bg-fusion-card-soft rounded-lg p-3 border border-fusion-border-light hover:border-fusion-blue/30 transition-colors"
          >
            <Icon size={16} style={{ color }} className="mb-1.5" />
            <span className="text-[10px] font-semibold text-fusion-text block leading-tight">{title}</span>
            <span className="text-lg font-bold text-fusion-text">{count}</span>
            {updated > 0 && (
              <span className="text-[9px] text-fusion-blue-light block mt-0.5">{updated} updated this week</span>
            )}
          </div>
        ))}
      </div>
    </DemoCard>
  );
}
