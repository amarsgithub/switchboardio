# Skeleton Multi-Provider LLM Chat Interface

A minimal, modular, and extensible skeleton for building multi-provider LLM chat applications.

## Project Goals
- **Modular Architecture**: Clear separation between frontend, backend, and LLM providers.
- **Extensibility**: Easy to add new LLM providers by implementing a simple interface.
- **Streaming Support**: Native support for streaming responses from LLMs to the UI.
- **Local Persistence**: Simple JSON-based storage for conversations and prompt templates.

## Folder Structure
- `src/shared/types.ts`: Core TypeScript interfaces used across the project.
- `src/backend/providers/`: LLM provider adapters (OpenAI, Anthropic, Gemini).
- `src/backend/storage/`: Data persistence layer (Repository pattern).
- `src/backend/api/`: Backend API logic for handling chat streams.
- `src/frontend/`: React components and hooks for the chat UI.

## How to Add a New Provider
1. Create a new file in `src/backend/providers/` (e.g., `my-provider.ts`).
2. Extend the `BaseProvider` class and implement the `streamChat` method.
3. Register the new provider in `src/backend/api/chat.ts`.

```typescript
export class MyProvider extends BaseProvider {
  id = 'my-provider';
  displayName = 'My Custom Provider';

  async *streamChat(request: ChatRequest): AsyncIterable<ChatChunk> {
    // Implement your provider logic here
  }
}
```

## How to Extend
- **Storage**: Replace `JSONRepository` with a `SQLiteRepository` in `src/backend/storage/` by implementing the `Repository` interface.
- **UI**: Enhance `ChatWindow.tsx` with more advanced styling or features like markdown rendering.
- **Auth**: Add middleware to the API routes in `src/backend/api/` to handle authentication.

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Note on Implementation
This is a **skeleton implementation**. The providers currently use mocked streaming responses to demonstrate the architecture without requiring API keys. To use real providers, you would need to:
1. Add your API keys to a `.env` file.
2. Update the provider adapters in `src/backend/providers/` to use the respective SDKs (e.g., `openai`, `@anthropic-ai/sdk`).
