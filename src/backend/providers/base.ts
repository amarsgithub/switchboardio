import { ChatRequest, ChatChunk, LLMProvider } from '../shared/types';

export abstract class BaseProvider implements LLMProvider {
  abstract id: string;
  abstract displayName: string;

  abstract streamChat(request: ChatRequest): AsyncIterable<ChatChunk>;

  protected async *mockStream(content: string): AsyncIterable<ChatChunk> {
    const words = content.split(' ');
    for (const word of words) {
      yield { content: word + ' ', done: false };
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    yield { content: '', done: true };
  }
}
