# Core TypeScript Interfaces

These interfaces define the contract between the frontend, backend, and provider adapters.

## Message and Conversation
```typescript
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
```

## Chat Request and Response
```typescript
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
```

## Provider Abstraction
```typescript
export interface LLMProvider {
  id: string;
  displayName: string;
  streamChat(request: ChatRequest): AsyncIterable<ChatChunk>;
}
```

## Prompt Templates
```typescript
export interface PromptTemplate {
  id: string;
  name: string;
  content: string;
}
```
