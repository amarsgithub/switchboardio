'use client';

import React, { useState } from 'react';
import { useStreamingChat } from '../hooks/useStreamingChat';

export const ChatWindow: React.FC = () => {
  const { messages, sendMessage, isLoading } = useStreamingChat();
  const [input, setInput] = useState('');
  const [provider, setProvider] = useState('openai');

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input, provider, 'default-model');
    setInput('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '20px' }}>
      <div style={{ marginBottom: '10px' }}>
        <select value={provider} onChange={(e) => setProvider(e.target.value)}>
          <option value="openai">OpenAI</option>
          <option value="anthropic">Anthropic</option>
          <option value="gemini">Gemini</option>
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
