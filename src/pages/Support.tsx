import React, { useState } from 'react';
import TicketStats from '../components/support/TicketStats';
import TicketFilters from '../components/support/TicketFilters';
import TicketTable from '../components/support/TicketTable';
import { SupportTicket } from '../types/support';

const SAMPLE_TICKETS: SupportTicket[] = [
  {
    ticket_id: 'TK-001',
    subject: 'API Integration Issue',
    company: 'Tech Corp',
    priority: 'High',
    status: 'Open',
    assigned_to: 'John Smith',
    last_updated: '2024-01-15 14:30'
  },
  {
    ticket_id: 'TK-002',
    subject: 'Login Problems',
    company: 'StartUp Inc',
    priority: 'Medium',
    status: 'In Progress',
    assigned_to: 'Sarah Johnson',
    last_updated: '2024-01-15 15:45'
  }
];

const Support = () => {
  const [tickets] = useState<SupportTicket[]>(SAMPLE_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  const handleFilterChange = (filters: any) => {
    console.log('Filters changed:', filters);
    // Implement filtering logic here
  };

  const handleViewTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    // Implement modal opening logic here
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Support Dashboard</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Create Ticket
        </button>
      </div>

      <TicketStats />
      <TicketFilters onFilterChange={handleFilterChange} />
      <TicketTable tickets={tickets} onViewTicket={handleViewTicket} />
    </div>
  );
};

export default Support;
