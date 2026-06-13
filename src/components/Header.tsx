import { Hexagon } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">
          FUSION 44X – DEMO VISUAL ECOSYSTEM
        </h1>
        <p className="text-[13px] text-[#8BA0C4] mt-0.5">
          Enterprise CRM &amp; Automation Platform Overview
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2">
          <Hexagon size={18} className="text-fusion-blue-light" />
          <span className="text-sm font-bold text-white tracking-wider">F44X</span>
          <span className="text-[10px] text-[#8BA0C4] font-medium">| HHS</span>
        </div>
      </div>
    </header>
  );
}
