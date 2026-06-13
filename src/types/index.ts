export interface KpiData {
  label: string;
  value: string;
  change?: string;
  changeType?: 'up' | 'down';
}

export interface TableColumn {
  key: string;
  label: string;
}

export interface TableRow {
  [key: string]: string | number | boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  time: string;
}

export interface FunnelStage {
  label: string;
  count: number;
}

export interface Funnel {
  title: string;
  stages: FunnelStage[];
}

export interface ContentItem {
  title: string;
  type: string;
  views: string;
  engagement: string;
  status: string;
}

export interface Category {
  title: string;
  icon: string;
  count: number;
  updated: number;
}

export interface Ticket {
  id: string;
  customer: string;
  subject: string;
  status: string;
  priority: string;
  agent: string;
}
