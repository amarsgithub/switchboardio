# Architecture: Skeleton Multi-Provider LLM Chat Interface

## Overview
SwitchboardIO is a lightweight, modular multi-provider LLM chat interface. It focuses on a clean separation of concerns between the frontend, backend API, provider abstraction, and storage.

## Folder Structure
```text
/
├── src/
│   ├── shared/             # Shared types and interfaces
│   │   └── types.ts
│   ├── backend/            # Node.js/Next.js API logic
│   │   ├── providers/      # LLM Provider Adapters
│   │   │   ├── base.ts     # LLMProvider interface
│   │   │   ├── openai.ts
│   │   │   ├── anthropic.ts
│   │   │   └── gemini.ts
│   │   ├── storage/        # Data persistence layer
│   │   │   ├── repository.ts
│   │   │   └── json-storage.ts
│   │   └── api/            # API Route handlers
│   │       └── chat.ts
│   └── frontend/           # React components
│       ├── components/
│       │   ├── ChatWindow.tsx
│       │   ├── MessageList.tsx
│       │   └── ProviderSelector.tsx
│       └── hooks/
│           └── useStreamingChat.ts
├── data/                   # Local storage (JSON/SQLite)
├── README.md
└── package.json
```

## Data Flow
1. **Frontend**: User selects a provider/model and sends a message.
2. **API**: The `/api/chat/stream` endpoint receives the request.
3. **Provider Layer**: The API selects the appropriate `LLMProvider` adapter.
4. **Streaming**: The adapter calls the external API and returns an `AsyncIterable`.
5. **Storage**: The conversation is persisted to local storage (JSON/SQLite).
6. **Frontend**: The UI consumes the stream and updates the message list in real-time.

## Key Components
- **LLMProvider Interface**: Standardizes how different LLMs are called.
- **Repository Pattern**: Abstracting storage allows switching between JSON and SQLite easily.
- **Streaming Handler**: Uses Server-Sent Events (SSE) or NDJSON to stream chunks to the client.
