# SwitchboardIO Roadmap

This document outlines the planned features and improvements for SwitchboardIO. If you'd like to take on any of these, please check the GitHub Issues or open a new one to discuss.

## Phase 1: Core & Providers (High Priority)
- [ ] **Real Provider Implementations**:
    - [ ] OpenAI (using official SDK)
    - [ ] Anthropic (using official SDK)
    - [ ] Gemini (using Google Generative AI SDK)
- [ ] **Additional Providers**:
    - [ ] Ollama (Local LLM support)
    - [ ] Groq (High-speed inference)
- [ ] **Storage**:
    - [ ] Implement `SQLiteRepository` for robust local storage.
    - [ ] Integrate conversation persistence into the chat API.

## Phase 2: Frontend & UX
- [ ] **Rich Text Rendering**:
    - [ ] Markdown support for LLM responses.
    - [ ] Syntax highlighting for code blocks.
- [ ] **Conversation Management**:
    - [ ] Sidebar for conversation history.
    - [ ] Rename and delete conversations.
- [ ] **Prompt Library**:
    - [ ] UI to manage and select prompt templates.
- [ ] **Settings**:
    - [ ] UI for managing API keys and default settings.

## Phase 3: Infrastructure & DX
- [ ] **Testing**:
    - [ ] Unit tests for providers and storage.
    - [ ] Integration tests for API routes.
- [ ] **Deployment**:
    - [ ] Dockerfile for containerized setup.
    - [ ] Vercel/Netlify deployment guides.

## Future Ideas
- [ ] Multi-modal support (Images/Audio).
- [ ] Plugin system for custom tools (Function Calling).
- [ ] Collaborative chat sessions.
