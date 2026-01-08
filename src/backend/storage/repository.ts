import { Conversation, PromptTemplate } from '../../shared/types';

export interface Repository {
  // Conversations
  getConversations(): Promise<Conversation[]>;
  getConversation(id: string): Promise<Conversation | null>;
  saveConversation(conversation: Conversation): Promise<void>;
  deleteConversation(id: string): Promise<void>;

  // Prompt Templates
  getTemplates(): Promise<PromptTemplate[]>;
  saveTemplate(template: PromptTemplate): Promise<void>;
  deleteTemplate(id: string): Promise<void>;
}
