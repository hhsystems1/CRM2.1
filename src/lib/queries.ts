import { supabase } from './supabase';
import type {
  Distributor,
  Lead,
  SupportTicket,
  ContentAsset,
  KnowledgeCategory,
  FunnelMetric,
  Order,
  ChatSession,
  ChatMessage,
  AiChatResponse,
  FormSubmission,
} from '../types';

function requireSupabase() {
  if (!supabase) {
    throw new Error('Missing Supabase configuration in this deployment');
  }
  return supabase;
}

async function selectAll<T>(table: string, orderColumn?: string, ascending = true): Promise<T[]> {
  let query = requireSupabase().from(table).select('*');
  if (orderColumn) query = query.order(orderColumn, { ascending });
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as T[];
}

export function fetchDistributors() {
  return selectAll<Distributor>('distributors', 'name');
}

export function fetchLeads() {
  return selectAll<Lead>('leads', 'date', false);
}

export async function createLead(data: {
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  source?: string;
  notes?: string;
  score?: number;
  status?: string;
  distributor_id?: string;
}): Promise<Lead> {
  const { data: result, error } = await requireSupabase()
    .from('leads')
    .insert({
      name: data.name,
      company: data.company ?? null,
      email: data.email ?? null,
      phone: data.phone ?? null,
      source: data.source ?? 'crm',
      notes: data.notes ?? null,
      score: data.score ?? 0,
      status: data.status ?? 'New',
      distributor_id: data.distributor_id ?? null,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    })
    .select('*')
    .single();
  if (error) throw error;
  return result;
}

export async function updateLead(id: string, updates: Partial<{
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  notes: string;
  score: number;
  status: string;
  distributor_id: string;
}>): Promise<Lead> {
  const { data, error } = await requireSupabase()
    .from('leads')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

export function fetchFormSubmissions() {
  return selectAll<FormSubmission>('form_submissions', 'created_at', false);
}

export function fetchTickets() {
  return selectAll<SupportTicket>('support_tickets', 'created_at', false);
}

export function fetchContentAssets() {
  return selectAll<ContentAsset>('content_assets', 'views', false);
}

export function fetchKnowledgeCategories() {
  return selectAll<KnowledgeCategory>('knowledge_categories', 'title');
}

export function fetchFunnelMetrics() {
  return selectAll<FunnelMetric>('funnel_metrics', 'recorded_at');
}

export function fetchMyOrders() {
  return selectAll<Order>('orders', 'created_at', false);
}

// === Chat ===

export function fetchChatSessions() {
  return selectAll<ChatSession>('chat_sessions', 'created_at', false);
}

export async function fetchChatMessages(sessionId: string): Promise<ChatMessage[]> {
  const { data, error } = await requireSupabase()
    .from('chat_messages')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data ?? []) as ChatMessage[];
}

export async function sendChatMessage(message: string, sessionId?: string): Promise<AiChatResponse> {
  const client = requireSupabase();
  const { data: { session } } = await client.auth.getSession();
  const token = session?.access_token;
  if (!token) throw new Error('Not authenticated');

  const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;

  const res = await fetch(functionUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message, sessionId }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error ?? 'Failed to send message');
  }

  return res.json();
}
