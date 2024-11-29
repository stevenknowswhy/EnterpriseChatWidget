import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MessageTemplate {
  id: string;
  name: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface MessageLabel {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

export interface DeletedMessage {
  id: string;
  content: string;
  deletedAt: string;
  labels: string[];
  sender: string;
  recipient: string;
}

interface MessagesState {
  autoReply: boolean;
  templates: MessageTemplate[];
  labels: MessageLabel[];
  deletedMessages: DeletedMessage[];
  setAutoReply: (enabled: boolean) => void;
  addTemplate: (template: Omit<MessageTemplate, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTemplate: (id: string, template: Partial<MessageTemplate>) => void;
  deleteTemplate: (id: string) => void;
  addLabel: (label: Omit<MessageLabel, 'id' | 'createdAt'>) => void;
  updateLabel: (id: string, label: Partial<MessageLabel>) => void;
  deleteLabel: (id: string) => void;
  addDeletedMessage: (message: Omit<DeletedMessage, 'id' | 'deletedAt'>) => void;
  restoreDeletedMessage: (id: string) => void;
  permanentlyDeleteMessage: (id: string) => void;
}

const useMessagesStore = create<MessagesState>()(
  persist(
    (set) => ({
      autoReply: false,
      templates: [],
      labels: [],
      deletedMessages: [],

      setAutoReply: (enabled) => set({ autoReply: enabled }),

      addTemplate: (template) =>
        set((state) => ({
          templates: [
            ...state.templates,
            {
              ...template,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        })),

      updateTemplate: (id, template) =>
        set((state) => ({
          templates: state.templates.map((t) =>
            t.id === id
              ? {
                  ...t,
                  ...template,
                  updatedAt: new Date().toISOString(),
                }
              : t
          ),
        })),

      deleteTemplate: (id) =>
        set((state) => ({
          templates: state.templates.filter((t) => t.id !== id),
        })),

      addLabel: (label) =>
        set((state) => ({
          labels: [
            ...state.labels,
            {
              ...label,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      updateLabel: (id, label) =>
        set((state) => ({
          labels: state.labels.map((l) =>
            l.id === id
              ? {
                  ...l,
                  ...label,
                }
              : l
          ),
        })),

      deleteLabel: (id) =>
        set((state) => ({
          labels: state.labels.filter((l) => l.id !== id),
        })),

      addDeletedMessage: (message) =>
        set((state) => ({
          deletedMessages: [
            ...state.deletedMessages,
            {
              ...message,
              id: crypto.randomUUID(),
              deletedAt: new Date().toISOString(),
            },
          ],
        })),

      restoreDeletedMessage: (id) =>
        set((state) => ({
          deletedMessages: state.deletedMessages.filter((m) => m.id !== id),
        })),

      permanentlyDeleteMessage: (id) =>
        set((state) => ({
          deletedMessages: state.deletedMessages.filter((m) => m.id !== id),
        })),
    }),
    {
      name: 'messages-store',
    }
  )
);

export default useMessagesStore;
