import DemoCard from '../ui/DemoCard';

const funnels = [
  {
    title: 'Spa & Wellness',
    stages: [
      { label: 'Awareness', count: 40, color: '#0057D9' },
      { label: 'Interest', count: 28, color: '#0A66FF' },
      { label: 'Consideration', count: 15, color: '#1A7AFF' },
      { label: 'Purchase', count: 8, color: '#8BA0C4' },
    ],
  },
  {
    title: 'Residential',
    stages: [
      { label: 'Awareness', count: 120, color: '#0057D9' },
      { label: 'Interest', count: 85, color: '#0A66FF' },
      { label: 'Consideration', count: 52, color: '#1A7AFF' },
      { label: 'Purchase', count: 31, color: '#8BA0C4' },
    ],
  },
  {
    title: 'Commercial',
    stages: [
      { label: 'Awareness', count: 65, color: '#0057D9' },
      { label: 'Interest', count: 42, color: '#0A66FF' },
      { label: 'Consideration', count: 27, color: '#1A7AFF' },
      { label: 'Purchase', count: 14, color: '#8BA0C4' },
    ],
  },
];

export default function FunnelCustomerJourney() {
  const maxCount = Math.max(...funnels.flatMap((f) => f.stages.map((s) => s.count)));

  return (
    <DemoCard number={5} title="Funnel & Customer Journey">
      <div className="grid grid-cols-3 gap-3">
        {funnels.map((funnel) => (
          <div key={funnel.title} className="bg-fusion-card-soft rounded-lg p-3 border border-fusion-border-light">
            <span className="text-[10px] font-bold text-fusion-text uppercase tracking-wider block mb-2">
              {funnel.title}
            </span>
            <div className="space-y-2">
              {funnel.stages.map((stage) => (
                <div key={stage.label}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[9px] text-fusion-text-muted">{stage.label}</span>
                    <span className="text-[10px] font-bold text-fusion-text">{stage.count}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(stage.count / maxCount) * 100}%`,
                        backgroundColor: stage.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 pt-2 border-t border-fusion-border-light">
              <span className="text-[10px] text-fusion-text-muted">Conversion: </span>
              <span className="text-[10px] font-bold text-fusion-success">
                {Math.round((funnel.stages[3].count / funnel.stages[0].count) * 100)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </DemoCard>
  );
}
