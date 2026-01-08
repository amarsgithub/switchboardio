export type Role = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  providerId: string;
  modelId: string;
  createdAt: number;
  updatedAt: number;
}

export interface ChatRequest {
  messages: Message[];
  providerId: string;
  modelId: string;
  options?: Record<string, any>;
}

export interface ChatChunk {
  content: string;
  done: boolean;
}

export interface PromptTemplate {
  id: string;
  name: string;
  content: string;
}

export interface LLMProvider {
  id: string;
  displayName: string;
  streamChat(request: ChatRequest): AsyncIterable<ChatChunk>;
}
