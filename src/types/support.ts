export interface SupportTicket {
  ticket_id: string;
  subject: string;
  company: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved';
  assigned_to: string;
  last_updated: string;
  description?: string;
}

export interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: string;
  isInternal: boolean;
}
