import { Bot } from 'lucide-react';
import DemoCard from '../ui/DemoCard';

const messages = [
  { role: 'user' as const, text: 'My probe readings are fluctuating wildly. What should I check?', time: '10:32 AM' },
  { role: 'assistant' as const, text: 'I can help! First, check if the sensor membrane is clean. Biofilm buildup is the #1 cause. Try a gentle wipe with distilled water.', time: '10:32 AM' },
  { role: 'user' as const, text: "I cleaned it but it's still jumping between 4.2 and 8.9 pH.", time: '10:33 AM' },
  { role: 'assistant' as const, text: 'That suggests a calibration drift. Please recalibrate using pH 7.0 and 10.0 buffer solutions. Then run a 2-point calibration from the settings menu.', time: '10:33 AM' },
  { role: 'user' as const, text: 'Calibration worked, steady at 7.2 now. Thank you!', time: '10:35 AM' },
  { role: 'assistant' as const, text: "Great! I've logged this issue. For long-term stability, I recommend scheduling a probe replacement within 30 days. Your current probe is at 86% health.", time: '10:35 AM' },
];

export default function AIKnowledgeAssistant() {
  return (
    <DemoCard number={4} title="AI Knowledge Assistant">
      <div className="flex flex-col h-[320px]">
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="flex items-start gap-2 max-w-[80%]">
                {msg.role === 'assistant' && (
                  <div className="w-5 h-5 rounded-full bg-fusion-blue/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={10} className="text-fusion-blue" />
                  </div>
                )}
                <div
                  className={`rounded-lg px-3 py-2 text-[11px] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-fusion-blue text-white rounded-tr-sm'
                      : 'bg-gray-100 text-fusion-text rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                  <div className={`text-[9px] mt-1 ${msg.role === 'user' ? 'text-blue-200' : 'text-fusion-text-muted'}`}>
                    {msg.time}
                  </div>
                </div>
                {msg.role === 'user' && (
                  <div className="w-5 h-5 rounded-full bg-fusion-blue flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[8px] text-white font-bold">U</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-fusion-card-soft rounded-lg border border-fusion-border-light px-3 py-2">
          <span className="text-[11px] text-fusion-text-muted flex-1">Ask about products, troubleshooting, or training...</span>
          <Bot size={14} className="text-fusion-blue-light" />
        </div>
      </div>
    </DemoCard>
  );
}
