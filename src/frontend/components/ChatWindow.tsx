'use client';

import React, { useState } from 'react';
import { useStreamingChat } from '../hooks/useStreamingChat';

export const ChatWindow: React.FC = () => {
  const { messages, sendMessage, isLoading } = useStreamingChat();
  const [input, setInput] = useState('');
  const [provider, setProvider] = useState('openai');
  const [model, setModel] = useState('gpt-3.5-turbo');

  const modelsByProvider: Record<string, { id: string; name: string }[]> = {
    openai: [{ id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' }, { id: 'gpt-4', name: 'GPT-4' }],
    anthropic: [{ id: 'claude-3-opus', name: 'Claude 3 Opus' }, { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet' }],
    gemini: [{ id: 'gemini-pro', name: 'Gemini Pro' }],
    openrouter: [
      { id: 'google/gemini-2.0-flash-exp:free', name: 'Gemini 2.0 Flash (Free)' },
      { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet' },
      { id: 'meta-llama/llama-3.1-8b-instruct:free', name: 'Llama 3.1 8B (Free)' },
    ],
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input, provider, model);
    setInput('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '20px' }}>
      <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
        <select value={provider} onChange={(e) => {
          setProvider(e.target.value);
          setModel(modelsByProvider[e.target.value][0].id);
        }}>
          <option value="openai">OpenAI (Mock)</option>
          <option value="anthropic">Anthropic (Mock)</option>
          <option value="gemini">Gemini (Mock)</option>
          <option value="openrouter">OpenRouter (Real)</option>
        </select>

        <select value={model} onChange={(e) => setModel(e.target.value)}>
          {modelsByProvider[provider].map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
        {messages.map((m) => (
          <div key={m.id} style={{ marginBottom: '10px', textAlign: m.role === 'user' ? 'right' : 'left' }}>
            <strong>{m.role}:</strong>
            <div style={{ whiteSpace: 'pre-wrap' }}>{m.content}</div>
          </div>
        ))}
        {isLoading && <div>Assistant is thinking...</div>}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          style={{ flex: 1, padding: '10px' }}
          placeholder="Type a message..."
        />
        <button onClick={handleSend} disabled={isLoading} style={{ padding: '10px 20px' }}>
          Send
        </button>
      </div>
    </div>
  );
};
