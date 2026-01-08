'use client';

import { useState } from 'react';
import { Message, ChatRequest, ChatChunk } from '../../shared/types';

export function useStreamingChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string, providerId: string, modelId: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          providerId,
          modelId,
        } as ChatRequest),
      });

      if (!response.body) return;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(Boolean);

        for (const line of lines) {
          const parsed: ChatChunk = JSON.parse(line);
          if (parsed.content) {
            accumulatedContent += parsed.content;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMessageId ? { ...m, content: accumulatedContent } : m
              )
            );
          }
        }
      }
    } catch (error) {
      console.error('Failed to stream chat:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, sendMessage, isLoading, setMessages };
}
