import { ChatRequest, ChatChunk } from '../../shared/types';
import { BaseProvider } from './base';

export class OpenRouterProvider extends BaseProvider {
  id = 'openrouter';
  displayName = 'OpenRouter';

  async *streamChat(request: ChatRequest): AsyncIterable<ChatChunk> {
    const apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      yield* this.mockStream('[Error] OPENROUTER_API_KEY is not set in .env');
      return;
    }

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000', // Required by OpenRouter
          'X-Title': 'LLM Chat Skeleton',
        },
        body: JSON.stringify({
          model: request.modelId || 'google/gemini-2.0-flash-exp:free',
          messages: request.messages.map(m => ({ role: m.role, content: m.content })),
          stream: true,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        yield* this.mockStream(`[OpenRouter Error] ${error}`);
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) return;

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const cleanLine = line.replace(/^data: /, '').trim();
          if (!cleanLine || cleanLine === '[DONE]') continue;

          try {
            const parsed = JSON.parse(cleanLine);
            const content = parsed.choices[0]?.delta?.content;
            if (content) {
              yield { content, done: false };
            }
          } catch (e) {
            console.error('Error parsing OpenRouter stream:', e);
          }
        }
      }
    } catch (error) {
      yield* this.mockStream(`[Fetch Error] ${error}`);
    }

    yield { content: '', done: true };
  }
}
