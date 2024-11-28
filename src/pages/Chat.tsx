import React, { useState } from 'react';
import { Send, Paperclip, Smile, Search, MoreVertical, Phone, Video } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  isAdmin: boolean;
}

interface ChatContact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  online: boolean;
  lastMessage: string;
  unread?: number;
}

const Chat = () => {
  const [messages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi, I need help with compliance settings",
      sender: "Jane Cooper",
      timestamp: "10:30 AM",
      isAdmin: false
    },
    {
      id: '2',
      content: "I'll help you with that. What specific settings are you looking at?",
      sender: "Admin",
      timestamp: "10:32 AM",
      isAdmin: true
    },
    {
      id: '3',
      content: "The data retention policy configuration",
      sender: "Jane Cooper",
      timestamp: "10:33 AM",
      isAdmin: false
    }
  ]);

  const contacts: ChatContact[] = [
    {
      id: '1',
      name: 'Jane Cooper',
      role: 'Company Admin',
      avatar: 'JC',
      online: true,
      lastMessage: 'The data retention policy configuration',
      unread: 2
    },
    {
      id: '2',
      name: 'Wade Warren',
      role: 'Security Officer',
      avatar: 'WW',
      online: false,
      lastMessage: 'Thanks for your help!'
    },
    // Add more contacts as needed
  ];

  return (
    <div className="flex h-[calc(100vh-5rem)] bg-background">
      {/* Contacts Sidebar */}
      <div className="w-80 border-r border-border bg-card">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search chats"
              className="w-full pl-10 pr-4 py-2 bg-muted/50 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="overflow-y-auto">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="p-4 hover:bg-muted/50 cursor-pointer transition-colors relative"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-medium text-primary">
                    {contact.avatar}
                  </div>
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium truncate">{contact.name}</p>
                    {contact.unread && (
                      <span className="bg-primary text-xs py-0.5 px-2 rounded-full">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-medium text-primary">
              JC
            </div>
            <div>
              <h2 className="font-medium">Jane Cooper</h2>
              <p className="text-sm text-muted-foreground">Company Admin • Online</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-muted/50 rounded-lg">
              <Phone size={20} className="text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-muted/50 rounded-lg">
              <Video size={20} className="text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-muted/50 rounded-lg">
              <MoreVertical size={20} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isAdmin ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] ${message.isAdmin ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg p-3`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{message.sender}</span>
                  <span className="text-xs opacity-70">{message.timestamp}</span>
                </div>
                <p>{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-muted/50 rounded-lg">
              <Paperclip size={20} className="text-muted-foreground" />
            </button>
            <input
              type="text"
              placeholder="Type a message"
              className="flex-1 bg-muted/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button className="p-2 hover:bg-muted/50 rounded-lg">
              <Smile size={20} className="text-muted-foreground" />
            </button>
            <button className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
