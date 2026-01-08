import { ChatRequest, LLMProvider } from '../../shared/types';
import { OpenAIProvider } from '../providers/openai';
import { AnthropicProvider } from '../providers/anthropic';
import { GeminiProvider } from '../providers/gemini';

const providers: Record<string, LLMProvider> = {
  openai: new OpenAIProvider(),
  anthropic: new AnthropicProvider(),
  gemini: new GeminiProvider(),
};

export async function handleChatStream(req: Request): Promise<Response> {
  const body: ChatRequest = await req.json();
  const provider = providers[body.providerId];

  if (!provider) {
    return new Response('Provider not found', { status: 404 });
  }

  const stream = provider.streamChat(body);

  const encoder = new TextEncoder();
  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        controller.enqueue(encoder.encode(JSON.stringify(chunk) + '\n'));
      }
      controller.close();
    },
  });

  return new Response(readableStream, {
    headers: {
      'Content-Type': 'application/x-ndjson',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
