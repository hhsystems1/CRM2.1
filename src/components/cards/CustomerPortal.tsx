import { useEffect, useState } from 'react';
import { Activity, Droplets, Cpu, Shield } from 'lucide-react';
import { ArrowButton } from '../ui/StatusBadge';
import ProgressBar from '../ui/Charts';
import DemoCard from '../ui/DemoCard';
import ServiceModal from '../ServiceModal';
import OrderProbeModal from '../OrderProbeModal';
import { fetchMyOrders } from '../../lib/queries';
import type { Order } from '../../types';

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatAmount(cents: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

export default function CustomerPortal() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [orderProbeOpen, setOrderProbeOpen] = useState(false);

  useEffect(() => {
    fetchMyOrders()
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DemoCard number={3} title="Customer Portal">
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-fusion-card-soft rounded-lg p-3 border border-fusion-border-light">
            <div className="flex items-center gap-2 mb-1">
              <Activity size={14} className="text-fusion-success" />
              <span className="text-[10px] font-semibold text-fusion-text-muted uppercase">System Status</span>
            </div>
            <span className="text-sm font-bold text-fusion-success">Online</span>
            <span className="text-[10px] text-fusion-text-muted ml-2">Last sync: 2m ago</span>
          </div>
          <div className="bg-fusion-card-soft rounded-lg p-3 border border-fusion-border-light">
            <div className="flex items-center gap-2 mb-1">
              <Droplets size={14} className="text-fusion-blue" />
              <span className="text-[10px] font-semibold text-fusion-text-muted uppercase">Water Quality</span>
            </div>
            <span className="text-sm font-bold text-fusion-text">78/100</span>
            <span className="text-[10px] text-fusion-text-muted ml-2">Good</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-fusion-card-soft rounded-lg p-3 border border-fusion-border-light">
            <div className="flex items-center gap-2 mb-2">
              <Cpu size={14} className="text-fusion-warning" />
              <span className="text-[10px] font-semibold text-fusion-text-muted uppercase">Probe Health</span>
            </div>
            <ProgressBar value={92} color="#0057D9" />
            <span className="text-[10px] text-fusion-text-muted mt-1 block">Replace in ~3 months</span>
          </div>
          <div className="bg-fusion-card-soft rounded-lg p-3 border border-fusion-border-light">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={14} className="text-fusion-success" />
              <span className="text-[10px] font-semibold text-fusion-text-muted uppercase">System Health</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-sm font-bold text-fusion-success">96%</span>
              <span className="text-[10px] text-fusion-text-muted">All systems nominal</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <ArrowButton onClick={() => setServiceOpen(true)}>
            Schedule Service
          </ArrowButton>
          <ArrowButton onClick={() => setOrderProbeOpen(true)}>
            Order Probe
          </ArrowButton>
        </div>
        <div className="bg-fusion-card-soft rounded-lg p-3 border border-fusion-border-light">
          <span className="text-[10px] font-semibold text-fusion-text-muted uppercase tracking-wider mb-1 block">Recent Orders</span>
          {loading ? (
            <div className="text-[11px] text-fusion-text-muted">Loading...</div>
          ) : error ? (
            <div className="text-[11px] text-red-400">{error}</div>
          ) : orders.length === 0 ? (
            <div className="text-[11px] text-fusion-text-muted">No orders yet</div>
          ) : (
            <div className="space-y-1.5 text-[11px]">
              {orders.map((o) => (
                <div key={o.id} className="flex justify-between">
                  <span className="text-fusion-text">
                    {o.customer_name ?? 'Order'} — {formatAmount(o.amount_total, o.currency)}
                  </span>
                  <span className="text-fusion-text-muted">{formatDate(o.created_at)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ServiceModal isOpen={serviceOpen} onClose={() => setServiceOpen(false)} />
      <OrderProbeModal isOpen={orderProbeOpen} onClose={() => setOrderProbeOpen(false)} />
    </DemoCard>
  );
}
